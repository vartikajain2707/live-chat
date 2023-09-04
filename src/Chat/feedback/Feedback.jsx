import React, {useState} from 'react'
import {withStyles, Typography, Grid, Card, CardContent, Button} from "@material-ui/core";
import TextField from '../../components/TextField';
import {Form, Field} from 'redux-form/immutable';
import StarRating from '../../components/RatingStar';
import {compose} from 'recompose';
import {formValues} from 'redux-form/lib/immutable';
import {submitFeedback} from "../../actions";


const styles = () => ({
    containerClass: {
        marginTop: '20px'
    },
    feedbackSubmitContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px'
    },
    feedbackSubmit: {
        backgroundColor: '#1646A8',
        color: '#fff',
        textTransform: 'none',
        "&:hover": {
            color: 'black'
        }
    }
})
const Feedback = ({classes, ...props}) => {
    const {submitFeedback, selectedFeedbackInput, handleSubmit} = props
    // const [feedbackInputt, setFeedbackInputt] = useState('')
    // const [starRatingg, setStarRatingg] = useState(0)

    // const handleSubmit = () => {
    //     console.log({feedbackInputt, star: typeof (starRatingg), selectedFeedbackInput})
    //     submitFeedback({feedbackInput: selectedFeedbackInput, starRatingg: starRatingg});
    //
    // }
    return <Form onSubmit={handleSubmit}>
        <Grid container className={classes.containerClass}>
            <Grid item xs={12} sm={8} md={8}>
                <Card>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            It's been great chatting with you. Could you give this chat a score?
                        </Typography>
                        <Grid item xs={12}>
                            <Field
                                name="starRating"
                                initialStars={0}
                                starCount={5}
                                type="number"
                                starSize={24}
                                topTxt={'My Stars'}
                                starsColor={"#ffd700"}
                                // onChange={evt => {
                                //     setStarRatingg(evt)
                                // }}
                                component={StarRating}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                                Please help us with your comment (optional)
                            </Typography>
                            <Field
                                component={TextField}
                                size={'small'}
                                fullWidth
                                margin="normal"
                                variant="standard"
                                placeholder={'Type here'}
                                data-bdd="feedbackBox-input"
                                label="Feedback"
                                name="feedbackInput"
                                // onChange={evt => {
                                //     console.log({feedback: evt.target.value})
                                //     setFeedbackInputt(evt.target.value)
                                // }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.feedbackSubmitContainer}>
                                <Button type="submit" className={classes.feedbackSubmit}
                                        size="small">
                                    Share Feedback
                                </Button>
                            </div>
                        </Grid>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Form>
}

export default withStyles(styles)(Feedback)
//
// export default compose(withStyles(styles), formValues({
//     selectedFeedbackInput: 'feedbackInput'
// }))(Feedback);

