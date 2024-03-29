<script setup>
import Dropdown from '@/components/Dropdown.vue'

const props = defineProps(['links']);
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
                            <li v-for="link in linkObj.subLinks"><button class="navbar-button" @click="link.callback">{{
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