import * as gestionPresupuesto from './gestionPresupuesto.js';
"use strict"; 

function mostrarDatoEnId(valor,idElemento) {
   let id = document.getElementById(idElemento);
    id.innerHTML = valor;
}

function mostrarGastoWeb(idElemento,gasto){

    let divGasto = document.createElement('div');
    div.innerHTML = '<div class="gasto">';
    document.getElementById(idElemento).append(divGasto);

    let divDescripcion = document.createElement('div');
    div.innerHTML = '<div class="gasto-descripcion">';
    document.getElementByClass('gasto').append(divDescripcion);

    let divFecha = document.createElement('div');
    div.innerHTML = '<div class="gasto-fecha">';
    document.getElementByClass('gasto').append(divFecha);

    let divValor = document.createElement('div');
    div.innerHTML = '<div class="gasto-valor">';
    document.getElementByClass('gasto').append(divValor);

    let divEtiquetas = document.createElement('div');
    div.innerHTML = '<div class="gasto-etiquetas">';
    document.getElementByClass('gasto').append(divEtiquetas);

    let spanEtiquetas = document.createElement('span');
    div.innerHTML = '<span class="gasto-etiquetas-etiqueta">';
    document.getElementByClass('gasto-etiquetas').append(spanEtiquetas);

    let spanEtiquetas2 = document.createElement('span');
    div.innerHTML = '<span class="gasto-etiquetas-etiqueta">';
    document.getElementByClass('gasto-etiquetas').append(spanEtiquetas2);

};


function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){};


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}