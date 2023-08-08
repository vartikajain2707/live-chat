import { combineReducers } from 'redux';
import botResponse from './botResponse';

const rootReducer = combineReducers({
    botResponse: botResponse,
});

export default rootReducer;
