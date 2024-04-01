<script setup>
import ButtonDropdown from '@/components/ButtonDropdown.vue'
import MyHeader from '@/views/MyHeader.vue'
</script>

<template>
<div>
    <MyHeader />
    <ButtonDropdown>
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
    </ButtonDropdown>
</div>
</template>