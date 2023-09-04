import {fork, all} from 'redux-saga/effects';
import sendMessageFromUser from './sendMessageFromUser';
import sendSignalToSendMoreMess from './sendSignalToSendMoreMess';

const sagas = {
    sendMessageFromUser,
    sendSignalToSendMoreMess
}

export default function* root() {
    yield all(Object.values(sagas).map(saga => fork(saga)));
}
