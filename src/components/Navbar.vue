<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['anchors']);

const scrollTo = (path) => {
    window.scrollTo(0, document.querySelector(path).getBoundingClientRect().top + window.scrollY);
};

const ul = ref(null);

onMounted(() => {
    const buttons = ul.value.querySelectorAll('li button');
    Array.from(buttons).forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.querySelector('span').classList.add('unfolded');
            button.querySelector('span').classList.add('bounce-rotate');
        });
        button.addEventListener('mouseleave', () => {
            button.querySelector('span').classList.remove('unfolded');
            button.querySelector('span').classList.remove('bounce-rotate');
        });
    });
});

</script>

<template>
    <div class="navbar">
        <h4>Navigation</h4>
        <ul ref="ul">
            <li v-for="anchor in props.anchors"><button @click="scrollTo(anchor.href)"><span>{{ anchor.name }}</span><img :src="anchor.src" alt=""></button></li>
        </ul>
    </div>
</template>

<style scoped>
.navbar {
    position: fixed;
    right: 0;
    height: 60%;
    width: fit-content;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
    margin: 2em;
    z-index: 2;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: var(--light);
}
ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0;
    align-items: flex-end;
}
ul li button span {
    display: flex;
    align-items: center;
    width: 0;
    overflow: hidden;
    color: var(--light);
}
ul li button span.unfolded {
    width: auto;
    background-color: var(--light);
    color: var(--dark-darker);
    top: -100%;
    right: 0;
    margin-right: 125%;
    width: auto;
    height: 100%;
    position: absolute;
    padding: 2em;
    border-radius: 20px;
}
button {
    background: none;
    border-radius: 50px;
    border: none;
    background-color: white;
    width: 50px;
    height: 50px;
    position: relative;
    padding: 10px;
    transition: all 0.25s;
}
button:hover {
    border-radius: 10px;
    transform: scale(1.05) rotateZ(5deg);
}
button img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50px;
}
</style>