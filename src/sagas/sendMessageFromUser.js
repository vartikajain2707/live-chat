import {takeLatest, put, call, select} from 'redux-saga/effects';
import {sendMessageFromUser, loadingDots, clientUserName, clientEmailId} from '../actions';
import Debug from 'debug';
import axios from 'axios';
import moment from "moment"
import {getClientUserName, getClientEmailId} from "../selectors";
import { config } from '../config';


const debug = Debug('hb:liveChat:sagas:sendMessageFromUser');

export function* sendMessageFromUserSaga({payload}) {
    debug('called');
    try {
        const {text, sessId, timeStamp} = payload
        yield put(loadingDots(true))
        const clientName = yield select(getClientUserName)
        const clientEmailAddress = yield select(getClientEmailId)
        yield put(sendMessageFromUser.success({user: 'loading', message: ['.......']}))
        const input = {
            "botId": config.botId,
            "botAliasId": config.botAliasId,
            "sessionId": sessId,
            "localeId": "en_US",
            "text": text,
            "siteId": "base",
            "timeStamp": timeStamp,
            "userName": clientName,
            "emailId": clientEmailAddress
        }
        const response = yield call(axios.post, `${config.apiUri}/chatBotApi`, JSON.stringify(input));
        const intent = response.data.sessionState.intent.name
        let customerAsUser = 'self'
        let customerEmail = ""
        if (intent === 'Welcome') {
            customerAsUser = response?.data?.sessionState?.intent?.slots?.firstName?.value?.originalValue
            customerEmail = response?.data?.sessionState?.intent?.slots?.emailId?.value?.originalValue

        }
        yield put(clientUserName(customerAsUser))
        yield put(clientEmailId(customerEmail))
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
