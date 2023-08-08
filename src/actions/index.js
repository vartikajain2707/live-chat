
const createAction = type => Object.assign(
    payload => ({ type, payload }),
    {
        success: payload => ({ type: `${type}_SUCCESS`, payload }),
        reset: payload => ({ type: `${type}_RESET`, payload }),
        error: payload => ({ type: `${type}_ERROR`, payload, error: true })
    },
    { type }
);
export const sendMessgaeFromUser = createAction('SEND_MESSAGE_FROM_USER');
