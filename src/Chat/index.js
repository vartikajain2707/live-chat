import {connect} from 'react-redux';
import {List} from 'immutable';
import {
    sendMessageFromUser, loadingDots, sendSignalToSendMoreMess, sendTranscript, closeClickedOnce,
    storeSessionId, enableScroll
} from '../actions';
import Chat from './Chat';
import {bindActionCreators} from 'redux';
import {
    getSendMessageFromUser,
    getLoadingDots,
    getNextBatchOfMessages,
    getClientUserName,
    getCloseClick,
    getAfterFeedbackResult,
    getScroll
} from '../selectors'

const stateToProps = state => {
    const responseFromBot = getSendMessageFromUser(state) || {};
    const responseLoadingDots = getLoadingDots(state) || false
    const activeScroll = getScroll(state) || false
    const clientUserName = getClientUserName(state) || 'self';
    const showFeedbackOnClickCross = getCloseClick(state) || false;
    const afterFeedbackResult = (getAfterFeedbackResult(state) || {})
    const nextBatchOfMessages = (getNextBatchOfMessages(state) || List()).toJS() || []
    return {
        responseFromBot,
        activeScroll,
        responseLoadingDots,
        nextBatchOfMessages,
        clientUserName,
        showFeedbackOnClickCross,
        afterFeedbackResult
    }
};

const dispatchToProps = dispatch => bindActionCreators({
    sendMessageFromUser,
    sendSignalToSendMoreMess,
    loadingDots,
    sendTranscript,
    closeClickedOnce,
    storeSessionId,
    enableScroll
}, dispatch);

export default connect(stateToProps, dispatchToProps)(Chat);


