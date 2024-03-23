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
            </template>
        </BlogHeader>
        <div class="blog-content">
            <h1 class="big-title">Hello World!!</h1>
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
    opacity: 0.7;
    border-radius: 0px 0px 20px 20px;
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