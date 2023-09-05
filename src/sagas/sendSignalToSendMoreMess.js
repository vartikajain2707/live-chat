import {takeLatest, put, call, select} from 'redux-saga/effects';
import {sendSignalToSendMoreMess, fetchLoader} from '../actions';
import Debug from 'debug';
import axios from "axios";
import {getClientUserName} from "../selectors";


const debug = Debug('hb:liveChat:sagas:sendSignalToSendMoreMess');

export function* sendSignalToSendMoreMessSaga({payload}) {
    debug('called');
    try {
        const {sessId, ...rest} = payload
        const clientName = yield select(getClientUserName)
        const {fetchMessageCount, currentMessagesCount} = rest
        yield put(fetchLoader(true))

        const input = {
            "botId": "D4ALYGLD6O",
            "sessionId": sessId,
            "localeId": "en_US",
            "fetchMessageCount": fetchMessageCount,
            "currentMessagesCount": currentMessagesCount,
            "siteId": "base"
        }
        const response = yield call(axios.post, 'https://smjli6j817.execute-api.us-west-2.amazonaws.com/ayush/chatBotApi/fetchPrevMessages', JSON.stringify(input));
        // const finalResponse = response.data

        const finalResponse = (response.data || []).map((item, idx) => {
            if (item.user === 'self') {
                item.user = clientName || 'self'
            }
            return item
        })
        // console.log({response})
        yield put(sendSignalToSendMoreMess.success(finalResponse))
        yield put(fetchLoader(false))


    } catch (err) {
        debug(err);
        yield put(sendSignalToSendMoreMess.error());
    }
}

export default function* () {
    yield takeLatest('SEND_SIGNAL_TO_SEND_MORE_MESS', sendSignalToSendMoreMessSaga);
}
