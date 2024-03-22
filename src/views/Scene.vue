<script setup>
import Window from '@/components/Window.vue'
/*
window.addEventListener('load', () => {
    canvas = document.createElement("canvas");
    if (!canvas) {
        console.log("Error: Canvas couldn't be created");
        return;
    }

    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
        console.log("Error: Error when attempting to get Canvas context");
        return;
    }

    canvas.tabIndex = 0;

    let camera = new ArcballCamera(0, 0, 0, 30, 0, 30);
    Renderer.init(1920, 1080, new Color(80, 80, 80, 255), camera, null);

    let barraVentana = new BarraVentana("BloomJS - Editor", ["/img/iconos/minimizar.png", "/img/iconos/maximizar.png"],
        [BarraVentana.minimizar, BarraVentana.maximizar]);

    let interfazCanvas = new InterfazCanvas();

    let menuInterfaz = new MenuInterfaz(
        [
            new SubmenuEscena(interfazCanvas),
            new SubmenuInterfaz("Editor", [
                new BotonInterfaz("Controles", MenuInterfaz.controles),
                new BotonInterfaz("Ajustes", () => { MenuInterfaz.ajustes(RendererRefactor) })
            ]),
            new SubmenuInterfaz("Exportar", [
                new BotonInterfaz("Imagen", MenuInterfaz.exportarImagen),
                new BotonInterfaz("Escena", MenuInterfaz.exportarEscena)
            ])
        ]);

    VentanaCanvas.iniciar(barraVentana, menuInterfaz, interfazCanvas, canvas, ControlesCanvas);

    let menuGlobal = new MenuGlobal("Global", null);
    menuGlobal.nodo.querySelector(".BarraCierre img").remove();
    VentanaCanvas.interfazCanvas.anadirMenu(menuGlobal);

    let container = document.getElementById('bloomjs_scene');

    window.requestAnimationFrame(RendererRefactor.ciclo);
});
*/
</script>

<template>
    <Window />
</template>

<style scoped>

</style>