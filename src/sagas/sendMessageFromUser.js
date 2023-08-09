import { takeLatest, put } from 'redux-saga/effects';
import { sendMessageFromUser } from '../actions';
import Debug from 'debug';


const debug = Debug('hb:liveChat:sagas:sendMessageFromUser');

export function* sendMessageFromUserSaga({payload}) {
    debug('called');
    try {
        const res=[{user:'bot', message:'hello',options:['yes','no']}]
        yield put(sendMessageFromUser.success(res || []))
    } catch (err) {
        debug(err);
        yield put(sendMessageFromUser.error());
    }
}

export default function*() {
    yield takeLatest('SEND_MESSAGE_FROM_USER', sendMessageFromUserSaga);
}
