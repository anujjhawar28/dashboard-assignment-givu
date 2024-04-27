import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        loading: false,
    }),
    actions: {
        async getUsers() {
            try {
                const runtimeConfig = useRuntimeConfig();
                const { removeKeysFromArray } = useUtils();
                const { apiBase, apiSecret } = runtimeConfig.public;
                this.loading = true;
                const response = await fetch(`${apiBase}/user`, {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiSecret}`, },
                });
                const data = await response.json();
                if (data) {
                    this.loading = false;
                    this.users = removeKeysFromArray(data.items, ["_created", "_data_type", "_self_link", "_is_deleted", "_user", "_is_deleted", "_modified"]) as any;
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                throw new Error('Failed to fetch users');
            }
        },
        async removeUser(userId: string) {
            try {
                this.loading = true;
                const runtimeConfig = useRuntimeConfig();
                const { apiBase, apiSecret } = runtimeConfig.public;
                const response = await fetch(`${apiBase}/user/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiSecret}`
                    }
                });
                const data = await response.json();
                if (data) {
                    this.loading = false;
                }
                return data;
            } catch (error) {
                console.error('Error deleting user:', error);
                throw new Error('Failed to delete the user');
            }
        }
    },
});