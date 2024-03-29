<script setup>
import { ref } from 'vue'
import Logo from '@/components/graphics/Logo.vue'
import MyNav from '@/components/MyNav.vue'

import { onMounted } from 'vue'
import { useScrollControllers } from '@/components/composables/useScrollControllers'
const root = ref(null);
onMounted(() => {
  useScrollControllers(root.value);
});
</script>

<template>
    <header ref="root">
        <Logo class="scroll-control-slide-down" />
        <div class="scroll-control-slide-down">
            <h1>BloomJS</h1>
            <p>Project migrated from simple PHP to Vite + Vue 3</p>
            <MyNav />
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