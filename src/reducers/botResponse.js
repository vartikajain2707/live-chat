import {setSendMessageFromUser} from '../selectors';

import { fromJS } from 'immutable';

const initialState = fromJS({});

const noop = type => () => {
    // debug('no reducer for type %s', type);
};


const reducer =(state ,{payload}) => ({
    ['SEND_MESSAGE_FROM_USER_SUCCESS']: () => setSendMessageFromUser(state, payload)

}['SEND_MESSAGE_FROM_USER_SUCCESS'] || noop('SEND_MESSAGE_FROM_USER_SUCCESS'))() || state


export default (state = initialState, action) => reducer(state, action);
