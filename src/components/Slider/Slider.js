import React from 'react';
import Slider from 'react-slick';
import './slider.css';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {withStyles, Card, CardContent, Typography, CardMedia, CardActionArea, Button} from "@material-ui/core";

const styles = () => ({
    knowMoreBtn: {
        backgroundColor: '#CA3028',
        color: ' #fff',
        fontSize: '8px',
        fontWeight: '600',
        marginTop: '4px',
        '&:hover': {
            color: '#CA3028',
            backgroundColor: '#F2F5FF'
        }
    },

    additionalInfoContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    root: {
        maxWidth: '345px',
        height: '260px',
        maxHeight: '260px'
    },
    cardActionRoot: {
        width: '100%',
        height: '100%',
        textAlign: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    media: {
        height: '140px',
        width: '100%',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
    displayPrice: {
        fontSize: '17px',
        fontWeight: 'bold'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        height: '87px',
        justifyContent: 'space-between'
    },
    sliderPrice: {
        color: 'black'
    },
    sliderText: {
        color: 'black'
    }


})

const CURRENCY_SYMBOLS = {
    usd: '$',
    USD: '$',
    cad: '$',
    CAD: '$',
    gbp: '£',
    GBP: '£',
    eur: '€',
    EUR: '€',
    aud: 'A$',
    AUD: 'A$',
    undefined: '$'
};


const SliderComponent = ({options, classes, ...props}) => {
    const settings = {
        infinite: true
        // dots: true
    };
    return (
        <div className="container">
            <Slider {...settings}>
                {(options || []).map((option, idx) => {
                    let display, input;
                    if (typeof option === 'object') {
                        display = option.display;
                        input = option.input;
                    } else {
                        display = input = option;
                    }
                    return (
                        <Card className={classes.root} key={idx}>
                            <CardActionArea className={classes.cardActionRoot}>
                                <CardMedia
                                    className={classes.media}
                                    image={option.image}
                                    title="Contemplative Reptile"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="subtitle2" className={classes.sliderText}>
                                        {display}
                                    </Typography>
                                    <div className={classes.additionalInfoContainer}>
                                        <a href={option.tagLink} target="_blank"><Button size={'small'}
                                                                                         className={classes.knowMoreBtn}>Know
                                            More</Button></a>
                                        <Typography variant={"subtitle2"} className={classes.sliderPrice}>from <span
                                            className={classes.displayPrice}>{CURRENCY_SYMBOLS[option.defaultCurrency]}{option.displayPrice}</span></Typography>
                                    </div>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })}
            </Slider>
        </div>
    );
};

export default withStyles(styles)(SliderComponent);
