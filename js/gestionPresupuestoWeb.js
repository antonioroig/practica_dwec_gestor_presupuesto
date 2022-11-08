import * as gestionPresupuesto from './gestionPresupuesto.js';
"use strict";

function mostrarDatoEnId(valor, idElemento){
    let idE = document.getElementById(idElemento);
    idE.innerHTML = valor;
};

function mostrarGastoWeb(idElemento, gasto){
    let div = document.createElement('div');
    div.innerHTML = '<div class="gasto">';
    document.getElementById(idElemento).append(div);

    let div2 = document.createElement('div');
    div2.innerHTML = '<div class="gasto-descripcion">';

    let div3 = document.createElement('div');
    div3.innerHTML = '<div class="gasto-fecha">';
};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

};




export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};