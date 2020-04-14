// Include the server in your file
const server = require('server');
const { get, post } = server.router;
const { render } = server.reply;

const controllers = require('./controlles');

server({
    security: {
        csrf: false,
    }},
    [
        get('/', () => render('/public/index.html')),
        get('/redirect.html', () => render('/redirect/index.html')),
        post('/api/token', controllers.token),
        get('/api/token', controllers.token),
        get('/api/user', controllers.user),
    ]
);