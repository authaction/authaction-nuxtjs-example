export default defineNuxtRouteMiddleware(async () => {
  const { data: session } = await useFetch('/api/auth/session');

  if (!session.value) {
    return navigateTo('/api/auth/login');
  }
});
