import { takeLatest, put } from 'redux-saga/effects';
import { sendMessgaeFromUser } from '../actions';
import Debug from 'debug';


const debug = Debug('hb:liveChat:sagas:sendMessgaeFromUser');

export function* sendMessgaeFromUserSaga({payload}) {
    debug('called');
console.log('hi ayush')
    try {
        console.log({payload})
        const res=[{user:'bot', message:'hello'}]
        yield put(sendMessgaeFromUser.success(res || []))
    } catch (err) {
        debug(err);
        yield put(sendMessgaeFromUser.error());
    }
}

export default function*() {
    yield takeLatest('SEND_MESSAGE_FROM_USER', sendMessgaeFromUserSaga);
}
