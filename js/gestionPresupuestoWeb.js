import * as gestionPresupuesto from './gestionPresupuesto.js';

"use strict"; 

function mostrarDatoEnId(idElemento,valor) {
   let id = document.getElementById(idElemento);
    id.innerHTML += valor;
}

function mostrarGastoWeb(idElemento,gasto){

    let divGasto = document.createElement('div');
    div.innerHTML = '<div class="gasto">';
    document.getElementById(idElemento).append(divGasto);

    let divDescripcion = document.createElement('div');
    div.innerHTML = '<div class="gasto-descripcion">';
    divDescripcion.textContent = gasto.descripcion;
    document.getElementByClass('gasto').append(divDescripcion);

    let divFecha = document.createElement('div');
    div.innerHTML = '<div class="gasto-fecha">';
    divFecha.textContent = gasto.fecha;
    document.getElementByClass('gasto').append(divFecha);

    let divValor = document.createElement('div');
    div.innerHTML = '<div class="gasto-valor">';
    divValor.textContent = gasto.valor;
    document.getElementByClass('gasto').append(divValor);

    let divEtiquetas = document.createElement('div');
    div.innerHTML = '<div class="gasto-etiquetas">';
    divEtiquetas.textContent = gasto.etiquetas;
    document.getElementByClass('gasto').append(divEtiquetas);

    let spanEtiquetas = document.createElement('span');
    div.innerHTML = '<span class="gasto-etiquetas-etiqueta">';
    document.getElementByClass('gasto-etiquetas').append(spanEtiquetas);

};


function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let idAgrupado = document.getElementById(idElemento);
    idAgrupado.innerHTML = '';

   let clase = `<div class="agrupacion"> <h1>Gastos agrupados por ${periodo}</h1>`;

   for(let agrupacion in agrup){
    clase += `<div class="agrupacion-dato"> <div class="agrupacion-dato-etiqueta"> ${agrupacion} </div> 
    <div class="agrupacion-dato-valor"> ${agrup[agrupacion]} </div> 
    </div>`;
   }
   document.getElementById(idElemento).innerHTML = clase;

};


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}