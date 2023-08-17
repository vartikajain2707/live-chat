import React, {useState, useEffect, useRef} from 'react';
import { withStyles, Typography, Button, InputAdornment, TextField, Avatar, MenuItem, Menu} from '@material-ui/core';
import keycode from 'keycode';
import classNames from 'classnames';
import PersonIcon from '@material-ui/icons/Person';
import InlineLoader from '../components/InlineLoader'
import SendIcon from '@material-ui/icons/Send';
import cexFlagImage from '../assets/cexFlag.png'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';
import {v4} from 'uuid';




const styles=({spacing})=>({
        chat:{
            display:'flex',
            flexDirection:'column',
            backgroundColor:'#F2F5FF',
            width:'100%'
        },
        chatHeader:{
            backgroundColor:'#1646A8',
            display:'flex',
            padding: '12px',
            alignItems: 'center',
            boxShadow:'1px 1px 2px #164689'

        },
            chatHeaderInfo: {
            flex: 1,
            paddingLeft: '20px'
        },
        chatHeaderTitle:{
            fontFamily:'-apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 700,
            // textShadow: '3px 0px 7px rgba(81,67,21,0.8), -3px 0px 7px rgba(81,67,21,0.8), 0px 4px 7px rgba(81,67,21,0.8)',
            font:'1.2em "Fira Sans", sans-serif',
            color:'#fff',
            letterSpacing: '1px',
        },
        chatHeaderSide:{
          display:'flex',
          alignItems:'baseLine'
        },
        chatBody:{
            overflow: 'auto',
            // backgroundRepeat: 'no-repeat',
            // backgroundPosition: 'center',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            padding:'32px',
            // backgroundImage:cityExpImage,
            // backgroundColor:'rgba(0,0,0,0.5)',
            // height:'80%',
            height: '90vh',
            // position:'relative'
        },
        chatMessage:{
            position:'relative',
            fontFamily:"-apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight:400,
            fontSize:spacing.unit * 1.5,
            padding: '13px',
            borderRadius:spacing.unit * 2,
            width:'fit-content',
            marginBottom: spacing.unit * 0.5,
            minHeight:'10px',
            minWidth:'11px',
            color:'black',
            backgroundColor: '#fff'
        },

/* Animation */
//     chatAnimation: {
//     animation: '${typewriter} 4s steps(44) 1s 1 normal both, ${blinkTextCursor} 500ms steps(44) infinite normal'
// },
//
//         loader:{
//             position:'relative',
//             marginBottom: spacing.unit * 0.5
//         },
            chatName:{
            position: 'absolute',
            top: '-15px',
            fontWeight: '800',
            fontSize: 'xx-small',
            left:'6px',
            color:'grey'
        },
        chatNameReciever:{
            right:'7px',
            position: 'absolute',
            top: '-15px',
            fontWeight: '800',
            fontSize: 'xx-small',
            color:'grey'
        },
            chatTimestamp:{
            fontSize: 'xx-small',
            position:'absolute',
            marginTop: '16px',
            left:'6px',
            color:'grey'
        },
        chatTimestampReciever:{
            fontSize: 'xx-small',
            position:'absolute',
            marginTop: '16px',
            right:'7px',
            color:'grey'
        },
        chatMessageReceiver:{
            marginLeft:'auto',
            backgroundColor:'#1646A8',
            color:'white',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            borderBottomRightRadius:0,
            boxShadow:'1px 2px 3px #164689'
        },
        chatMessageBot:{
            borderBottomLeftRadius:0
        },
        messageAvatar: {
            width: '24px',
            height: '24px',
            position: 'absolute',
            left: '-27px',
            top:'18px',
            backgroundColor:'#fff'
        },
        robotImage:{
            objectFit: 'contain',
            height: '100%'
        },
        selfAvatar:{
            width: '24px',
            height: '24px',
            position: 'absolute',
            right: '-27px',
            top:'18px'
        },
        optionButton:{
            backgroundColor:'#1646A8',
            color:'#fff',
            marginRight:spacing.unit *2,
            marginTop:spacing.unit *2,
            padding: '3%',
            fontSize: '11px'
        },
        // optionsContainer:{
        //         display:'flex'
        // },
        avatar:{
            backgroundColor:'#fff'
        },
        differentUserMessage:{
            marginTop: spacing.unit * 4,
        },
        sameUserMessage:{
            borderRadius: spacing.unit * 2
        },
        chatFooter:{
            display: 'flex',
            alignItems:'center',
            justifyContent:'space-between',
            height:'62px',
            backgroundColor:'#fff',
            borderTop:'1px solid lightGray'
        },
        textField:{
            flex: '1',
            padding: '10px'
        },
        // message_body:{
        //     display:'flex',
        //     flexDirection:'column'
        // },
        sendIcon:{
            color:'#1646A8'
        },
        sendIconDisable:{
            color:'lightGray'
        },
        headerIcon:{
            color:'#fff',
            padding:0
        },
        closeIcon:{
            color:'#fff'
        },
        hideLoading:{
            display:'none'
        }
    }
)

