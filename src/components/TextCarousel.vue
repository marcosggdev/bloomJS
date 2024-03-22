<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['texts']);
const i = ref(0);
const text = computed(() => props.texts[i.value]);
let interval = setInterval(() => {
    if (i.value + 1 < props.texts.length) {
        i.value++;
    } else {
        i.value = 0;
    }
}, 4000);
const setCurrent = (index) => {
    i.value = index;
    clearInterval(interval);
    interval = setInterval(() => {
        if (i.value + 1 < props.texts.length) {
            i.value++;
        } else {
            i.value = 0;
        }
    }, 4000);
};
</script>

<template>
    <div class="text-carousel">
        <p>{{ text }}</p>
        <div class="button-container">
            <button v-for="(text, index) in props.texts" :class="{ 'current': index === i }"
                @click="setCurrent(index)"></button>
        </div>
    </div>
</template>

<style scoped>
.text-carousel {
    display: flex;
    flex-direction: column;
    gap: 1em;
    text-align: justify;
    align-items: center;
    margin-bottom: 2em;
}

.button-container {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2em;
}

button {
    background-color: var(--light);
    transition: background-color 0.25s;
    width: 15px;
    height: 15px;
    border-radius: 15px;
}

button.current {
    background-color: var(--dark);
}
</style>