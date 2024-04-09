import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import siteConfig from "../siteSettings";

const envConfig = require(`../../config/env.${environment.NODE_ENV}`)


export const setSendMessageFromUser = (state, payload) => state.setIn(['botResponseValue'], fromJS(payload))


export const getSendMessageFromUser = createSelector(
    state => fromJS(state).getIn(['botResponse', 'botResponseValue']),
    botResponseValue => (botResponseValue ? botResponseValue.toJS() : {})
);

export const setRemoveSessionStorage = () => {
    ["cachedMessages", "sessionId", "emailAddress", "userName", "totalMessageCount"].forEach(key => sessionStorage.removeItem(key));
}

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
    state => fromJS(state).getIn(['fetchLoader', "fetchLoaderStatus"]),
    fetchLoaderStatus => fetchLoaderStatus
);
export const setPrevResponse = (state, payload) => state.setIn(['setPrevResponse'], fromJS(payload))
export const getPrevResponse = createSelector(
    state => fromJS(state).getIn(['fetchPrevResponse', "setPrevResponse"]),
    fetchPrevResponse => (fetchPrevResponse ? fetchPrevResponse.toJS() : {})
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
export const setClientEmailId = (state, payload) => state.setIn(['clientEmailId'], fromJS(payload))
export const getClientEmailId = createSelector(
    state => fromJS(state).getIn(['clientEmailId', 'clientEmailId']),
    clientEmailId => clientEmailId
);

export const setTotalMessageCount = (state, payload) => state.setIn(['totalMessageCount'], fromJS(payload))
export const getTotalMessageCount = createSelector(
    state => fromJS(state).getIn(['nextBatchOfMessages', 'totalMessageCount']),
    totalMessageCount => totalMessageCount
);

export const setNextBatchOfMessages = (state, payload) => state.setIn(['nextBatchMsgs'], fromJS(payload))

export const getNextBatchOfMessages = createSelector(
    state => fromJS(state).getIn(['nextBatchOfMessages', 'nextBatchMsgs']),
    nextBatchMsgs => nextBatchMsgs
);

export const config = createSelector(
    state => {
        const siteId = sessionStorage.getItem('siteid');
        return Object.assign({}, envConfig, {
            apiUri: envConfig.REACT_APP_API_URL || "",
            siteSettings: siteConfig[siteId]
        });
    }
)
