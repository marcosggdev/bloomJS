export async function loadShaders (folderPath, filename) {

    const vsPromise = new Promise((resolve) => {
        fetch(`${folderPath}/${filename}.vs`)
        .then(response => response.text())
        .then(text => {
            resolve(text);
        })
        .catch(error => { console.error(error) });
    });


    const fsPromise = new Promise((resolve) => {
        fetch(`${folderPath}/${filename}.fs`)
        .then(response => response.text())
        .then(text => {
            resolve(text);
        })
        .catch(error => { console.error(error) });
    });

    return Promise.all([vsPromise, fsPromise])
        .then(result => {
            return {
                vsCode: result[0], 
                fsCode: result[1]
            }
        })
        .catch((error) => { console.error(error) });

}

export function createShader (gl, type, shaderCode) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, shaderCode);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
    
export function createProgram (gl, VSHADER, FSHADER) {
    var program = gl.createProgram();
    gl.attachShader(program, VSHADER);
    gl.attachShader(program, FSHADER);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}