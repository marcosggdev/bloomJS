<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps(['links', 'renderer']);

import HorizontalNavbar from '@/components/HorizontalNavbar.vue'

//calbacks inside the navbar of the scene page------------------------------------------------------------------
const newFile = () => {
    //cleans the scene and lets only 1 background grid
    const agree = confirm('Are you sure you want to clear the scene before saving changes?');
    if (agree) props.renderer.scene.clearScene();
};

const openFile = () => {
    //lets the user load a previously saved scene
    console.log('openFile');
};

const saveFile = () => {
    //lets the user save a scene in the server
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