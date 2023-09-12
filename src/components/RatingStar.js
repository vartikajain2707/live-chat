import React from "react";
import ReactStars from "react-stars";


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
