<script setup>
const props = defineProps(['src']);
</script>

<template>
    <div class="blog-header" :style="`background-image: url(${props.src})`">
        <slot  name="header"></slot>
        <slot name="content"></slot>
    </div>
</template>

<style scoped>
.blog-header::before {
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
    border-radius: 20px 20px 0px 0px;
    z-index: -1;
}
.blog-header {
    min-height: 50vh;
    width: 100%;
    border-radius: 20px 20px 0px 0px;
    padding: 4em;
    position: relative;
    color: var(--light);
    background-size: cover;
    background-attachment: fixed;
    background-position: 50%;
    z-index: 0;
}
</style>