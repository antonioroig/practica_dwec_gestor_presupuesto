function mostrarDatosEnId(valor, idElemento){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = "<p>" + valor + "</p>";
}

function mostrarGastoWeb(idElemento, {descripcion, valor, fecha, etiquetas}){
    let elemento = document.getElementById(idElemento);
    let divGasto = document.createElement('div');
        divGasto.className = "gasto";
        elemento.append(divGasto);
    let divGastoDescripcion = document.createElement('div');
        divGastoDescripcion.className = "gasto-descripcion";
        divGastoDescripcion.innerHTML = descripcion;
        divGasto.append(divGastoDescripcion);
    let divGastoFecha = document.createElement('div');
        divGastoFecha.className = "gasto-fecha";
        divGastoFecha.innerHTML = fecha;
        divGasto.append(divGastoFecha);
    let divGastoValor = document.createElement('div');
        divGastoValor.className = "gasto-valor";
        divGastoValor.innerHTML = valor;
        divGasto.append(divGastoValor);
    let divGastoEtiquetas = document.createElement('div');
        divGastoEtiquetas.className = "gasto-etiquetas";
        /*divGastoEtiquetas.innerHTML =  etiquetas.forEach(etiqueta => {
            let spanEtiqueta = document.createElement('span');
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.innerHTML = etiqueta;
            divGastoEtiquetas.append(spanEtiqueta);
        });*/
        divGasto.append(divGastoEtiquetas);
}

function mostrarGastosAgrupadosWeb(){
    
}
export{
    mostrarDatosEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}