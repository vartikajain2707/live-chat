import React, {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core';
import keycode from 'keycode';
import {v4} from 'uuid';
import ChatHeader from '../Chat/ChatHeader'
import ChatBody from '../Chat/ChatBody'
import ChatFooter from '../Chat/ChatFooter'


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
    const {sendMessageFromUser, responseFromBot, responseLoadingDots} = props;
    const [input, setInput] = useState('')
    const [sessionId, setSessionId] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let allStoredMessages = localStorage.getItem('cachedMessages')
        let topMsg = []
        if (allStoredMessages) {
            topMsg = JSON.parse(allStoredMessages)
            console.log({topMsg})
            // setMessages(topMsg)
        }
        if (messages.length > 0 && messages[messages.length - 1].user !== 'loading') {
            topMsg.push(messages[messages.length - 1])
        }
        if (topMsg.length > 10) {
            topMsg = topMsg.slice(-10)
        }
        const cachedMessages = JSON.stringify(topMsg)
        localStorage.setItem('cachedMessages', cachedMessages)

    }, [messages])

    // useEffect(() => {
    // let uuid = localStorage.getItem('sessionId');
    // if (!uuid) {
    //     uuid = v4()
    //     setSessionId(uuid)
    //     localStorage.setItem('sessionId', uuid);
    // }
    // // const uuid = v4()
    // sendMessageFromUser({text: 'Hi', sessId: uuid})
    // runEffect()
    // setInterval(() => )
    // }, [])

    useEffect(() => {
        // const runEffect = () => {
        let uuid = localStorage.getItem('sessionId');
        // console.log({uuid})
        // const lastMessageTimeStamp = ((messages || []).pop() || {}).timeStamp
        // console.log({lastMessageTimeStamp})
        // const currentDate = new Date()
        // const currentTimeStamp = currentDate.setHours(currentDate.getHours() - 1).toLocaleString().substring(0, 5)
        // const currentTimeStamp = currentDate.setTime(currentDate.getTime() - 60 * 1000).toLocaleString().substring(0, 5)

        if (!uuid) {   //newChat Condition
            console.log('inside uuid')
            uuid = v4()
            localStorage.setItem('sessionId', uuid);
            sendMessageFromUser({text: 'Hi', sessId: uuid})
        }
        setSessionId(uuid);
        const localStorageMessages = JSON.parse(localStorage.getItem('cachedMessages'));
        console.log({localStorageMessages})
        setMessages(localStorageMessages)
        // }

        // runEffect()
        // const interval = setInterval(() => {
        //     runEffect()
        // }, 600000);
        // return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    useEffect(() => {
        if (Object.keys(responseFromBot).length > 0) {
            setMessages([...messages, Object.assign({}, responseFromBot)])
        }

    }, [responseFromBot])


    const messageAppend = () => {
        if (input.trim().length > 0) {
            setMessages([...messages, Object.assign({}, {
                user: 'self',
                message: [input],
                timeStamp: new Date().toLocaleTimeString().substring(0, 5)
            })])
            setInput('')
            sendMessageFromUser({text: input, sessId: sessionId})

        }
    }
    const onEnter = (event) => {
        if (keycode(event) === 'enter') {
            messageAppend()
        }
    }


    return <div className={classes.chat}>
        <ChatHeader/>
        <ChatBody messages={messages} setMessages={setMessages} responseLoadingDots={responseLoadingDots}
                  sendMessageFromUser={sendMessageFromUser} sessionId={sessionId}/>
        <ChatFooter onEnter={onEnter} input={input} setInput={setInput} messageAppend={messageAppend}/>
    </div>

}

export default withStyles(styles)(Chat);
