import {takeLatest, put, call, select} from 'redux-saga/effects';
import {sendSignalToSendMoreMess, fetchLoader, enableScroll} from '../actions';
import Debug from 'debug';
import axios from "axios";
import {config} from "../selectors";
import {config as configLoaded} from '../config'


const debug = Debug('hb:liveChat:sagas:sendSignalToSendMoreMess');

export function* sendSignalToSendMoreMessSaga({payload}) {
    debug('called');
    try {
        const configObject = yield select(config)
        const {siteSettings} = configObject || {}
        const {sessId, ...rest} = payload
        const sessionEmailId = sessionStorage.getItem('emailAddress')
        const sessionUserName = sessionStorage.getItem('userName') || 'self'
        const {fetchMessageCount, currentMessagesCount} = rest
        yield put(fetchLoader(true))

        const input = {
            "botId": siteSettings.REACT_APP_BOTID, // prod
            "sessionId": sessId,
            "localeId": "en_US",
            "fetchMessageCount": fetchMessageCount,
            "currentMessagesCount": currentMessagesCount,
            "siteId": siteSettings?.siteid || 'base',
            "userName": sessionUserName,
            "emailId": sessionEmailId
        }
        yield put(enableScroll(false))
        const response = yield call(axios.post, `${configLoaded.apiUri}/chatBotApi/fetchPrevMessages`, JSON.stringify(input));
        const finalResponse = (response.data || []).map((item, idx) => {
            if (item.user === 'self') {
                item.user = sessionUserName || 'self'
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
