<script setup>
import { ref, onMounted } from 'vue'

const cardContainer = ref(null);

//generate random alterations of scale and rotateZ to the cards
onMounted(() => {
    const cards = cardContainer.value.querySelectorAll('.card');
    Array.from(cards).forEach(card => {
        const randomScale = 0.90 + Math.random() * 0.2;
        const randomSign = (Math.random() > 0.5) ? '-' : '';
        const randomRotationZ = `${randomSign}${Math.floor(Math.random() * 6)}deg`;
        card.style.transform = `scale(${randomScale}) rotateZ(${randomRotationZ})`;
    });
});
</script>

<template>
<div ref="cardContainer" class="card-examples">
<slot></slot>
</div>
</template>

<style scoped>
.card-examples {
    display: flex;
    align-items: center;
    padding: 2em;
    gap: 2em;
}
</style>