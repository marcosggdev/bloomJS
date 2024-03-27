<script setup>
import { onMounted } from 'vue'
import TextCarousel from '@/components/TextCarousel.vue';
import Navbar from '@/components/Navbar.vue'
import HorizontalCards from '@/components/blog/HorizontalCards.vue'
import Card from '@/components/blog/Card.vue'
import ImgWithHorizontalText from '@/components/blog/ImgWithHorizontalText.vue';
import MyHeader from '@/views/MyHeader.vue'
import MyFooter from '@/views/MyFooter.vue'

const emits = defineEmits(['load']);

onMounted(() => {
  emits('load');
});
</script>

<template>
  <div class="page-background-fixed" src="/src/assets/img/background/night_street.jpeg" alt=""></div>
  <div class="home">
    <MyHeader />
    <aside id="navbar">
      <Navbar :routes="[
        {
          name: 'Home',
          href: '#home',
          src: '/src/assets/img/icons/home.jpg'
        },
        {
          name: 'What\'s it for?\'',
          href: '#whatsitfor',
          src: '/src/assets/img/icons/whatsitfor.jpg'
        },
        {
          name: 'Contact',
          href: '#contact',
          src: '/src/assets/img/icons/contact.jpg'
        },
      ]" />
    </aside>
    <section id="home" class="home">
      <h2>Welcome!!</h2>
      <p>Welcome to the BloomJS project official page. Here you will be able to use our application to generate assets
        for
        your website and learn about the project and its documentation
      </p>
      <ImgWithHorizontalText src="/src/assets/img/model.jpg">
        <template #content>
          <p>BloomJS is meant to be a tool for Web Developers. Sometimes, it's hard to find the resources to build your
            idea on the
            internet. Imagine that you have thought a 3D UI, but you lack the graphics neccesary to make that look
            fancy. That's
            the type of problem that BloomJS can help you solve, givin you free resources and a 3D scene builder to
            create your idea
            within the app.
          </p>
          <p>Furthermore, BloomJS will serve as a sharepoint between different developers that want to share their
            models, scenes or
            ideas.
          </p>
          <p>To fulfill this purposes, BloomJS offers a 3D Scene editor, a blog with a forum and a 3D assets marketplace
          </p>
          <HorizontalCards class="scroll-control-slide-up">
            <Card src="/src/assets/img/model.jpg">
              <template #header>
                <h2>Scene</h2>
              </template>
              <template #content>
                <TextCarousel :texts="[
        'Use the generator to load or create a 3D scene with the free models we offer or the ones you upload',
        'Export your scene and use it in whatever website you are building!',
        'Save your scene and load it again later if you have to go',
        'If you are humble, share your models or your scene with other users! Therefor, get models from other users to build your own scene!',
        'Compatibility with .obj and .dae model formats'
      ]" />
              </template>
            </Card>
            <Card src="/src/assets/img/blog_welcome.jpg">
              <template #header>
                <h2>Blog</h2>
              </template>
              <template #content>
                <TextCarousel :texts="[
        'We have a blog!',
        'It\'s a blog for curious people that have interest in web development',
        'If you are interested in reading BloomJS doc or learning about WebGL, have a look!'
      ]" />
              </template>
            </Card>
          </HorizontalCards>
        </template>
      </ImgWithHorizontalText>
    </section>
    <section id="whatsitfor">
      <div class="content">
        <h2>What's it for?</h2>
        <p>Welcome to the BloomJS project official page. Here you will be able to use our application to generate assets
          for your website and learn about the project and its documentation Enjoy your visit!
        </p>
        <HorizontalCards class="scroll-control-slide-right">
          <Card src="/src/assets/img/model.jpg">
            <template #header>
              <h3>3D Scene Editor</h3>
            </template>
            <template #content>
              <TextCarousel :texts="[
        'Scene Editor',
        'Create custom 3D Scenes',
        'Export your scenes with our bloomjs lib client'
      ]" />
            </template>
          </Card>
          <Card src="/src/assets/img/blog_welcome.jpg">
            <template #header>
              <h3>Blog</h3>
            </template>
            <template #content>
              <TextCarousel :texts="[
        'Have a look at the documentation',
        'Share scenes and models with other users',
        'Read interesting information about the project'
      ]" />
            </template>
          </Card>
          <Card src="/src/assets/img/model3d_market.jpg">
            <template #header>
              <h3>3D Marketplace</h3>
            </template>
            <template #content>
              <TextCarousel :texts="[
        'Check the 3D Marketplace',
        'Look for scenes and models to get inspiration',
        'Trade virtual items with other users',
        'Download the free ones!'
      ]" />
            </template>
          </Card>
        </HorizontalCards>
      </div>
    </section>
    <MyFooter />
  </div>
</template>
<style scoped>
section::before {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-darker);
  z-index: -2;
}

section {
  position: relative;
  color: var(--light);
  padding: 4em;
  padding-top: 12em;
  padding-bottom: 12em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  gap: 2em;
  justify-content: center;
}

section .content {
  max-width: 1040px;
}

.pages {
  display: flex;
  align-items: center;
  gap: 2em;
}

.home::before {
  opacity: 0.7;
  filter: blur(100px);
}

div.page-background-fixed {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  background-image: url('@/assets/img/background/night_street.jpeg');
  background-position: 50%;
  background-size: cover;
  background-attachment: fixed;
  z-index: -10;
}
</style>
