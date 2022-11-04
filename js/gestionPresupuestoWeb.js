import * as gestion from './gestionPresupuesto.js';

function mostrarDatoEnId(valor,idElemento){
    
    if(idElemento !== undefined){
        let id = document.getElementById(idElemento);
        id.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto){
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    let divGastoDes = document.createElement("div");
    divGastoDes.className = "gasto-descripcion";
    divGastoDes.textContent(gasto.descripcion);


    let divGastoFecha = document.createElement("div");
    divGastoFecha.textContent(gasto.fecha);


    let divGastoValor = document.createElement("div");
    divGastoValor.textContent = document.createElement(gasto.valor);

    for(let i = 0; i < gasto.etiqueta.lenght;i++){
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
    }

}

function mostrarGastosAgrupadosWeb(){}


export	{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}