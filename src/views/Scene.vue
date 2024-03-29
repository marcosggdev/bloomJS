<!--
<script setup>
/*
import Window from '@/components/Window.vue'
window.addEventListener('load', () => {
    canvas = document.createElement("canvas");
    if (!canvas) {
        console.log("Error: Canvas couldn't be created");
        return;
    }

    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
        console.log("Error: Error when attempting to get Canvas context");
        return;
    }

    canvas.tabIndex = 0;

    let camera = new ArcballCamera(0, 0, 0, 30, 0, 30);
    Renderer.init(1920, 1080, new Color(80, 80, 80, 255), camera, null);

    let barraVentana = new BarraVentana("BloomJS - Editor", ["/img/iconos/minimizar.png", "/img/iconos/maximizar.png"],
        [BarraVentana.minimizar, BarraVentana.maximizar]);

    let interfazCanvas = new InterfazCanvas();

    let menuInterfaz = new MenuInterfaz(
        [
            new SubmenuEscena(interfazCanvas),
            new SubmenuInterfaz("Editor", [
                new BotonInterfaz("Controles", MenuInterfaz.controles),
                new BotonInterfaz("Ajustes", () => { MenuInterfaz.ajustes(RendererRefactor) })
            ]),
            new SubmenuInterfaz("Exportar", [
                new BotonInterfaz("Imagen", MenuInterfaz.exportarImagen),
                new BotonInterfaz("Escena", MenuInterfaz.exportarEscena)
            ])
        ]);

    VentanaCanvas.iniciar(barraVentana, menuInterfaz, interfazCanvas, canvas, ControlesCanvas);

    let menuGlobal = new MenuGlobal("Global", null);
    menuGlobal.nodo.querySelector(".BarraCierre img").remove();
    VentanaCanvas.interfazCanvas.anadirMenu(menuGlobal);

    let container = document.getElementById('bloomjs_scene');

    window.requestAnimationFrame(RendererRefactor.ciclo);
});
*/
</script>
-->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

//components
import Toolbar from '@/components/Toolbar.vue';
import HorizontalNavbar from '@/components/HorizontalNavbar.vue'
import WindowBar from '@/components/Windowbar.vue';
import { navbar } from '@/data/scene/navbar' 
import { useRouter } from 'vue-router';
const router = useRouter();

//bloomjs_glib
import ArcballCamera from '@/js/bloomjs_glib/camera/ArcballCamera'
import Renderer from '@/js/bloomjs_glib/graphics/Renderer'
import Color from '@/js/bloomjs_glib/graphics/Color'
import Scene from '@/js/bloomjs_glib/graphics/Scene'

//controllers
import Keyboard from '@/js/bloomjs_glib/controllers/Keyboard'
import Mouse from '@/js/bloomjs_glib/controllers/Mouse'

//save temp css configs...
let temp = [];

const emits = defineEmits(['handleStateChange']);
const canvas = ref(null);
const gl = ref(null);
const animationId = ref(null);

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

    const mouse = new Mouse(canvas.value);
    const keyboard = new Keyboard(canvas.value);

    let camera = new ArcballCamera(0, 0, 0, 30, 0, 30);
    let renderer = new Renderer(canvas.value, gl.value, camera, Color.GREY);
    let scene = new Scene();
    renderer.scene = scene;
    animationId.value = requestAnimationFrame(() => { renderer.cycle() });

    window.addEventListener('resize', () => {
        canvas.value.width = canvas.value.getBoundingClientRect().width;
        canvas.value.height = canvas.value.getBoundingClientRect().height;
        renderer.updateDimensions(canvas.value);
    });

});

onBeforeUnmount(() => {
    //clean up canvas resources until component is mounted again

});

//HorizontalNavbar functions----------------------------------------------------------------------------
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
//-----------------------------------------------END----------------------------------------------------
</script>

<template>
    <div id="window" class="window show">
        <div class="upper-bar">
            <Toolbar />
            <HorizontalNavbar :links="navbar" 
                @new-file="newFile" @open-file="openFile" @save-file="saveFile" 
                @save-file-as="saveFileAs" @nav="nav" 
            />
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

canvas {
    background-color: black;
    height: 95vh;
    user-select: none;
}
</style>