import {takeLatest, put, call, select} from 'redux-saga/effects';
import {sendMessageFromUser, sendTranscript} from '../actions';
import Debug from 'debug';
import axios from "axios";
import moment from "moment/moment";
import {config} from "../selectors";
import {config as configLoaded} from '../config'

const debug = Debug('hb:liveChat:sagas:sendTranscriptSaga');

export function* sendTranscriptSaga({payload}) {
    debug('called');
    try {
        const sessionEmailId = sessionStorage.getItem('emailAddress')
        const sessionUserName = sessionStorage.getItem('userName') || 'self'
        const {sessId} = payload
        const configObject = yield select(config)
        const {siteSettings} = configObject || {}
        const input = {
            "botId": siteSettings.REACT_APP_BOTID,
            "botAliasId": siteSettings.REACT_APP_BOTALIASID,
            "sessionId": sessId,
            "localeId": "en_US",
            "siteId": siteSettings?.siteid || 'base',
            "userName": sessionUserName,
            "emailId": sessionEmailId
        }
        const response = yield call(axios.post, `${configLoaded.apiUri}/chatBotApi/sendTranscript`, JSON.stringify(input));
        let finalRes = {
            user: 'bot',
            message: ['Oops!! There was an error in sending you the chat transcript. Please try again.'],
            timeStamp: moment().unix()
        };
        if (response) {
            finalRes = {
                user: 'bot',
                message: [`Your chat transcript has been sent on ${sessionEmailId}.`],
                timeStamp: moment().unix()
            };
        }
        yield put(sendMessageFromUser.success(finalRes))

    } catch (err) {
        debug(err);
        yield put(sendTranscript.error());
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield takeLatest('SEND_TRANSCRIPT', sendTranscriptSaga);
}
