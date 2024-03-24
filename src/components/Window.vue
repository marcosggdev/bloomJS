<script setup>
import { ref, reactive, computed, onMounted, watch, watchEffect } from 'vue'
import Toolbar from '@/components/Toolbar.vue';
import Navbar from '@/components/Navbar.vue';
import WindowBar from '@/components/Windowbar.vue';

import ArcballCamera from '@/js/bloomjs_glib/camera/ArcballCamera'
import Renderer from '@/js/bloomjs_glib/graphics/Renderer'
import Color from '@/js/bloomjs_glib/graphics/Color'
import Scene from '@/js/bloomjs_glib/graphics/Scene'

//save temp css configs...
let temp = [];

const emits = defineEmits(['handleStateChange']);
const canvas = ref(null);
const gl = ref(null);

const maximize = () => {
    const elements = document.querySelectorAll('header, footer');
    hideElements(elements, temp);
};

const minimize = () => {
    const elements = document.querySelectorAll('header, footer');
    resetElements(elements, temp);
};

function hideElements(elements, temp) {
    Array.from(elements).forEach((e) => {
        changeProp(e, temp, 'style.display', 'none');
    });
}

function resetElements(elements, temp) {
    Array.from(elements).forEach((e) => {
        changeProp(e, temp, 'style.display', loadValue(e, temp, 'style.display'));
    });
}

function loadValue(element, temp, composedProp) {

    for (let i = 0; i < temp.length; i++) {
        if (temp[i].element === element) {
            const result = temp[i].savedProps[composedProp];
            return result;
        }
    }

    return null;

}

function saveElementProp(element, temp, composedProp) {

    let contained = false;
    let index = -1;
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].element === element) {
            contained = true;
            index = i;
            i = temp.length;
        }
    }

    //eg: style.display => obj[style][display]
    const props = composedProp.split('.');
    let propsString = "";
    for (let i = 0; i < props.length; i++) {
        propsString += `.${props[i]}`;
    }

    if (contained) {

        //override
        temp[index].savedProps[composedProp] = eval(`element${propsString}`);

    } else {

        //create
        const tempObj = {
            element: element,
            savedProps: {}
        }

        tempObj.savedProps[composedProp] = eval(`element${propsString}`);
        temp.push(tempObj);

        if (temp.length > 200) {
            temp.shift();
        }

    }

}

function changeProp(element, temp, composedProp, value) {
    saveElementProp(element, temp, composedProp);
    let props = composedProp.split('.');
    let propsString = "";
    for (let i = 0; i < props.length; i++) {
        propsString += `.${props[i]}`;
    }

    //supports using composeProps like style.display
    eval(`element${propsString} = '${value}'`);
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

    gl.value = canvas.value.getContext("webgl", { 
        preserveDrawingBuffer: true, 
        premultipliedAlpha: false,
    });
    if (!gl.value) {
        console.log("Error: Error when attempting to get canvas context");
        return;
    }

    canvas.value.tabIndex = 0;

    let camera = new ArcballCamera(0, 0, 0, 30, 0, 30);
    let renderer = new Renderer(canvas.value, gl.value, camera, Color.GREY);
    let scene = new Scene();
    renderer.scene = scene;
    requestAnimationFrame(() => { renderer.cycle() });

    window.addEventListener('resize', () => {
        canvas.value.width = canvas.value.getBoundingClientRect().width;
        canvas.value.height = canvas.value.getBoundingClientRect().height;
        renderer.updateDimensions(canvas.value);
    });

});
</script>

<template>
    <div id="window" class="window slide-up">
        <div class="upper-bar">
            <Toolbar />
            <Navbar />
            <WindowBar @handle-state-change="handleStateChange" />
        </div>
        <canvas ref="canvas" :width="1920" :height="1080"></canvas>
    </div>
</template>

<style scoped>
.window {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
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
    height: 95vh;
}
</style>