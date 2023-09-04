import {fork, all} from 'redux-saga/effects';
import sendMessageFromUser from './sendMessageFromUser';
import sendSignalToSendMoreMess from './sendSignalToSendMoreMess';
import sendTranscript from "./sendTranscript";
import submitFeedback from './submitFeedback'

const sagas = {
    sendMessageFromUser,
    sendSignalToSendMoreMess,
    sendTranscript,
    submitFeedback
}

export default function* root() {
    yield all(Object.values(sagas).map(saga => fork(saga)));
}
