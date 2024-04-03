import Chat from './Chat'
import './App.css';
import React from 'react';

function App() {
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
            <Chat/>
        </div>
    );
}

export default App;
