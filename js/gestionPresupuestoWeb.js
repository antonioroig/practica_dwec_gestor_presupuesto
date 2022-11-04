import * as gestionPresupuesto from './gestionPresupuesto.js';
function mostrarDatoEnId(idElemento, valor){
    let elemento = Document.getElementById(idElemento);
    elemento.innerHtml(valor);
}
function mostrarGastoWeb(){

}
function mostrarGastosAgrupadosWeb(){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}