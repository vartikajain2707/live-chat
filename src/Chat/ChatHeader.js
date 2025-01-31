import React, {useState} from 'react'
import {Avatar, Button, Menu, MenuItem, Typography, withStyles} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";

const styles = () => ({
    chatHeader: {
        backgroundColor: '#1646A8',
        display: 'flex',
        padding: '12px',
        alignItems: 'center',
        boxShadow: '1px 1px 2px #164689',
        // marginBottom: '6px'

    },
    avatar: {
        backgroundColor: '#fff'
    },
    robotImage: {
        objectFit: 'contain',
        height: '100%'
    },
    chatHeaderInfo: {
        flex: 1,
        paddingLeft: '20px'
    },
    chatHeaderTitle: {
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: 700,
        font: '1.2em "Fira Sans", sans-serif',
        color: '#fff',
        letterSpacing: '1px',
    },
    chatHeaderSide: {
        display: 'flex',
        alignItems: 'baseLine'
    },
    headerIcon: {
        color: '#fff',
        padding: 0
    },
    closeIcon: {
        color: '#fff'
    }

})
const ChatHeader = ({classes, ...props}) => {
    const {closeClickedOnce, showFeedbackOnClickCross,
        removeSessionStorage, setMessages, messages, enableScroll} = props
    const [anchorElement, setAnchorElement] = useState(null);
    const open = Boolean(anchorElement)
    const siteid = sessionStorage.getItem('siteid');
    const siteSettings = require('../siteSettings')
    const headerIcon = siteSettings[siteid]?.headerIcon
    const headerTitle = siteSettings[siteid]?.headerTitle
    const handleClick = (event) => {
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorElement(null)
    }

    const onClickSendTranscript = () => {
        const {sendTranscript, messages, sessionId} = props
        const filteredMessages = messages.filter(({user}) => user !== 'loading')
        sendTranscript({sessId: sessionId, allMessages: filteredMessages})
        setAnchorElement(null)
    }
    return <div className={`${classes.chatHeader} chatHeader`}>
        <Avatar className={classes.avatar}>
            <img src={headerIcon} alt={'cexFlag'} className={`${classes.robotImage} robotImage`}/>
        </Avatar>
        <div className={classes.chatHeaderInfo}>
            <Typography variant="subtitle1" className={`${classes.chatHeaderTitle} chatHeaderTitle`}>
                {headerTitle}
            </Typography>
        </div>
        <div className={classes.chatHeaderSide}>
            <Button
                onClick={handleClick}
                size="small"
                aria-controls={'customized-menu'}
                aria-haspopup="true"
                className={`${classes.headerIcon} headerIcon`}>
                <MoreHorizIcon/>
            </Button>
            <Menu
                id="s-menu"
                anchorEl={anchorElement}
                keepMounted
                open={open}
                onClose={handleClose}
                elevation={0}
                getContentAnchorEl={null}
                MenuListProps={{disablePadding: true}}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={onClickSendTranscript}
                >Send Transcript</MenuItem>
            </Menu>
            <CloseIcon className={`${classes.closeIcon} closeIcon`} onClick={() => {

                if (!showFeedbackOnClickCross) {
                    enableScroll(true)
                    closeClickedOnce(true)
                    setMessages([...messages, Object.assign({}, {
                        user: 'feedbackLoading',
                        includeFeedbackCom: true,
                        message: ['...']
                    })])
                } else {
                    if (window && window.parent) {
                        window.parent.postMessage({closeChatBot: true}, '*');
                        removeSessionStorage();
                        setMessages([])
                    }
                }
            }}/>
        </div>
    </div>
}

export default withStyles(styles)(ChatHeader)
