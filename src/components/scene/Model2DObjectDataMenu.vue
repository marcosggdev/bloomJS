<script setup>
const props = defineProps(['model']);
const emit = defineEmits(['selectObject']);
const selectObject = () => {
    emit('selectObject', props.model);
};
</script>

<template @click="console.log('a')">
    <div ref="model" class="model">
        <h3>{{ props.model.constructor.name }}</h3>
    </div>
</template>

<style scoped>
.model {
    display: flex;
    align-items: center;
}
h3 {
    padding-left: 10px;
    padding-right: 10px;
    font-family: 'system-ui';
}
</style>