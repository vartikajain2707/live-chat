import {takeLatest, put, call, select} from 'redux-saga/effects';
import {sendMessageFromUser, sendTranscript} from '../actions';
import Debug from 'debug';
import axios from "axios";
import {config} from '../config';
import moment from "moment/moment";
import {getClientEmailId, getClientUserName} from "../selectors";


const debug = Debug('hb:liveChat:sagas:sendTranscriptSaga');

export function* sendTranscriptSaga({payload}) {
    debug('called');
    try {
        const clientEmailAddress = yield select(getClientEmailId)
        const clientName = yield select(getClientUserName) || 'self'
        const {sessId} = payload
        const input = {
            "botId": config.botId,
            "botAliasId": config.botAliasId,
            "sessionId": sessId,
            "localeId": "en_US",
            "siteId": "base",
            "userName": clientName,
            "emailId": clientEmailAddress
        }
        const response = yield call(axios.post, `${config.apiUri}/chatBotApi/sendTranscript`, JSON.stringify(input));
        let finalRes = {
            user: 'bot',
            message: ['Oops!! There was an error in sending you the chat transcript. Please try again.'],
            timeStamp: moment().unix()
        };
        if (response) {
            finalRes = {
                user: 'bot',
                message: [`Your chat transcript has been sent on ${clientEmailAddress}.`],
                timeStamp: moment().unix()
            };
        }
        // yield put(sendMessageFromUser.success(finalRes))

    } catch (err) {
        debug(err);
        yield put(sendTranscript.error());
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield takeLatest('SEND_TRANSCRIPT', sendTranscriptSaga);
}
