<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { data: session, signOut } = useAuth()
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ session?.user?.name }}!</p>
    <p>Email: {{ session?.user?.email }}</p>
    <button @click="signOut({ callbackUrl: '/' })">Logout</button>
  </div>
</template>
