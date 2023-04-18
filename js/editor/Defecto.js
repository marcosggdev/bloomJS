class Defecto {

    //valores por defecto (no maximizado) del css
    static footerDisplay = "";
    static cabeceraDisplay = "";
    static mainWidth = "";
    static mainHeight = "";
    static mainPadding = "";
    static ventanaEdicionPadding = "";
    static ventanaEdicionOverflow = "";

    //carga valores css por defecto de ciertos elementos
    static cargarValores () {
        let footer = document.querySelector("footer");
        let cabecera = document.querySelector("div#cabecera");
        let main = document.querySelector("main");
        let ventanaEdicion = document.querySelector("div#ventanaEdicion");

        Defecto.footerDisplay = footer.style.display;
        Defecto.cabeceraDisplay = cabecera.style.display;
        Defecto.mainWidth = main.style.width;
        Defecto.mainHeight = main.style.height;
        Defecto.mainPadding = main.style.padding;
        Defecto.ventanaEdicionPadding = ventanaEdicion.style.padding;
        Defecto.ventanaEdicionOverflow = ventanaEdicion.style.overflow;
    }

    //aplica los estilos por defecto guardados en la clase
    static aplicarEstilosPorDefecto () {
        let footer = document.querySelector("footer");
        let cabecera = document.querySelector("div#cabecera");
        let main = document.querySelector("main");
        let ventanaEdicion = document.querySelector("div#ventanaEdicion");

        footer.style.display = Defecto.footerDisplay;
        cabecera.style.display = Defecto.cabeceraDisplay;
        main.style.width = Defecto.mainWidth;
        main.style.height = Defecto.mainHeight;
        main.style.padding = Defecto.mainPadding;
        ventanaEdicion.style.padding = Defecto.ventanaEdicionPadding;
        ventanaEdicion.style.overflow = Defecto.ventanaEdicionOverflow;
    }

}