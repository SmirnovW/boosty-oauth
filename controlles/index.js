const api = require('../api');

async function token(ctx) {
    const response = await api.fetchToken(ctx.data.code, ctx.data.redirectUri);
    return response.json();
}

async function user(ctx) {
    const response = await api.fetchUser(ctx.headers.authorization);
    return response.json();
}

module.exports = {
    user,
    token,
};
