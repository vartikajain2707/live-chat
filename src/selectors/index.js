import { createSelector } from 'reselect';
import { fromJS, List } from 'immutable';


export const setSendMessageFromUser = (state, payload) => state.setIn(['botResponseValue'],fromJS(payload))


export const getSendMessageFromUser = createSelector(
    state => fromJS(state).getIn(['botResponse','botResponseValue']),
    botResponseValue =>  (List.isList(botResponseValue) ? botResponseValue.toJS() : [])
);


export const setLoadingDots = (state, payload) => state.setIn(['loadingStatus'], fromJS(payload))
export const getLoadingDots = createSelector(
    state => {
        console.log({selector:fromJS(state).getIn(['loadingDots','loadingStatus'])})
        return fromJS(state).getIn(['loadingDots','loadingStatus'])
    },
    loadingStatus =>  loadingStatus
);
