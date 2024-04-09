import {connect} from 'react-redux';
import {List} from 'immutable';
import {
    sendMessageFromUser, loadingDots, sendSignalToSendMoreMess, sendTranscript, closeClickedOnce,
    storeSessionId, enableScroll, removeSessionStorage
} from '../actions';
import Chat from './Chat';
import {bindActionCreators} from 'redux';
import {
    getSendMessageFromUser,
    getLoadingDots,
    getNextBatchOfMessages,
    getCloseClick,
    getAfterFeedbackResult,
    getScroll,
    getFetchLoader,
    getTotalMessageCount
} from '../selectors'

const stateToProps = state => {
    const responseFromBot = getSendMessageFromUser(state) || {};
    const responseLoadingDots = getLoadingDots(state) || false
    const responseFetchLoadingDots = getFetchLoader(state) || false
    const totalMessageCount = getTotalMessageCount(state) || parseInt((sessionStorage.getItem('totalMessageCount'))) || 0;
    const activeScroll = getScroll(state) || false
    let usersName = sessionStorage.getItem('userName')
    if (usersName === 'undefined') {
        usersName = 'self'
    }
    const showFeedbackOnClickCross = getCloseClick(state) || false;
    const afterFeedbackResult = (getAfterFeedbackResult(state) || {})
    const nextBatchOfMessages = (getNextBatchOfMessages(state) || List()).toJS() || []
    return {
        responseFromBot,
        activeScroll,
        responseLoadingDots,
        nextBatchOfMessages,
        usersName,
        showFeedbackOnClickCross,
        afterFeedbackResult,
        responseFetchLoadingDots,
        totalMessageCount
    }
};

const dispatchToProps = dispatch => bindActionCreators({
    sendMessageFromUser,
    sendSignalToSendMoreMess,
    loadingDots,
    sendTranscript,
    closeClickedOnce,
    storeSessionId,
    enableScroll,
    removeSessionStorage
}, dispatch);

export default connect(stateToProps, dispatchToProps)(Chat);


