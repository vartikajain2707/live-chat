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
import fetchPrevResponse from './fetchPrevResponse'
import removeSessionStorage from './removeSessionStorage'

const rootReducer = combineReducers({
    botResponse: botResponse,
    fetchPrevResponse: fetchPrevResponse,
    closeClickedOnce: closeClickedOnce,
    nextBatchOfMessages: nextBatchOfMessages,
    clientUserName: clientUserName,
    loadingDots: loadingDots,
    afterFeedbackBotResponse: afterFeedbackBotResponse,
    storeSessionId: storeSessionId,
    enableScroll: enableScroll,
    form: reducer,
    fetchLoader: fetchLoader,
    clientEmailId: clientEmailId,
    removeSessionStorage: removeSessionStorage
});

export default rootReducer;
