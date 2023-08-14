import React, {useState,useEffect} from 'react';
import { withStyles, Typography, Button, InputAdornment, TextField, Avatar, MenuItem, Menu} from '@material-ui/core';
import keycode from 'keycode';
import classNames from 'classnames';
import PersonIcon from '@material-ui/icons/Person';
import InlineLoader from '../components/InlineLoader'
import SendIcon from '@material-ui/icons/Send';
import cexFlagImage from '../assets/cexFlag.png'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CloseIcon from '@material-ui/icons/Close';


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
            boxShadow:'1px 2px 3px #164689'

        },
            chatHeaderInfo: {
            flex: 1,
            paddingLeft: '20px'
        },
        chatHeaderTitle:{
            // fontFamily:'"Trade Gothic",Arial,sans-serif',
            fontWeight: 600,
            textShadow: '2px 2px #161C27',
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
            fontSize:spacing.unit * 1.5,
            padding: spacing.unit * 1.5,
            borderRadius:spacing.unit * 2,
            width:'fit-content',
            marginBottom: spacing.unit * 0.5,
            color:'black',
            backgroundColor: '#fff',
            boxShadow: '1px 1px 2px lightGray'
        },
        loader:{
            position:'relative',
            marginBottom: spacing.unit * 0.5
        },
            chatName:{
            position: 'absolute',
            top: '-15px',
            fontWeight: '800',
            fontSize: 'xx-small',
            color:'grey'
        },
            chatTimestamp:{
            fontSize: 'xx-small',
            position:'relative',
            top:'28px',
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
        avatar:{
            backgroundColor:'#fff'
        },
        differentUserMessage:{
            marginTop: spacing.unit * 3,
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
        message_body:{
            display:'flex',
            flexDirection:'column'
        },
        sendIcon:{
            color:'#1646A8'
        },
        sendIconDisable:{
            color:'lightGray'
        },
        headerIcon:{
            color:'#fff'
        },
        closeIcon:{
            color:'#fff',
            marginLeft: '15px'
        },
        hideLoading:{
            display:'none'
        }
    }
)

const Chat = ({ classes,...props})  => {
    const {sendMessageFromUser,responseFromBot,responseLoadingDots} = props;
    const botResponseMessage=(responseFromBot[0] || {}).message
    const [input, setInput] = useState('')
    // const [option, setOption] = useState('')
    const [messages, setMessages] = useState([]);
    const messageLength=messages.length
    const [anchorElement, setAnchorElement] = useState(null);
    const open=Boolean(anchorElement)

    useEffect(() => {
        if ((botResponseMessage || '').trim()) {
            setMessages([...messages, Object.assign({}, responseFromBot[0])])
        }
    },[botResponseMessage])


    const messageAppend =() =>{
        if(input.trim()){
            setMessages([...messages,Object.assign({}, {user: 'self', message: input})])
            setInput('')
            sendMessageFromUser(input)
        }
        // if(option.trim()){
        //     setMessages([...messages,Object.assign({}, {user: 'self', message: option})])
        //     setOption('')
        //     sendMessageFromUser(option)
        // }
    }
    const onEnter =(event) =>{
        if(keycode(event) === 'enter'){
            messageAppend()
        }
    }

    const handleClick =(event) =>{
        console.log({value:event.target.value})
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElement(null)
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
                {messages.map(({message,user},idx) => {
                    const isDifferentUser = idx === 0 || user !== messages[idx-1].user
                    const isDiffUserFromBottom = idx === messages.length -1 || user !== messages[idx+1].user

                        return <div>
                            {
                                <Typography component="p" color={'textPrimary'} variant={'body2'}
                                            className={classNames({
                                                [classes.chatMessage]: true,
                                                [classes.chatMessageReceiver]: user === 'self',
                                                [classes.chatMessageBot]: user === 'bot' || user === 'loading',
                                                [classes.differentUserMessage]: (idx > 0 && user !== messages[idx - 1].user),
                                                [classes.sameUserMessage] : !isDifferentUser,
                                                [classes.hideLoading] : (!responseLoadingDots || idx !== messageLength -1) && user ==='loading'
                                            })}>
                                    {isDifferentUser && (user === 'bot' ? <Avatar className={classes.messageAvatar}>
                                            <img src={cexFlagImage} className={classes.robotImage}/>
                                        </Avatar> :
                                        <Avatar className={classes.selfAvatar}>
                                            <PersonIcon/>
                                        </Avatar>)}
                                    {isDifferentUser && <span className={classes.chatName}>{user.toUpperCase()}</span>}
                                    {responseLoadingDots!== false && user ==='loading' && idx === messageLength -1 ? <InlineLoader /> : message}
                                    {isDiffUserFromBottom && <span
                                        className={classes.chatTimestamp}>{new Date().toLocaleTimeString().substring(0, 5)}
                                    </span>}
                                </Typography>
                            }
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
