<script setup>
const props = defineProps(['src']);
</script>

<template>
    <div class="card">
        <div class="background" :style="`background-image: url(${props.src})`"></div>
        <slot name="header"></slot>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped>
.card::before {
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: black;
    opacity: 0.4;
    border-radius: 20px;
}
.card {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 20px;
    color: var(--light);
    background-position: 50%;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2em;
    overflow: hidden;
}

.card :deep(h3) {
    display: flex;
    width: 100%;
    padding: 2em;
    justify-content: center;
    position: relative;
}

.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    z-index: -2;
    background-size: cover;
    background-position: 50%;
    transition: transform 0.25s;
}

.card:hover .background {
    transform: scale(1.5);
}
</style>