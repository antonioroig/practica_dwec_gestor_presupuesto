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

        let divGastoEtiquetas = document.createElement("div");
        divGastoEtiquetas.className = "gasto-etiquetas";
        
        for(let i = 0; i < gasto.etiquetas.length; i++){
            let divGastoEtiquetasEtiqueta = document.createElement('span');
            divGastoEtiquetasEtiqueta.className = "gasto-etiquetas-etiqueta";
            divGastoEtiquetasEtiqueta.textContent = gasto.etiquetas[i];
        }

    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let agrupDIV = document.createElement('div');
    agrupDIV.className = 'agrupacion';

    let agrupTit = document.createElement('h1');
    agrupTit.innerHTML = 'Gastos agrupados por ' + periodo;
    agrupDIV.appendChild(agrupTit);

}


export{
    mostrarDatosEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}