import React, {useState} from 'react'
import {Avatar, Button, Menu, MenuItem, Typography, withStyles} from "@material-ui/core";
import cexFlagImage from "../assets/cexFlag.png";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";

const styles = () => ({
    chatHeader: {
        backgroundColor: '#1646A8',
        display: 'flex',
        padding: '12px',
        alignItems: 'center',
        boxShadow: '1px 1px 2px #164689'

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
    const {closeClickedOnce, showFeedbackOnClickCross, enableScroll} = props
    const [anchorElement, setAnchorElement] = useState(null);
    const open = Boolean(anchorElement)
    const handleClick = (event) => {
        setAnchorElement(event.currentTarget)
    }

    const handleClose = () => {
        const {sendTranscript, messages, sessionId} = props
        const filteredMessages = messages.filter(({user}) => user !== 'loading')
        sendTranscript({sessId: sessionId, allMessages: filteredMessages})
        setAnchorElement(null)
    }
    return <div className={classes.chatHeader}>
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
                <MenuItem onClick={handleClose}>Send Transcript</MenuItem>
            </Menu>
            <CloseIcon className={classes.closeIcon} onClick={() => {

                if (!showFeedbackOnClickCross) {
                    enableScroll(true)
                    closeClickedOnce(true)
                } else {
                    if (window && window.parent) {
                        window.parent.postMessage({closeChatBot: true}, '*');

                    }
                }
            }}/>
        </div>
    </div>
}

export default withStyles(styles)(ChatHeader)
