import {fromJS} from 'immutable';
import {setLoadingDots} from '../selectors';

const initialState = fromJS({});

const noop = type => () => {
    // debug('no reducer for type %s', type);
};


const reducer = (state, {payload}) => ({
    'LOADING_DOTS': () => setLoadingDots(state, payload)


}['LOADING_DOTS'] || noop('LOADING_DOTS'))() || state

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => reducer(state, action);
