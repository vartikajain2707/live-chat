import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form/immutable';
import {bindActionCreators} from 'redux';
import {submitFeedback} from '../../actions'
import Feedback from '../feedback/Feedback';
import {Map} from 'immutable';

const stateToProps = (state, ownProps) => {
    const setShowFeedback = ownProps.setShowFeedback
    const formValues = getFormValues('FeedbackForm')(state) || Map();
    const feedbackInput = formValues.feedbackInput
    const starRating = formValues.starRating
    const sendTranscriptCheckbox = formValues.sendTranscriptCheckbox
    return {
        setShowFeedback,
        feedbackInput,
        starRating,
        sendTranscriptCheckbox
    }
};

const dispatchToProps = dispatch =>
    bindActionCreators({
        submitFeedback
    }, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: values => {
        dispatchProps.submitFeedback({
            feedbackInput: stateProps.feedbackInput,
            starRating: stateProps.starRating,
            sendTranscriptCheckbox: stateProps.sendTranscriptCheckbox
        })
        stateProps.setShowFeedback(false)

    },

});

export default connect(stateToProps, dispatchToProps, mergeProps)(reduxForm({
    form: 'FeedbackForm'
})(Feedback));

