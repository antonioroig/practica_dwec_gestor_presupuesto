import * as ges from "./gestionPresupuesto.js";


function mostrarDatoEnId(valor,idElemento){
    if(idElemento !== undefined){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento,gasto){

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

}






//NO MODIFICAR.
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}