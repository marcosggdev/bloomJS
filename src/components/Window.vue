<script setup>
import Toolbar from '@/components/Toolbar.vue';
import Navbar from '@/components/Navbar.vue';
import WindowBar from '@/components/Windowbar.vue';

//save temp css configs...
let temp = [];

const emits = defineEmits(['handleStateChange']);

const maximize = () => {
    temp.push({
        id: 'header', 
        values: {
            'display': document.querySelector('header').style.display
        }
    });
    document.querySelector('header').style.display = "none";
};

const minimize = () => {
    console.log(loadValue(temp, 'header', 'display'));
    document.querySelector('header').style.display = loadValue(temp, 'header', 'display');
};

function loadValue (array, id, name) {

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
</script>

<template>
    <div class="window">
        <div class="upper-bar">
            <Toolbar />
            <Navbar />
            <WindowBar @handle-state-change="handleStateChange" />
        </div>
        <canvas></canvas>
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