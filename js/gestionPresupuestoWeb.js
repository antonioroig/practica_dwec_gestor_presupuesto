'use strict';
import * as gestionPresupuesto from  "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
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
            let spanEtiquetas = document.createElement('span');
            spanEtiquetas.className= "gasto-etiquetas-etiqueta";
            spanEtiquetas.textContent = gasto.etiquetas[i] + " ";
            divGastoEtiquetas.append(spanEtiquetas)
        }
        
        let salto=document.createElement("br");
        divGasto.append(divGastoEtiquetas, salto);
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

    for(let valor of Object.keys(agrup))
    {
        let datoDIV = document.createElement('div');
        datoDIV.className = 'agrupacion-dato';

        let datoClaveSPAN = document.createElement('span');
        datoClaveSPAN.className = 'agrupacion-dato-clave';
        datoClaveSPAN.innerHTML += `${valor}`;

        let datoValorSPAN = document.createElement('span');
        datoValorSPAN.className = 'agrupacion-dato-valor';
        datoValorSPAN.innerHTML += " " + agrup[valor] + " €";
        
        datoDIV.appendChild(datoClaveSPAN);
        datoDIV.appendChild(datoValorSPAN);
        agrupDIV.appendChild(datoDIV);
    }
    elemento.append(agrupDIV);
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}