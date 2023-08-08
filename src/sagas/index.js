import { fork, all } from 'redux-saga/effects';
import sendMessgaeFromUser from './sendMessgaeFromUser';

const sagas={
    sendMessgaeFromUser
}

export default function* root() {
    yield all(Object.values(sagas).map(saga => fork(saga)));
}
