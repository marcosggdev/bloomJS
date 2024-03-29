<script setup>
//vue general
import { ref, onMounted, onBeforeUnmount } from 'vue'

//components
import SceneHorizontalNavbar from '@/components/scene/SceneHorizontalNavbar.vue'
import { navbar } from '@/data/scene/navbar' 
import ObjectMenu from '@/components/scene/ObjectMenu.vue'

//bloomjs_glib
import ArcballCamera from '@/js/bloomjs_glib/camera/ArcballCamera'
import Renderer from '@/js/bloomjs_glib/graphics/Renderer'
import Color from '@/js/bloomjs_glib/graphics/Color'
import Scene from '@/js/bloomjs_glib/graphics/Scene'

//controllers
import Keyboard from '@/js/bloomjs_glib/controllers/Keyboard'
import Mouse from '@/js/bloomjs_glib/controllers/Mouse'

//emits
const emits = defineEmits(['handleStateChange']);

//vars
const canvas = ref(null);
const gl = ref(null);
const animationId = ref(null);

onMounted(() => {

    //create canvas
    if (!canvas.value) {
        console.log("Error: Canvas not found");
        return;
    }

    //create context
    gl.value = canvas.value.getContext("webgl", {
        preserveDrawingBuffer: true,
        premultipliedAlpha: false,
    });
    if (!gl.value) {
        console.log("Error: Error when attempting to get canvas context");
        return;
    }

    //tabindex to let user focus the canvas to handle mouse and keyboard inputs
    canvas.value.tabIndex = 0;

    //controls
    const mouse = new Mouse(canvas.value);
    const keyboard = new Keyboard(canvas.value);

    //bloomjs_glib objects
    let camera = new ArcballCamera(0, 0, 0, 30, 0, 30);
    let renderer = new Renderer(canvas.value, gl.value, camera, Color.GREY);
    let scene = new Scene();
    renderer.scene = scene;
    animationId.value = requestAnimationFrame(() => { renderer.cycle() });

});

onBeforeUnmount(() => {
    //clean up webgl resources until component is mounted again (currently app pops errors when reloading the component)
    //current error: WebGL: INVALID_OPERATION: useProgram: object does not belong to this context, for every webgl object 
    //that uses drawing program

});
</script>

<template>
    <div id="window" class="window show">
        <div class="upper-bar">
            <SceneHorizontalNavbar :links="navbar" />
        </div>
        <div class="row">
            <div class="canvas-container"><canvas ref="canvas" :width="1920" :height="1080"></canvas></div>
            <ObjectMenu />
        </div>
    </div>
</template>

<style scoped>
.window {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    background-color: var(--dark-darker);
    opacity: 0;
}

.upper-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary);
    color: var(--light);
    box-sizing: border-box;
    height: 5vh;
    gap: 20px;
}

.canvas-container {
    height: 95vh;
}

canvas {
    background-color: black;
    width: 100%;
    height: 100%;
    user-select: none;
    outline: none;
}
</style>