import {takeLatest, put, call} from 'redux-saga/effects';
import {sendMessageFromUser, loadingDots, clientUserName} from '../actions';
import Debug from 'debug';
import axios from 'axios';


const debug = Debug('hb:liveChat:sagas:sendMessageFromUser');

export function* sendMessageFromUserSaga({payload}) {
    debug('called');
    try {
        console.log('inside sendMessFromuser saga')
        const {text, sessId} = payload
        yield put(loadingDots(true))
        yield put(sendMessageFromUser.success({user: 'loading', message: ['.......']}))
        const input = {
            "botId": "D4ALYGLD6O",
            "sessionId": sessId,
            "localeId": "en_US",
            "text": text,
            "siteId": "base"
        }
        console.log({input})
        const response = yield call(axios.post, 'https://smjli6j817.execute-api.us-west-2.amazonaws.com/ayush/chatBotApi', JSON.stringify(input));
        console.log({response})
        const intent = response.data.sessionState.intent.name
        let customerAsUser = 'self'
        if (intent === 'Welcome') {
            customerAsUser = response?.data?.sessionState?.intent?.slots?.firstName?.value?.originalValue
            yield put(clientUserName(customerAsUser))
        }
        // console.log({data: response.data.message[0]})
        // console.log({response});
        // const response = [{user: 'bot', message: 'hello jii', options: ['yes', 'no']}]
        // const edittedResponse=response.data.messages[0].content || response.data.message[0] || 'Are you sure hardcoded?'
        const finalRes = {
            user: 'bot',
            message: response.data.messages,
            options: response.data.options,
            timeStamp: new Date().toLocaleTimeString().substring(0, 5),
            customerAsUser: customerAsUser || 'self'
        };
        console.log({finalRes})
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
