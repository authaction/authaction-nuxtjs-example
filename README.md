# authaction-nuxtjs-example

A Nuxt.js 3 application demonstrating OAuth2 authentication using [AuthAction](https://app.authaction.com/) with `@sidebase/nuxt-auth`.

## Overview

This application shows how to configure and handle authentication using AuthAction's OAuth2 service in a Nuxt.js application. The setup includes:

- OAuth2 login flow using `@sidebase/nuxt-auth` with AuthAction as the OIDC provider
- Secure session management via JWT
- Protected pages using Nuxt route middleware
- Logout with AuthAction's OIDC logout flow

## Prerequisites

- **Node.js 18+**
- **AuthAction credentials**: `tenantDomain`, `clientId`, `clientSecret`, and configured redirect URIs.

## Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:authaction/authaction-nuxtjs-example.git
   cd authaction-nuxtjs-example
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure your AuthAction credentials**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and replace the placeholders:

   ```env
   AUTHACTION_TENANT_DOMAIN=your-authaction-tenant-domain
   AUTHACTION_CLIENT_ID=your-authaction-client-id
   AUTHACTION_CLIENT_SECRET=your-authaction-client-secret
   NUXT_SECRET=your-secure-random-string
   NUXT_AUTH_ORIGIN=http://localhost:3000
   ```

4. **Configure redirect URIs in AuthAction dashboard**:

   - Login redirect URI: `http://localhost:3000/api/auth/callback/authaction`
   - Logout redirect URI: `http://localhost:3000`

## Usage

1. **Start the development server**:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

2. **Testing Authentication**:
   - Navigate to `http://localhost:3000` and click **Login with AuthAction**.
   - After login you are redirected back with your name and email shown.
   - Click **Logout** to end the session.
   - Navigate to `/dashboard` — unauthenticated users are redirected to `/login`.

## Project Structure

```
authaction-nuxtjs-example/
├── server/api/auth/
│   └── [...].ts        # NuxtAuthHandler with AuthAction provider
├── pages/
│   ├── index.vue       # Home page with login/logout
│   └── dashboard.vue   # Protected page (auth middleware)
├── middleware/
│   └── auth.ts         # Redirects unauthenticated users
├── nuxt.config.ts
├── .env.example
└── package.json
```

## Code Explanation

### `server/api/auth/[...].ts` — Auth Handler

Configures `@sidebase/nuxt-auth` with AuthAction as an OIDC provider using the `wellKnown` discovery endpoint. The `jwt` callback stores the access token and the `session` callback exposes it to the client.

### `middleware/auth.ts` — Route Middleware

Redirects unauthenticated users to `/login`. Applied per-page with `definePageMeta({ middleware: 'auth' })`.

### `pages/index.vue` — Home Page

Uses the `useAuth()` composable to access session state and call `signIn('authaction')` / `signOut()`.

### `pages/dashboard.vue` — Protected Page

Declares `middleware: 'auth'` so only authenticated users can access it.

## Common Issues

**Redirects not working** — Verify that the callback URL registered in AuthAction matches exactly: `http://localhost:3000/api/auth/callback/authaction`.

**Session issues** — Ensure `NUXT_SECRET` is set to a long, random string.

**Network errors** — Verify your app can reach `https://{AUTHACTION_TENANT_DOMAIN}/.well-known/openid-configuration`.

## Contributing

Feel free to submit issues or pull requests if you encounter bugs or have suggestions for improvement!
