<script setup>
const props = defineProps(['src']);
</script>

<template>
<div class="ImgWithHorizontalText">
    <div class="background" :style="`background-image: url(${props.src})`"></div>
    <div class="content">
        <slot name="content"></slot>
    </div>
</div>
</template>

<style scoped>
.ImgWithHorizontalText {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    position: relative;
    padding: 2em;
    max-width: 1040px;
}
.background {
    position: relative;
    content: " ";
    width: 100%;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    flex-grow: 1;
    border-radius: 20px;
    min-width: 300px;
}
.content {
    display: flex;
    flex-direction: column;
    padding: 4em;
    box-sizing: border-box;
    width: 70%;
}
</style>