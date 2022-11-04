"use strict"; 

function mostrarDatoEnId(valor,idElemento) {
   let id = document.getElementById(idElemento);
    id.innerHTML = valor;
}

function mostrarGastoWeb(idElemento,gasto){};


function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){};



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}