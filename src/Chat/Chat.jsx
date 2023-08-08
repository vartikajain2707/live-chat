import React, {useState} from 'react';
import { withStyles,Typography, Button, InputAdornment } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import keycode from 'keycode';
import classNames from 'classnames';

const styles=({shadows,spacing,palette})=>({
        // chatWrapper:{
        //     display:'flex',
        //     justifyContent: 'flex-end',
        //     width:'100%',
        //     height: '920px',
        //     alignItems:'flex-end'
        // },
        // chat:{
        //     boxShadow: shadows[4],
        //     background: '#FFFFF',
        //     borderRadius:'10px',
        // },
        chatHeader:{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            marginTop: spacing.unit * 2
        },
        chatHeaderTitle:{
        },
        chatBody:{
            height:'780px'
        },
        chatMessage:{
            position:'relative',
            fontSize:spacing.unit * 2,
            padding: spacing.unit * 2,
            // backgroundColor:palette.primary.main,
            borderRadius:spacing.unit * 2,
            width:'fit-content'

        },
        chatMessageReceiver:{
            marginLeft:'auto',
            backgroundColor:palette.primary.main,
            color:'white'
        },
        chatFooter:{
            width:'100%',
            display: 'flex'
        },
        textField:{
            width:'100%'
        }
    }
)

const Chat = ({ classes,...props})  => {
    const {sendMessgaeFromUser} = props;
    console.log({sendMessgaeFromUser});
    console.log({props});
    const userName='Vartika';
    const [input, setInput] =useState('')
    const [messages, setMessages] = useState([]);
    const messageAppend =() =>{
        if(input){
            setMessages([...messages,Object.assign({}, {user:'self', message:input})])
            setInput('')
            sendMessgaeFromUser(input)
        }
    }
    const onEnter =(event) =>{
        if(keycode(event) === 'enter'){
            messageAppend()
        }
    }
    return <div className={classes.chatWrapper}>
        <div className={classes.chat}>
            <div className={classes.chatHeader}>
                <Typography
                    variant={'heading'}
                    className={classes.chatHeaderTitle}
                    color="primary"
                >
                    Hi {userName}! How can I help you?
                </Typography>
            </div>
            <div className={classes.chatBody}>
                {messages.map(({message}) => <Typography component="p" color={'textPrimary'} variant={'body2'} className={classNames({
                        [classes.chatMessage]: true,
                        [classes.chatMessageReceiver] :true
                    })}>
                        {message}
                    </Typography>
                )}
            </div>

            <div className={classes.chatFooter}>
                <TextField
                    className={classes.textField}
                    autoComplete="off"
                    variant="outlined"
                    value={input}
                    onChange={event => setInput(event.target.value)}
                    placeholder={'Type your message'}
                    name="messageBox"
                    data-bdd="messagebox-input"
                    onKeyDown={onEnter}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    type={'button'}
                                    // loading={fetchingPointsByEmail}
                                    onClick={messageAppend}
                                    fullWidth={true}
                                    data-bdd="loyalty-points-email-search-button"
                                    color="primary">
                                    <Typography
                                        variant={'heading'}
                                        color="primary"
                                    >
                                        Send
                                    </Typography>
                                </Button>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
        </div>
    </div>

}

export default withStyles(styles)(Chat);
