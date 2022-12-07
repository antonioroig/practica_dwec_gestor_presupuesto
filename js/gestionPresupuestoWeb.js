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
// btnAnyadirGastoformulario.setAttribute('disabled', '');

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
  // Tomamos el template del documento
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

  // Tomamos el formulario
  var formulario = plantillaFormulario.querySelector("form");

  //Tomamos el div comntr
  var divControles = document.querySelector("controlesprincipales");
  divControles.appendChild(form);

  // Heceos uso del atributo diseable
  let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");


  let btnEnviar = formulario.querySelector('button[type="submit"]');


}


// Objeto manejador de eventos
let EditarHandleFormulario = function() {

  this.handleEvent = function (event){

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");


    let btnCancelar = formulario.querySelector("button.cancelar");
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

