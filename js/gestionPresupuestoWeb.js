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
    let gastoButtonEditar = document.createElement('button');
    gastoButtonEditar.className = 'gasto-editar';
    gastoButtonEditar.innerHTML = 'Editar gasto';
    let BtnEditar = new EditarHandle();
    BtnEditar.gasto = gasto;
    gastoButtonEditar.addEventListener('click',BtnEditar);
    let gastoButtonBorrar = document.createElement('button');
    gastoButtonBorrar.className = 'gasto-borrar';
    gastoButtonBorrar.innerHTML = 'Borrar gasto';
    gastoDiv.appendChild(gastoButtonBorrar);
    gastoDiv.appendChild(gastoButtonEditar);    
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
    for(let valor of Object.keys(agrup)){
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
    element.appendChild(agrupDIV);
}

function repintar(){
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());
    mostrarDatoEnId('listado-gastos-completo',"");
    mostrarGastoWeb('listado-gastos-completo',gestionPresupuesto.listarGastos());
}

function actualizarPresupuestoWeb(){
    let alert = prompt("Introduce un nuevo presupuesto:",'');
    gestionPresupuesto.actualizarPresupuesto(parseInt(`${alert}`,10));
    repintar();
}

function nuevoGastoWeb(){
    let descripción = prompt("Introduce una nueva descripción:",'');
    let valor = parseFloat(prompt("Introduce un nuevo valor:",''));
    let fecha = prompt("Introduce una nueva fecha:",'');
    let etiquetas = prompt("Introduce nuevas etiquetas:",'');
    let arretiquetas = etiquetas.split(',');
    let newgasto = new gestionPresupuesto.CrearGasto(descripción, valor, fecha, arretiquetas);
    gestionPresupuesto.anyadirGasto(newgasto);
    repintar();
}

function EditarHandle(){
    this.handleEvent = function(){
        let descripción = prompt("Introduce una nueva descripción:",'');
        let valor = parseFloat(prompt("Introduce un nuevo valor:",''));
        let fecha = prompt("Introduce una nueva fecha:",'');
        let etiquetas = prompt("Introduce nuevas etiquetas:",'');
        let arretiquetas = etiquetas.split(',');

        repintar();
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    repintar,
}