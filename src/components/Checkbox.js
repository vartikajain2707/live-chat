import React, {Fragment} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CheckboxWrapper extends React.Component {
    render() {
        const {
            input, groupLabel, label, checked, onChange, icon, checkedIcon, checkboxValue,
            disabled, color, size
        } = this.props;
        return (
            <Fragment>
                {groupLabel && <FormLabel component="legend">{groupLabel}</FormLabel>}
                <FormControlLabel
                    control={
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            size={size}
                            disabled={!!disabled}
                            name={`${input.name}${input.id}`}
                            value={checkboxValue}
                            color={color && color}
                            checked={checked || input.value === checkboxValue}
                            onChange={evt => (onChange || input.onChange)(evt.target.checked ? checkboxValue : null)}
                        />
                    }
                    label={label}
                />
            </Fragment>
        );
    }
}

export default CheckboxWrapper;
