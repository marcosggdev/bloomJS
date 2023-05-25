<div id="plantilla">
<?php
    if (isset($_POST["sustituir"])) {

        if ($_POST["sustituir"] == true) {
?>
            <dialog id="crearEscenaDialog">
                <h1>Crear escena</h1>
                <p>¡Parece que ya tenías una escena abierta! ¿Quieres guardar los cambios antes de crear otra?</p>
                <div class="botonera">
                    <button id="crear" class="boton-aceptar">Sí</button>
                    <button id="cancelar" class="boton-cancelar">No</button>
                </div>
                
            </dialog>
<?php
        } elseif ($_POST["sustituir"] == false) {
?>
            <dialog id="crearEscenaDialog">
                <h1>Crear escena</h1>
                <div class="campo">
                    <p>Título</p>
                    <input id="titulo" type="text" placeholder="Título">
                </div>
                <div class="campo">
                    <p>Descripción</p>
                    <input id="descripcion" type="text" placeholder="descripcion">
                </div>
                <div class="botonera">
                    <button id="crear" class="boton-aceptar">Crear</button>
                    <button id="cancelar" class="boton-cancelar">Cancelar</button>
                </div>
            </dialog>
<?php
        }
    }
?>
</div>
<div id="adicional">
    <input type="hidden" id="script" value="/bloomJS/vistas/editor/crearEscena/crearEscena.js">
    <input type="hidden" id="sustituir" value="<?= $_POST["sustituir"] ?>">
</div>