<script setup>
import MyHeader from '@/views/MyHeader.vue';
import { RouterView } from 'vue-router'
</script>
    
<template>
<div class="index">
    <MyHeader />
    <RouterView />
</div>
</template>

<style scoped>
.index::before {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-image: url('@/assets/img/background/night_street.jpg');
  background-position: 50%;
  background-size: cover;
  animation-name: background-animation;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
}

.index {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
