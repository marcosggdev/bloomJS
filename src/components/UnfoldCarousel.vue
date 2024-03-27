<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['data']);

const dataContainer = ref(null);
onMounted(() => {
    const lis = dataContainer.value.querySelectorAll('li');
    Array.from(lis).forEach(li => {
        const span = li.querySelector('span');
        li.addEventListener('mouseenter', () => { span.classList.add('unfolded') });
        li.addEventListener('mouseleave', () => { span.classList.remove('unfolded') });
    });
});
</script>

<template>
    <ul ref="dataContainer">
        <li v-for="obj in data"><img class="md-icon" :src="obj.src" alt=""><span class="description unfolded">{{ obj.description }}</span></li>
    </ul>
</template>

<style scoped>
ul li img {
    transition: all 0.25s;
    padding: 10px;
}

ul li {
    position: relative;
}

ul li img:hover {
    transform: scale(1.1) rotateZ(5deg);
    border-radius: 10px;
    background-color: var(--dark);
}

ul li span {
    position: absolute;
    top: 0;
    left: 0;
    height: auto;
    width: 0;
    transition: all 0.25s;
    overflow: hidden;
    z-index: 2;
    pointer-events: none;
}

ul li span.unfolded {
    width: 400%;
    top: 100%;
    padding: 1em;
    background-color: var(--light);
    color: var(--dark-darker);
    border-radius: 20px;
    z-index: 10;
    text-align: left;
}
</style>