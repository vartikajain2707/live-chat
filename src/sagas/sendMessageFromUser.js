import {takeLatest, put, call, select} from 'redux-saga/effects';
import {sendMessageFromUser, loadingDots, clientUserName} from '../actions';
import Debug from 'debug';
import axios from 'axios';
import moment from "moment"
import {getClientUserName} from "../selectors";


const debug = Debug('hb:liveChat:sagas:sendMessageFromUser');

export function* sendMessageFromUserSaga({payload}) {
    debug('called');
    try {
        const {text, sessId, timeStamp} = payload
        yield put(loadingDots(true))
        const clientName = yield select(getClientUserName)
        yield put(sendMessageFromUser.success({user: 'loading', message: ['.......']}))
        const input = {
            "botId": "D4ALYGLD6O", // ayush stack
            // "botId": '2RON6R80PC', //prod
            // botAliasId: 'TSTALIASID', // (test mode)
            "botAliasId": 'ERAZYC0A2I', //(prod mode)
            "sessionId": sessId,
            "localeId": "en_US",
            "text": text,
            "siteId": "base",
            "timeStamp": timeStamp,
            "userName": clientName
        }
        const response = yield call(axios.post, 'https://smjli6j817.execute-api.us-west-2.amazonaws.com/ayush/chatBotApi', JSON.stringify(input));
        const intent = response.data.sessionState.intent.name
        let customerAsUser = 'self'
        if (intent === 'Welcome') {
            customerAsUser = response?.data?.sessionState?.intent?.slots?.firstName?.value?.originalValue

        }
        yield put(clientUserName(customerAsUser))
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

export default function* () {
    yield takeLatest('SEND_MESSAGE_FROM_USER', sendMessageFromUserSaga);
}
