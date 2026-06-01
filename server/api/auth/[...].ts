import { NuxtAuthHandler } from '#auth'
import type { AuthOptions } from 'next-auth'

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthOptions = {
  secret: runtimeConfig.authJs.secret,
  providers: [
    {
      id: 'authaction',
      name: 'AuthAction',
      type: 'oauth',
      wellKnown: `https://${process.env.AUTHACTION_TENANT_DOMAIN}/.well-known/openid-configuration`,
      authorization: { params: { scope: 'openid profile email' } },
      idToken: true,
      checks: ['pkce', 'state'],
      clientId: process.env.AUTHACTION_CLIENT_ID,
      clientSecret: runtimeConfig.authaction.clientSecret,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
