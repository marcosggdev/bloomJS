class Servidor {

    static mensaje (mensaje) {

        let obj = JSON.parse(mensaje);

        let p = document.createElement("p");
        p.textContent = obj.texto;
        p.className = obj.clase;
        document.body.appendChild(p);
        setTimeout(() => {
            p.style.left = 0;
            setTimeout(() => {
                p.style.opacity = 0;
                setTimeout(()=>{
                    p.remove();
                }, 1000);
            }, 5000);
        }, 1000);
    }

}