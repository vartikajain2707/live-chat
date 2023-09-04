import React from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField';

const TextFieldContainer = ({
                                input,
                                meta: {error, invalid, touched} = {},
                                forcedError,
                                allowErrorOnAllRequiredFields = false,
                                ...rest
                            }) => {
    let status = 'success';
    if (!touched) {
        status = 'default';
    } else if (invalid) {
        status = 'error';
    }
    return (
        <TextField
            errorMessage={(error && (allowErrorOnAllRequiredFields || touched)) ? error : forcedError}
            status={status}
            {...input}
            {...rest}
        />
    );
};

TextFieldContainer.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
};

export default TextFieldContainer;
