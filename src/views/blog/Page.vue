<script setup>
import { defineAsyncComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { convertToComponentName } from '@/js/Utility'

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
        <main>
            <aside id="navbar">
                <h3>Index</h3>
                <ul>
                    <li>
                        <RouterLink to="/blog/welcome">Welcome</RouterLink>
                    </li>
                </ul>
            </aside>
            <div id="content">
                <AsyncComp />
            </div>
        </main>
    </div>
</template>

<style>
h1,
h2,
h3 {
    font-family: "Black Ops One";
}
</style>

<style scoped>
.blog {
    min-width: 100vw;
    min-height: 100vh;
}

main {
    display: flex;
    gap: 2em;
    padding: 2em;
    min-height: 100vh;
    align-items: stretch;
    justify-content: space-between;
    box-sizing: border-box;
}

aside {
    padding: 1em;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: grey;
    width: 300px;
}

aside ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    color: var(--light);
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

#navbar {
    background-color: var(--dark);
    color: var(--light);
}

#navbar ul li {
    background-color: white;
    border-radius: 10px;
}

#navbar ul li a {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 10px;
    text-decoration: none;
    color: var(--dark);
}

#navbar ul li a.router-link-active {
    background-color: var(--light-darker);
    cursor: default;
}
#navbar ul li a:active {
    color: var(--dark);
}
</style>