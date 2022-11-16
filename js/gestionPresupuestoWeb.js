import{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos 
} from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento){
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += valor;
    }
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