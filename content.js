async function getConfig() {
    return fetch(chrome.runtime.getURL("config.json"))
        .then(resp => resp.json());
};

async function getContent() {
    const config = await getConfig();
    return new Promise((resolve, reject) => {
        var node = document.querySelector(config.selector);

        if (node && node.innerText) {
            resolve(node.innerText);
        } else {
            reject(null);
        }
    });
};

chrome.runtime.onMessage.addListener((request, sender, response) => {
    (async () => {
        const { action } = request;
        if (action === "GetContent") {
            try {
                const selection = await getContent();
                response(selection);
            } catch (e) {
                response(e);
            }
        }
        else {
            console.log('Unknown action: ' + action);
            response(null);
        }
    })();

    // Asynchronous response 
    return true;
});

