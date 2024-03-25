<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Logo from '@/components/graphics/Logo.vue'

const slide_1 = ref(null);
const slide_2 = ref(null);
const slide_3 = ref(null);

onMounted(() => {
  const slides = [slide_1, slide_2, slide_3];
  for (let i = 0; i < slides.length; i++) {
    setTimeout(() => {
      slides[i].value.classList.add('slide-down');
    }, i * 500);
  }
});
</script>
<template>
    <header>
        <Logo />
        <div class="wrapper">
            <h1 ref="slide_1" class="animated-opacity">BloomJS</h1>
            <p ref="slide_2" class="animated-opacity">Project migrated from simple PHP to Vite + Vue 3</p>
            <nav ref="slide_3" class="animated-opacity">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/scene">Scene</RouterLink>
                <RouterLink to="/blog">Blog</RouterLink>
            </nav>
        </div>
    </header>
</template>

<style scoped>
header {
    position: relative;

    display: flex;
    align-items: center;
    gap: 4em;
    padding: 4em;
    box-sizing: border-box;
    color: var(--light);

    z-index: 0;
}

nav {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--primary);
    padding: 10px;
}

nav a {
    color: var(--light);
    text-decoration: none;
}

nav a.router-link-active {
    color: rgb(191, 191, 191);
    cursor: default;
}

#title {
    display: flex;
    align-items: center;
    gap: 1em;
}

/*default 0. gets set to 1 with js added class*/
.animated-opacity {
    opacity: 0;
}
</style>