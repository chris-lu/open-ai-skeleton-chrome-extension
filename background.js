// Constants
async function getConfig() {
    return fetch(chrome.runtime.getURL("config.json"))
        .then(resp => resp.json());
};

async function getToken() {
    return new Promise(async (resolve, reject) => {
        const resp = await fetch("https://chatgpt.com/api/auth/session");
        if (resp.status === 403) {
            reject(new Error('Unauthorized; Status: ' + resp.status));
        }
        try {
            const data = await resp.json();
            if (!data.accessToken) {
                reject(new Error('No token.'));
            }
            resolve(data.accessToken);
        } catch (err) {
            reject(err);
        }
    });
};

async function getResponse(question) {
    const config = await getConfig();
    console.log("Open AI request content:", question);
    return new Promise(async (resolve, reject) => {
        try {
            const accessToken = await getToken();
            const resp = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "user",
                            content: config.context.join("\n") + "\n\n" + question
                        }
                    ],
                    model: config?.model || 'gpt-4o-mini',
                    temperature: config?.temperature || 1
                })
            });
            const data = await resp.json();
            console.log("Open AI answer:", data);
            resolve(data?.choices[0]?.message.content);
        } catch (e) {
            reject(e);
        }
    });
};

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {
        const question = msg.question;
        getResponse(question).then(async answer => {
            port.postMessage(answer);
        }).catch((e) => {
            // Object will be destructured. It won't be an exception anymore.
            port.postMessage({ error: e.toString() });
        });
    });
});