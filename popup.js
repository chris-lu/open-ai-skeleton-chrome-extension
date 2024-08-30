document.addEventListener("DOMContentLoaded", async () => {
    const output = document.getElementById('output');
    const messages = document.getElementById('messages');

    output.addEventListener('click', selectText);

    function selectText(event) {
        var range = document.createRange();
        range.selectNode(event.target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }

    async function display(answer) {
        output.classList.add('hidden');
        messages.classList.add('hidden');

        if (typeof answer === "string") {
            output.classList.remove('hidden');
            output.innerHTML = answer;
        } else if (answer instanceof ReferenceError) {
            messages.classList.remove('hidden');
            messages.innerHTML = 'Please connect to <a target="_blank" href="https://chat.openai.com/chat">chat.openai.com</a> or try to log out and log in again.';
            setTimeout(() => { chrome.tabs.create({ url: "https://chat.openai.com/chat" }); }, 3000);
        }
        else {
            const reason = answer?.error || 'unknown';
            // Object are destructured. It's not an exception anymore. 
            messages.classList.remove('hidden');
            messages.innerHTML = 'Something went wrong (' + reason + '). Please try to reconnect to <a target="_blank" href="https://chat.openai.com/chat">chat.openai.com</a>.';
        }
    };

    async function getData(textContent) {
        console.log('textContent', textContent);
        if (textContent?.length) {
            const port = chrome.runtime.connect();
            port.postMessage({ question: textContent });
            port.onMessage.addListener((msg) => display(msg));
        }
        else {
            output.classList.add('hidden');
            messages.classList.remove('hidden');
            messages.innerHTML = 'No interresting content was found on the page.';
        }
    };

    async function requestContent() {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        chrome.tabs.sendMessage(tab.id, { action: "GetContent" }, getData);
    };

    requestContent();
});