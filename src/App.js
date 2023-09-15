import Chat from './Chat'
import './App.css';
import React from 'react';

function App() {
    const queryParameters = new URLSearchParams(window.location.search);
    const siteid = queryParameters.get('siteid');
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = `https://vartika-hornblower-assets.s3.us-west-2.amazonaws.com/data/${siteid}.css`;
    document.head.append(style);

    return (
        <div className='app__body'>
            <Chat/>
        </div>
    );
}

export default App;
