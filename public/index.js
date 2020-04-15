new Vue({
    el: '#app',
    data: {
        isAuthorized: false,
        authWindow: null,
        error: '',
        user: {
            name: '',
            avatarUrl: '',
        }
    },
    created() {
        window.addEventListener('message', this.receiveMessage, false);
    },
    mounted() {
        const accessToken = localStorage.getItem('access_token');
        const tokenType = localStorage.getItem('token_type');

        if (accessToken) {
            this.fetchUser(tokenType, accessToken);
        }
    },
    methods: {
        async fetchUser(tokenType, accessToken) {
            const response = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${tokenType} ${accessToken}`,
                },
            });
            const user = await response.json();
            this.user.name = user.name;
            this.user.avatarUrl = user.avatarUrl;
            this.isAuthorized = true;
        },
        exit() {
            localStorage.clear();
            this.isAuthorized = false;
        },
        openAuthWindow() {
            authWindow = window.open(
                `https://blog-1158.founder-alpha.my.cloud.devmail.ru/app/oauth2/authorize?client_id=frontendhero&redirect_url=${location.href}redirect.html`,
                '',
                `width=500,height=500,left=${window.outerWidth / 2 - 250},top=${window.outerHeight / 2 - 250}`
            );
        },
        receiveMessage(event) {
            fetch('/api/token', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors',
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify({
                    code: event.data.code,
                    redirectUri: `${location.href}redirect.html`,
                }) // body data type must match "Content-Type" header
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        this.error = data.error_description;
                    } else {
                        localStorage.setItem('access_token', data.access_token);
                        localStorage.setItem('refresh_token', data.refresh_token);
                        localStorage.setItem('token_type', data.token_type);

                        this.fetchUser(data.token_type, data.access_token);
                    }
                })
                .catch(error => {
                    console.log('error', error);
                });
        }
    }
});
