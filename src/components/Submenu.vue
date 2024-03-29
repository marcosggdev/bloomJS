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
.submenu {
    background-color: var(--light);
    color: var(--dark-darker);
    box-shadow: 0px 1px 15px black;
}
.header {
    position: relative;
}

.content {
    overflow: hidden;
    height: 0;
}

.content:not(.unfolded) {
    height: auto;
}

.arrow-container {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-100%);
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
    transform: translateX(-100%) rotateZ(5deg) scale(1.1);
}
</style>