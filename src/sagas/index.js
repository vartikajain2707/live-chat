import { fork, all } from 'redux-saga/effects';
import sendMessageFromUser from './sendMessageFromUser';

const sagas={
    sendMessageFromUser
}

export default function* root() {
    yield all(Object.values(sagas).map(saga => fork(saga)));
}
