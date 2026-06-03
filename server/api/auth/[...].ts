import { createNuxtHandlers } from '@authaction/server-sdk/nuxt';
import {
  defineEventHandler,
  getCookie,
  setCookie,
  deleteCookie,
  getQuery,
  sendRedirect,
  createError,
} from 'h3';

const config = useRuntimeConfig();

const { handler } = createNuxtHandlers(
  {
    domain: config.authactionDomain,
    clientId: config.authactionClientId,
    clientSecret: config.authactionClientSecret,
    redirectUri: config.authactionRedirectUri,
    sessionSecret: config.authactionSessionSecret,
  },
  { defineEventHandler, getCookie, setCookie, deleteCookie, getQuery, sendRedirect, createError },
);

export default handler;
