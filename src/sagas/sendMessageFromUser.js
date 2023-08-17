import { takeLatest, put,call } from 'redux-saga/effects';
import { sendMessageFromUser,loadingDots } from '../actions';
import Debug from 'debug';
import axios from 'axios';
import {getSendMessageFromUser} from "../selectors";

// function* createTodoSaga(action) {
//     try {
//         const { text } = action.payload;
//         const response = yield call(axios.post, '/todos', { text });
//         if (response.status === 200) {
//             yield put({ type: POST_TODO_SUCCESS, payload: response.data });
//         } else {
//             yield put({ type: POST_TODO_ERROR, payload: response.data });
//         }
//     } catch (error) {
//         yield put({ type: POST_TODO_ERROR, payload: error });
//     }
// }
//
// export function* rootSaga() {
//     yield takeEvery(POST_TODO, createTodoSaga);
// }


const debug = Debug('hb:liveChat:sagas:sendMessageFromUser');

export function* sendMessageFromUserSaga({payload}) {
    debug('called');
    try {
        console.log({payload})
        const {text,sessId} = payload
        yield put(loadingDots(true))
        yield put(sendMessageFromUser.success({user: 'loading', message: ['.......']}))
        const input ={
            "botId": "D4ALYGLD6O",
            "sessionId": sessId,
            "localeId": "en_US",
            "text": text,
            "propertyId": "base"
        }

        const response = yield call(axios.post, 'https://smjli6j817.execute-api.us-west-2.amazonaws.com/ayush/chatBotApi', JSON.stringify(input));
        // console.log({data: response.data.message[0]})
        console.log({response});
        // const response=[{user:'bot', message:'hello jii',options:['yes','no']}]
        // const edittedResponse=response.data.messages[0].content || response.data.message[0] || 'Are you sure hardcoded?'
        const finalRes={user: 'bot', message: response.data.messages, options: response.data.options};

        yield put(sendMessageFromUser.success(finalRes))
        yield put(loadingDots(false))
    } catch (err) {
        debug(err);
        yield put(sendMessageFromUser.error());
    }
}

export default function*() {
    yield takeLatest('SEND_MESSAGE_FROM_USER', sendMessageFromUserSaga);
}
