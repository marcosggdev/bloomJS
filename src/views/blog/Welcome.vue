<script setup>
import BlogHeader from '@/views/BlogHeader.vue';
</script>

<template>
    <section id="aboutMe">
        <BlogHeader src="/src/assets/img/blog_welcome.jpg">
            <template #header>
                <h2>About Me</h2>
            </template>
            <template #content>
                <p>As you probably know, this is the BloomJS blog. Here you will be able to read about the
                    development of this
                    project by Marcos García García, its author (and the writer of this blog)
                </p>
                <p>As a brief description of the author, hi, my name is Marcos and im the developer behind this project.
                    Im a
                    25 years old man (current date is 2024) that has just already finished his advanced vocational
                    training
                </p>
            </template>
        </BlogHeader>
        <div class="blog-content">
            <article id="howitstarted">
                <h1 class="big-title">Hello World!!</h1>
                <p>Welcome to the BloomJS blog. If you are interested in just reading for fun, stay here and enjoy. However,
                    if you
                    are seeking help with some dev information, better go directly to the <RouterLink to="/documentation">
                        Documentation</RouterLink>
                </p>
                <h2>How it started</h2>
                <p>BloomJS was thought to be an online tool for web developers with interest in graphic applications.
                    The first
                    thoughts about
                    the app, were about possible shading programs that could be nice to show in a website. A simple
                    example,
                    which was by the way really
                    one of the first thoughts i had about the app, was a shader that simulated the deformations that the
                    gasoline makes in the hot air
                    over an asphalt road.
                </p>
                <img src="/src/assets/img/blog/gasoline_asphalt.png" alt="">
                <p>The idea was that a developer could just put a good resolution image of a car running on an asphalt
                    road
                    into the app, and he could use
                    BloomJS to distort the image based on the GPU ability to modify pixel colors  and the use of a shader program that 
                    managed those pixel transformations in order to get the desired image.
                </p>
                <p>Another simple example would be to simulate rain over a background of a page, making the developer able to make 
                    custom, very good detailed graphics for their websites.
                </p>
                <p>I knew this could have interesting uses, since i love playing videogames and so many ideas came to my mind when 
                    thinking about the game user interfaces, but applied to a website. Just imagine a website in which u can literally
                    move the camera around and see information about the page, easter eggs, interactive elements through the use of 
                    virtual objects in that scene... Or imagine a custom dark background with some 3D models of some type of monster, 
                    weird shadows, dark fog all over the place...
                </p>
                <p>This ideas were so intereseting to me that i decided to do this project as my final project for my advanced vocational training
                    in web development. And that was the moment that i started to think about functionalities. <small>Every day i would end up 
                        completing 10 things, and thinkin about 20 more new ones...
                    </small>
                </p>
            </article>
        </div>
    </section>
</template>

<style scoped>
.blog-content::before {
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: white;
    opacity: 0.9;
    border-radius: 0px 0px 20px 20px;
}
article {
    margin: 4em;
    display: flex;
    flex-direction: column;
    gap: 1em;
}
.blog-content {
    position: relative;
    z-index: 0;
    flex-grow: 1;
    background-image: url('/src/assets/img/blog_welcome.jpg');
    padding: 0;
    border-radius: 0px 0px 20px 20px;
    background-size: cover;
    background-attachment: fixed;
    background-position: 50%;
    min-height: 50vh;
    padding: 4em;
}

.big-title {
    font-size: 36pt;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>