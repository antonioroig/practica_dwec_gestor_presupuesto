import * as gestionPresupuesto from './gestionPresupuesto.js';
'use strict';

function mostrarDatoEnId(idElemento, valor)
{
    let id = document.getElementById(idElemento);
     id.innerHTML += valor;
}
 
function mostrarGastoWeb(idElemento, gasto)
{
    let idWeb = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';
    idWeb.append(divGasto);

    let divDescripcion = document.createElement('div');
    divDescripcion.className += 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    let divFecha = document.createElement('div');
    divFecha.className += 'gasto-fecha';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divFecha);

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor + "€";
    divGasto.append(divValor);

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';
    
    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = etiqueta;
        divEtiquetas.append(spanEtiqueta);
    }
    divGasto.append(divEtiquetas);
    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let idAgrup = document.getElementById(idElemento);
    idAgrup.innerHTML = '';

    let agrupDiv = `<div class="agrupacion"> <h1>Gastos agrupados por ${periodo}</h1>`;

    for (let agrupacion in agrup) {
        agrupDiv +='<div class="agrupacion-dato"><span class="agrupacion-dato-clave">${agrupacion}</span><span class="agrupacion-dato-valor">${agrup[agrupacion]}</span></div>';
    }
    agrupDiv += '</div>';
    idAgrup.innerHTML = agrupDiv;
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}