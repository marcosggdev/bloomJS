<script setup>
import { ref, onMounted } from 'vue'
import Toolbar from '@/components/Toolbar.vue';
import Navbar from '@/components/Navbar.vue';
import WindowBar from '@/components/Windowbar.vue';

import ArcballCamera from '@/js/bloomjs_glib/camera/ArcballCamera.js'
import Renderer from '@/js/bloomjs_glib/graphics/Renderer.js'
import Color from '@/js/bloomjs_glib/graphics/Color.js'

//save temp css configs...
let temp = [];

const emits = defineEmits(['handleStateChange']);
const canvas = ref(null);
const gl = ref(null);
const camera = ref(null);
const renderer = ref(null);

const maximize = () => {
    tempPush(temp, {
        id: 'header',
        values: {
            'display': document.querySelector('header').style.display
        }
    });
    document.querySelector('header').style.display = "none";
};

const minimize = () => {
    document.querySelector('header').style.display = loadValue(temp, 'header', 'display');
};

function tempPush (array, obj) {
    if (array.length >= 20) {
        array.shift();
    }
    array.push(obj);
}

function loadValue(array, id, name) {

    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            return array[i].values[name];
        }
    }

    return null;

}

const handleStateChange = (maximized) => {
    if (maximized) {
        maximize();
    } else {
        minimize();
    }
};

onMounted(() => {

    //crear canvas
    if (!canvas.value) {
        console.log("Error: Canvas not found");
        return;
    }

    gl.value = canvas.value.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl.value) {
        console.log("Error: Error when attempting to get canvas context");
        return;
    }

    canvas.value.tabIndex = 0;

    camera.value = new ArcballCamera(0, 0, 0, 30, 0, 30);
    renderer.value = new Renderer(canvas.value, gl.value, camera);
    window.requestAnimationFrame(renderer.value.cycle);

});
</script>

<template>
    <div class="window slide-up">
        <div class="upper-bar">
            <Toolbar />
            <Navbar />
            <WindowBar @handle-state-change="handleStateChange" />
        </div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<style scoped>
.window {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.upper-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--dark);
    color: var(--light);
    padding: 10px;
    box-sizing: border-box;
    height: 5vh;
}

canvas {
    background-color: black;
    width: 100vw;
    height: 95vh;
}
</style>