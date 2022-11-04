import * as gestionpr from './gestionPresupuesto.js';
"use strict";

function mostrarDatoEnId(valor,idElemento){
    if(idElemento!==undefined){
        let elem= document.getElementById(idElemento);
        elem.innerHTML+= "" + valor;
    }
    
}


let mostrarGastoWeb = function(){

}

let mostrarGastosAgrupadosWeb = function(){

}

















export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}