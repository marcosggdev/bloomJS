<script setup>
import { ref, computed } from 'vue';

const emits = defineEmits(['handleStateChange']);

const maximized = ref(false);
const icon = computed(() => { return (maximized.value) ? 'fullscreen_exit' : 'fullscreen' });
const handleStateChange = () => {
    maximized.value = !maximized.value;
    emits('handleStateChange', maximized.value);
};
</script>

<template>
    <div class="windowbar">
        <button @click="handleStateChange">
            <span class="material-symbols-outlined">{{ icon }}</span>
        </button>
    </div>
</template>

<style scoped>
button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>