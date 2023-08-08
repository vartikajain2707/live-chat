import {setSendMessgaeFromUser} from '../selectors'

import { fromJS } from 'immutable';

const initialState = fromJS({ });


const reducer =(state ,{payload}) => {
    console.log({state,payload})
    return {'SEND_MESSAGE_FROM_USER_SUCCESS': () => setSendMessgaeFromUser(state, payload)}
}


export default (state = initialState, action) => reducer(state, action);
