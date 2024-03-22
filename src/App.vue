<script setup>
import { RouterLink } from 'vue-router'
import Logo from '@/views/graphics/Logo.vue'
</script>

<template>
  <header>
    <Logo />
    <div class="wrapper">
      <h1>BloomJS</h1>
      <h2>Project migrated from simple PHP to Vite + Vue 3</h2>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/scene">Scene</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  gap: 4em;
  padding: 4em;
  box-sizing: border-box;
}
</style>
