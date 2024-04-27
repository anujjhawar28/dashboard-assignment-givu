export default defineNuxtRouteMiddleware((to) => {
    const isLoggedIn = false;

    if (isLoggedIn) {
        navigateTo(to.fullPath);
    }
    navigateTo("login")
})