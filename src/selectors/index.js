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

export const setScroll = (state, payload) => state.setIn(['scrollStatus'], fromJS(payload))
export const getScroll = createSelector(
    state => fromJS(state).getIn(['enableScroll', 'scrollStatus']),
    scrollStatus => scrollStatus
);
export const setStoreSessionId = (state, payload) => state.setIn(['setStoreSessionId'], fromJS(payload))
export const getStoreSessionId = createSelector(
    state => fromJS(state).getIn(['storeSessionId', 'setStoreSessionId']),
    storeSessionId => storeSessionId
);


export const setFetchLoader = (state, payload) => state.setIn(['fetchLoaderStatus'], fromJS(payload))
export const getFetchLoader = createSelector(
    state => {
        console.log({state})
        return fromJS(state).getIn(['fetchLoader', "fetchLoaderStatus"])
    },
    fetchLoaderStatus => fetchLoaderStatus
);

export const setCloseClick = (state, payload) => state.setIn(['closeClickedOnce'], fromJS(payload))
export const getCloseClick = createSelector(
    state => fromJS(state).getIn(['closeClickedOnce', 'closeClickedOnce']),
    onCloseClick => onCloseClick
);
export const setAfterFeedbackResult = (state, payload) => state.setIn(['setAfterFeedbackResult'], fromJS(payload))
export const getAfterFeedbackResult = createSelector(
    state => fromJS(state).getIn(['afterFeedbackBotResponse', 'setAfterFeedbackResult']),
    feedbackResult => (feedbackResult ? feedbackResult.toJS() : {})
);

export const setClientUserName = (state, payload) => state.setIn(['clientName'], fromJS(payload))
export const getClientUserName = createSelector(
    state => fromJS(state).getIn(['clientUserName', 'clientName']),
    clientName => clientName
);


export const setNextBatchOfMessages = (state, payload) => state.setIn(['nextBatchMsgs'], fromJS(payload))


export const getNextBatchOfMessages = createSelector(
    state => fromJS(state).getIn(['nextBatchOfMessages', 'nextBatchMsgs']),
    nextBatchMsgs => nextBatchMsgs
);
