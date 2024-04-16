(() => {
    const body = document.body;
    var displayBot = sessionStorage.getItem("displayBot");
    const siteid = document.currentScript.getAttribute('siteid');

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = `https://prodv3-hornblower-assets.s3.us-west-2.amazonaws.com/data/chatbot/${siteid}.css`;
    document.head.append(style);

    const chatbotSrc = `https://my.cityexperiences.com/chat/?siteid=${siteid}`;
    const launcherHtml = document.createElement('div');
    launcherHtml.innerHTML = `<div id="cex-bot-launcher" style="position: fixed; bottom: 3vh; right: 3vh; cursor: pointer; z-index: 10000;">
            <iframe id="cex-chatbot" src="${chatbotSrc}" width="0" height="0" frameborder="0" style="border-radius: 15px; border: 1px solid lightgrey"></iframe>
            <div id="botImageContainer">
                <div class="botImg">
                    <img id="cex-bot-launcher-img" src="https://prodv3-hornblower-assets.s3.us-west-2.amazonaws.com/data/chatbot/${siteid}BotImgLauncher.png" width="60" height="60" />
                </div>
                <p id="para" class="para">Hi, how may I help you?</p>
            </div>
<!--            <img id="cex-bot-launcher-img" style="position: fixed; bottom: 3vh; right: 3vh; border-radius: 50%; padding: 5px; box-shadow: 2px 2px 4px black; background-color: #ffffff;" src="https://prodv3-hornblower-assets.s3.us-west-2.amazonaws.com/data/${siteid}Logo.png" width="50" height="50">-->
        </div>`;
    body.appendChild(launcherHtml);
    const displayChatbot = () => {
        const bot = document.getElementById('cex-chatbot');
        const botImg = document.getElementById('botImageContainer');
        if (bot) {
            bot.style.display = 'block';
            bot.style.height = '600px';
            bot.style.width = '350px';
            botImg.style.display = 'none';
            sessionStorage.setItem("displayBot", true);
        }
    }
    const sendMessageToChatbot = (data) => {
        const qw = document.getElementById('cex-chatbot');
        qw.contentWindow.postMessage(data, '*');
    }
    if (displayBot === 'true') {
        displayChatbot();
    }
    body.addEventListener('click', (e) => {
        e.target.matches = e.target.matches || e.target.msMatchesSelector;
        if (e.target.matches('#cex-bot-launcher-img')) {
            displayChatbot();
            sendMessageToChatbot({generateNewSession: true});

        }
        ;
    });
    window.addEventListener("message", ({data}) => {
        if (data.closeChatBot) {
            const bot = document.getElementById('cex-chatbot');
            const botImg = document.getElementById('botImageContainer');
            bot.style.display = 'none';
            botImg.style.display = 'block';
            sessionStorage.setItem("displayBot", false);
        }
    });
})();
