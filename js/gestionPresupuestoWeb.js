import * as gestion from './gestionPresupuesto';

function mostrarDatoEnId(valor,idElemento){
    let id = document.getElementById(idElemento);
    id.innerHTML += valor;
}

function mostrarGastoWeb(){}

function mostrarGastosAgrupadosWeb(){}








export	{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}