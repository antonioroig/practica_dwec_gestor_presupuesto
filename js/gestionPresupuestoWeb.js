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

        let borrarEtiquetas = new BorrarEtiquestasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiquetas = etiqueta;
        spanEtiqueta.addEventListener('click', borrarEtiquetas);
    }
    divGasto.append(divEtiquetas);

    let botonEditar = document.createElement('button');
    botonEditar.type = 'button';
    botonEditar.className = 'gasto-editar';
    botonEditar.textContent = 'Editar';

    let editar = new EditarHandle(gasto);
    editar.gasto = gasto;
    botonEditar.addEventListener('click', editar);
    divGasto.append(botonEditar);

    let botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.textContent = 'Borrrar';

    let borrar = new BorrarHandle(gasto);
    borrar.gasto = gasto;
    botonBorrar.addEventListener('click', borrar);
    divGasto.append(botonBorrar);


    
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

function repintar() {
    document.getElementById('presupuesto');
    let miPresupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", miPresupuesto);

    document.getElementById('gastos-totales');
    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);

    document.getElementById('balance-total');
    let balance = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", balance);
    
    document.getElementById('listado-gastos-completo').innerHTML = ''

    let gastosListados = gestionPresupuesto.listarGastos();
    for(let elemento of gastosListados){
    mostrarGastoWeb("listado-gastos-completo",elemento);
    }   
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = parseInt(prompt('Introduce el nuevo presupuesto:'));
    gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto)
    repintar()
}

function nuevoGastoWeb() {
    let nuevaDescripcion = prompt('Introduce la descripcion de la nueva etiqueta');
    let nuevoValor = parseInt(prompt('Introduce el valor del nuevo gasto'));
    let nuevaFecha = Date.parse(prompt('Introduce la fecha del nuevo gasto'));
    let nuevasEtiquetas = prompt('Introduce las etiquetas separadas por una ,').split(',')
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevasEtiquetas))
    repintar();
}

function EditarHandle() {
    this.handleEvent = function (event) {
        let nuevaDescripcion = prompt('Introduce la descripcion de la nueva etiqueta');
        let nuevoValor = parseInt(prompt('Introduce el valor del nuevo gasto'));
        let nuevaFecha = Date.parse(prompt('Introduce la fecha del nuevo gasto'));
        let nuevasEtiquetas = prompt('Introduce las etiquetas separadas por una ,').split(',');
    
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarFecha(nuevaFecha);
        this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

        repintar();
    }
    
}

function BorrarHandle() {
    this.handleEvent = function (event) {
        let borrarGasto = this.gasto.id;
        gestionPresupuesto.borrarGasto(borrarGasto);

        repintar();
    }
}

function BorrarEtiquestasHandle() {
    this.handleEvent = function (event) {
        this.gasto.borrarEtiquetas(this.etiquetas);

        repintar();
    }
}

let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', function () { actualizarPresupuestoWeb() });
    
let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener('click', function () { nuevoGastoWeb() });

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquestasHandle
}