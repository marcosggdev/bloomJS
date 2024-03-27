<script setup>
const props = defineProps(['links']);

const fileOpen = () => {
    console.log('file open');
};
</script>

<template>
    <ul class="horizontal-navbar">
        <li v-for="linkObj in links">
            <template v-if="linkObj.dropdown">
                <p>{{ linkObj.name }}</p>
                <div class="dropdown">
                    <li v-for="link in linkObj.subLinks"><button class="navbar-button" @click="link.callback">{{
            link.name }}</button></li>
                </div>
            </template>
            <template v-else>
                <button class="navbar-button" @click="linkObj.callback">{{ linkObj.name }}</button>
            </template>
        </li>
    </ul>
</template>

<style scoped>
.horizontal-navbar {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    height: 100%;
    min-width: 300px;
}

.horizontal-navbar li {
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
}

.dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: auto;
    height: auto;
    max-width: 200%;
    display: flex;
    flex-direction: column;
    background-color: var(--dark-darker);
    padding: 2em;
    border-radius: 20px;
}
</style>