import {fromJS} from 'immutable';
import {setClientUserName} from '../selectors';

const initialState = fromJS({});

const noop = type => () => {
    // debug('no reducer for type %s', type);
};


const reducer = (state, {payload}) => ({
    ['CLIENT_USER_NAME']: () => {
        console.log({payload})
        return setClientUserName(state, payload)
    }

}['CLIENT_USER_NAME'] || noop('CLIENT_USER_NAME'))() || state


export default (state = initialState, action) => reducer(state, action);
