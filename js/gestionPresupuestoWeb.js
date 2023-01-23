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
    editarForm.btnEditarForm = btnEditarForm;
    editarForm.div = divGasto;
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

function nuevoGastoWebFormulario(){ // Check
  let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
  btnAnyadirGastoForm.setAttribute('disabled', '');

  // Tomamos el template del documento
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  var formulario = plantillaFormulario.querySelector("form");
  
   let elemento = document.getElementById("controlesprincipales");
  elemento.appendChild(plantillaFormulario);
  
  // Con esto suficiente
  let objEnviar = new eventoSubmit();
  formulario.addEventListener('submit',objEnviar);

  // MANEJADOR DE EVENTO CANCELAR - CHECK
  let btnCancelar = formulario.querySelector("button.cancelar");
  let objCancelar = new eventoCancelar();
  btnCancelar.addEventListener('click', objCancelar);
  
}

// Función constructora -- Check
function EditarHandleFormulario() {
  this.handleEvent = function (e){

    let gasto = this.gasto;
    let divGasto = this.div;
    
    // Tomamos el template del documento
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    
    let divControlesPrincipales = document.getElementById("controlesprincipales")
    divControlesPrincipales.appendChild(formulario);
    
    let btnActivo = e.currentTarget;
    btnActivo.appendChild(formulario);
    
    formulario.elements.descripcion.value = gasto.descripcion;
    formulario.elements.valor.value = gasto.valor;
    formulario.elements.fecha.value = new Date(gasto.fecha).toISOString().substr(0,10);
    formulario.elements.etiquetas.value = gasto.etiquetas;
    
    divGasto.appendChild(formulario);
    
    let eventoEnviar = new enviarHandle();
    eventoEnviar.gasto = this.gasto;
    formulario.addEventListener('submit', eventoEnviar);
    
    
    // MANEJADOR DE EVENTO CANCELAR
    let btnCancelar = formulario.querySelector("button.cancelar");
    let objCancelar = new eventoCancelar();
    btnCancelar.addEventListener("click", objCancelar);
    btnActivo.setAttribute("disabled", '');
  }
}
function enviarHandle()
{
    this.handleEvent = function(event)
    {
        
        event.preventDefault();
        
        let form = event.currentTarget;
        let descrip = form.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descrip);
        let v1 = parseFloat(form.elements.valor.value);
        this.gasto.actualizarValor(v1);
        let fec = form.elements.fecha.value;
        this.gasto.actualizarFecha(fec);
        let etiq = form.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiq);
        repintar();
    }
}

// Objeto manejador de eventos- SUBMIT -- Check
let eventoSubmit = function (){

  this.handleEvent = function(e){
    e.preventDefault();

    let form = e.currentTarget;
    let descripcion = form.elements.descripcion.value;
    let valor = parseFloat(form.elements.valor.value);
    let fecha = form.elements.fecha.value;
    let etiquetas = form.elements.etiquetas.value;
    
    // Toma los datos y crea un nuevo gasto
    let nuevoGasto = new gp.CrearGasto(descripcion,valor, fecha, etiquetas);
    gp.anyadirGasto(nuevoGasto);
    repintar();

    // Desactiva el botón
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.removeAttribute('disabled');

  }
}

// Objeto manejador de eventos- CANCELAR -- Check
let eventoCancelar = function() {

  this.handleEvent = function (event){

    // Toma el evento y lo elimina
    event.currentTarget.parentNode.remove();
    event.stopPropagation();

    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.removeAttribute('disabled');
    repintar();
  }
}

// Práctica 7
let formfiltrado = document.getElementById("formulario-filtrado");
let filtrado = new filtrarGastosWeb();
formfiltrado.addEventListener("submit", filtrado);

function filtrarGastosWeb(){

  this.handleEvent = function (e){
    e.preventDefault();
    
    let form = e.currentTarget;

    let descripcion = form.elements["formulario-filtrado-descripcion"].value;
    let valorMin = parseFloat(form.elements["formulario-filtrado-valor-minimo"].value);
    let valorMax = parseFloat(form.elements["formulario-filtrado-valor-maximo"].value);
    let fechaDesde = new Date(form.elements["formulario-filtrado-fecha-desde"].value);
    let fechaHasta = new Date(form.elements["formulario-filtrado-fecha-hasta"].value);
    let etiquetas = form.elements["formulario-filtrado-etiquetas-tiene"].value;

    if(etiquetas !== undefined){
      etiquetas = gp.transformarListadoEtiquetas(etiquetas);
    }
    let filtrado;
    filtrado = gp.filtrarGastos({fechaDesde: fechaDesde, fechaHasta:fechaHasta, valorMinimo: valorMin, valorMaximo:valorMax,descripcionContiene:descripcion, etiquetasTiene:etiquetas});
    document.getElementById("listado-gastos-completo").innerHTML = " ";
    for(let gasto of filtrado ){
      mostrarGastoWeb(gasto, "listado-gastos-completo");
    }
  };
}
// Práctica 8
let objGuardarGastos = new guardarGastosWeb();
let btnGuardarGastos = document.getElementById("guardar-gastos");
btnGuardarGastos.addEventListener("click", objGuardarGastos);

function guardarGastosWeb(){
  this.handleEvent = function(){
    let gastos = gp.listarGastos();
    localStorage.GestorGastosDWEC = JSON.stringify(gastos);
  }
}

// Check
let objCargarGastos = new cargarGastosWeb();
let btnCargarGastos = document.getElementById("cargar-gastos");
btnCargarGastos.addEventListener("click", objCargarGastos);

function cargarGastosWeb(){

    this.handleEvent = function(){
      if (localStorage.GestorGastosDWEC != null) 
        gp.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
      else 
        gp.cargarGastos([]);

        repintar(); 
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

