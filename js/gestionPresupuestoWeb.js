import * as gestionPresupuesto from './gestionPresupuesto';
function mostrarDatoEnId(idElemento,valor)
{
    gestionPresupuesto.actualizarPresupuesto(valor);
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = gestionPresupuesto.mostrarPresupuesto();
    return elemento;
}
function mostrarGastoWeb(idElemento, gasto)
{
    let elemento = document.getElementById(idElemento);
    let DIVgasto = document.createElement('div');
    DIVgasto.className = 'gasto';
}
function mostrarGastosAgrupadosWeb()
{
    
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}