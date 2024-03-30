<script setup>
import { ref, onMounted } from 'vue'
import { useUnfold } from '@/components/composables/useAdjustBoxToParent'
const triggerText = ref(null);
onMounted(() => {
    const dropdownMenu = triggerText.value.parentNode.querySelector('.dropdown-menu');
    triggerText.value.addEventListener('mouseenter', () => { dropdownMenu.classList.add('unfolded') });
    triggerText.value.addEventListener('mouseleave', () => { dropdownMenu.classList.remove('unfolded') });
});
</script>

<template>
    <div class="dropdown-control">
        <div class="trigger" ref="triggerText">
            <slot name="triggerText"></slot>
            <div class="dropdown-menu">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdown-control {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
}

.trigger {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    background-color: var(--light);
    color: var(--dark-darker);
    z-index: 1;
    padding-left: 2em;
    padding-right: 2em;
    cursor: default;
}

.dropdown-menu {
    height: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    max-width: 200%;
    display: flex;
    flex-direction: column;
    background-color: rebeccapurple;
    transition: all 0.25s;
    z-index: 0;
    cursor: default;
    transform: translateX(-50%);
    pointer-events: none;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dropdown-menu.unfolded {
    opacity: 1;
    height: auto;
    top: 100%;
    pointer-events: all;
}

:deep(.dropdown-menu ul) {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
}
:deep(.dropdown-menu ul li) {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
}

:deep(.dropdown-menu button) {
    background-color: transparent;
    color: var(--light);
    border: none;
    padding-top: 10px;
    padding-bottom: 10px;
    padding: 1em;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
    pointer-events: all;
    cursor: pointer;
}
</style>