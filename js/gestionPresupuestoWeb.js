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
        spanEtiqueta .textContent = etiq;
        divEtiquetas.append(spanEtiqueta);
    }
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    // let idAll = document.getElementById(idElemento);
    // idAll.innerHTML = '';
    // let divAgrupado = `<div class="agrupacion"><h1>Gastos agrupados por ${periodo}</h1>`;

    // for(let agrupacion in agrup){
    //     divAgrupado += `<div class="agrupacion-dato"><span class="agrupacion-dato-clave">${agrupacion}</span><span class="agrupacion-dato-valor">${agrup[agrupacion]}</span></div>`;
    // }

    // divAgrupado += '</div>';
    // idAll.innerHTML = divAgrupado;
    let titulo = document.createElement('h1');

    titulo.textContent = `Gastos agrupados por ${periodo}`;

    divAgrupacion.appendChild(titulo);

    for(let propiedad of Object.keys(agrup))
    {
        let divDato = document.createElement('div');
        divDato.className = 'agrupacion-dato';
        divAgrupacion.appendChild(divDato);

        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent += `${propiedad}`;
        divDato.appendChild(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent += ` ${propiedad.valueOf()}`;
        divDato.appendChild(spanValor);
    }
    elem.append(divAgrupacion);
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}