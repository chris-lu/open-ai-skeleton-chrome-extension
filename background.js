// Constants
async function getConfig() {
    return fetch(chrome.runtime.getURL("config.json"))
        .then(resp => resp.json());
};

const getToken = async () => {
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

const getResponse = async (question) => {
    const config = await getConfig();
    return new Promise(async (resolve, reject) => {
        try {
            const accessToken = await getToken();
            fetch("https://api.openai.com/v1/chat/completions", {
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
                    model: config.model,
                    temperature: 1
                })
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    resolve(result?.choices[0]?.message.content);
                });

        } catch (e) {
            reject(e);
        }
    });
};

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {
        const question = msg.question;
        getResponse(question).then(async answer => {
            console.log(answer);
            port.postMessage(answer);
        }).catch((e) => { port.postMessage({ error: e.toString() }); });
    });
});