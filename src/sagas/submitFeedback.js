import {takeLatest, put, call, select} from 'redux-saga/effects';
import {submitFeedback} from '../actions';
import Debug from 'debug';
import axios from "axios";
import {getStoreSessionId} from "../selectors";
import moment from "moment";
import { config } from '../config';


const debug = Debug('hb:liveChat:sagas:submitFeedbackSaga');

export function* submitFeedbackSaga({payload}) {
    debug('called');
    try {
        const {feedbackInput, starRating} = payload
        const sessionId = yield select(getStoreSessionId);
        const input = {
            "sessionId": sessionId,
            "feedback": {
                feedbackInput,
                starRating
            },
            "siteId": "base"
        }
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
