'use strict';
import * as gestionPresupuesto from  "./gestionPresupuesto.js";

function mostrarDatosEnId(idElemento, valor)
{
    if(idElemento != undefined)
    {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += valor;
    }
}
















export{
    mostrarDatosEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}