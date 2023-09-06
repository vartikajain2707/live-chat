import {fromJS} from 'immutable';
import {setClientUserName} from '../selectors';

const initialState = fromJS({});

const noop = type => () => {
    // debug('no reducer for type %s', type);
};


const reducer = (state, {payload, type}) => ({
    ['CLIENT_USER_NAME']: () => setClientUserName(state, payload)


}[type] || noop(type))() || state


export default (state = initialState, action) => reducer(state, action);
