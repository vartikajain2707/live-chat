import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const DemoPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const siteid = queryParams.get('siteid');
    console.log('siteid', siteid);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://prod-cityexperiences-bot.s3.us-west-2.amazonaws.com/scripts/prod-embed.js';
        script.async = true;
        if (siteid) {
            script.setAttribute('siteid', siteid);
        }
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [siteid]);
    return (
        <div>
            <h1>Demo Page</h1>
            <p>Site ID: {siteid}</p>
        </div>
    );
};

export default DemoPage;
