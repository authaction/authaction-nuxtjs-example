<script setup lang="ts">
const { data: session, status, signIn, signOut } = useAuth()
</script>

<template>
  <div>
    <div v-if="status === 'authenticated'">
      <h1>Welcome, {{ session?.user?.name }}!</h1>
      <p>Email: {{ session?.user?.email }}</p>
      <button @click="signOut({ callbackUrl: '/' })">Logout</button>
    </div>
    <div v-else>
      <h1>AuthAction Nuxt.js Example</h1>
      <button @click="signIn('authaction')">Login with AuthAction</button>
    </div>
  </div>
</template>
