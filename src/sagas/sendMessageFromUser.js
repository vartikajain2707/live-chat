import {takeLatest, put, call, select} from 'redux-saga/effects';
import {sendMessageFromUser, loadingDots, enableScroll, prevResponse} from '../actions';
import Debug from 'debug';
import axios from 'axios';
import moment from "moment"
import {getPrevResponse} from "../selectors";
import {config} from '../config';


const debug = Debug('hb:liveChat:sagas:sendMessageFromUser');

export function* sendMessageFromUserSaga({payload}) {
    debug('called');
    try {
        const {text, sessId, timeStamp} = payload
        const sessionEmailId = sessionStorage.getItem('emailAddress')
        let sessionUserName = sessionStorage.getItem('userName') || 'self'
        yield put(loadingDots(true))
        const prevRes = yield select(getPrevResponse)
        if (prevRes?.data?.sessionState?.intent?.slots?.firstName === null) {
            sessionUserName = text
        }
        yield put(sendMessageFromUser.success({user: 'loading', message: ['.......']}))
        const input = {
            "botId": config.botId,
            "botAliasId": config.botAliasId,
            "sessionId": sessId,
            "localeId": "en_US",
            "text": text.replace("&", ","),
            "siteId": "base",
            "timeStamp": timeStamp,
            "userName": sessionUserName,
            "emailId": sessionEmailId
        }
        yield put(enableScroll(true))
        const response = yield call(axios.post, `${config.apiUri}/chatBotApi`, JSON.stringify(input));
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
