<script setup>
import { onMounted } from 'vue'
import TextCarousel from '@/components/TextCarousel.vue';
import { useScrollControllers } from '@/components/composables/useScrollControllers'
import Navbar from '@/components/Navbar.vue'

onMounted(() => {
  useScrollControllers();
});
</script>

<template>
  <aside id="navbar">
    <Navbar :routes="[
      {
        name: 'Home',
        href: '#home',
        src: '/src/assets/img/icons/home.jpg'
      },
      {
        name: 'Welcome',
        href: '#welcome',
        src: '/src/assets/img/icons/welcome.jpg'
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
    <div id="pages" class="scroll-control-slide-up">
      <div class="page">
        <div class="header">
          <div class="image" style="background-image: url('/src/assets/img/model.jpg')"></div>
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
      <div class="page">
        <div class="header">
          <div class="image" style="background-image: url('/src/assets/img/blog_welcome.jpg')"></div>
          <h2>Blog</h2>
        </div>
        <TextCarousel :texts="[
      'We have a blog!',
      'It\'s a blog for curious people that have interest in web development',
      'If you are interested in reading BloomJS doc or learning about WebGL, have a look!'
    ]" />
      </div>
    </div>
  </section>
  <section id="functionalities">
    <div class="content">
      <article id="welcome">
        <h2>Welcome!!</h2>
        <p>Welcome to the BloomJS project official page. Here you will be able to use our application to generate assets
          for
          your website and learn about the project and its documentation
        </p>
        <div class="horizontal-cards">
          <div class="card" :style="'background-image:url(/src/assets/img/model.jpg)'">
            <h3>Scene</h3>
          </div>
          <div class="card" :style="'background-image:url(/src/assets/img/blog_welcome.jpg)'">
            <h3>Blog</h3>
          </div>
        </div>
      </article>
      <article id="whatsitfor">
        <h2>What's it for?</h2>
        <p>Welcome to the BloomJS project official page. Here you will be able to use our application to generate assets
          for
          your website and learn about the project and its documentation
        </p>
        <p>Enjoy your visit!</p>
        <div class="card-container">
          <div class="card scroll-control-slide-up" style="background-image: url(/src/assets/img/model.jpg)">
            <h3>3D Scene Editor</h3>
            <TextCarousel :texts="[
      'Scene Editor',
      'Create custom 3D Scenes',
      'Export your scenes with our bloomjs lib client'
    ]" />
          </div>
        </div>
        <div>
          <div class="content scroll-control-slide-right">
            <p>Use the scene editor to create your own custom 3D background using WebGL and models that you can upload
              to
              the app, or
              just use models that we offer you for free.</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
<style scoped>
*[class*='scroll-animation'] {
  opacity: 0;
}

.card:has(.text-carousel) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card .text-carousel {
  flex-grow: 0;
}

.card .text-carousel .button-container {
  top: 150%;
}

.index>section>.content::before {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: white;
  opacity: 0.9;
  border-radius: 20px;
}

.index>section {
  padding: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.index>section>.content {
  border-radius: 20px;
  position: relative;
  max-width: 1040px;
  padding: 4em;
  display: flex;
  flex-direction: column;
  gap: 4em;
  align-items: stretch;
}

.index>section>.content>article {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
  box-sizing: border-box;
}

#functionalities {
  color: var(--light);
  background-color: var(--dark-darker);
}

#functionalities .functionality::before {
  background: none;
}

#functionalities .functionality {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  gap: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 2em;
  background-color: rebeccapurple;
  width: 300px;
  height: 300px;
  position: relative;
}

#functionalities .functionality .header {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#functionalities .functionality .content {
  position: absolute;
  left: 110%;
  top: 50%;
  width: 100%;
  height: 100%;
}

.home::before {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: black;
  opacity: 0.7;
  filter: blur(100px);
}

.home {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--light);
  padding-top: 12em;
  padding-bottom: 12em;
  box-sizing: border-box;
}

#pages {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  color: var(--light);
  height: 60vh;
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
  user-select: none;
}

#pages .header h2 {
  z-index: 1;
  pointer-events: none;
}

#pages .image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 200px;
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
