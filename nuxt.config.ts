// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/color-mode', '@pinia/nuxt'],
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
  },
  runtimeConfig: {
    public: {
      apiSecret: 'ATmVldIvmOu0txycNL_5hjVomGxKiDugDXHNDNh3Tk9AaeUeUA',
      apiBase: 'https://crudapi.co.uk/api/v1'
    }
  }
})