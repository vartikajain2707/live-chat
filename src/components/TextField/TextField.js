import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';

const TextFieldInput = ({
                            dataTid,
                            errorMessage,
                            helperText,
                            label,
                            name,
                            required,
                            fullWidth = true,
                            showHtmlLabel = false,
                            showLabel = true,
                            htmlLabel,
                            variant,
                            margin = 'normal',
                            ...rest
                        }) => (
    <div data-bdd={dataTid}>
        {showHtmlLabel ? <Fragment>
            <div dangerouslySetInnerHTML={{__html: htmlLabel}}/>
        </Fragment> : null}
        <TextField
            fullWidth={fullWidth}
            variant={variant}
            margin={margin}
            name={name}
            label={!showHtmlLabel && showLabel ? `${label}${required ? ' *' : ''}` : null}
            error={!!errorMessage}
            helperText={errorMessage || helperText}
            {...rest}/>
    </div>
);

TextFieldInput.propTypes = {
    dataTid: PropTypes.string,
    errorMessage: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    status: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
};

TextFieldInput.defaultProps = {
    dataTid: undefined,
    errorMessage: undefined,
    required: false,
    status: 'default',
    type: 'text',
    value: ''
};

export default TextFieldInput;
