import React, {useEffect, useRef, useState} from 'react'
import {Avatar, Button, Typography, withStyles} from "@material-ui/core";
import classNames from 'classnames';
import PersonIcon from '@material-ui/icons/Person';
import cexFlagImage from '../assets/cexFlag.png'
import InlineLoader from '../components/InlineLoader'
// import Feedback from '../Chat/feedback'


const styles = ({spacing}) => ({
    chatBody: {
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        // padding: '32px',
        height: '90vh',
        padding: '20px 36px 32px 36px'
    },
    chatMessage: {
        position: 'relative',
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: 400,
        fontSize: '14px',
        padding: '13px',
        borderRadius: spacing.unit * 2,
        width: 'fit-content',
        marginBottom: spacing.unit * 0.5,
        minHeight: '10px',
        minWidth: '11px',
        color: 'black',
        backgroundColor: '#fff'
    },
    chatName: {
        position: 'absolute',
        top: '-15px',
        fontWeight: '800',
        fontSize: 'xx-small',
        left: '6px',
        color: 'grey'
    },
    chatNameReciever: {
        right: '7px',
        position: 'absolute',
        top: '-15px',
        fontWeight: '800',
        fontSize: 'xx-small',
        color: 'grey'
    },
    chatTimestamp: {
        fontSize: 'xx-small',
        position: 'absolute',
        marginTop: '16px',
        left: '6px',
        color: 'grey'
    },
    chatTimestampReciever: {
        fontSize: 'xx-small',
        position: 'absolute',
        marginTop: '16px',
        right: '7px',
        color: 'grey'
    },
    chatMessageReceiver: {
        marginLeft: 'auto',
        backgroundColor: '#1646A8',
        color: 'white',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderBottomRightRadius: 0,
        boxShadow: '1px 2px 3px #164689'
    },
    chatMessageBot: {
        borderBottomLeftRadius: 0
    },
    messageAvatar: {
        width: '24px',
        height: '24px',
        position: 'absolute',
        left: '-27px',
        top: '18px',
        backgroundColor: '#fff'
    },
    robotImage: {
        objectFit: 'contain',
        height: '100%'
    },
    selfAvatar: {
        width: '24px',
        height: '24px',
        position: 'absolute',
        right: '-27px',
        top: '18px'
    },
    optionButton: {
        backgroundColor: '#1646A8',
        color: '#fff',
        marginRight: spacing.unit * 2,
        marginTop: spacing.unit * 2,
        padding: '3%',
        fontSize: '11px'
    },
    differentUserMessage: {
        marginTop: spacing.unit * 4,
    },
    sameUserMessage: {
        borderRadius: spacing.unit * 2
    },
    hideLoading: {
        display: 'none'
    },
    loadMoreBtn: {
        width: '100%',
        color: '#1646A8',
        cursor: 'pointer',
        fontSize: '10px',
        "&:hover": {
            backgroundColor: 'transparent',
            fontWeight: 'bold'
        }
    }
})

const decode = (str) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

const ChatBody = ({classes, ...props}) => {
    const {
        messages, setMessages, responseLoadingDots, sendMessageFromUser, sessionId, setStoredMessageStatus,
        sendSignalToSendMoreMess, clientUserName
    } = props
    const [loadMoreMsgClicked, setLoadMoreMsgClicked] = useState(false)
    const messageLength = messages.length
    const chatBoxScroll = useRef(null);
    const userBotMessagesOnly = messages.filter(({user}) => user !== 'loading')
    const userBotMessageOnlyLength = userBotMessagesOnly.length
    useEffect(() => {
        if (!loadMoreMsgClicked) {
            setLoadMoreMsgClicked(false)
            return chatBoxScroll.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages]);


    return <div className={classes.chatBody}>
        {userBotMessageOnlyLength > 10 &&
            <Button size={'small'}
                    onClick={() => {
                        setLoadMoreMsgClicked(true)
                        return sendSignalToSendMoreMess({
                            sessId: sessionId,
                            fetchMessageCount: 10,
                            currentMessagesCount: userBotMessageOnlyLength
                        })
                    }}
                    className={classes.loadMoreBtn}
            >Load More Messages</Button>
        }
        {messages.map(({message, user, options, timeStamp}, idx) => {
                console.log({message})
                return <div ref={chatBoxScroll}>
                    {message && message.map((key, subIdx) => {
                        const isDifferentUser = (idx === 0 || user !== messages[idx - 1].user) && subIdx === 0;
                        const isDiffUserFromBottom = (idx === messages.length - 1 || user !== messages[idx + 1].user) && subIdx === message.length - 1;
                        return <Typography component="p" color={'textPrimary'} variant={'body2'}
                                           className={classNames({
                                               [classes.chatMessage]: true,
                                               [classes.chatMessageReceiver]: user === (clientUserName || 'self'),
                                               [classes.chatMessageBot]: user === 'bot' || user === 'loading',
                                               [classes.differentUserMessage]: (idx > 0 && user !== messages[idx - 1].user) && subIdx === 0,
                                               [classes.sameUserMessage]: !isDifferentUser,
                                               [classes.hideLoading]: (!responseLoadingDots || idx !== messageLength - 1) && user === 'loading'
                                           })}>

                            <div>{isDifferentUser && ((user === 'bot' || user === 'loading') ?
                                <Avatar className={classes.messageAvatar}>
                                    <img src={cexFlagImage} className={classes.robotImage} alt={'cex'}/>
                                </Avatar> :
                                <Avatar className={classes.selfAvatar}>
                                    <PersonIcon/>
                                </Avatar>)}
                                {(isDifferentUser && user !== 'loading') && <span className={classNames({
                                    [classes.chatName]: user === 'bot',
                                    [classes.chatNameReciever]: user === (clientUserName || 'self')
                                })}>
                {user.toUpperCase()}</span>}
                                {(responseLoadingDots !== false && user === 'loading' && idx === messageLength - 1) ?
                                    <InlineLoader/> : <div dangerouslySetInnerHTML={{__html: decode(key)}}></div>
                                }
                                {isDiffUserFromBottom && user !== 'loading' && <span
                                    className={classNames({
                                        [classes.chatTimestamp]: user === 'bot',
                                        [classes.chatTimestampReciever]: user === (clientUserName || 'self')
                                    })}>{timeStamp}
                                    </span>}
                            </div>
                        </Typography>
                    })
                    }
                    <div>
                        {options && options.length > 0 && options.map((option) =>
                            <Button size="small" variant="contained" className={classes.optionButton}
                                    onClick={() => {
                                        setMessages([...messages, Object.assign({}, {
                                            user: (clientUserName || 'self'),
                                            message: [option]
                                        })])
                                        setStoredMessageStatus(true)
                                        sendMessageFromUser({
                                            text: option,
                                            sessId: sessionId
                                        })
                                    }}>{option}
                            </Button>)}
                    </div>

                </div>

            }
        )}
        {/*<Feedback/>*/}
    </div>
}

export default withStyles(styles)(ChatBody)














