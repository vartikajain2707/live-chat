import {takeLatest, put, call} from 'redux-saga/effects';
import {sendSignalToSendMoreMess} from '../actions';
import Debug from 'debug';
import axios from "axios";


const debug = Debug('hb:liveChat:sagas:sendSignalToSendMoreMess');

export function* sendSignalToSendMoreMessSaga({payload}) {
    debug('called');
    try {
        console.log({payload})
        const {sessId, ...rest} = payload
        const input = {
            "botId": "D4ALYGLD6O",
            "sessionId": sessId,
            "localeId": "en_US",
            "fetchMessages": JSON.stringify(rest, 0, 2),
            "siteId": "cityExperiences"
        }
        // const response = [
        //     {
        //         "user": "self",
        //         "message": [
        //             "vartika"
        //         ],
        //         "timeStamp": "14:51"
        //     },
        //     {
        //         "user": "bot",
        //         "message": [
        //             "vartika, Please enter your email address."
        //         ],
        //         "options": [],
        //         "timeStamp": "14:51"
        //     },
        //     {
        //         "user": "self",
        //         "message": [
        //             "vartika.jain@cityexp.com"
        //         ],
        //         "timeStamp": "14:51"
        //     },
        //     {
        //         "user": "bot",
        //         "message": [
        //             "You can ask me a question or select from the below options"
        //         ],
        //         "options": [
        //             "Make a Booking",
        //             "Modify a Booking",
        //             "Get Booking Status",
        //             "Get Booking Confirmation Email"
        //         ],
        //         "timeStamp": "14:51"
        //     },
        //     {
        //         "user": "self",
        //         "message": [
        //             "Make a Booking"
        //         ]
        //     },
        //     {
        //         "user": "bot",
        //         "message": [
        //             "Are you sure?"
        //         ],
        //         "options": [],
        //         "timeStamp": "14:51"
        //     },
        //     {
        //         "user": "self",
        //         "message": [
        //             "yes"
        //         ],
        //         "timeStamp": "14:51"
        //     },
        //     {
        //         "user": "bot",
        //         "message": [
        //             "tour"
        //         ],
        //         "options": [],
        //         "timeStamp": "14:51"
        //     },
        //     {
        //         "user": "self",
        //         "message": [
        //             "yes"
        //         ],
        //         "timeStamp": "14:51"
        //     },
        //     {
        //         "user": "bot",
        //         "message": [
        //             "tour"
        //         ],
        //         "options": [],
        //         "timeStamp": "14:51"
        //     }
        // ]
        const response = yield call(axios.post, 'https://smjli6j817.execute-api.us-west-2.amazonaws.com/ayush/chatBotApi', JSON.stringify(input));
        yield put(sendSignalToSendMoreMess.success(response))

    } catch (err) {
        debug(err);
        yield put(sendSignalToSendMoreMess.error());
    }
}

export default function* () {
    yield takeLatest('SEND_SIGNAL_TO_SEND_MORE_MESS', sendSignalToSendMoreMessSaga);
}
