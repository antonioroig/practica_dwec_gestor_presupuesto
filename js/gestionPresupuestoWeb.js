"use strict";

//import { mostrarPresupuesto } from "./gestionPresupuesto";
import * as gp from "./gestionPresupuesto.js";

// Añadir eventos a los botones
let btnActualizar = document.getElementById("actualizarpresupuesto");
btnActualizar.onclick = actualizarPresupuestoWeb;

let btnAnyadir = document.getElementById("anyadirgasto");
btnAnyadir.onclick = nuevoGastoWeb;

let btnAnyadirGastoformulario = document.getElementById("anyadirgasto-formulario");
btnAnyadirGastoformulario.onclick = nuevoGastoWebFormulario;

// Muestra en un div el valor que se le pasa por parámetro
function mostrarDatoEnId(valor, idElemento){

    let element = document.getElementById(idElemento);
    element.innerHTML += `<p>${valor}</p>`;
    
}

// Desglosa el objeto gasto y los segmenta en div's
function mostrarGastoWeb(gasto, idElemento){

    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.classList.add(`gasto`);

    // div con descripcion
    let div = document.createElement('div');
    div.classList.add(`gasto-descripcion`);
    div.textContent = gasto.descripcion;;
    divGasto.append(div);

    // div gasto-fecha
    let fechaAux = new Date(gasto.fecha);

    div = document.createElement('div');
    div.classList.add(`gasto-fecha`);
    div.textContent = (fechaAux.toLocaleString());
    divGasto.append(div);

    // div gasto-valor
    div = document.createElement('div');
    div.classList.add(`gasto-valor`);
    div.textContent = gasto.valor;;
    divGasto.append(div);

    // div gasto-etiquetas
    div = document.createElement('div');
    div.classList.add(`gasto-etiquetas`);

    for(let j of gasto.etiquetas){

      let span = document.createElement('span')
      span.classList.add("gasto-etiquetas-etiqueta")
      span.textContent += j
      div.append(span);


      let borrarEtiquetas = new BorrarEtiquetasHandle();
      borrarEtiquetas.gasto = gasto;
      borrarEtiquetas.etiqueta = j;
    
    // Revisar
    span.addEventListener('click',borrarEtiquetas);

    }
    divGasto.append(div);
        
    // Boton Editar
    let btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.className  = 'gasto-editar';
    btnEditar.textContent = 'Editar';
    
    let editarGasto = new EditarHandle();
    editarGasto.gasto = gasto;
    btnEditar.addEventListener('click',editarGasto);
    divGasto.appendChild(btnEditar);
    
    // Boton borrar
    let btnBorrar = document.createElement('button');
    btnBorrar.type = 'button';
    btnBorrar.className  = 'gasto-borrar';
    btnBorrar.textContent = 'Borrar';
    
    let borrarGasto = new BorrarHandle();
    borrarGasto.gasto = gasto;
    btnBorrar.addEventListener('click',borrarGasto);
    divGasto.appendChild(btnBorrar);

    // Boton Editar.Formulario 
    let btnEditarForm = document.createElement('button');
    btnEditarForm.type = 'button';
    btnEditarForm.className = 'gasto-editar-formulario';
    btnEditarForm.textContent = 'Editar (formulario)';
    
    let editarForm = new EditarHandleFormulario();
    editarForm.gasto = gasto;
    btnEditarForm.addEventListener('click',editarForm);
    divGasto.appendChild(btnEditarForm);

    elemento.append(divGasto);   
}

