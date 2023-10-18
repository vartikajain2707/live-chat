import React from 'react'
import {InputAdornment, TextField, withStyles} from "@material-ui/core";
import classNames from "classnames";
import SendIcon from "@material-ui/icons/Send";


const styles = () => ({
    chatFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '62px',
        backgroundColor: '#fff',
        borderTop: '1px solid lightGray'
    },
    textField: {
        flex: '1',
        padding: '10px'
    },
    sendIcon: {
        color: '#1646A8'
    },
    sendIconDisable: {
        color: 'lightGray'
    },
})

const ChatFooter = ({classes, ...props}) => {
    const {input, setInput, onEnter, messageAppend, afterFeedbackResult} = props
    return <div className={classes.chatFooter}>
        <TextField
            className={classes.textField}
            autoComplete="off"
            variant="standard"
            fullWidth
            autoFocus
            value={input}
            onChange={event => setInput(event.target.value)}
            placeholder={'Type your message'}
            name="messageBox"
            data-bdd="messagebox-input"
            onKeyDown={onEnter}
            disabled={Object.keys(afterFeedbackResult).length > 0}
            InputProps={{
                disableUnderline: true,
                endAdornment: (
                    <InputAdornment position="end">
                        <SendIcon onClick={messageAppend} className={classNames({
                            [`${classes.sendIcon} sendIcon`]: true,
                            [classes.sendIconDisable]: input === ''
                        })}/>
                    </InputAdornment>
                )
            }}
        />
    </div>
}

export default withStyles(styles)(ChatFooter)
