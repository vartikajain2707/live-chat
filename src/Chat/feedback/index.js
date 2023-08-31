import {connect} from 'react-redux';
import {reduxForm} from 'redux-form/immutable';
import {bindActionCreators} from 'redux';

import Feedback from '../feedback/Feedback'

const stateToProps = (state, ownProps) => {
};

const dispatchToProps = dispatch =>
    bindActionCreators({
        // onSubmit: fetchTourAttendees
    }, dispatch);

export default connect(stateToProps, dispatchToProps)(reduxForm({
    form: 'Feedback'
})(Feedback));

