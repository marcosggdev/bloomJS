<script setup>
import { ref, onMounted, computed } from 'vue'
const props = defineProps(['title']);

const unfolded = ref(false);
const symbol = computed(() => { return (unfolded.value) ? 'arrow_drop_up' : 'arrow_drop_down' });
const submenu = ref(null);
const content = ref(null);

const handleUnfold = () => {
    unfolded.value = !unfolded.value;
};
</script>

<template>
<div ref="submenu" class="submenu">
    <div class="header">
        <button @click="handleUnfold" class="arrow-container"><span class="arrow material-symbols-outlined">{{ symbol }}</span></button>
        <slot name="header"></slot>
    </div>
    <div ref="content" class="content" :class="{'unfolded': !unfolded}">
        <slot name="content"></slot>
    </div>
</div>
</template>

<style scoped>
.submenu :deep(ul) {
    justify-content: center;
}

.submenu {
    background-color: var(--light);
    color: var(--dark-darker);
    box-shadow: 0px 1px 15px black;
}
.header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--light-darker);
}

.content {
    overflow: hidden;
    height: 0;
    padding: 0;
    transition: all 0.25s;
    background-color: var(--dark);
    color: var(--light);
    overflow-y: scroll;
    max-height: 250px;
}

.content:not(.unfolded) {
    height: auto;
    padding: 10px;
}

.arrow-container {
    background-color: var(--light-darker);
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    transition: all 0.25s;
    filter: drop-shadow(0px 0px 5px black);
}
.arrow-container:hover {
    transform: rotateZ(5deg) scale(1.1);
}

:deep(h2), :deep(h3) {
    font-family: 'Math';
}
:deep(h3) {
    font-weight: bold;
}
</style>