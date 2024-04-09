import {fromJS} from 'immutable';
import {setNextBatchOfMessages,setTotalMessageCount} from '../selectors';

const initialState = fromJS({});

const noop = type => () => {
    // debug('no reducer for type %s', type);
};


const reducer = (state, {payload, type}) => ({
    'SEND_SIGNAL_TO_SEND_MORE_MESS_SUCCESS': () => setNextBatchOfMessages(state, payload),
    'TOTAL_MESSAGE_COUNT_SUCCESS': () => setTotalMessageCount(state, payload)

}[type] || noop(type))() || state

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => reducer(state, action);
