<script setup>
import MyHeader from '@/views/MyHeader.vue'
import MyFooter from '@/views/MyFooter.vue'
import { watch, shallowRef, reactive, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useScrollControllers } from '@/components/composables/useScrollControllers'

const components = reactive([
  {
    name: 'MyHeader',
    component: shallowRef(MyHeader),
    loaded: false
  },
  {
    name: 'RouterView',
    component: shallowRef(RouterView),
    loaded: false
  },
  {
    name: 'MyFooter',
    component: shallowRef(MyFooter),
    loaded: false,
  },

]);

const previousLoaded = (name, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      if (i - 1 > -1) {
        return array[i - 1].loaded;
      }
    }
  }
  return true;
};

const getIndex = (name, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      return i;
    }
  }
  return -1;
};

//executes code when all the components have been loaded
watch([() => components[0].loaded, () => components[1].loaded, () => components[2].loaded], () => {
  if (components[0].loaded === true && components[1].loaded === true && components[2].loaded === true) {
    useScrollControllers();
  }
});

</script>

<template>
  <div class="index">
    <template v-for="comp in components">
      <component v-if="previousLoaded(comp.name, components)" @load="components[getIndex(comp.name, components)].loaded = true" :is="comp.component"></component>
    </template>
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
  background-attachment: fixed;
}

.index {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

:deep(*[class*='scroll-control']) {
  opacity: 0;
}
</style>
