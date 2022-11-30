import * as gestionPresupuesto from './gestionPresupuesto.js';

"use strict"; 

function mostrarDatoEnId(idElemento,valor){
    let id = document.getElementById(idElemento);
    id.innerHTML += "" + valor; 
}

function mostrarGastoWeb(idElemento,gasto){
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';
    id.append(divGasto);

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

    for(let etiq of gasto.etiquetas){
        let spanEtiqueta  = document.createElement('span');
        spanEtiqueta .className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta .textContent = " " + etiq;
        divEtiquetas.append(spanEtiqueta);
    }
    divGasto.append(divEtiquetas);
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let idAll = document.getElementById(idElemento);
    idAll.innerHTML = '';
    let divAgrupado = `<div class="agrupacion"><h1>Gastos agrupados por ${periodo}</h1>`;

    for(let agrupacion in agrup){
        divAgrupado += `<div class="agrupacion-dato"><span class="agrupacion-dato-clave"> ${agrupacion}:</span><span class="agrupacion-dato-valor"> ${agrup[agrupacion]}€</span></div>`;
    }

    divAgrupado += '</div>';
    idAll.innerHTML = divAgrupado;
}

function repintar(){
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    let parrafo = document.getElementById("listado-gastos-completo");
    parrafo.innerHTML = '';

    gestionPresupuesto.listarGastos().forEach(gasto =>{
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduce un presupuesto',1500);
    if(presupuesto != undefined){
        presupuesto = parseInt(presupuesto);
        gestionPresupuesto.actualizarPresupuesto(presupuesto);
        repintar();
    };
}

let btnActualizarPresupestoWeb = document.getElementById('actualizarpresupuesto');
btnActualizarPresupestoWeb.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let newDesc = prompt('Introduce una nueva descripcion: ', 'descripcion');
    let newValor = parseFloat(prompt('Escribe un nuevo valor: ', 420));
    let newFecha = prompt('Escribe una nueva fecha: ', '29-11-2022');
    let newEtiquetas = prompt('Escribe una o varias etiquetas nuevas: ', 'etiqueta1,etiqueta2,etiqueta3');
    let arrayNEtiquetas = newEtiquetas.split(',');
    let newGasto = new gestionPresupuesto.CrearGasto(newDesc,newValor,newFecha,arrayNEtiquetas);
    gestionPresupuesto.anyadirGasto(newGasto);
    repintar();
}
let btnNuevoGasto = document.getElementById('anyadirgasto');
btnNuevoGasto.addEventListener('click', nuevoGastoWeb);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}