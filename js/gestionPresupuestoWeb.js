import * as gestionPresupuesto from './gestionPresupuesto';
function mostrarDatoEnId(idElemento, valor)
{
    gestionPresupuesto.actualizarPresupuesto(valor);
    let element = document.getElementById(idElemento);
    element.innerHTML = gestionPresupuesto.mostrarPresupuesto();
    return element;
}

function mostrarGastoWeb(idElemento,gasto)
{
    let element = document.getElementById(idElemento);
    let gastoDiv = document.createElement('div');
    gastoDiv.className = 'gasto';
    let gastoDes = document.body.firstElementChild.createElement('div');

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}