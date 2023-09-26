import Chat from './Chat'
import './App.css';
import React from 'react';
function App() {
<<<<<<< Updated upstream
  return (
    <div className='app__body'>
      <Chat />
    </div>
  );
=======
    const queryParameters = new URLSearchParams(window.location.search);
    const siteid = queryParameters.get('siteid');
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = `https://vartika-hornblower-assets.s3.us-west-2.amazonaws.com/data/${siteid}.css`;
    document.body.append(style);
    sessionStorage.setItem('siteid', siteid)
    return (
        <div className='app__body'>
            <Chat/>
        </div>
    );
>>>>>>> Stashed changes
}

export default App;
