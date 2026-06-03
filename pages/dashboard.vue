<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { data: session } = await useFetch('/api/auth/session');
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ session?.user?.name }}!</p>
    <p>Email: {{ session?.user?.email }}</p>
    <a href="/api/auth/logout">Logout</a>
  </div>
</template>
