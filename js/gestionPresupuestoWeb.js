import * as exGp from './gestionPresupuesto.js';
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);
}
function mostrarGastoWeb(idElemento, gasto) {
    let elemento2 = document.getElementById(idElemento);
    
}
function mostrarGastosAgrupados(idElemento, agrup, preiodo){

}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupados
}