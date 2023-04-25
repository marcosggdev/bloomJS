class Defecto {

    //valores por defecto (no maximizado) del css
    static footerDisplay = "";
    static cabeceraDisplay = "";
    static mainWidth = "";
    static mainHeight = "";
    static mainPadding = "";
    static lienzoPadding = "";
    static lienzoOverflow = "";

    //carga valores css por defecto de ciertos elementos
    static cargarValores () {
        let footer = document.querySelector("footer");
        let cabecera = document.querySelector("div#cabecera");
        let main = document.querySelector("main");
        let lienzo = document.querySelector("div#lienzo");

        Defecto.footerDisplay = footer.style.display;
        Defecto.cabeceraDisplay = cabecera.style.display;
        Defecto.mainWidth = main.style.width;
        Defecto.mainHeight = main.style.height;
        Defecto.mainPadding = main.style.padding;
        
        Defecto.lienzoPadding = lienzo.style.padding;
        Defecto.lienzoOverflow = lienzo.style.overflow;
    }

    //aplica los estilos por defecto guardados en la clase
    static aplicarEstilosPorDefecto () {
        let footer = document.querySelector("footer");
        let cabecera = document.querySelector("div#cabecera");
        let main = document.querySelector("main");
        let lienzo = document.querySelector("div#lienzo");

        footer.style.display = Defecto.footerDisplay;
        cabecera.style.display = Defecto.cabeceraDisplay;
        main.style.width = Defecto.mainWidth;
        main.style.height = Defecto.mainHeight;
        main.style.padding = Defecto.mainPadding;
        lienzo.style.padding = Defecto.lienzoPadding;
        lienzo.style.overflow = Defecto.lienzoOverflow;
    }

}