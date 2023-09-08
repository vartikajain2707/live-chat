import {takeLatest, put, call, select} from 'redux-saga/effects';
import {enableScroll, submitFeedback} from '../actions';
import Debug from 'debug';
import axios from "axios";
import {getClientEmailId, getClientUserName, getStoreSessionId} from "../selectors";
import moment from "moment";
import {config} from '../config';


const debug = Debug('hb:liveChat:sagas:submitFeedbackSaga');

export function* submitFeedbackSaga({payload}) {
    debug('called');
    try {
        const {feedbackInput, starRating, sendTranscriptCheckbox} = payload
        const sessionId = yield select(getStoreSessionId);
        const clientEmailAddress = yield select(getClientEmailId)
        const clientName = yield select(getClientUserName) || 'self'
        const input = {
            "sessionId": sessionId,
            "feedback": {
                feedbackInput,
                starRating
            },
            "sendTranscriptToUser": sendTranscriptCheckbox,
            "siteId": "base",
            "userName": clientName,
            "emailId": clientEmailAddress
        }
        yield put(enableScroll(true))
        yield call(axios.post, `${config.apiUri}/chatBotApi/submitFeedback`, JSON.stringify(input));
        const response = {
            user: 'bot',
            message: ['Your Feedback has been submitted. Thank You! Have a nice day.'],
            timeStamp: moment().unix()
        }
        setTimeout(() => {
            if (window && window.parent) {
                window.parent.postMessage({closeChatBot: true}, '*');
            }
        }, "2000");
        localStorage.clear()
        yield put(submitFeedback.success(response))
    } catch (err) {
        debug(err);
        yield put(submitFeedback.error());
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield takeLatest('SUBMIT_FEEDBACK', submitFeedbackSaga);
}
