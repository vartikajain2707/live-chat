import { connect } from 'react-redux';
import { sendMessgaeFromUser } from '../actions';
import Chat from './Chat';
import { bindActionCreators } from 'redux';

const stateToProps = state => ({
    // isLoading: true
});

const dispatchToProps = dispatch => bindActionCreators({
    sendMessgaeFromUser
}, dispatch);

export default connect(stateToProps, dispatchToProps)(Chat);


