import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento)
{
    let elem = document.getElementById(idElemento);
    elem.innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elem = document.getElementById(idElemento);
    elem.innerHTML = 
    `<div class ="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div>
        <div class="gasto-valor">${gasto.valor}</div>
        <div class="gasto-etiquetas">
            <span class="gasto-etiquetas-etiqueta">
            </span>`
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}