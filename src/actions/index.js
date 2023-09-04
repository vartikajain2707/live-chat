const createAction = type => Object.assign(
    payload => ({type, payload}),
    {
        success: payload => ({type: `${type}_SUCCESS`, payload}),
        reset: payload => ({type: `${type}_RESET`, payload}),
        error: payload => ({type: `${type}_ERROR`, payload, error: true})
    },
    {type}
);
export const sendMessageFromUser = createAction('SEND_MESSAGE_FROM_USER');

export const sendSignalToSendMoreMess = createAction('SEND_SIGNAL_TO_SEND_MORE_MESS');
export const sendTranscript = createAction('SEND_TRANSCRIPT');
export const submitFeedback = createAction('SUBMIT_FEEDBACK');
export const closeClickedOnce = createAction('CLOSE_CLICKED_ONCE');
export const loadingDots = createAction('LOADING_DOTS')
export const enableScroll = createAction('ENABLE_SCROLL')
export const clientUserName = createAction('CLIENT_USER_NAME')
export const storeSessionId = createAction('STORE_SESSION_ID')
// export const fetchLoader = createAction('FETCH_LOADER')
