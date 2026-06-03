<script setup lang="ts">
const { data: session } = await useFetch('/api/auth/session');
</script>

<template>
  <div>
    <div v-if="session">
      <h1>Welcome, {{ session.user?.name }}!</h1>
      <p>Email: {{ session.user?.email }}</p>
      <a href="/api/auth/logout">Logout</a>
    </div>
    <div v-else>
      <h1>AuthAction Nuxt.js Example</h1>
      <a href="/api/auth/login">Login with AuthAction</a>
    </div>
  </div>
</template>
