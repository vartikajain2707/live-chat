(() => {
    const body = document.body;
    const siteid = document.currentScript.getAttribute('siteid');
    var displayBot = sessionStorage.getItem("displayBot");
    const chatbotSrc = `https://my.cityexperiences.com/chat/?siteid=${siteid}`;
    const launcherHtml = document.createElement('div');
    launcherHtml.innerHTML = `<div id="cex-bot-launcher" style="position: fixed; bottom: 3vh; right: 3vh; cursor: pointer; z-index: 10000;">
            <iframe id="cex-chatbot" src="${chatbotSrc}" width="0" height="0" frameborder="0" style="border-radius: 15px; border: 1px solid lightgrey"></iframe>
            <img id="cex-bot-launcher-img" style="position: fixed; bottom: 3vh; right: 3vh; border: 1px solid #1546a8; border-radius: 50%; padding: 5px; background-color: #ffffff; box-shadow: 2px 2px 4px black;" src="https://vartika-hornblower-assets.s3.us-west-2.amazonaws.com/data/${siteid}Logo.png" width="50" height="50">
        </div>`;
    body.appendChild(launcherHtml);
    const displayChatbot = () => {
        const bot = document.getElementById('cex-chatbot');
        const botImg = document.getElementById('cex-bot-launcher-img');
        if (bot) {
            bot.style.display = 'block';
            bot.style.height = '600px';
            bot.style.width = '350px';
            botImg.style.display = 'none';
            sessionStorage.setItem("displayBot", true);
        }
    }
    if (displayBot === 'true') {
        displayChatbot();
    }
    body.addEventListener('click', (e) => {
        e.target.matches = e.target.matches || e.target.msMatchesSelector;
        if (e.target.matches('#cex-bot-launcher-img')) {
            displayChatbot();
        }
        ;
    });
    window.addEventListener("message", ({data}) => {
        if (data.closeChatBot) {
            const bot = document.getElementById('cex-chatbot');
            const botImg = document.getElementById('cex-bot-launcher-img');
            bot.style.display = 'none';
            botImg.style.display = 'block';
            sessionStorage.setItem("displayBot", false);
        }
        if (data.closeChatBotLoader) {
            console.log({closeChatBotLoader: data.closeChatBotLoader});
        }
    });
})();
