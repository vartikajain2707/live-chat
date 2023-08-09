import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';


export const setSendMessageFromUser = (state, payload) => state.setIn(['botResponseValue'],fromJS(payload))


export const getSendMessageFromUser = createSelector(
    state => fromJS(state).getIn(['botResponse','botResponseValue']),
    botResponseValue =>  (List.isList(botResponseValue) ? botResponseValue.toJS() : [])
);

// export const getSendMessageFromUser = createSelector(
//     state => state,
//     botResponseValue => console.log({botResponseValue})
// );
