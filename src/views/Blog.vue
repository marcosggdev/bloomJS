<script setup>
import MyFooter from '@/views/MyFooter.vue'
import BlogHeader from '@/views/BlogHeader.vue'
</script>
<template>
    <div class="blog">
        <main>
            <aside id="navbar">
                <h3>Index</h3>
                <ul>
                    <li><a href="#aboutMe">About Me</a></li>
                </ul>
            </aside>
            <div id="content">
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
                        </template>
                    </BlogHeader>
                    <div class="blog-content">
                        <div class="background-1"><h1 class="big-title">Hello World!</h1></div>
                        <div class="background-2"></div>
                    </div>
                </section>
            </div>
        </main>
        <MyFooter />
    </div>
</template>

<style scoped>
.blog {
    min-width: 100vw;
    min-height: 100vh;
}
.blog-content {
    position: relative;
    z-index: 0;
    flex-grow: 1;
}
.background-1 {
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    width: 48%;
    height: 86%;
    z-index: -1;
    opacity: 0.7;
    background-image: url(/src/assets/img/note.png);
    filter: drop-shadow(2px 4px 6px black);
    color: rgb(68, 68, 68);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(1.1) rotateZ(10deg);
    border-radius: 20px;
    opacity: 1;
    background-size: 120%;
    background-position: 50%;
}
.background-2 {
    position: absolute;
    content: " ";
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    z-index: -2;
    opacity: 0.7;
    border-radius: 0px 0px 20px 0px;
    border-bottom: 200px solid black;
    border-right: 0px solid transparent;
    border-left: 700px solid transparent;
}
.big-title {
    font-size: 36pt;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

h1, h2, h3 {
    font-family: "Black Ops One";
}

main {
    display: flex;
    gap: 2em;
    padding: 2em;
    min-height: 100vh;
    align-items: stretch;
    justify-content: space-between;
    box-sizing: border-box;
}

aside {
    padding: 1em;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: grey;
    width: 300px;
}

aside ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    color: var(--light);
}

#content>section {
    position: relative;
    max-width: 900px;
    background-color: white;
    border-radius: 20px;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
}
#content>section>.blog-content {
    padding: 4em;
}

#content {
    grid-column: 2;
    flex-grow: 1;
}

#navbar {
    background-color: var(--dark);
    color: var(--light);
}

#navbar ul li {
    background-color: white;
    border-radius: 5px;
    padding: 10px;
}

#navbar ul li a {
    text-decoration: none;
}
</style>