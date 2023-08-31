import {connect} from 'react-redux';
import {List} from 'immutable';
import {sendMessageFromUser, loadingDots, sendSignalToSendMoreMess, sendTranscript} from '../actions';
import Chat from './Chat';
import {bindActionCreators} from 'redux';
import {getSendMessageFromUser, getLoadingDots, getNextBatchOfMessages, getClientUserName} from '../selectors'

const stateToProps = state => {
    const responseFromBot = getSendMessageFromUser(state) || {};
    const responseLoadingDots = getLoadingDots(state) || false
    const clientUserName = getClientUserName(state) || 'self';
    console.log({clientUserName})
    const nextBatchOfMessages = (getNextBatchOfMessages(state) || List()).toJS() || []
    return {
        responseFromBot,
        responseLoadingDots,
        nextBatchOfMessages,
        clientUserName
    }
};

const dispatchToProps = dispatch => bindActionCreators({
    sendMessageFromUser,
    sendSignalToSendMoreMess,
    loadingDots,
    sendTranscript
}, dispatch);

export default connect(stateToProps, dispatchToProps)(Chat);


