import * as gestionPresupuesto from './gestionPresupuesto.js';
"use strict";

function mostrarDatoEnId(idElemento,valor){
    let idE = document.getElementById(idElemento);
    idE.innerHTML += valor;
};

function mostrarGastoWeb(idElemento,gasto){
    let id = document.getElementById(idElemento);

    let divGastos = document.createElement('div');
    divGastos.className = 'gasto';
    id.append(divGastos);

    let divDesc = document.createElement('div');
    divDesc.className = 'gasto-descripcion';
    divDesc.textContent = gasto.descripcion;
    divGastos.append(divDesc);

    let divDate = document.createElement('div');
    divDate.className = 'gasto-fecha';
    divDate.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGastos.append(divDate);

    let divValue = document.createElement('div');
    divValue.className = 'gasto-valor';
    divValue.textContent = gasto.valor + "";
    divGastos.append(divValue);

    let divEtiq = document.createElement('div');
    divEtiq.className = 'gasto-etiquetas';
    for(let etiqueta of gasto.etiquetas){
        let span = document.createElement('span');
        span.className = 'gasto-etiquetas-etiqueta';
        span.textContent = etiqueta;
        divEtiq.append(span);

        let etiquetaBorradas = new BorrarEtiquetasHandle(gasto);
        etiquetaBorradas.gasto = gasto;
        etiquetaBorradas.etiquetas = etiqueta;
        span.addEventListener("click", etiquetaBorradas)
    }
    divGastos.append(divEtiq);

    //Modificación de la función
    let editarBut = document.createElement('button');
    editarBut.type = 'button';
    editarBut.className = 'gasto-editar';
    editarBut.textContent = 'Editar';
    
    let editarNuevo = new EditarHandle(gasto);
    editarNuevo.gasto = gasto;

    editarBut.addEventListener("click", editarNuevo);

    divGastos.append(editarBut);

    let borrarBut = document.createElement('button');
    borrarBut.className = 'gasto-borrar';
    borrarBut.type = 'button';
    borrarBut.textContent = 'Borrar';
    
    let borrarNuevo = new BorrarHandle(gasto);
    borrarNuevo.gasto = gasto;

    borrarBut.addEventListener("click", borrarNuevo);

    divGastos.append(borrarBut);
};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let idAgrup = document.getElementById(idElemento);
    idAgrup.innerHTML = '';

    let div = `<div class="agrupacion"> <h1>Gastos agrupados por ${periodo}</h1>`;
    for(let agrupacion in agrup){
        div +=`<div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${agrupacion}</span>
                <span class="agrupacion-dato-valor">${agrup[agrupacion]}</span>
            </div>`;
    }
    div += '</div>';
    idAgrup.innerHTML = div;
};

function repintar(){
    //Mostrar presupuesto en div#presupuesto
    document.getElementById("presupuesto").innerHTML = "";
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    //Mostrar gastos totales en div#gastos-totales
    document.getElementById("gastos-totales").innerHTML = "";
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    //Mostrar el balance total en div#balance-total
    document.getElementById("balance-total").innerHTML = "";
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    //Borrar el contenido de div#listado-gastos-completo
    document.getElementById("listado-gastos-completo").innerHTML = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo
    document.getElementById("listado-gastos-completo").innerHTML = "";
    for(let element of gestionPresupuesto.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", element);
    }
    
};

function actualizarPresupuestoWeb(){
    //Pedir al usuario que introduzca un presupuesto
    let pres = prompt("Introduce un presupuesto");
    //Convertir el valor a número
    pres = parseInt(pres);
    //Actualizar el presupuesto
    gestionPresupuesto.actualizarPresupuesto(pres);
    //Llamar a la función repintar
    repintar();
};


function nuevoGastoWeb(){
    let descripcion = prompt("Introduce una descripción:");
    let valor = parseFloat(prompt("Introduce un valor:"));
    let fecha = Date.parse(prompt("Introduce la fecha:"));
    let etiquetas = prompt("Introduce las etiquetas:").split(',');

    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas));

    repintar();
};

function EditarHandle(){
    this.handleEvent = function(event){
        let descripcion = prompt("Introduce una descripción:");
        let valor = parseFloat(prompt("Introduce un valor:"));
        let fecha = Date.parse(prompt("Introduce la fecha:"));
        let etiquetas = prompt(("Introduce las etiquetas:").split(','));
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
};

function BorrarHandle(){
    this.handleEvent = function(event){
        let borrarHandle = this.gasto.id;
        gestionPresupuesto.borrarGasto(borrarHandle);
        repintar();
    }
};

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    };
};

//Función nuevo gasto web formulario
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    formulario.addEventListener('submit', function(event){
        
    })
    
};

function EditarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");
        
        let form = event.currentTarget;
        form.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha = new Date(this.gasto.fecha);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let cancel = new CancelarHandleFormulario();
        let butCancel = formulario.querySelector("button.cancelar");
        butCancel.addEventListener('click', cancel);
        butCancel = document.getElementById('anyadirgasto-formulario').setAttribute('disabled');
    }
};
function CancelarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
    }
};

//Botones
document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("submit",nuevoGastoWebFormulario)

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    EditarHandleFormulario,
    CancelarHandleFormulario
};