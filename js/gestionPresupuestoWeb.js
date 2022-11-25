
import * as pres from './gestionPresupuesto.js';

"use strict";
function mostrarDatoEnId(valor,idElemento)
{
    let id = document.getElementById(idElemento);
    id.innerHTML = valor;
};
function mostrarGastoWeb(idElemento,gasto)
{
 let id = document.getElementById(idElemento);
 let div = document.createElement('div');
 div.className ="gasto";
 id.append(div);
 let idGasto = document.getElementsByClassName("gasto");

 let desc_gasto = document.createElement('div');
 desc_gasto.className = "gasto-descripcion";
 desc_gasto.textContent = gasto.descripcion;
 div.append(desc_gasto);

 let fecha_gasto = document.createElement('div');
 fecha_gasto.className = "gasto-fecha";
 fecha_gasto.textContent = new Date(gasto.fecha).toLocaleDateString();
 div.append(fecha_gasto);

 let valor_gasto = document.createElement('div');
 valor_gasto.className = "gasto-valor";
 valor_gasto.textContent = gasto.valor;
 div.append(valor_gasto);

 let etiquetas_gasto = document.createElement('div');
 etiquetas_gasto.className = "gasto-etiquetas";
 for(let etiqueta of gasto.etiquetas)                    
 {
    let span = document.createElement('span');
    span.className = "gasto-etiquetas-etiqueta";
    span.textContent = etiqueta;
    etiquetas_gasto.appendChild(span);
 }
 div.append(etiquetas_gasto);
};
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{
    let id = document.getElementById(idElemento);
    let agrupacion = '<div class="agrupacion"> <h1> Gastos agrupados por ' +  periodo + '</h1>';

    for(let agrupado in agrup)
    {
        agrupacion += `<div class="agrupacion-dato"> <span class="agrupacion-dato-clave"> ${agrupado} </span>
        <span class="agrupacion-dato-valor"> ${agrup[agrupado]} </span></div>`;
    }
    agrupacion += '</div>';
    id.innerHTML = agrupacion;
};
export{mostrarDatoEnId,mostrarGastoWeb,mostrarGastosAgrupadosWeb}