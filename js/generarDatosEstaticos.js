import * as gp from './gestionPresupuesto';

function mostrarDatoEnId(idElemento, valor) {

}
  
function mostrarGastoWeb(idElemento, gasto) {
    if(idElemento != null){
        let divGasto = document.createElement("div");
        divGasto.className = "gasto";

        let elemento = document.getElementById(idElemento);
        elemento.appendChild(divGasto);

        let divDescripcion = document.createElement("div");
        divDescripcion.className = "gasto-descripcion";
        divDescripcion.innerHTML += gasto.descripcion;
        divGasto.appendChild(divDescripcion);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup) {

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};