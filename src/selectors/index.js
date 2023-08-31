import {createSelector} from 'reselect';
import {fromJS} from 'immutable';


export const setSendMessageFromUser = (state, payload) => state.setIn(['botResponseValue'], fromJS(payload))


export const getSendMessageFromUser = createSelector(
    state => fromJS(state).getIn(['botResponse', 'botResponseValue']),
    botResponseValue => (botResponseValue ? botResponseValue.toJS() : {})
);

export const setLoadingDots = (state, payload) => state.setIn(['loadingStatus'], fromJS(payload))
export const getLoadingDots = createSelector(
    state => fromJS(state).getIn(['loadingDots', 'loadingStatus']),
    loadingStatus => loadingStatus
);

export const setClientUserName = (state, payload) => state.setIn(['clientName'], fromJS(payload))
export const getClientUserName = createSelector(
    state => fromJS(state).getIn(['clientUserName', 'clientName']),
    clientName => 'vartika'
);


export const setNextBatchOfMessages = (state, payload) => state.setIn(['nextBatchMsgs'], fromJS(payload))


export const getNextBatchOfMessages = createSelector(
    state => fromJS(state).getIn(['nextBatchOfMessages', 'nextBatchMsgs']),
    nextBatchMsgs => nextBatchMsgs
);
