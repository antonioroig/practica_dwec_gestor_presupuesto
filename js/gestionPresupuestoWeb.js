//gestionPresupuestoWeb.js

/*
mostrarDatoEnId
mostrarGastoWeb
mostrarGastosAgrupadosWeb
*/
import * as gesP from  "./gestionPresupuesto.js";


function mostrarDatoEnId(valor, idElemento)
{
    if (idElemento != undefined)
    {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto)
{

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}