// Muestra los datos del elemento agrupado que se le pasa por parámetro
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

  if(periodo === `dia`){

    periodo = "día"

  }else if(periodo === `anyo`){

    periodo = "año"
    
  }
   let element = document.getElementById(idElemento);

    // Crear div "agrupación"
    let divAgrup = document.createElement("div");
    divAgrup.classList.add("agrupacion")

    let titulo = document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${periodo}`
    divAgrup.append(titulo);
    
    // Recorremos el objeto para obterner sus claves
    for(const[key, value] of Object.entries(agrup)){

      let div = document.createElement("div");
      div.classList.add(`agrupacion-dato`);

      let spanClave = document.createElement("span");
      spanClave.classList.add("agrupacion-dato-clave");
      spanClave.textContent = key;

      
      let spanValor = document.createElement("span");
      spanValor.classList.add("agrupacion-dato-valor");
      spanClave.textContent = value;
      
      div.append(spanClave);
      div.append(spanValor);

      divAgrup.append(div);
    }
    element.append(divAgrup);

}

function repintar(){
  
  mostrarDatoEnId(gp.mostrarPresupuesto(), "presupuesto");
  mostrarDatoEnId(gp.calcularTotalGastos(), "gastos-totales");
  mostrarDatoEnId(gp.calcularBalance(), "balance-total");

  
  let actLista = document.getElementById("listado-gastos-completo");
    actLista.innerHTML='';

    gp.listarGastos().forEach(gasto => {
        mostrarGastoWeb(gasto, "listado-gastos-completo");
    });
}
function actualizarPresupuestoWeb (){

  let presupuesto = parseInt(prompt("Por favor, introduzca el nuevo presupuesto: "));
  gp.actualizarPresupuesto(presupuesto);
  repintar();

}
function nuevoGastoWeb(){

  let descripcion = prompt("Descripción");
  let valor = parseInt(prompt("Valor"));
  let fecha = prompt("Fecha");
  let etiquetas = prompt("Por favor, introduzca las etiquetas separadas por comas ");
  let array = etiquetas.split(', ');
  let gasto = new gp.CrearGasto(descripcion,valor,fecha, array);
  gp.anyadirGasto(gasto);
  repintar(); 

}

// Funciones constructoras 
let EditarHandle = function(){

    this.handleEvent = function(){

      let descripcion = prompt("Descripción");
      let valor = parseFloat(prompt("Valor"));
      let fecha = prompt("Fecha");
      let etiquetas = prompt("Por favor, introduzca las etiquetas separadas por comas ");
      
      this.gasto.actualizarValor(valor);
      this.gasto.actualizarDescripcion(descripcion);
      this.gasto.actualizarFecha(fecha);
      this.gasto.anyadirEtiquetas(etiquetas);
      
      repintar(); 
    }
}
let BorrarHandle = function(){

  this.handleEvent = function(){

    gp.borrarGasto(this.gasto.id);
    repintar();

  }

}
let BorrarEtiquetasHandle = function(){
  
    this.handleEvent = function(){

      this.gasto.borrarEtiquetas(this.etiqueta);
      repintar();

    }

}

// Practica 6

function nuevoGastoWebFormulario(){
  //REvisar
  let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
  btnAnyadirGastoForm.setAttribute('disabled', '');

  // Tomamos el template del documento
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  // Tomamos el formulario
  var formulario = plantillaFormulario.querySelector("form");
  
  let divControlesPrincipales = document.getElementById("controlesprincipales")
  divControlesPrincipales.appendChild(form);
  let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
  

  // MANEJADOR DE EVENTO SUBMIT - REVISAR MAEJADOR DE EVENTO
  let btnEnviar = formulario.querySelector("button[type='submit']");

  // Con esto suficiente
  let objEnviar = new eventoSubmit();
  btnEnviar.addEventListener('click',objEnviar);

  // MANEJADOR DE EVENTO CANCELAR - CHECK
  let btnCancelar = formulario.querySelector("button.cancelar");
  let objCancelar = new eventoCancelar();
  btnCancelar.addEventListener('click', objCancelar);
  
  // Revisar SOBRA OJO
  let elemento = document.getElementById("controlesprincipales");
  elemento.appendChild(plantillaFormulario);
}
// Función constructora -- Revisar
function EditarHandleFormulario() {
  this.handleEvent = function (e){
    
      // Tomamos el template del documento
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  let formulario = plantillaFormulario.querySelector("form");

  /*let controles = document.getElementById('controlesprincipales');
  formulario.appendChild(controles);*/

    // Tomamos los controles principales
    let divControlesPrincipales = document.getElementById("controlesprincipales")
    divControlesPrincipales.appendChild(form);

    //Tomamos el evento
    let btnEditarFormulario = e.currentTarget;
        btnEditarFormulario.appendChild(formulario);

  formulario.elements.descripcion.value = this.gasto.descripcion;
  formulario.elements.valor.value = this.gasto.valor;
  formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);;
  formulario.elements.etiquetas.value = this.gasto.etiquetas;


  let eventoEnviar = new eventoSubmit();
  eventoEnviar.gasto = this.gasto;
        formulario.addEventListener('submit', eventoEnviar);
        
        // MANEJADOR DE EVENTO CANCELAR
        let btnCancelar = formulario.querySelector("button.cancelar");
        let objCancelar = new eventoCancelar();
        btnCancelar.addEventListener('click', objCancelar);

        // Tomamos el boton y lo desactivamos
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
        btnAnyadirGastoForm.setAttribute('disabled', '');

        // Revisar
        //btnEditarFormulario.setAttribute("disabled", "");
  }

}
<<<<<<< HEAD
=======

>>>>>>> 67b376e22d0d5854f85a35ec06ac9c476741f20d
// Submit -- este si 
let eventoSubmitFormulario = function (){
  this.handleevent = function(e){
    e.preventDefault();

    let form = e.currentTarget;
    let descripcion = form.elements.descripcion.value;
    let valor = parseFloat(form.elements.valor.value);
    let fecha = form.elements.fecha.value;
    // let etiq = form.elements.etiquetas.value;
    let etiquetas = splice(', ', form.elements.etiquetas.value );
    
    // Toma los datos y crea un nuevo gasto
    let nuevoGasto = new gp.CrearGasto(descripcion,valor, fecha, etiquetas);
    gp.anyadirGasto(nuevoGasto);
    repintar();
<<<<<<< HEAD
=======

    // Desactiva el botón
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.removeAttribute('disabled');
>>>>>>> 67b376e22d0d5854f85a35ec06ac9c476741f20d
  }
}


// Objeto manejador de eventos- SUBMIT --REVISAR
let eventoSubmit = function () {
  this.handleEvent = function(event){  
    event.preventDefault();

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    
    let descripcion = formulario.elements.descripcion.value;
    let valor = parseFloat(formulario.elements.valor.value);
    let fecha = formulario.elements.fecha.value;
    let etiquetas = splice(', ', formulario.elements.etiquetas.value );
    
    // Toma los datos y crea un nuevo gasto
    let nuevoGasto = new gp.CrearGasto(descripcion,valor, fecha, etiquetas);
    gp.anyadirGasto(nuevoGasto);
    repintar();

    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.removeAttribute('disabled');
  }
}

// Objeto manejador de eventos- CANCELAR -- Check
let eventoCancelar = function() {

  this.handleEvent = function (event){
    event.preventDefault();
    event.stopPropagation();

    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.removeAttribute('disabled');
    
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    formulario.remove();

  }
}
export    {

  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb, 
  repintar,
  actualizarPresupuestoWeb,
  nuevoGastoWeb,
  nuevoGastoWebFormulario

}

