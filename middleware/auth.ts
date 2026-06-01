export default defineNuxtRouteMiddleware(() => {
  const { status } = useAuth()

  if (status.value === 'unauthenticated') {
    return navigateTo('/login')
  }
})
