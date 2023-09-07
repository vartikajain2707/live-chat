import {takeLatest, put, call, select} from 'redux-saga/effects';
import {sendSignalToSendMoreMess, fetchLoader, enableScroll} from '../actions';
import Debug from 'debug';
import axios from "axios";
import {getClientUserName} from "../selectors";
import {config} from '../config';

const debug = Debug('hb:liveChat:sagas:sendSignalToSendMoreMess');

export function* sendSignalToSendMoreMessSaga({payload}) {
    debug('called');
    try {
        const {sessId, ...rest} = payload
        const clientName = yield select(getClientUserName)
        const {fetchMessageCount, currentMessagesCount} = rest
        yield put(fetchLoader(true))

        const input = {
            // "botId": "D4ALYGLD6O", // ayush stack
            "botId": '2RON6R80PC', // prod
            "sessionId": sessId,
            "localeId": "en_US",
            "fetchMessageCount": fetchMessageCount,
            "currentMessagesCount": currentMessagesCount,
            "siteId": "base"
        }
        yield put(enableScroll(false))
        const response = yield call(axios.post, `${config.apiUri}/chatBotApi/fetchPrevMessages`, JSON.stringify(input));
        const finalResponse = (response.data || []).map((item, idx) => {
            if (item.user === 'self') {
                item.user = clientName || 'self'
            }
            return item
        })
        yield put(sendSignalToSendMoreMess.success(finalResponse))
        yield put(fetchLoader(false))


    } catch (err) {
        debug(err);
        yield put(sendSignalToSendMoreMess.error());
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield takeLatest('SEND_SIGNAL_TO_SEND_MORE_MESS', sendSignalToSendMoreMessSaga);
}
