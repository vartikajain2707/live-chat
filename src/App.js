import Chat from './Chat'
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
    const [showComponent, setShowComponent] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowComponent(true)
        }, 1000)
        return () => clearTimeout(timeout)
    }, [])
    const queryParameters = new URLSearchParams(window.location.search);
    const siteid = queryParameters.get('siteid');
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = `https://prodv3-hornblower-assets.s3.us-west-2.amazonaws.com/data/chatbot/${siteid}.css`;
    document.body.append(style);
    sessionStorage.setItem('siteid', siteid)
    return (
        <div className='app__body'>
            {showComponent && <Chat/>}
        </div>
    );
}

export default App;
