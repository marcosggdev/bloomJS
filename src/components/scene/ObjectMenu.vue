<script setup>
import Menu from '@/components/Menu.vue'
import Submenu from '@/components/Submenu.vue'
import Drawable from '@/components/scene/Drawable.vue'

const props = defineProps(['renderer']);

const selectObject = (c) => {
    console.log('asd');
};
</script>

<template>
    <Menu>
        <template #header>
            <h2>Object Menu</h2>
        </template>

        <template #content>
            <!--Object submenu: show the models that compose the scene-->
            <Submenu>
                <template #header>
                    <h2>Object Submenu</h2>
                </template>

                <template #content>
                    <ul>
                        <li v-for="drawable in props.renderer.scene.drawables">
                            <Drawable :drawable="drawable" />
                        </li>
                    </ul>
                </template> 
            </Submenu>
            <Submenu>
                <template #header>
                    <h2>Data Submenu</h2>
                </template>

                <template #content>
                    <p>hello world!</p>
                </template>
            </Submenu>
            <Submenu>
                <template #header>
                    <h2>3D Tools Submenu</h2>
                </template>

                <template #content>
                    <p>hello world!</p>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>