export default defineNuxtConfig({
  runtimeConfig: {
    authactionDomain: process.env.AUTHACTION_DOMAIN,
    authactionClientId: process.env.AUTHACTION_CLIENT_ID,
    authactionClientSecret: process.env.AUTHACTION_CLIENT_SECRET,
    authactionRedirectUri: process.env.AUTHACTION_REDIRECT_URI,
    authactionSessionSecret: process.env.SESSION_SECRET,
  },
})
