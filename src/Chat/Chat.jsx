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
        nextBatchOfMessages, usersName, sendTranscript, closeClickedOnce, showFeedbackOnClickCross,
        afterFeedbackResult, storeSessionId, activeScroll, responseFetchLoadingDots, enableScroll, removeSessionStorage,
        totalMessageCount} = props;
    const [input, setInput] = useState('')
    const [sessionId, setSessionId] = useState('')
    const [messages, setMessages] = useState([]);
    const [storedMessageStatus, setStoredMessageStatus] = useState(false)
    const [currentFetchedMessages, setCurrentFetchedMessages] = useState([])
    const [hideLoadMore, setHideLoadMore] = useState(false)


    useEffect(() => {
        const filteredMessages = messages.filter(({user}) => user !== 'loading')
        if (JSON.stringify(currentFetchedMessages) !== JSON.stringify(nextBatchOfMessages)) {
            const finalSetMessages = nextBatchOfMessages.concat(filteredMessages)
            setStoredMessageStatus(false)
            setMessages(finalSetMessages)
            setCurrentFetchedMessages(nextBatchOfMessages)

        }
        // eslint-disable-next-line
    }, [nextBatchOfMessages])

    useEffect(() => {
        let allStoredMessages = sessionStorage.getItem('cachedMessages')
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
        const filteredMessages = messages.filter(({user}) => user !== 'loading');
        if (filteredMessages.length < totalMessageCount-1) {
            setHideLoadMore(true);
        }
        else{
            setHideLoadMore(false);
        }
        const cachedMessages = JSON.stringify(topMsg)
        sessionStorage.setItem('cachedMessages', cachedMessages);
        // eslint-disable-next-line
    }, [messages])

    const postMessageHandler = (event) => {
        const isGenerateNewSession = event.data.generateNewSession
        if (isGenerateNewSession) {
            const uuid = v4()
            sessionStorage.setItem('sessionId', uuid);
            setSessionId(uuid);
            sendMessageFromUser({text: 'Hi', sessId: uuid, timeStamp: moment().unix()})
        }
    }

    useEffect(() => {
        let localStorageMessages = JSON.parse(sessionStorage.getItem('cachedMessages'))
        const lastStoredMessTime = ((localStorageMessages || []).pop() || {}).timeStamp
        if (lastStoredMessTime + 3600 < moment().unix()) {
            removeSessionStorage()
        }
        let uuid = sessionStorage.getItem('sessionId');
        window.addEventListener('message', postMessageHandler)
        if (uuid) {   //newChat Condition
            const localStorageMessages = JSON.parse(sessionStorage.getItem('cachedMessages'));
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
        // eslint-disable-next-line
    }, [responseFromBot])

    useEffect(() => {
        if (Object.keys(afterFeedbackResult).length > 0) {
            setMessages([...messages, Object.assign({}, afterFeedbackResult)])
        }
        // eslint-disable-next-line
    }, [afterFeedbackResult])


    const messageAppend = () => {
        if (input.trim().length > 0) {
            setMessages([...messages, Object.assign({}, {
                user: (usersName || 'self'),
                message: [input],
                timeStamp: moment().unix()
            })])
            setStoredMessageStatus(true)
            setInput('')
            sendMessageFromUser({text: input, sessId: sessionId, timeStamp: moment().unix()})
        }
    }
    const onEnter = (event) => {
        if (keycode(event) === 'enter') {
            messageAppend()
        }
    }


    return <div className={`${classes.chat} chat`}>
        <ChatHeader sendTranscript={sendTranscript} messages={messages} setMessages={setMessages} sessionId={sessionId}
                    closeClickedOnce={closeClickedOnce} showFeedbackOnClickCross={showFeedbackOnClickCross}
                    enableScroll={enableScroll} removeSessionStorage={removeSessionStorage}
        />
        <ChatBody messages={messages} setMessages={setMessages}
                  setStoredMessageStatus={setStoredMessageStatus}
                  responseLoadingDots={responseLoadingDots}
                  sendMessageFromUser={sendMessageFromUser} sessionId={sessionId}
                  sendSignalToSendMoreMess={sendSignalToSendMoreMess} usersName={usersName}
                  showFeedbackOnClickCross={showFeedbackOnClickCross}
                  responseFetchLoadingDots={responseFetchLoadingDots}
                  activeScroll={activeScroll}
                  hideLoadMore={hideLoadMore}
        />
        <ChatFooter onEnter={onEnter} input={input} setInput={setInput} messageAppend={messageAppend}
                    afterFeedbackResult={afterFeedbackResult}/>
    </div>

}

export default withStyles(styles)(Chat);
