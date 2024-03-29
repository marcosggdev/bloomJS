<script setup>
import Model2DObjectDataMenu from '@/components/scene/Model2DObjectDataMenu.vue'

const props = defineProps(['drawable']);
console.log(props.drawable.constructor.name);
</script>

<template>
<template v-if="props.drawable.constructor.name === 'Grid'"><Model2DObjectDataMenu :model="props.drawable" /></template>
<template v-if="props.drawable.constructor.name === 'Model2D'"><Model2DObjectDataMenu :model="props.drawable" /></template>
</template>