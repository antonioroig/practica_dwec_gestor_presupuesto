import * as gestionPresupuesto from './gestionPresupuesto.js';
"use strict"; 

function mostrarDatoEnId(valor,idElemento) {
   let id = document.getElementById(idElemento);
    id.innerHTML = valor;
}

function mostrarGastoWeb(idElemento,gasto){

    let div = document.createElement('div');
    div.innerHTML = '<div class="gasto">';
    document.getElementById(idElemento).append(div);

    let div2 = document.createElement('div');
    div.innerHTML = '<div class="gasto-descripcion">';

    document.getElementByClass('gasto').append(div2);
    
};


function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){};


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}