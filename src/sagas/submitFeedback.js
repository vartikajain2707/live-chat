import {takeLatest, put, call, select} from 'redux-saga/effects';
import {enableScroll, submitFeedback, removeSessionStorage} from '../actions';
import Debug from 'debug';
import axios from "axios";
import {getStoreSessionId, config} from "../selectors";
import moment from "moment";
import {config as configLoaded} from '../config'


const debug = Debug('hb:liveChat:sagas:submitFeedbackSaga');

export function* submitFeedbackSaga({payload}) {
    debug('called');
    try {
        const configObject = yield select(config)
        const {siteSettings} = configObject || {}
        const {feedbackInput, starRating, sendTranscriptCheckbox} = payload
        const sessionId = yield select(getStoreSessionId);
        const sessionEmailId = sessionStorage.getItem('emailAddress')
        const sessionUserName = sessionStorage.getItem('userName') || 'self'
        const input = {
            "sessionId": sessionId,
            "feedback": {
                feedbackInput,
                starRating
            },
            "sendTranscriptToUser": sendTranscriptCheckbox,
            "siteId": siteSettings?.siteid || 'base',
            "userName": sessionUserName,
            "emailId": sessionEmailId
        }
        yield put(enableScroll(true))
        yield call(axios.post, `${configLoaded.apiUri}/chatBotApi/submitFeedback`, JSON.stringify(input));
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
        yield put(removeSessionStorage())
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
