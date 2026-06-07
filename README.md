# authaction-nuxtjs-example

A Nuxt.js 3 application demonstrating OAuth2 authentication using [AuthAction](https://app.authaction.com/) with `@authaction/server-sdk`.

## Overview

This application shows how to configure and handle authentication using AuthAction's OAuth2 service in a Nuxt.js application. The setup includes:

- OAuth2 login flow using `@authaction/server-sdk/nuxt` with AuthAction as the OIDC provider
- Secure server-side session management via encrypted cookies
- Protected pages using Nuxt route middleware
- Logout with AuthAction's OIDC logout flow

## Prerequisites

- **Node.js 18+**
- **AuthAction credentials**: `domain`, `clientId`, `clientSecret`, and configured redirect URIs.

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
   AUTHACTION_DOMAIN=your-authaction-tenant-domain
   AUTHACTION_CLIENT_ID=your-authaction-client-id
   AUTHACTION_CLIENT_SECRET=your-authaction-client-secret
   AUTHACTION_REDIRECT_URI=http://localhost:3000/api/auth/callback
   SESSION_SECRET=your-secure-random-string-min-32-chars
   ```

4. **Configure redirect URIs in AuthAction dashboard**:

   - Login redirect URI: `http://localhost:3000/api/auth/callback`
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
   - Navigate to `/dashboard` — unauthenticated users are redirected to the login endpoint.

## Project Structure

```
authaction-nuxtjs-example/
├── server/api/auth/
│   └── [...].ts        # createNuxtHandlers from @authaction/server-sdk/nuxt
├── pages/
│   ├── index.vue       # Home page with login/logout links
│   └── dashboard.vue   # Protected page (auth middleware)
├── middleware/
│   └── auth.ts         # Redirects unauthenticated users to /api/auth/login
├── nuxt.config.ts
├── .env.example
└── package.json
```

## Code Explanation

### `server/api/auth/[...].ts` — Auth Handler

Calls `createNuxtHandlers` from `@authaction/server-sdk/nuxt` with your AuthAction credentials and the h3 primitives (`defineEventHandler`, `getCookie`, `setCookie`, etc.). The returned `handler` processes all `/api/auth/*` routes: `login`, `callback`, `logout`, and `session`.

### `middleware/auth.ts` — Route Middleware

Fetches `/api/auth/session` and redirects unauthenticated users to `/api/auth/login`. Applied per-page with `definePageMeta({ middleware: 'auth' })`.

### `pages/index.vue` — Home Page

Fetches the session from `/api/auth/session` to determine if the user is authenticated. Shows a login or logout link accordingly.

### `pages/dashboard.vue` — Protected Page

Declares `middleware: 'auth'` so only authenticated users can access it. Displays the user's name and email from the session.

## Common Issues

**Redirects not working** — Verify that `AUTHACTION_REDIRECT_URI` registered in AuthAction matches exactly: `http://localhost:3000/api/auth/callback`.

**Session issues** — Ensure `SESSION_SECRET` is set to a long, random string (32+ characters).

**Network errors** — Verify your app can reach `https://{AUTHACTION_DOMAIN}/.well-known/openid-configuration`.

## Contributing

Feel free to submit issues or pull requests if you encounter bugs or have suggestions for improvement!
