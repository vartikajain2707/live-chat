import {combineReducers} from 'redux';
import botResponse from './botResponse';
import loadingDots from './loadingDots'
import clientUserName from './clientUserName'
import nextBatchOfMessages from './nextBatchOfMessages'
import closeClickedOnce from './closeClickedOnce'
import afterFeedbackBotResponse from "./afterFeedbackBotResponse";
import storeSessionId from "./storeSessionId";
import {reducer} from 'redux-form';
import enableScroll from './enableScroll'
import fetchLoader from "./fetchLoader"
import clientEmailId from './clientEmailId'

const rootReducer = combineReducers({
    botResponse: botResponse,
    closeClickedOnce: closeClickedOnce,
    nextBatchOfMessages: nextBatchOfMessages,
    clientUserName: clientUserName,
    loadingDots: loadingDots,
    afterFeedbackBotResponse: afterFeedbackBotResponse,
    storeSessionId: storeSessionId,
    enableScroll: enableScroll,
    form: reducer,
    fetchLoader: fetchLoader,
    clientEmailId: clientEmailId
});

export default rootReducer;
