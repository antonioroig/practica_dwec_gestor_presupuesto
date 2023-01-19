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

function mostrarGastoWeb(idElemento, gasto)
{
    if(idElemento != undefined)
    {
        let elemento=document.getElementById(idElemento);
        let divGasto = document.createElement("div");
        divGasto.className="gasto";
        elemento.appendChild(divGasto);

        if (gasto.descripcion)
        {
            let divGastoDescripcion = document.createElement("div");
            divGastoDescripcion.className = "gasto-descripcion";
            divGastoDescripcion.innerHTML += gasto.descripcion;
            divGasto.appendChild(divGastoDescripcion);
        }

        if(gasto.valor)
        {
            let divGastoValor = document.createElement("div");
            divGastoValor.className = "gasto-valor";
            divGastoValor.innerHTML += gasto.valor;
            divGasto.appendChild(divGastoValor);
        }

        if (gasto.fecha)
        {
            let divGastoFecha = document.createElement("div");
            divGastoFecha.className = "gasto-fecha";
            divGastoFecha.innerHTML += gasto.fecha;
            divGasto.appendChild(divGastoFecha);  
        }
    }
}













export{
    mostrarDatosEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}