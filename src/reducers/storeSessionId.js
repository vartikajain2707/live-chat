import {fromJS} from 'immutable';
import {setStoreSessionId} from '../selectors';

const initialState = fromJS({});

const noop = type => () => {
    // debug('no reducer for type %s', type);
};


const reducer = (state, {payload, type}) => ({
    ['STORE_SESSION_ID']: () => setStoreSessionId(state, payload)


}[type] || noop(type))() || state


export default (state = initialState, action) => reducer(state, action);
