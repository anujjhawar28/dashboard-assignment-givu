import { defineStore } from 'pinia';

interface UserPayloadInterface {
    username: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        userInfo: {}
    }),
    actions: {
        async authenticateUser({ username, password }: UserPayloadInterface) {
            const { data, pending }: any = await useFetch('https://dummyjson.com/auth/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    username,
                    password,
                },
            });
            this.loading = pending;

            if (data.value) {
                this.userInfo = data.value;
                const token = useCookie('token');
                token.value = data?.value?.token; // set token to cookie
                this.authenticated = true; // set authenticated  state value to true
            }
        },
        logUserOut() {
            const token = useCookie('token');
            this.authenticated = false;
            token.value = null; // clear the token cookie
        },
    },
});