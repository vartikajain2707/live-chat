import {takeLatest, put, call, select} from 'redux-saga/effects';
import {sendMessageFromUser, loadingDots, enableScroll, prevResponse,totalMessageCount} from '../actions';
import Debug from 'debug';
import axios from 'axios';
import moment from "moment"
import {getPrevResponse, config} from "../selectors";
import {config as configLoaded} from '../config'


const debug = Debug('hb:liveChat:sagas:sendMessageFromUser');

export function* sendMessageFromUserSaga({payload}) {
    debug('called');
    try {
        const {text, sessId, timeStamp} = payload
        const configObject = yield select(config)
        const sessionEmailId = sessionStorage.getItem('emailAddress')
        let sessionUserName = sessionStorage.getItem('userName') || 'self'
        yield put(loadingDots(true))
        const prevRes = yield select(getPrevResponse)
        if (prevRes?.data?.sessionState?.intent?.slots?.firstName === null) {
            sessionUserName = text
        }
        yield put(sendMessageFromUser.success({user: 'loading', message: ['.......']}))
        const {siteSettings} = configObject || {}
        const input = {
            "botId": siteSettings.REACT_APP_BOTID,
            "botAliasId": siteSettings.REACT_APP_BOTALIASID,
            "sessionId": sessId,
            "localeId": "en_US",
            "text": text.replace("&", ","),
            "siteId": siteSettings?.siteid || 'base',
            "timeStamp": timeStamp,
            "userName": sessionUserName,
            "emailId": sessionEmailId
        }
        yield put(enableScroll(true))
        const response = yield call(axios.post, `${configLoaded.apiUri}/chatBotApi`, JSON.stringify(input));
        const totalMessageCountInSession = parseInt((sessionStorage.getItem('totalMessageCount') || 0)) + 2;
        sessionStorage.setItem('totalMessageCount', totalMessageCountInSession);
        const intent = response.data.sessionState.intent.name
        let customerAsUser = 'self'
        let customerEmail = ""
        if (intent === 'Welcome') {
            yield put(prevResponse(response))
            customerAsUser = response?.data?.sessionState?.intent?.slots?.firstName?.value?.originalValue
            customerEmail = response?.data?.sessionState?.intent?.slots?.emailId?.value?.originalValue
            sessionStorage.setItem('emailAddress', customerEmail)
            sessionStorage.setItem('userName', customerAsUser)
        }

        const finalRes = {
            user: 'bot',
            message: response.data.messages,
            options: response.data.options,
            timeStamp: moment().unix()
        };
        yield put(sendMessageFromUser.success(finalRes))
        yield put(totalMessageCount.success(totalMessageCountInSession));
        yield put(loadingDots(false))
    } catch (err) {
        debug(err);
        yield put(sendMessageFromUser.error());
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield takeLatest('SEND_MESSAGE_FROM_USER', sendMessageFromUserSaga);
}
