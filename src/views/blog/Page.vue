<script setup>
import { defineAsyncComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { convertToComponentName } from '@/js/Utility'
import Navbar from '@/components/Navbar.vue'

const props = defineProps(['slug']);
const name = convertToComponentName(props.slug);

const AsyncComp = defineAsyncComponent(() => {
    return new Promise((resolve, reject) => {
        // ...load component from server
        const path = `./${name || 'Welcome'}.vue`;
        const view = import(path /* @vite-ignore */);
        resolve(view);
    })
});
</script>

<template>
    <div class="blog">
        <AsyncComp />
        <Navbar :routes="[
            {
                name: 'Welcome',
                href: '/blog/welcome',
                src: '/src/assets/img/model.jpg',
                subroutes: [
                    {
                        name: 'How it started',
                        href: '#howitstarted',
                        src: '/src/assets/img/icons/book.png'
                    },
                ]
            },
        ]" />
    </div>
</template>

<style scoped>
.blog {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    padding: 4em;
    gap: 4em;
}
.blog-content {
    min-height: 50vh;
}
.navbar {
    position: relative;
    padding: 1em;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: var(--dark-darker);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--light);
    margin: 0;
    width: 20%;
    flex-grow: 1;
    padding: 4em;
    box-sizing: border-box;
    gap: 2em;
}
/*reset attributes*/
.blog .navbar {
    top: auto;
    left: auto;
    right: auto;
    transform: none;
}
.navbar ul li button span.unfolded {
    left: 100%;
    right: auto;
    margin-right: 0;
    margin-left: 150%;
}

#content>section {
    position: relative;
    max-width: 900px;
    background-color: white;
    border-radius: 20px;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
}

#content>section>.blog-content {
    padding: 4em;
}

#content {
    grid-column: 2;
    flex-grow: 1;
}
section {
    border-radius: 20px;
    width: 70%;
    max-width: 1040px;
    box-sizing: border-box;
}
</style>