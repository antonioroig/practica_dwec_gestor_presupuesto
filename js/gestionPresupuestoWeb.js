import * as gestionPresupuesto from './gestionPresupuesto.js';

"use strict"; 

function mostrarDatoEnId(idElemento,valor) {
   let id = document.getElementById(idElemento);
    id.innerHTML += valor;
}

function mostrarGastoWeb(idElemento,gasto){
    
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
    
    for(let etiqueta of gasto.etiquetas){
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = etiqueta;
        divEtiquetas.append(spanEtiqueta);
    }
    divGasto.append(divEtiquetas); 
     
};

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let idAgrupado = document.getElementById(idElemento);
    idAgrupado.innerHTML = '';

   let divAgrup = `<div class="agrupacion"> <h1>Gastos agrupados por ${periodo}</h1>`;

   for(let agrupacion in agrup){
    divAgrup +=`<div class="agrupacion-dato"><span class="agrupacion-dato-clave">${agrupacion}</span>
    <span class="agrupacion-dato-valor">${agrup[agrupacion]}</span></div>`;
   }
   divAgrup += '</div>';
   idAgrupado.innerHTML = divAgrup;
};

function repintar(){
    document.getElementById('presupuesto').innerHTML = '';
    gestionPresupuesto.mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto())

    document.getElementById('gastos-totales').innerHTML = '';
    gestionPresupuesto.mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularBalance());
    
    document.getElementById('listado-gastos').innerHTML = '';
    for(let listado of gestionPresupuesto.listarGastos()){
        gestionPresupuesto.mostrarGastoWeb('listado-gastos',listado);
    }

    document.getElementById('listado-gastos-completo').innerHTML = '';
    for(let completo of gestionPresupuesto.listarGastos()){
        gestionPresupuesto.mostrarGastosWeb('listado-gastos-completo',completo);
    }

};

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduce el presupuesto');
    presupuesto = parseInt(presupuesto);
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
    
};

let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click',actualizarPresupuestoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}