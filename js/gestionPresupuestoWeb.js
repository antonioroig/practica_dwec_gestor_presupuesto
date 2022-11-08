import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento)
{
    let elem = document.getElementById(idElemento);
    elem.innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}