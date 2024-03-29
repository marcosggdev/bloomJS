<script setup>
const props = defineProps(['model']);
</script>

<template>
    <div class="model">
        <ul class="col">
            <li class="row position">
                <div class="title">Position</div>
                <div class="content">
                    <div class="group row">
                        <h3 class="key">x:</h3>
                        <p class="value">{{ props.model.xPos }}</p>
                    </div>
                    <div class="group row">
                        <h3 class="key">y:</h3>
                        <p class="value">{{ props.model.yPos }}</p>
                    </div>
                    <div class="group row">
                        <h3 class="key">z:</h3>
                        <p class="value">{{ props.model.zPos }}</p>
                    </div>
                </div>
            </li>
            <li class="row rotation">
                <div class="title">Rotation</div>
                <div class="content">
                    <div class="group row">
                        <h3 class="key">&alpha;<sub>x</sub>:</h3>
                        <p class="value">{{ props.model.xAngle }}</p>
                    </div>
                    <div class="group row">
                        <h3 class="key">&alpha;<sub>y</sub>:</h3>
                        <p class="value">{{ props.model.yAngle }}</p>
                    </div>
                </div>
            </li>
            <li class="row scale">
                <div class="title">Scale</div>
                <div class="content">
                    <div class="group row">
                        <h3 class="key">s<sub>x</sub>:</h3>
                        <p class="value">{{ props.model.xFactor }}</p>
                    </div>
                    <div class="group row">
                        <h3 class="key">s<sub>y</sub>:</h3>
                        <p class="value">{{ props.model.yFactor }}</p>
                    </div>
                    <div class="group row">
                        <h3 class="key">s<sub>z</sub>:</h3>
                        <p class="value">{{ props.model.zFactor }}</p>
                    </div>
                </div>
            </li>
            <li class="row scale">
                <div class="title">Class</div>
                <div class="content">
                    <div class="group row">
                    <p>{{ props.model.constructor.name }}</p>
                </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.model {
    display: flex;
    align-items: center;
}

ul {
    padding: 5px;
    box-sizing: border-box;
    background-color: grey;
    border-radius: 5px;
    color: var(--dark-darker);
    gap: 5px;
}

ul li {
    overflow: hidden;
    align-items: center;
    background-color: var(--light);
    border-radius: 5px;
    gap: 5px;
    align-items: stretch;
}

ul li .title {
    background-color: rebeccapurple;
    border-radius: 5px 0px 0px 5px;
    color: var(--light);
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 70px;
}

ul li .content {
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 5px;
    flex-grow: 1;
}

ul li .content .value {
    background-color: grey;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
}

ul li .group {
    gap: 5px;
    align-items: center;
}
</style>