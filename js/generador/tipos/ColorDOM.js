class ColorDOM {

    constructor (color) {
        this.color = color;
        this.crearNodo();
    }

    crearNodo () {
        let input = document.createElement("input");
        input.type = "color";
        //pasar al input => quitar parte de alpha y poner en hexa pero a partir de rgb 255 max
        let r255 = Math.round(255*parseInt(this.color.hexadecimal[1] + this.color.hexadecimal[2], 16));
        let g255 = Math.round(255*parseInt(this.color.hexadecimal[3] + this.color.hexadecimal[4], 16));
        let b255 = Math.round(255*parseInt(this.color.hexadecimal[5] + this.color.hexadecimal[6], 16));

        let rh = r255.toString(16);
        let gh = g255.toString(16);
        let bh = b255.toString(16);

        if (rh.length == 1) {
            rh = "0"+rh;
        }
        if (gh.length == 1) {
            gh = "0"+gh;
        }
        if (bh.length == 1) {
            bh = "0"+bh;
        }
        
        let value = "#"+rh+gh+bh;
        input.value = value;
        this.nodo = input;
    }

}