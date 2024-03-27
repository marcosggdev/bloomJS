<template>
<div class="ImgWithHorizontalText">
    <slot name="image"></slot>
    <slot name="content"></slot>
</div>
</template>

<style scoped>
.ImgWithHorizontalText {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding: 2em;
    gap: 2em;
}
.ImgWithHorizontalText :deep(img) {
    max-width: 400px;
    max-height: 400px;
}
</style>