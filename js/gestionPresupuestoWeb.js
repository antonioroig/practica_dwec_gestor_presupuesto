
import * as pres from './gestionPresupuesto.js';
function mostrarDatoEnId(valor,idElemento)
{
    idElemento = document.getElementById('presupuesto');
    valor = pres.mostrarPresupuesto(idElemento);
    idElemento.innerHTML = valor;
};
function mostrarGastoWeb(idElemento,gasto)
{
 let id = document.getElementById(idElemento);
 let div = document.createElement('div');
 div.classList ="gasto";
 id.appendChild(div);
 let idGasto = document.getElementsByClassName("gasto");

 let desc_gasto = document.createElement('div');
 desc_gasto.classList = "gasto-descripción";
 desc_gasto.textContent = gasto.descripcion;
 id.appendChild(desc_gasto);
};
function mostrarGastosAgrupadosWeb(){};
export{mostrarDatoEnId,mostrarGastoWeb,mostrarGastosAgrupadosWeb}