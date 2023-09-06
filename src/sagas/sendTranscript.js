import {takeLatest, put, call} from 'redux-saga/effects';
import {sendTranscript} from '../actions';
import Debug from 'debug';
import axios from "axios";
import { config } from '../config';


const debug = Debug('hb:liveChat:sagas:sendTranscriptSaga');

export function* sendTranscriptSaga({payload}) {
    debug('called');
    try {
        const {allMessages, sessId} = payload
        const input = {
            "botId": "D4ALYGLD6O",
            "sessionId": sessId,
            "localeId": "en_US",
            "allMessages": allMessages,
            "siteId": "base"
        }
        yield call(axios.post, `${config.apiUri}/chatBotApi/fetchPrevMessages`, JSON.stringify(input));
    } catch (err) {
        debug(err);
        yield put(sendTranscript.error());
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield takeLatest('SEND_TRANSCRIPT', sendTranscriptSaga);
}
