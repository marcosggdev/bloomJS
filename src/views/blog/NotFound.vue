<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="not-found">
        <div class="col">
            <h1>Ups!</h1>
            <p>It seems that the page you tried to see doesn't exist</p>
            <RouterLink to="/">Home</RouterLink>
        </div>
        <div class="error-image" :style="`background-image: url('/src/assets/img/404.jpg')`"></div>
    </div>
</template>

<style scoped>
.not-found {
    background-color: var(--dark-darker);
    color: var(--light);
    padding: 4em;
    min-height: 50vh;
    display: flex;
    justify-content: stretch;
}
.error-image {
    background-position: 50%;
    background-size: cover;
    border-radius: 20px;
    transform: rotateZ(3deg);
    width: 300px;
    height: 300px; 
    overflow:hidden;
    transition: all 0.25s;
}
.error-image:hover {
    transform: rotateZ(3deg) scale(1.05);
}
.not-found > * {
    padding: 4em;
}
a, a:visited, a:focus {
    color: var(--light);
}
</style>