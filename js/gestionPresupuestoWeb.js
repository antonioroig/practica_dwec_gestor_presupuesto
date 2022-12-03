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
    divValor.textContent = gasto.valor;
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

    //Botones para añadir en el formulario

    //Boton editar
    let botonEditar = document.createElement('button');
    botonEditar.type = 'button';
    botonEditar.className = 'gasto-editar';
    botonEditar.textContent = 'Editar';

    let editar = new EditarHandle(gasto);
    editar.gasto = gasto;
    botonEditar.addEventListener('click',editar);
    divGasto.append(botonEditar);
    
    //Boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.textContent = 'Borrar';

    let borrar = new BorrarHandle(gasto);
    borrar.gasto = gasto;
    botonBorrar.addEventListener('click', borrar);
    divGasto.append(botonBorrar);

    //Boton editar formulario
    let botonEditarForm = document.createElement('button');
    botonEditarForm.type = 'button';
    botonEditarForm.className = 'gasto-editar-formulario';
    botonEditarForm.textContent = 'Editar (formulario)';

    let editarForm = new EditarHandleFormulario(gasto);
    editarForm.gasto = gasto;
    botonEditarForm.addEventListener('click',editarForm);
    divGasto.append(botonEditarForm);
     
};

//Funciones
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
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos().toFixed(2));

    document.getElementById('balance-total');
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance().toFixed(2));
    
    document.getElementById('listado-gastos-completo').innerHTML = '';

    for(let completo of gestionPresupuesto.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo',completo);
    }

};

function actualizarPresupuestoWeb(){
    let presupuesto = parseFloat(prompt('Introduce el presupuesto'));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);

    repintar();
    
};

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce la descripcion');
    let valor = parseFloat(prompt('Introduce el valor'));
    let fecha =  Date.parse(prompt('Introduce la fecha en formato yyyy/mm/dd'));
    let etiquetas = prompt('Introduce las etiquetas como una lista separadas por ,').split(',');

    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);

    repintar();

}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
   
        let controles = document.getElementById("controlesprincipales");
        controles.append(formulario);

        document.getElementById("anyadirgasto-formulario").setAttribute('disabled', "");

        //Boton cancelar
        let cancelar = new CancelarHandleFormulario();
        let botonCancelar = formulario.querySelector("button.cancelar")
        botonCancelar.addEventListener('click',cancelar);

        //Boton enviar formulario
        let enviar = new EnviarHandleFormulario();
        formulario.addEventListener('submit',enviar);

};

//Funciones constructoras y metodos
function EditarHandle(){
  this.handleEvent = function (event) {

    let nuevaDescripcion = prompt('Introduce la nueva descripcion');
    let nuevoValor =  parseFloat(prompt('Introduce el nuevo valor'));;
    let nuevaFecha = Date.parse(prompt('Introduce la fecha en formato yyyy/mm/dd'));
    let nuevasEtiquetas = prompt('Introduce las etiquetas como una lista separadas por ,');
    nuevasEtiquetas = nuevasEtiquetas.split(',');

    //Actualizar gasto
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

    repintar();
    }

};

function BorrarHandle(){
  this.handleEvent = function (event) {
    let borrarGasto = this.gasto.id;
    gestionPresupuesto.borrarGasto(borrarGasto);

    repintar();
    }
};

function BorrarEtiquetasHandle(){
  this.handleEvent = function (event) {
    this.gasto.borrarEtiquetas(this.etiquetas);

    repintar();
    } 
};

function EditarHandleFormulario(){
    this.handleEvent = function(event){

        event.preventDefault()

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");

        let controles = document.getElementById("controlesprincipales");
        controles.append(formulario);
    
        let botonFormulario = event.currentTarget;
        botonFormulario.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        
        //Boton cancelar
        let cancelar = new CancelarHandleFormulario();
        let botonCancelar = formulario.querySelector("button.cancelar")
        botonCancelar.addEventListener('click',cancelar);

        //Boton enviar
        let enviar = new EnviarHandle();
        enviar.gasto = this.gasto;
        formulario.addEventListener('submit',enviar);

        //Desabilitar boton
        botonFormulario.setAttribute('disabled', "");

    }
}

function CancelarHandleFormulario(){
    this.handleEvent = function(event){

        event.preventDefault();

        event.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();

    }
}

function EnviarHandle(){
    this.handleEvent = function(event){
     
        event.preventDefault();
        
        let formulario = event.currentTarget;

        let descripcion = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = parseFloat(formulario.elements.valor.value);
        this.gasto.actualizarValor(valor);

        let fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
}

function EnviarHandleFormulario(){
    this.handleEvent = function(event){

        event.preventDefault();

        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;

        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
        gestionPresupuesto.anyadirGasto(nuevoGasto);
        
        repintar();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

    }
}
//Botones para añadir al html
let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click',actualizarPresupuestoWeb);

let botonNuevoGasto = document.getElementById('anyadirgasto');
botonNuevoGasto.addEventListener('click',nuevoGastoWeb);

let botonAnyadirGasto = document.getElementById('anyadirgasto-formulario');
botonAnyadirGasto.addEventListener('click',nuevoGastoWebFormulario);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    EditarHandleFormulario,
    CancelarHandleFormulario,
    EnviarHandleFormulario,
    EnviarHandle,
    nuevoGastoWebFormulario
}