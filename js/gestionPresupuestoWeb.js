import * as Gasto from "./gestionPresupuesto";

function mostrarDatoEnId(idElemento, valor)
{

    if (idElemento != undefined)
    {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }

}

function mostrarGastoWeb(idGasto, gasto)
{



}

function mostrarGastosAgrupadosWeb(id, agrupar)
{

        

}