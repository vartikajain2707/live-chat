import {takeLatest, put, call, select} from 'redux-saga/effects';
import {submitFeedback} from '../actions';
import Debug from 'debug';
import axios from "axios";
import {getStoreSessionId} from "../selectors";
import moment from "moment";


const debug = Debug('hb:liveChat:sagas:submitFeedbackSaga');

export function* submitFeedbackSaga({payload}) {
    debug('called');
    try {
        const {feedbackInput, starRating} = payload
        console.log({feedbackInput, starRating});
        const sessionId = yield select(getStoreSessionId);
        const input = {
            "sessionId": sessionId,
            "feedback": {
                feedbackInput,
                starRating
            },
            "siteId": "base"
        }
        yield call(axios.post, 'https://smjli6j817.execute-api.us-west-2.amazonaws.com/ayush/chatBotApi/submitFeedback', JSON.stringify(input));
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

export default function* () {
    yield takeLatest('SUBMIT_FEEDBACK', submitFeedbackSaga);
}
