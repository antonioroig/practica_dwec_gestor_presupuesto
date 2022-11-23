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

        let borrarEtiquetas = new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiquetas = etiqueta;
        spanEtiqueta.addEventListener('click',borrarEtiquetas);
    }
   

    divGasto.append(divEtiquetas); 

    let botonEditar = document.createElement('button');
    botonEditar.type = 'button';
    botonEditar.className = 'gasto-editar';
    botonEditar.textContent = 'Editar';

    let editar = new EditarHandle(gasto);
    botonEditar.addEventListener('click',editar);
    divGasto.append(botonEditar);
    
    let botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.textContent = 'Borrar';

    let borrar = new BorrarHandle(gasto);
    botonBorrar.addEventListener('click', borrar);
    divGasto.append(botonBorrar);
     
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
    document.getElementById('presupuesto');
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto())

    document.getElementById('gastos-totales');
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());

    document.getElementById('balance-total');
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());
    
    document.getElementById('listado-gastos-completo').innerHTML = '';

    for(let completo of gestionPresupuesto.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo',completo);
    }

};

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduce el presupuesto');
    presupuesto = parseInt(presupuesto);
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
    
};

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce la descripcion');
    let valor = prompt('Introduce el valor');
    valor = parseInt(valor);
    let fecha = prompt('Introduce la fecha en formato yyyy/mm/dd');
    fecha = Date.parse(fecha);
    let etiquetas = prompt('Introduce las etiquetas como una lista separadas por comas');
    etiquetas = etiquetas.split(',');
    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();

}

function EditarHandle(){
  this.handleEvent = function (event) {
    let descripcion = prompt('Introduce la nueva descripcion');
    let valor = prompt('Introduce el nuevo valor');
    valor = parseInt(valor);
    let fecha = prompt('Introduce la fecha en formato yyyy/mm/dd');
    fecha = Date.parse(fecha);
    let etiquetas = prompt('Introduce las etiquetas como una lista separadas por comas');
    etiquetas = etiquetas.split(',');
    //No pasa el test esto
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);
    repintar();
    }

};

//No pasa el test esto
function BorrarHandle(id){
  this.handleEvent = function (event) {
    //let borrarGasto = this.gasto.id;
    //gestionPresupuesto.borrarGasto(borrarGasto);
    this.gasto.borrarGasto(id)
    repintar();
    }
};

function BorrarEtiquetasHandle(){
  this.handleEvent = function (event) {
    this.gasto.borrarEtiquetas(this.etiquetas);
    repintar();

    } 
};


let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click',actualizarPresupuestoWeb);

let botonNuevoGasto = document.getElementById('anyadirgasto');
botonNuevoGasto.addEventListener('click',nuevoGastoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}