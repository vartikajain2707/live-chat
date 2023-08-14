import { connect } from 'react-redux';
import { sendMessageFromUser , loadingDots} from '../actions';
import Chat from './Chat';
import { bindActionCreators } from 'redux';
import {getSendMessageFromUser, getLoadingDots} from '../selectors'

const stateToProps = state => {
    const responseFromBot=getSendMessageFromUser(state) || [];
    const responseLoadingDots = getLoadingDots(state) || false
    console.log({responseLoadingDots})
    return {
        responseFromBot,
        responseLoadingDots
    }
};

const dispatchToProps = dispatch => bindActionCreators({
    sendMessageFromUser,
    loadingDots
}, dispatch);

export default connect(stateToProps, dispatchToProps)(Chat);


