<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['social']);

const link = ref(null);

onMounted(() => {
    const span = link.value.querySelector('span');
        link.value.addEventListener('mouseenter', () => {
            span.classList.add('unfolded');
            span.classList.add('bounce-translate');
        });
        link.value.addEventListener('mouseleave', () => {
            span.classList.remove('unfolded');
            span.classList.add('bounce-translate');
        });
});
</script>

<template>
<a ref="link" class="social-link" :href="social.href" target="_blank"><img class="sm-icon" :src="social.src" :alt="`Link that redirects to author's ${social.name}`"><span>{{ social.name }}</span></a>
</template>

<style scoped>
a {
    display: flex;
    width: fit-content;
    align-items: center;
    position: relative;
    gap: 0;
    text-decoration: none;
    color: var(--dark-darker);
}
a span {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    overflow: hidden;
    margin-left: 0;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    pointer-events: none;
}

a span.unfolded {
    top: auto;
    bottom: 125%;
    left: 125%;
    width: auto;
    background-color: var(--light);
    border-radius: 20px;
    padding: 20px;
    color: var(--dark-darker);
    height: auto;
}
</style>