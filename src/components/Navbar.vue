<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
const props = defineProps(['routes']);

const scrollTo = (path) => {
    window.scrollTo(0, document.querySelector(path).getBoundingClientRect().top + window.scrollY);
};

const ul = ref(null);

onMounted(() => {
    const buttons = ul.value.querySelectorAll('li button');
    Array.from(buttons).forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.querySelector('span').classList.add('unfolded');
            button.querySelector('span').classList.add('bounce-translate');
        });
        button.addEventListener('mouseleave', () => {
            button.querySelector('span').classList.remove('unfolded');
            button.querySelector('span').classList.remove('bounce-translate');
        });
    });
});

const isAnchor = (path) => {
    const exp = new RegExp(/#[a-z0-9]+(-[a-z0-9]+)*$/, 'i');
    return exp.test(path);
}

</script>

<template>
    <div class="navbar">
        <h3>Navigation</h3>
        <ul ref="ul">
            <li v-for="anchor in props.routes">
                <button v-if="isAnchor(anchor.href)" @click="scrollTo(anchor.href)">
                    <template v-if="anchor.src">
                        <span>{{ anchor.name }}</span>
                        <div class="image" :style="`background-image: url(${anchor.src})`"></div>
                    </template>
                    <template v-else>
                        {{ anchor.name }}
                    </template>
                </button>
                <RouterLink v-else :to="anchor.href">
                    <span class="route">{{ anchor.name }}</span>
                    <div class="route-anchors">
                        <button v-for="subroute in anchor.subroutes" @click="scrollTo(subroute.href)">
                            <span>{{ subroute.name }}</span>
                            <div v-if="subroute.src" class="image-container"><div class="image" :style="`background-image: url(${subroute.src})`"></div></div>
                            <div v-else class="image-container"><div class="image" :style="'background-image: url(/src/assets/img/icons/book.png)'"></div></div>
                        </button>
                    </div>
                </RouterLink>
            </li>
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
a[class*='router-link-active'] > .route {
    text-decoration: none;
    background-color: rgb(53, 42, 49);
}
a[class*='router-link-active']:hover > .route {
    background-color: rgb(53, 42, 49);
    cursor: default;
    transform: scale(1.05) rotateZ(-3deg);
    border-radius: 0px;
}
a[class*='router-link-active']:active {
    text-decoration: none;
}
a > .route {
    display: flex;
    transform: scale(1.05) rotateZ(-3deg);
    text-decoration: none;
    color: var(--light);
    transition: all 0.25s;
    padding: 10px;
    width: 100%;
    background-color: rebeccapurple;
}
a > .route:hover {
    background-color:#6e5f7e;
    border-radius: 10px;
    transform: scale(1.2) rotateZ(3deg);
}
.route-anchors {
    display: flex;
    align-items: center;
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
    width: 50px;
    height: 50px;
    position: relative;
    padding: 10px;
    transition: all 0.25s;
    cursor: pointer;
}
button:hover {
    border-radius: 10px;
    transform: scale(1.05) rotateZ(5deg);
}
button .image-container {
    padding: 10px;
    width: 100%;
    height: 100%;
    position: relative;
}
button div.image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    background-size: cover;
    background-position: 50%;
    padding: 10px;
}
button > span {
    position: absolute;
}
</style>