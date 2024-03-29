<script setup>
import Menu from '@/components/Menu.vue'
import Submenu from '@/components/Submenu.vue'
</script>

<template>
    <Menu>
        <template #header>
            <h2>Object Menu</h2>
        </template>

        <template #content>
            <Submenu>
                <template #header>
                    <h2>Object Submenu</h2>
                </template>

                <template #content>
                    <p>hello world!</p>
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