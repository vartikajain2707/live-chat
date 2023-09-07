import {fromJS} from 'immutable';
import {setAfterFeedbackResult} from "../selectors";

const initialState = fromJS({});

const noop = type => () => {
    // debug('no reducer for type %s', type);
};


const reducer = (state, {payload, type}) => ({
    'SUBMIT_FEEDBACK_SUCCESS': () => setAfterFeedbackResult(state, payload)


}[type] || noop(type))() || state

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => reducer(state, action);
