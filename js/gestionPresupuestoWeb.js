import * as gestionPresupuesto from './gestionPresupuesto.js';

"use strict"; 

function mostrarDatoEnId(idElemento,valor){
    let idE = document.getElementById(idElemento);
    idE.innerHTML += valor; 
}

function mostrarGastoWeb(idElemento,gasto){
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';
    id.append(divGasto);

    let divDescripcion = document.createElement('div');
    divDescripcion.className += 'descripGasto';
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    let divFecha = document.createElement('div');
    divFecha.className += 'fechaGasto';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divFecha);

    let divValor = document.createElement('div');
    divValor.className = 'valorGasto';
    divValor.textContent = gasto.valor + "€";
    divGasto.append(divValor);

    for(let etiq of gasto.etiquetas){
        let etiqueta = document.createElement('span');
        etiqueta.className = 'etiqueta-gastoEtiquetas';
        etiqueta.textContent = etiq;
        divEtiquetas.append(etiqueta);
    }
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}