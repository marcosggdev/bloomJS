<script setup>
import { onMounted } from 'vue'
import { useScrollControllers } from '@/components/composables/useScrollControllers'
import Submenu from '@/components/Submenu.vue'

const props = defineProps(['title']);

onMounted(() => {
  useScrollControllers();
});
</script>

<template>
    <div class="menu">
        <slot name="header"></slot>
        <slot name="content"></slot>
    </div>
</template>

<style scoped>
.menu {
    min-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    background-color: var(--dark-darker);
    color: var(--light);
    user-select: none;
    z-index: 1;
}

.menu>:deep(h2::before) {

    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    z-index: -1;
    background-color: rebeccapurple;

    border-bottom: 100px solid var(--dark-darker);
    border-right: 176px solid transparent;
    border-left: 50px solid transparent;

}

.menu>:deep(h2) {
    text-align: center;
    padding: 10px;
    position: relative;
    overflow: hidden;
}
</style>