<template>
    <div class="blog">
        <main>
            <aside id="navbar">
                <ul>
                    <li><a href="#aboutMe">About Me</a></li>
                </ul>
            </aside>
            <div class="content">
                <section id="aboutMe">
                    <h2>About Me</h2>
                    <p>As you probably know, this is the BloomJS blog. Here you will be able to read about the development of this
                        project by Marcos García García, its author (and the writer of this blog)
                    </p>
                </section>
            </div>
            <aside id="links">
                <ul>
                    <li><a href="#aboutMe">About Me</a></li>
                </ul>
            </aside>
        </main>
    </div>
</template>

<style scoped>
.blog {
    min-width: 100vw;
    min-height: 100vh;
}
main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 4em;
}
aside {
    flex-grow: 1;
    padding: 2em;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: grey;
}
aside ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    color: var(--light);
}
main .content > section {
    position: relative;
    max-width: 900px;
    background-color: white;
    border-radius: 20px;
    padding: 4em;
    box-sizing: border-box;
}
</style>