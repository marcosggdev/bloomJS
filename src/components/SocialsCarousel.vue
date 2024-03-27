<script setup>
import { ref, onMounted } from 'vue'
import SocialLink from '@/components/SocialLink.vue'
import { useUnfold } from '@/components/composables/useAdjustBoxToParent'
const props = defineProps(['socials', 'parentId']);
const linksContainer = ref(null);

onMounted(() => {
    const links = linksContainer.value.querySelectorAll('li a');
    Array.from(links).forEach(link => {
        const span = link.querySelector('span');
        link.addEventListener('mouseenter', () => {
            const parent = document.getElementById(props.parentId);
            useUnfold(span, parent);
            span.classList.add('bounce-translate');
        });
        link.addEventListener('mouseleave', () => {
            span.classList.remove('unfolded');
            span.classList.remove('bounce-translate');
        });
    });
});
</script>

<template>
    <ul class="socials-carousel" ref="linksContainer">
        <li v-for="social in props.socials">
            <SocialLink :social="social" />
        </li>
    </ul>
</template>

<style scoped>
ul.socials-carousel {
    position: relative;
    display: flex;
    grid-template-rows: 1fr;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 10px;
    width: 100%;
    align-items: center;
    justify-content: center;
}
ul li a {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    position: relative;
    gap: 0;
    text-decoration: none;
    color: var(--dark-darker);
}
ul li a span {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    overflow: hidden;
    margin-left: 0;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    pointer-events: none;
}

ul li a span.unfolded {
    top: -150%;
    left: 150%;
    width: auto;
    background-color: var(--light);
    border-radius: 20px;
    padding: 20px;
}
</style>