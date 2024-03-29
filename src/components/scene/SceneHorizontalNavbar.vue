<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps(['links']);

import HorizontalNavbar from '@/components/HorizontalNavbar.vue'

//calbacks inside the navbar of the scene page
const newFile = () => {
    console.log('newFile');
};

const openFile = () => {
    console.log('openFile');
};

const saveFile = () => {
    console.log('saveFile');
};

const saveFileAs = () => {
    console.log('saveFileAs');
};

const nav = (path) => {
    router.push(path);
};

</script>

<template>
    <HorizontalNavbar :links="props.links" @new-file="newFile" @open-file="openFile" @save-file="saveFile"
        @save-file-as="saveFileAs" @nav="nav" />
</template>