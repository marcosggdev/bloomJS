 
    window.addEventListener('load', () => {
        
        //crear canvas y contexto webgl
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        if (!canvas) {
            console.log('Error al obtener el canvas');
            return;
        }
        gl = canvas.getContext('webgl');
        if (!gl) {
            console.log('Error al obtener el contexto del canvas');
            return;
        }
        
        //camara que el renderer utiliza para dibujar
        let arcballCamera = new ArcballCamera(0,0,0,30,-16,28);

        //se encarga de dibujar en el canvas
        Renderer.iniciar(arcballCamera, 640, 480);let modelo0 = new Modelo3D(0, 0, 0, 0,0,0, 1, 1, 1,'T','/bloomJS/assets/defecto/modelos/veleta.dae', new Color(0.5, 0.5, 0.5, 1), '/bloomJS/assets/defecto/texturas/veleta.png','/bloomsJS/assets/materiales/esfera.mtl');Renderer.configurarParametros({"ancho":"800","alto":"480","fondo":{"R":"0.3","G":"0.8","B":"0.3","A":"0.2"},"dibujarGrid":false});//el menu global se actualiza cada vez que se añade o borra un grafico dibujable
        
        let grid = new Grid();
        let aps = 24;
        let spa = 1 / aps;
        setInterval(Renderer.ciclo, spa);
    });