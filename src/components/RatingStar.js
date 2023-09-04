// import React, {useState} from 'react';
// import {makeStyles} from '@material-ui/core/styles';
// import Rating from '@material-ui/lab/Rating';
// import {Typography} from '@material-ui/core';
// import PropTypes from "prop-types";

import React from "react";
import ReactStars from "react-stars";

// const labels = {
//     0.5: 'Useless+',
//     1: 'Useless',
//     1.5: 'Poor+',
//     2: 'Poor',
//     2.5: 'Ok',
//     3: 'Ok+',
//     3.5: 'Good',
//     4: 'Good+',
//     4.5: 'Excellent',
//     5: 'Excellent+',
// };
//
// const useStyles = makeStyles({
//     root: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//
//     },
// });
//
// const StarRatingInput = () => {
//     const [value, setValue] = useState(2);
//     const [hover, setHover] = useState(-1);
//     const classes = useStyles();
//
//     return (
//         <div className={classes.root}>
//             <Rating
//                 name="hover-feedback"
//                 value={value}
//                 precision={0.5}
//                 onChange={(event, newValue) => {
//                     setValue(newValue);
//                 }}
//                 onChangeActive={(event, newHover) => {
//                     setHover(newHover);
//                 }}
//             />
//             {value !== null &&
//                 <Typography variant="body2" color="textSecondary">{labels[hover !== -1 ? hover : value]}</Typography>}
//         </div>
//     );
// }
//
//
// StarRatingInput.propTypes = {
//     dataTid: PropTypes.string,
//     errorMessage: PropTypes.string,
//     label: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     required: PropTypes.bool,
//     status: PropTypes.string,
//     type: PropTypes.string,
//     value: PropTypes.string
// };
//
// StarRatingInput.defaultProps = {
//     dataTid: undefined,
//     errorMessage: undefined,
//     required: false,
//     status: 'default',
//     type: 'text',
//     value: ''
// };
//
// export default StarRatingInput;


// export class StarRating extends Component {
//     render() {
//         const {
//             label,
//             name,
//             starCount,
//             input: {value, onChange},
//             starSize,
//             starsColor,
//             meta: {touched, error}
//         } = this.props;
//
//         return (
//             <div>
//                 <label>{label}</label>
//                 <div>
//                     <label>
//                         <div className="col-lg-12">
//                             <ReactStars
//                                 count={starCount}
//                                 value={value === "" ? this.props.initialStars : value}
//                                 onChange={onChange}
//                                 size={starSize}
//                                 color2={starsColor}
//                             />
//                         </div>
//                         {touched && error && <span>{error}</span>}
//                     </label>
//                 </div>
//             </div>
//         );
//     }
// }


const StarRating = ({
                        label,
                        name,
                        starCount,
                        input: {value, onChange},
                        starSize,
                        starsColor,
                        meta: {touched, error},
                        ...rest
                    }) => {
    return (
        <div>
            <label>
                <div className="col-lg-12">
                    <ReactStars
                        count={starCount}
                        value={value}
                        onChange={onChange}
                        size={starSize}
                        color2={starsColor}
                    />
                </div>
                {touched && error && <span>{error}</span>}
            </label>
        </div>
    );
}

export default StarRating;
