import React, {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core';
import keycode from 'keycode';
import {v4} from 'uuid';
import ChatHeader from '../Chat/ChatHeader'
import ChatBody from '../Chat/ChatBody'
import ChatFooter from '../Chat/ChatFooter'
import moment from "moment";


const styles = () => ({
        chat: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F2F5FF',
            width: '100%'
        }
    }
)

const Chat = ({classes, ...props}) => {
    const {
        sendMessageFromUser, responseFromBot, responseLoadingDots, sendSignalToSendMoreMess,
        nextBatchOfMessages, clientUserName, sendTranscript, closeClickedOnce, showFeedbackOnClickCross,
        afterFeedbackResult, storeSessionId, enableScroll, activeScroll
    } = props;
    const [input, setInput] = useState('')
    const [sessionId, setSessionId] = useState('')
    const [messages, setMessages] = useState([]);
    const [storedMessageStatus, setStoredMessageStatus] = useState(false)
    const [currentBatchMess, setCurrentBatchMess] = useState([])


    useEffect(() => {
        const filteredMessages = messages.filter(({user}) => user !== 'loading')
        const finalSetMessages = nextBatchOfMessages.concat(filteredMessages)
        setMessages(finalSetMessages)
    }, [nextBatchOfMessages])

    useEffect(() => {
        let allStoredMessages = localStorage.getItem('cachedMessages')
        let topMsg = []
        if (allStoredMessages) {
            topMsg = JSON.parse(allStoredMessages)
        }
        if (messages.length > 0 && messages[messages.length - 1].user !== 'loading' && storedMessageStatus) {
            topMsg.push(messages[messages.length - 1])
            setStoredMessageStatus(false)
        }
        if (topMsg.length > 10) {
            topMsg = topMsg.slice(-10)
        }
        const cachedMessages = JSON.stringify(topMsg)
        localStorage.setItem('cachedMessages', cachedMessages);
    }, [messages])


    useEffect(() => {
        let uuid = localStorage.getItem('sessionId');

        if (!uuid) {   //newChat Condition
            uuid = v4()
            localStorage.setItem('sessionId', uuid);
            sendMessageFromUser({text: 'Hi', sessId: uuid, timeStamp: moment().unix()})
        } else {
            const localStorageMessages = JSON.parse(localStorage.getItem('cachedMessages'));
            setMessages([...localStorageMessages])
        }
        storeSessionId(uuid)
        setSessionId(uuid);
    }, [])

    useEffect(() => {
        if (Object.keys(responseFromBot).length > 0) {
            setMessages([...messages, Object.assign({}, responseFromBot)])
            setStoredMessageStatus(true)
        }

    }, [responseFromBot])

    useEffect(() => {
        if (Object.keys(afterFeedbackResult).length > 0) {
            setMessages([...messages, Object.assign({}, afterFeedbackResult)])
        }

    }, [afterFeedbackResult])


    const messageAppend = () => {
        if (input.trim().length > 0) {
            setMessages([...messages, Object.assign({}, {
                user: (clientUserName || 'self'),
                message: [input],
                timeStamp: moment().unix()
            })])
            setStoredMessageStatus(true)
            setInput('')
            sendMessageFromUser({text: input, sessId: sessionId, timeStamp: moment().unix()})
            enableScroll(true)

        }
    }
    const onEnter = (event) => {
        if (keycode(event) === 'enter') {
            messageAppend()
        }
    }


    return <div className={classes.chat}>
        <ChatHeader sendTranscript={sendTranscript} messages={messages} sessionId={sessionId}
                    closeClickedOnce={closeClickedOnce} showFeedbackOnClickCross={showFeedbackOnClickCross}
                    enableScroll={enableScroll}/>
        <ChatBody messages={messages} setMessages={setMessages} setStoredMessageStatus={setStoredMessageStatus}
                  responseLoadingDots={responseLoadingDots}
                  sendMessageFromUser={sendMessageFromUser} sessionId={sessionId}
                  sendSignalToSendMoreMess={sendSignalToSendMoreMess} clientUserName={clientUserName}
                  showFeedbackOnClickCross={showFeedbackOnClickCross}
                  currentBatchMess={currentBatchMess} setCurrentBatchMess={setCurrentBatchMess}
                  nextBatchOfMessages={nextBatchOfMessages}
                  enableScroll={enableScroll}
                  activeScroll={activeScroll}
            // chatBoxScroll={chatBoxScroll}
        />
        <ChatFooter onEnter={onEnter} input={input} setInput={setInput} messageAppend={messageAppend}
                    afterFeedbackResult={afterFeedbackResult}/>
    </div>

}

export default withStyles(styles)(Chat);
