import React, {useState,useEffect} from 'react';
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
        chat:{
            background: '#FFFFF',
            height:'780px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
        },
        chatHeader:{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            marginTop: spacing.unit * 2
        },
        chatHeaderTitle:{
            fontFamily:'"Trade Gothic",Arial,sans-serif',
            fontWeight: 600
        },
        chatBody:{
            overflow: 'auto',
            backgroundPosition: 'center',
            maxHeight:'750px',
            flexWrap: 'nowrap',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },
        chatMessage:{
            position:'relative',
            fontSize:spacing.unit * 2,
            padding: spacing.unit * 2,
            borderRadius:spacing.unit * 2,
            width:'fit-content',
            marginBottom: spacing.unit,
            color:'black',
            backgroundColor:palette.secondary.main,

        },
        chatMessageReceiver:{
            marginLeft:'auto',
            backgroundColor:palette.primary.main,
            color:'white'
        },
        chatFooter:{
            width:'100%',
            display: 'flex',
            borderRadius: '30px',
            border: 'none',
            position: 'fixed',
            left: 0,
            bottom: 0,
            margin: spacing.unit
        },
        textField:{
            width:'100%'
        }
    }
)

const Chat = ({ classes,...props})  => {
    const {sendMessageFromUser,responseFromBot} = props;
    const botResponseMessage=(responseFromBot[0] || {}).message
    const userName = 'Vartika';
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if ((botResponseMessage || '').trim()) {
            setMessages([...messages, Object.assign({}, responseFromBot[0])])

        }
    },[botResponseMessage])


    const messageAppend =() =>{
        if(input.trim()){
            setMessages([...messages,Object.assign({}, {user:'self', message:input})])
            setInput('')
            sendMessageFromUser(input)
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
                <Typography variant="h5" gutterBottom color="primary" className={classes.chatHeaderTitle}>
                    Hi {userName}! How can I help you?
                </Typography>
            </div>
            <div className={classes.chatBody}>
                {messages.map(({message,user}) => <Typography component="p" color={'textPrimary'} variant={'body2'} className={classNames({
                        [classes.chatMessage]: true,
                        [classes.chatMessageReceiver] : user !== 'bot'
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
