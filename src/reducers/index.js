import { combineReducers } from 'redux';
import botResponse from './botResponse';
import loadingDots from './loadingDots'

const rootReducer = combineReducers({
    botResponse: botResponse,
    loadingDots:loadingDots
});

export default rootReducer;
