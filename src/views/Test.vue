<script setup>
import Dropdown from '@/components/HoverDropdown.vue'
</script>

<template>
<div>
    <Dropdown>
        <template #triggerText>
            Dropdown
        </template>
        <template #content>
            <p>hello world!</p>
            <ul>
                <li>hello world!</li>
                <li>hello world!</li>
                <li>hello world!</li>
                <li>hello world!</li>
                <li>hello world!</li>
            </ul>
        </template>
    </Dropdown>
</div>
</template>