import * as gestionPresupuesto from './gestionPresupuesto.js';
//unción de dos parámetros que se encargará 
//de escribir el valor (texto) en el elemento HTML con id idElemento
function mostrarDatoEnId(idElemento,valor){
    let elemento=document.getElementById(idElemento);
    elemento.innerHTML +=valor;
}
//Función de dos parámetros que se encargará de añadir dentro del elemento 
//HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro
function mostrarGastoWeb(idElemento, gasto){
    let elemento=document.getElementById(idElemeto);

    let divClase=document.createElement('div');
    divClase.className='gasto';
    elemento.append(divClase);

    let divDescripcion=document.createElement('div');
    divDescripcion.className='gasto-descripcion';
    divDescripcion.textContent=gasto.descripcion;
    divClase.append(divDescripcion);

    let divFecha=document.createElement('div');
    divFecha.className='gasto-fecha';
    divFecha.textContent=gasto.fecha;
    divClase.append(divFecha);

    let divValor=document.createElement('div');
    divValor.className='gasto-valor';
    divValor.textContent=gasto.valor;
    divClase.append(divValor);

    let divEtiquetas=document.createElement('div');
    divEtiquetas.className='gasto-etiquetas';
    for(let etiqueta of gasto.etiquetas){
        let spanEtiqueta=document.createElement('span');
        spanEtiqueta.className='gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent=etiqueta;
        divEtiquetas.append(spanEtiqueta);
    }
    divClase.append(divEtiquetas);
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let grupo = document.getElementById(idElemento);
    grupo.innerHTML='';
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}