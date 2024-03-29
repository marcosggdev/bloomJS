<script setup>
import SocialsCarousel from '@/components/SocialsCarousel.vue'
import UnfoldCarousel from '@/components/UnfoldCarousel.vue'

import { ref } from 'vue'
import { onMounted } from 'vue'
import { useScrollControllers } from '@/components/composables/useScrollControllers'
const root = ref(null);
onMounted(() => {
  useScrollControllers(root.value);
});
</script>

<template>
    <footer ref="root">
        <div id="socials" class="scroll-control-slide-right">
            <section id="contact">
                <div class="title">
                    <h3>Contact</h3>
                </div>
                <div class="content">
                    <SocialsCarousel :socials="[
                        {
                            name: 'Github',
                            src: '/src/assets/img/socials/github.png',
                            href: 'https://github.com/marcosggdev'
                        },
                        {
                            name: 'LinkedIn',
                            src: '/src/assets/img/socials/linkedin.png',
                            href: 'https://www.linkedin.com/in/marcos-garcia-garcia-dev/'
                        },
                        {
                            name: 'Gmail',
                            src: '/src/assets/img/socials/gmail.png',
                            href: 'mailto:marcosggdev@gmail.com'
                        },
                    ]" :parentId="'contact'" />
                </div>
            </section>
            <section id="poweredBy">
                <div class="title">
                    <h3>Powered by</h3>
                </div>
                <div class="content">
                    <UnfoldCarousel :data="[
                        {
                            src: '/src/assets/img/icons/html.png',
                            description: 'HTML ~ Universal markup language for the Web. Lets the developer format text, add graphics, create links, input forms, etc',
                        },
                        {
                            src: '/src/assets/img/icons/css.png',
                            description: 'CSS ~ Cascading Style Sheets are used to style and layout web pages. It lets the developer alter the font, colors, size, layouts, etc',
                        },
                        {
                            src: '/src/assets/img/icons/js.png',
                            description: 'JavaScript ~ Scripting language used to create and control dynamic website content, anything that moves, refreshes, etc',
                        },
                        {
                            src: '/src/assets/img/icons/vuejs.png',
                            description: 'VueJS ~ Versatile and efficient JavaScript framework for building web user interfaces. It extends HTML, CSS, and JavaScript',
                        },
                        {
                            src: '/src/assets/img/icons/nodejs.png',
                            description: 'NodeJS ~ Open-source and cross-platform JavaScript runtime environment. It runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser.',
                        },
                    ]" />
                </div>
            </section>
        </div>
        <div id="mentions" class="scroll-control-slide-down">
            <div class="title">
                <h3>Mentions</h3>
            </div>
            <div class="content">
                <SocialsCarousel :socials="[
                        {
                            name: 'IBQ',
                            src: '/src/assets/img/socials/ibq.jpg',
                            href: 'https://ibq.es/'
                        },
                        {
                            name: 'Uniovi',
                            src: '/src/assets/img/socials/uniovi.jpg',
                            href: 'https://ciencias.uniovi.es/'
                        },
                    ]" :parentId="'mentions'" />
                <p>Have a look at this resources. Its a very good approach to start programming graphic applications</p>
                <SocialsCarousel :socials="[
                        {
                            href: 'https://webglfundamentals.org/',
                            src: '/src/assets/img/icons/website.png',
                            name: 'WebGL Fundamentals'
                        },
                        {
                            name: 'Computer Graphics Programming in OpenGL with Java',
                            src: '/src/assets/img/icons/book.png',
                            href: 'https://www.amazon.com/Computer-Graphics-Programming-OpenGL-Second-ebook/dp/B07HNF4YSN'
                        },
                    ]" :parentId="'mentions'" />
            </div>
        </div>
        <div id="credits" class="scroll-control-slide-left">
            <h3>Credits</h3>
            <small>Almost all the images used in this page are of free use or have been generated by Microsoft Designer
                AI</small>
            <small>Some of the icons where obtained from pages where the author requires attribution. Here is a list of
                authors
                <ul>
                    <li><a href="https://www.flaticon.com/free-icons/book" title="book icons">Book icons created by
                            Smashicons - Flaticon</a></li>
                </ul>
            </small>
            <div class="image-container scroll-control-slide-up">
                <img src="@/assets/img/microsoft_designer_1.jpg" alt="">
                <img src="@/assets/img/microsoft_designer_2.jpg" alt="">
            </div>
        </div>
        <small class="copy">&copy; All rights reserved. Marcos García García</small>
    </footer>
</template>

<style scoped>
footer {
    background-color: var(--dark-darker);
    min-height: 100vh;
    color: var(--light);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 4em;
}

footer>div {
    padding: 2em;
}

footer>div>.title, footer>div>.content {
    padding: 2em;
}

footer .copy {
    grid-column: 2 / 4;
    display: flex;
    justify-content: center;
    padding: 1em;
    box-sizing: border-box;
    background-color: var(--dark-darker);
}

footer a {
    color: var(--light);
}

footer #credits img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    transform: scale(0.8) rotateZ(5deg);
}

footer #credits .image-container {
    display: flex;
    align-items: center;
    position: relative;
}

footer #credits .image-container img:last-child {
    position: absolute;
    left: 39%;
    top: 28%;
    transform: scale(0.5) rotateZ(-10deg);
}

#socials {
    grid-row: 1 / 3;
    height: 100%;
    border-radius: 20px;
    transform: scale(1.1) rotateZ(357deg);
    color: var(--dark);
    max-width: 333px;
}

#socials>section {
    box-sizing: border-box;
}

#socials>section .title {
    padding: 2em;
}

#socials>section h3 {
    padding: 0;
}

#socials>section .content {
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#contact,
#poweredBy {
    color: white;
    background: linear-gradient(40deg, #9280c2, #2d2d2d);
}

#contact {
    border-radius: 20px;
    filter: drop-shadow(2px 2px 5px black);
}

#contact ul li a span {
    color: black;
}

#contact ul li {
    gap: 10px;
    display: flex;
    align-items: center;
}

#poweredBy {
    height: 100%;
    filter: drop-shadow(0px 4px 4px black);
    border-radius: 20px;
    transform: scale(1.05) rotateZ(4deg);
}

#poweredBy ul li img {
    transition: all 0.25s;
    padding: 10px;
}

#poweredBy ul li img:hover {
    transform: scale(1.1) rotateZ(5deg);
    border-radius: 10px;
    background-color: var(--light);
}

#mentions {
    border-radius: 0px 0px 20px 20px;
    background-color: rebeccapurple;
    min-height: 50vh;
}

#mentions div.title {
    padding: 2em;
}

#credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: var(--dark-darker);
}
</style>