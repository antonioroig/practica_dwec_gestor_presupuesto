import * as exGp from '/js/gestionPresupuestoWeb.js';
function mostrarDatoEnId(idElemento, valor)
{
    let elem = document.getElementById(idElemento);
    let p = document.createElement("p");
    //let pTexto = document.createTextNode(valor);
    //p.appendChild(pTexto);
    p.textContent = valor;
    elem.appendChild(p);
}
function mostrarGastoWeb()
{
    
}
function mostrarGastosAgrupadosWeb()
{
    
}


export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
//npm cypress open//para ejecutar el text de la practica 4//
//type module//