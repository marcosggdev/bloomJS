<script setup>
import MyHeader from '@/views/MyHeader.vue'
import TextCarousel from '@/components/TextCarousel.vue';
</script>

<template>
  <div id="pages" class="slide-up">
    <div class="page">
      <div class="header">
        <div class="image"></div>
        <h2>Scene</h2>
      </div>
      <TextCarousel :texts="[
        'Use the generator to load or create a 3D scene with the free models we offer or the ones you upload',
        'Export your scene and use it in whatever website you are building!',
        'Save your scene and load it again later if you have to go',
        'If you are humble, share your models or your scene with other users! Therefor, get models from other users to build your own scene!',
        'Compatibility with .obj and .dae model formats'
      ]" />
    </div>
  </div>
</template>
<style scoped>
#pages::before {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: black;
  opacity: 0.7;
  filter: blur(30px);
}

#pages {
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  color: var(--light);
  height: 50vh;
}

#pages>div {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

#pages .page {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
  box-sizing: border-box;
  justify-content: space-between;
}

#pages>div .header {
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#pages .header h2 {
  z-index: 1;
}
#pages .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background-image: url('@/assets/img/model.jpg');
  background-size: cover;
  background-position: 50%;
  transition: all 0.25s;
  z-index: 0;
}

#pages .image:hover {
  transform: scale(1.05);
  border-radius: 20px;
}
</style>
