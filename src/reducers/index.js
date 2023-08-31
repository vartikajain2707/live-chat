import {combineReducers} from 'redux';
import botResponse from './botResponse';
import loadingDots from './loadingDots'
import clientUserName from './clientUserName'
import nextBatchOfMessages from './nextBatchOfMessages'

const rootReducer = combineReducers({
    botResponse: botResponse,
    nextBatchOfMessages: nextBatchOfMessages,
    clientUserName: clientUserName,
    loadingDots: loadingDots
});

export default rootReducer;
