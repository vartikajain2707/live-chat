import { connect } from 'react-redux';
import { sendMessageFromUser } from '../actions';
import Chat from './Chat';
import { bindActionCreators } from 'redux';
import {getSendMessageFromUser} from '../selectors'

const stateToProps = state => {
    const responseFromBot=getSendMessageFromUser(state) || [];
    return {
        responseFromBot
    }
};

const dispatchToProps = dispatch => bindActionCreators({
    sendMessageFromUser
}, dispatch);

export default connect(stateToProps, dispatchToProps)(Chat);


