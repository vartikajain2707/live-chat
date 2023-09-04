import React from 'react'
import {withStyles, Typography, Grid, Card, CardContent, Button, TextField} from "@material-ui/core";
import {Form} from 'redux-form/immutable';
import SendIcon from "@material-ui/icons/Send";
import classNames from "classnames";

const styles = () => ({})
const ChatHeader = ({classes, ...props}) => {
    const handleSubmit = () => {

    }
    return <Form onSubmit={handleSubmit}>
        <Grid container className={classes.containerClass}>
            <Grid item xs={12} sm={8} md={8}>
                <Card login>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            Thank You for chatting with us. How would you rate this chat?
                        </Typography>

                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                                Please help us with your comment (optional)
                            </Typography>
                            <TextField
                                className={classes.textField}
                                autoComplete="off"
                                variant="standard"
                                fullWidth
                                autoFocus
                                placeholder={'Type here'}
                                name="feedbackBox"
                                data-bdd="messagebox-input"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.cta}>
                                <Button type="submit">
                                    Submit feedback
                                </Button>
                            </div>
                        </Grid>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Form>
}

export default withStyles(styles)(ChatHeader)
