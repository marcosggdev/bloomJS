<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['socials']);
const linksContainer = ref(null);

onMounted(() => {
    const links = linksContainer.value.querySelectorAll('li a');
    Array.from(links).forEach(link => {
        const span = link.querySelector('span');
        link.addEventListener('mouseenter', () => {
            span.classList.add('unfolded');
        });
        link.addEventListener('mouseleave', () => {
            span.classList.remove('unfolded');
        });
    });
});
</script>

<template>
    <ul ref="linksContainer">
        <li v-for="social in props.socials">
            <a class="social-link" :href="social.href" target="_blank"><img :src="social.src" :alt="`Link that redirects to author's ${social.name}`"><span>{{ social.name }}</span></a>
        </li>
    </ul>
</template>

<style scoped>
ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}
ul li a {
    gap: 0;
    text-decoration: none;
}
ul li a span {
    width: 0;
    overflow: hidden;
    margin-left: 0;
    transition: all 0.25s;
}

ul li a span.unfolded {
    width: 100%;
    margin-left: 10px;
}
</style>