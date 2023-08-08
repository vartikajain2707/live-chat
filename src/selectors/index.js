import { createSelector } from 'reselect';
import { fromJS } from 'immutable';


export const setSendMessgaeFromUser = (state, payload) => state.setIn(['botResponseValue'], fromJS(payload))



export const getSendMessgaeFromUser = createSelector(
    state => state.getIn(['abc']),
    abc => console.log({abc})
);
