import {takeLatest, put, call} from 'redux-saga/effects';
import {sendTranscript} from '../actions';
import Debug from 'debug';
import axios from "axios";


const debug = Debug('hb:liveChat:sagas:sendTranscriptSaga');

export function* sendTranscriptSaga({payload}) {
    debug('called');
    try {
        console.log({payload})
        const {allMessages, sessId} = payload
        const input = {
            "botId": "D4ALYGLD6O",
            "sessionId": sessId,
            "localeId": "en_US",
            "allMessages": allMessages,
            "siteId": "base"
        }
        yield call(axios.post, 'https://smjli6j817.execute-api.us-west-2.amazonaws.com/ayush/chatBotApi/fetchPrevMessages', JSON.stringify(input));
    } catch (err) {
        debug(err);
        yield put(sendTranscript.error());
    }
}

export default function* () {
    yield takeLatest('SEND_TRANSCRIPT', sendTranscriptSaga);
}
