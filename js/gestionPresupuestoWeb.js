function mostrarDatoEnId(valor, idElemento){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += valor;
}
function mostrarGastoWeb(idElemento, {descripcion, valor, fecha, etiquetas}){
    let elemento = document.getElementById(idElemento);
    let divGasto = document.createElement('div');
        divGasto.className = "gasto";
        elemento.appendChild(divGasto);
    let divGastoDescripcion = document.createElement('div');
        divGastoDescripcion.className = "gasto-descripcion";
        divGastoDescripcion.innerHTML += descripcion;
        divGasto.appendChild(divGastoDescripcion);
    let divGastoFecha = document.createElement('div');
        divGastoFecha.className = "gasto-fecha";
        divGastoFecha.innerHTML += fecha;
        divGasto.appendChild(divGastoFecha);
    let divGastoValor = document.createElement('div');
        divGastoValor.className = "gasto-valor";
        divGastoValor.innerHTML += valor;
        divGasto.appendChild(divGastoValor);
    let divGastoEtiquetas = document.createElement('div');
        divGastoEtiquetas.className = "gasto-etiquetas";
        divGastoEtiquetas.innerHTML +=  etiquetas.forEach(etiqueta => {
            let spanEtiqueta = document.createElement('span');
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.innerHTML += etiqueta;
            divGastoEtiquetas.appendChild(spanEtiqueta);
        });
        divGasto.appendChild(divGastoEtiquetas);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento = document.getElementById(idElemento);
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}