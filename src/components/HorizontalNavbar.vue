<script setup>
import HoverDropdown from '@/components/HoverDropdown.vue'

const props = defineProps(['links']);
const emits = defineEmits();

//we pass the callbacks received as an emitted event, so we can implement them properly in the parent component
//that uses this one, keeping code more sorted
const executeCallback = (callback, args) => {
    emits(callback, args);
};

</script>

<template>
    <ul class="horizontal-navbar">
        <li v-for="linkObj in links">
            <template v-if="linkObj.dropdown">
                <HoverDropdown>
                    <template #triggerText>
                        {{ linkObj.name }}
                    </template>
                    <template #content>
                        <ul>
                            <li v-for="link in linkObj.subLinks"><button class="navbar-button" @click="executeCallback(link.callback.identifier, link.callback.args)">{{
                            link.name }}</button></li>
                        </ul>
                    </template>
                </HoverDropdown>
            </template>
            <template v-else>
                <button class="navbar-button" @click="linkObj.callback">{{ linkObj.name }}</button>
            </template>
        </li>
    </ul>
</template>

<style scoped>
.horizontal-navbar {
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