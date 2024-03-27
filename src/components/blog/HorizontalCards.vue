<script setup>
import Card from '@/components/blog/Card.vue'
</script>

<template>
<div class="card-examples">
<slot></slot>
</div>
</template>

<style scoped>
.card-examples {
    display: flex;
    align-items: center;
    padding: 2em;
    gap: 2em;
}
</style>