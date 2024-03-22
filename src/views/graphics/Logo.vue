<template>
    <div class="logo-container">
        <div class="logo-image"></div>
        <div class="logo-js"></div>
    </div>
</template>
<style scoped>
.logo-image {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/logo/logo.png');
    background-position: 50%;
    background-size: cover;
    transition: transform 0.5s;
    z-index: -2;
    border-radius: 20px;
}
.logo-image:hover {
    transform: scale(1.1);
}
.logo-container {
    position: relative;
    width: 150px;
    height: 150px;
    z-index: 0;
}
.logo-js {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    content: " ";
    z-index: -1;
    background-image: url('@/assets/img/logo/js.png');
    background-size: contain;
    transform: translate(25px, -25px);
}
</style>