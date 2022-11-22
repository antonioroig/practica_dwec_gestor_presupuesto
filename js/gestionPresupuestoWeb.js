import * as Gasto from "./gestionPresupuesto";

function mostrarDatoEnId(id, valor)
{

    if (id != undefined)
    {
        let elemento = document.getElementById(id);
        elemento.innerHTML += " " + valor;
    }

}

function mostrarGastoWeb(id, gasto)
{

    if(id = undefined)
    {

        let documento = document.getElementById(id);
        let gastoDiv = document.createElement('div');

        gastoDiv.className = "gasto";

        let divDescripcionPorGasto = document.createElement('div');

        divDescripcionPorGasto.className = "gasto-descripción";
        divDescripcionPorGasto.innerHTML += gasto.descripcion;

        gastoDiv.append(divDescripcionPorGasto);

    }

}

function mostrarGastosAgrupadosWeb(id, agrupar)
{

        

}

export{

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb

}