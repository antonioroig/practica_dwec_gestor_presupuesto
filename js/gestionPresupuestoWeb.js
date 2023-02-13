import * as gestionPresupuesto from './gestionPresupuesto.js';
//unción de dos parámetros que se encargará 
//de escribir el valor (texto) en el elemento HTML con id idElemento
function mostrarDatoEnId(idElemento,valor)
{
    let elemento=document.getElementById(idElemento);
    elemento.innerHTML +=valor;
}

function mostrarGastoWeb()
{

}

function mostrarGastosAgrupadosWeb()
{

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}