import { mostrarPresupuesto } from "./gestionPresupuesto";
import * as gestionPresupuesto from "./gestionPresupuesto.js";

// Añadir eventos a los botones
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

// Revisar
// document.addEventListener("click",actualizarPresupuestoWeb);
// document.addEventListener("click",nuevoGastoWeb);


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
    let fechaAux = new Date(gasto.fecha)

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
      div.append(span)
    }
    divGasto.append(div);
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
  
  document.getElementById("presupuesto").innerHTML="";
  document.getElementById("gastos-totales").innerHTML="";
  document.getElementById("balance-total").innerHTML="";
 
  mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
  mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
  mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

}
function actualizarPresupuestoWeb(){

  let presupuesto = parseFloat(prompt("Por favor, introduzca el nuevo presupuesto: "));
  gestionPresupuesto.actualizarPresupuesto(presupuesto);
  repintar();

}
function nuevoGastoWeb(){

  alert("Introduzca los datos del nuevo Gasto")
  let descripcion = prompt("Descripción");
  let valor = parseFloat(prompt("Valor"));
  let fecha = prompt("Fecha");
  let etiquetas = prompt("Por favor, introduzca las etiquetas separadas por comas =)");
  let array = etiquetas.split(',');
  let gasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha, ...array);
  gestionPresupuesto.anyadirGasto(gasto);
  repintar(); 

}

  // Crear boton
  /*document.addEventListener('DOMContentLoaded', function(){

    let btnEditar = document.createElement('input');
    btnEditar.type = 'button';
    btnEditar.value = "Editar";
     btnEditar.onclick = editarHandle();

    var container = document.getElementById('container');
    container.appendChild(btnEditar);

  }, false);*/

// Funciones constructoras 
function editarHandle(){

  



}
function borrarHandle(){
  
}
function borrarEtiquetasHandle(){
  
}
export    {

  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb, 
  repintar,
  actualizarPresupuestoWeb,
  nuevoGastoWeb,
  editarHandle,
  borrarHandle,
  borrarEtiquetasHandle

}

