import {fromJS} from 'immutable';
import {setNextBatchOfMessages} from '../selectors';

const initialState = fromJS({});

const noop = type => () => {
    // debug('no reducer for type %s', type);
};


const reducer = (state, {payload, type}) => ({
    ['SEND_SIGNAL_TO_SEND_MORE_MESS_SUCCESS']: () => setNextBatchOfMessages(state, payload)

}[type] || noop(type))() || state


export default (state = initialState, action) => reducer(state, action);
