<script setup>
import { RouterLink } from 'vue-router'
import nav from '@/data/nav.json'
</script>

<template>
<div class="MyNav">
    <nav>
        <RouterLink v-for="link in nav" :to="link.href">{{ link.name }}</RouterLink>
    </nav>
</div>
</template>

<style scoped>
nav {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--primary);
    padding: 10px;
}

nav a {
    color: var(--light);
    text-decoration: none;
}

nav a.router-link-active {
    color: rgb(191, 191, 191);
    cursor: default;
}
</style>