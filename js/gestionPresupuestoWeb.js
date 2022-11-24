'use strict';

import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor)
{
    let element = document.getElementById(idElemento);
    element.innerHTML = valor;
}

function mostrarGastoWeb(idElemento,gastos)
{
    let element = document.getElementById(idElemento);
    gastos.forEach(gasto => {
        let gastoDiv = document.createElement('div');
    gastoDiv.className = 'gasto';
    let gastoDes = document.createElement('div');
    gastoDes.className ='gasto-descripcion';
    gastoDes.innerHTML = gasto.descripcion;
    let gastoDate = document.createElement('div');
    gastoDate.className = 'gasto-fecha';
    gastoDate.innerHTML = gasto.fecha;
    let gastoVal = document.createElement('div');
    gastoVal.className = 'gasto-valor';
    gastoVal.innerHTML = gasto.valor;
    let gastoEti = document.createElement('div');
    gastoEti.className = 'gasto-etiquetas';
    gastoDiv.appendChild(gastoDes);
    gastoDiv.appendChild(gastoDate);
    gastoDiv.appendChild(gastoVal);
    gastoDiv.appendChild(gastoEti);
    gasto.etiquetas.forEach(etiqueta => {
        let spanEti = document.createElement('span');
        spanEti.className = 'gasto-etiquetas-etiqueta';
        spanEti.innerHTML = etiqueta;
        gastoEti.appendChild(spanEti);
    });      
    element.appendChild(gastoDiv); 
    });
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{
    let element = document.getElementById(idElemento);
    let agrupDIV = document.createElement('div');
    agrupDIV.className = 'agrupacion';
    let agrupH1 = document.createElement('h1');
    agrupH1.innerHTML = 'Gastos agrupados por ' + periodo;
    agrupDIV.appendChild(agrupH1);
    // Object.getOwnPropertyNames(agrup).forEach(function(fecha){
    //     let datoDIV = document.createElement('div');
    //     datoDIV.className = 'agrupación-dato';
    //     let datoClaveSPAN = document.createElement('span');
    //     datoClaveSPAN.className = 'agrupacion-dato-clave';
    //     datoClaveSPAN.innerHTML = fecha;
    //     let datoValorSPAN = document.createElement('span');
    //     datoValorSPAN.className = 'agrupacion-dato-valor';
    //     datoValorSPAN.innerHTML =  agrup[fecha];
    //     datoDIV.appendChild(datoClaveSPAN);
    //     datoDIV.appendChild(datoValorSPAN);
    //     agrupDIV.appendChild(datoDIV);
    // })
    element.appendChild(agrupDIV);
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}