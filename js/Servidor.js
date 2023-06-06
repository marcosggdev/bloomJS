class Servidor {

    static mensaje (mensaje) {

        let obj = JSON.parse(mensaje);

        let p = document.createElement("p");
        p.textContent = obj.texto;
        p.className = obj.clase;
        document.body.appendChild(p);
        p.style.left = "0%";
        /*setTimeout(() => {
            p.remove();
        }, 5000);*/
    }

}