const fetch = require('node-fetch');

function fetchToken(code, redirectUri) {
    const hash = Buffer.from("frontendhero:12345").toString('base64');

    const params = new URLSearchParams();

    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('grant_type', 'authorization_code');

    return fetch('https://blog-1158.founder-alpha.my.cloud.devmail.ru/oauth/server/token', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${hash}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: params, // body data type must match "Content-Type" header
    });
}

function fetchUser(token) {
    return fetch('https://api.founder-alpha.my.cloud.devmail.ru/dev/v1/users/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })
}

module.exports = {
    fetchUser,
    fetchToken,
};
