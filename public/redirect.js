let arguments = {
    code: '',
};
window.location.search
    .replace('?', '')
    .split('&')
    .forEach(str => {
        const [key, value] = str.split('=');
        arguments[key] = value;
    });

window.opener.postMessage({code: arguments.code});

window.close();