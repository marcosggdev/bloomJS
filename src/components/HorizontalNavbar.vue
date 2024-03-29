<script setup>
import Dropdown from '@/components/Dropdown.vue'

const props = defineProps(['links']);
const emits = defineEmits(['newFile', 'openFile', 'saveFile', 'saveFileAs', 'nav']);

const executeCallback = (callback, args) => {
    switch (callback) {
        case 'newFile': emits('newFile'); break;
        case 'openFile': emits('openFile'); break;
        case 'saveFile': emits('saveFile'); break;
        case 'saveFileAs': emits('saveFileAs'); break;
        case 'nav': emits('nav', args.path); break;
    }
};

</script>

<template>
    <ul class="horizontal-navbar">
        <li v-for="linkObj in links">
            <template v-if="linkObj.dropdown">
                <Dropdown>
                    <template #triggerText>
                        {{ linkObj.name }}
                    </template>
                    <template #content>
                        <ul>
                            <li v-for="link in linkObj.subLinks"><button class="navbar-button" @click="executeCallback(link.callback.identifier, link.callback.args)">{{
                            link.name }}</button></li>
                        </ul>
                    </template>
                </Dropdown>
            </template>
            <template v-else>
                <button class="navbar-button" @click="linkObj.callback">{{ linkObj.name }}</button>
            </template>
        </li>
    </ul>
</template>

<style scoped>
.horizontal-navbar {
    min-width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
}
.horizontal-navbar li {
    min-width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
}
</style>