const Chat = ({ classes,...props})  => {
    const {sendMessageFromUser,responseFromBot,responseLoadingDots} = props;
    const [input, setInput] = useState('')
    const [sessionId, setSessionId] =useState('')
    const [messages, setMessages] = useState([]);
    const messageLength=messages.length
    const [anchorElement, setAnchorElement] = useState(null);
    const open=Boolean(anchorElement)

    useEffect(() =>{
        const uuid=v4()
        setSessionId(uuid)
        sendMessageFromUser({text:'Hi', sessId:uuid})
    }, [])

    useEffect(() => {
        setMessages([...messages, Object.assign({}, responseFromBot)])
    },[responseFromBot])

    const chatBoxScroll = useRef(null);
    useEffect(() => chatBoxScroll.current?.scrollIntoView({ behavior: "smooth" }), [messages]);



    const messageAppend =() =>{
        console.log({input})
        if(input.trim()){
            setMessages([...messages,Object.assign({}, {user: 'self', message: [input]})])
            setInput('')
            sendMessageFromUser({text:input, sessId:sessionId})
        }
    }
    const onEnter =(event) =>{
        if(keycode(event) === 'enter'){
            messageAppend()
        }
    }

    const handleClick =(event) =>{
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElement(null)
    }

    const decode = (str) => {
        let txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    const chatContent = ({isDifferentUser, isDiffUserFromBottom, user, idx, key}) => {
        return <div className={classes.chatContentContainer}>{isDifferentUser && ((user === 'bot' || user === 'loading') ? <Avatar className={classes.messageAvatar}>
                    <img src={cexFlagImage} className={classes.robotImage}/>
                </Avatar> :
                <Avatar className={classes.selfAvatar}>
                    <PersonIcon/>
                </Avatar>)}
            {(isDifferentUser && user !== 'loading') && <span className={classNames({
                [classes.chatName]: user === 'bot',
                [classes.chatNameReciever]: user === 'self'})}>
                {user.toUpperCase()}</span>}
            {(responseLoadingDots !== false && user ==='loading' && idx === messageLength -1) ? <InlineLoader /> : <div dangerouslySetInnerHTML={{__html: decode(key)}}></div>
            }
            {isDiffUserFromBottom && user !== 'loading' && <span
                className={classNames({
                    [classes.chatTimestamp]: user === 'bot',
                    [classes.chatTimestampReciever]: user === 'self'})}>{new Date().toLocaleTimeString().substring(0, 5)}
                                    </span>}
        </div>

    }

    return <div className={classes.chat}>
            <div className={classes.chatHeader}>
                <Avatar className={classes.avatar}>
                    <img src={cexFlagImage} className={classes.robotImage}/>
                </Avatar>
                <div className={classes.chatHeaderInfo}>
                    <Typography variant="subtitle1" className={classes.chatHeaderTitle}>
                        CEX Assistant
                    </Typography>
                </div>
                <div className={classes.chatHeaderSide}>
                    <Button
                        onClick={handleClick}
                        size="small"
                        aria-controls={'customized-menu'}
                        aria-haspopup="true"
                        className={classes.headerIcon}>
                        <MoreHorizIcon />
                    </Button>
                    <Menu
                        id="s-menu"
                        anchorEl={anchorElement}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        elevation={0}
                        getContentAnchorEl={null}
                        MenuListProps={{ disablePadding: true }}

                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Send Transcript</MenuItem>
                    </Menu>
                    <CloseIcon className={classes.closeIcon} onClick={() => {
                        if (window && window.parent) {
                            window.parent.postMessage({closeChatBot: true}, '*');
                        }
                    }} />
                </div>
            </div>
            <div className={classes.chatBody}>
                {messages.map(({message,user,options},idx) => {
                        return <div ref={chatBoxScroll}>
                            {message && message.map( (key,subIdx) => {
                                const isDifferentUser = (idx === 0 || user !== messages[idx-1].user) && subIdx === 0;
                                const isDiffUserFromBottom = (idx === messages.length -1 || user !== messages[idx+1].user) && subIdx === message.length -1;
                                return <Typography component="p" color={'textPrimary'} variant={'body2'}
                                            className={classNames({
                                                [classes.chatMessage]: true,
                                                [classes.chatMessageReceiver]: user === 'self',
                                                [classes.chatMessageBot]: user === 'bot' || user === 'loading',
                                                [classes.differentUserMessage]: (idx > 0 && user !== messages[idx - 1].user) && subIdx === 0,
                                                [classes.sameUserMessage] : !isDifferentUser,
                                                [classes.hideLoading] : (!responseLoadingDots || idx !== messageLength -1) && user ==='loading'
                                            })}>
                                    {chatContent({isDifferentUser, isDiffUserFromBottom, user, idx, key})}
                                </Typography>
                                })
                            }
                            <div className={classes.optionsContainer}>
                                {options && options.length>0 && options.map((option) => <Button size="small" variant="contained" className={classes.optionButton}
                                                                                                onClick={() =>{setMessages([...messages,Object.assign({}, {user: 'self', message: [option]})])
                                                                                                    sendMessageFromUser({
                                                                                                        text: option,
                                                                                                        sessId: sessionId
                                                                                                    })}}>{option}
                                </Button>)}
                            </div>

                            </div>

                    }
                )}
            </div>

            <div className={classes.chatFooter}>
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
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <SendIcon onClick={messageAppend} className={classNames({
                                    [classes.sendIcon]: true,
                                    [classes.sendIconDisable] : input === ''
                                })} />
                            </InputAdornment>
                        )
                    }}
                />
            </div>
        </div>

}

export default withStyles(styles)(Chat);
