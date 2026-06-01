export default defineNuxtConfig({
  modules: ['@sidebase/nuxt-auth'],

  auth: {
    baseURL: process.env.NUXT_AUTH_ORIGIN,
    provider: {
      type: 'authjs',
    },
  },

  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_SECRET,
    },
    authaction: {
      clientSecret: process.env.AUTHACTION_CLIENT_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_AUTH_ORIGIN,
      },
    },
  },
})
