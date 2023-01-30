'use strict';
import * as gestionPresu from './gestionPresupuesto.js';

function mostrarDatoEnId(valor,idElemento)
{
  let elemento = document.getElementById(idElemento);
   elemento.innerHTML += valor;
  
}

function mostrarGastoWeb(gasto,idElemento)
{

 let elemento =document.getElementById(idElemento);

 let gastoDiv = document.createElement('div');
 gastoDiv.className += 'gasto';

 let presupuestoDiv = document.createElement('div');
 presupuestoDiv.className = 'presupuesto';
 
 let gestorPresupuestoDiv = document.createElement('div');
 gestorPresupuestoDiv.className = 'presupuesto';
 
 let descripcionDiv  = document.createElement('div');
 descripcionDiv.className = 'gasto-descripcion'; 
 descripcionDiv.textContent = gasto.descripcion;

 let fechaDiv = document.createElement('div');
 fechaDiv.className = 'gasto-fecha'; 
 fechaDiv.textContent = new Date(gasto.fecha).toLocaleDateString();
 
 let valorDiv = document.createElement('div');
 valorDiv.className = 'gasto-valor'; 
 valorDiv.textContent = gasto.valor;
 
 let etiquetasDiv = document.createElement('div');
 etiquetasDiv.className = 'gasto-etiquetas'; 

 for(let etiqueta of gasto.etiquetas){

   let span = document.createElement('span');
   span.classList.add('gasto-etiquetas-etiqueta') 
   span.textContent += etiqueta
   etiquetasDiv.append(span)
/*------------------------------------------*/
   let Evento = new BorrarEtiquetasHandle();
   Evento.gasto = gasto;
   Evento.etiqueta = etiqueta;
   span.addEventListener('click', Evento);

 }
 
 
 gastoDiv.append(presupuestoDiv);
 gastoDiv.append(gestorPresupuestoDiv);
 gastoDiv.append(descripcionDiv);
 gastoDiv.append(fechaDiv);
 gastoDiv.append(valorDiv);
 gastoDiv.append(etiquetasDiv);
 elemento.append(gastoDiv);

 //Crear un botón con texto Editar de tipo button (<button type="button">) con clase gasto-editar.
 let botonEditar = document.createElement('button');
 botonEditar.type = "button";
 botonEditar.textContent = "Editar";
 botonEditar.className = "gasto-editar";
//Crear un nuevo objeto a partir de la función letructora EditarHandle.
 let editar = new EditarHandle();
 editar.gasto = gasto;//Establecer la propiedad gasto del objeto creado al objeto gasto (recuerda que el objeto gasto es un parámetro pasado a la función mostrarGastoWeb)
 //Añadir el objeto recién creado como objeto manejador del evento click al botón Editar recién creado.
 botonEditar.addEventListener("click", editar);
 gastoDiv.appendChild(botonEditar);//Añadir el botón al DOM a continuación de las etiquetas

/*-----------------------------------*/

   let botonBorrar = document.createElement('button');
   botonBorrar.type = 'button';
   botonBorrar.textContent = 'Borrrar';
   botonBorrar.className = 'gasto-borrar';

   let borrar = new BorrarHandle();
   borrar.gasto = gasto;
   botonBorrar.addEventListener('click', borrar);
   gastoDiv.appendChild(botonBorrar);

 /*------------------------------------------------- */


     let btnEditarFor = document.createElement('button');
   btnEditarFor.type="button";
   btnEditarFor.textContent="Editar(formulario)";
   btnEditarFor.className="gasto-editar-formulario";
   
     let btnEditarForHandle = new EditarHandleFormulario(gasto);
     btnEditarForHandle.gasto = gasto;
     btnEditarFor.addEventListener('click',btnEditarForHandle);
     gastoDiv.append(btnEditarFor);

}


function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{
 let parrafo = document.getElementById(idElemento);

 let agrupados;

 for( let [nombre, valor] of Object.entries( agrup ) )
 {

 agrupados += ` <div class="agrupacion-dato">
                   <span class="agrupacion-dato-clave">${nombre}</span>
                   <span class="agrupacion-dato-valor">${valor}</span>
                 </div>

               `;
 }

 parrafo.innerHTML = `<div class="agrupacion">
                      <h1>Gastos agrupados por ${periodo}</h1>
                           ${agrupados}
                       </div>
                       `;

 
}

function repintar() {
 // Limpiar contenido de div#presupuesto y mostrar presupuesto actual
 limpiarContenidoDeId("presupuesto");
 mostrarDatoEnId(gestionPresu.mostrarPresupuesto(),"presupuesto");

 // Limpiar contenido de div#gastos-totales y mostrar gastos totales
 limpiarContenidoDeId("gastos-totales");
 mostrarDatoEnId( gestionPresu.calcularTotalGastos(),"gastos-totales");

 // Limpiar contenido de div#balance-total y mostrar balance total
 limpiarContenidoDeId("balance-total");
 mostrarDatoEnId( gestionPresu.calcularBalance(),"balance-total");

 // Limpiar contenido de div#listado-gastos-completo
 limpiarContenidoDeId("listado-gastos-completo");

 // Mostrar listado completo de gastos en div#listado-gastos-completo
 let gastos = gestionPresu.listarGastos();
 for (let gasto of gastos) {
     mostrarGastoWeb(gasto,"listado-gastos-completo");
 }
}


function limpiarContenidoDeId(id) {
 document.getElementById(id).innerHTML = "";
}

function actualizarPresupuestoWeb() {
 let presupuesto = prompt("Introduce un presupuesto");
 gestionPresu.actualizarPresupuesto(Number(presupuesto));
 repintar();
}

document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);

function nuevoGastoWeb() {

 let descripcion = prompt("Introduce una descripción:");
 let valor = parseFloat(prompt("Introduce un valor:"));
 let fecha = Date.parse(prompt("Introduce la fecha:"));
 let etiquetas = prompt("Introduce las etiquetas:").split(',');

 let nuevoGasto = new gestionPresu.CrearGasto(descripcion, valor, fecha, ...etiquetas);
 gestionPresu.anyadirGasto(nuevoGasto);

 repintar();
}
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);



function EditarHandle(){

 this.handleEvent = function(evento)
 {

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

let BorrarHandle = function(){
 this.handleEvent = function() {
     gestionPresu.borrarGasto(this.gasto.id)

     repintar();
 }
}

let BorrarEtiquetasHandle = function(){
 this.handleEvent = function() {
     this.gasto.borrarEtiquetas(this.etiqueta);
     
     repintar();
 }
}

function nuevoGastoWebformulario(){
 //Crear una copia del formulario web definido en la plantilla HTML. El código a utilizar es el siguiente
 let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

 //Acceder al elemento <formulario> dentro de ese fragmento de documento. Para ello podemos utilizar por ejemplo
 var formulario = plantillaFormulario.querySelector("form");
   
 let controlesdiv = document.getElementById('controlesprincipales');
 controlesdiv.appendChild(plantillaFormulario);

 document.getElementById('anyadirgasto-formulario').setAttribute('disabled',' ');

 let enviarFor = new EnviarHandleFormulario();
 formulario.addEventListener("submit",enviarFor);

 let btnCancelarHandel = new btnCancelarHandle();
 let  btnCancelar = formulario.querySelector("button.cancelar")
 btnCancelar.addEventListener("click",btnCancelarHandel);

 repintar();


}

document.getElementById("anyadirgasto-formulario").addEventListener("click",nuevoGastoWebformulario);


function EnviarHandleFormulario(){
 this.handleEvent = function(evento){
     evento.preventDefault();
     let formulario = evento.currentTarget;
     let descripción = formulario.elements.descripcion.value;
     let valor = parseFloat(formulario.elements.valor.value);
     let fecha = new Date(formulario.elements.fecha.value);
     let etiquetasUsuario= toString(formulario.elements.etiquetas.value);
     let etiquetas = etiquetasUsuario.split(',');
     let gastoNuevo = new gestionPresu.CrearGasto(descripción, valor, fecha, etiquetas);
     gestionPresu.anyadirGasto(gastoNuevo);
     document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
     repintar();
 }
}


function EditarHandleFormulario()
{
   this.handleEvent = function (evento)
   {
       evento.preventDefault();
       let plantilla = document.getElementById('formulario-template').content.cloneNode(true);
       let formulario = plantilla.querySelector('form');

       let controles = document.getElementById('controlesprincipales');
       controles.append(formulario);

       let btnformu = evento.currentTarget;
       btnformu.append(formulario);

       formulario.elements.descripcion.value = this.gasto.descripcion;
       formulario.elements.valor.value = this.gasto.valor;
       formulario.elements.fecha.value = new Date(this.gasto.fecha).toLocaleString().substring(0,10);
       formulario.elements.etiquetas.value = this.gasto.etiquetas;

       let cancelar = new btnCancelarHandle();
       let btnCancelar = formulario.querySelector('button.cancelar');
       btnCancelar.addEventListener('click', cancelar);

       let enviarHandle = new EnviarFormulario();
       enviarHandle.gasto = this.gasto;
       formulario.addEventListener('submit', enviarHandle);

       btnformu.setAttribute('disabled',"");
      
   }
}


function EnviarFormulario(){
 this.handleEvent = function(evento){
     let formu = evento.currentTarget;
     this.gasto.actualizarDescripcion(formu.elements.descripcion.value);
     this.gasto.actualizarValor(parseFloat(formu.elements.valor.value));
     this.gasto.actualizarFecha(formu.elements.fecha.value);
     this.gasto.anyadirEtiquetas( formu.elements.etiquetas.value);

     repintar();
 }
}
function btnCancelarHandle(){
 this.handleEvent = function(evento)
 {
   evento.preventDefault();
     evento.currentTarget.parentNode.remove();
     document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
     repintar();
 }
 
}





function filtrarGastosWeb() {

  this.handleEvent = function (evento) 
  {
    
      evento.preventDefault();
      let form = evento.currentTarget;
      let descripcion = form.elements["formulario-filtrado-descripcion"].value;
      let valorMinimo= Number(form.elements["formulario-filtrado-valor-minimo"].value);
      let valorMaximo = Number(form.elements["formulario-filtrado-valor-maximo"].value);
      let fechaDesde = new Date (form.elements["formulario-filtrado-fecha-desde"].value);
      let fechaHasta = new Date (form.elements["formulario-filtrado-fecha-hasta"].value);
      let etiquetas = form.elements["formulario-filtrado-etiquetas-tiene"].value;
      if(etiquetas != undefined){
        etiquetas = gestionPresu.transformarListadoEtiquetas(etiquetas);
      }
      
      
      let arrayfil = gestionPresu.filtrarGastos({fechaDesde: fechaDesde, fechaHasta: fechaHasta, valorMinimo: valorMinimo,
                                                      valorMaximo: valorMaximo, descripcionContiene: descripcion, etiquetasTiene: etiquetas});
                               
      document.getElementById("listado-gastos-completo").innerHTML = "";
     /*                                                
      arrayfil.forEach(gasto => mostrarGastoWeb( gasto,"listado-gastos-completo"));
      */

     for (let gasto of arrayfil) {
      
      mostrarGastoWeb(gasto,"listado-gastos-completo");
      
     }
  }  
}

document.getElementById("formulario-filtrado").addEventListener("submit", new filtrarGastosWeb());

function guardarGastosWeb(){
  this.handleEvent = function(){
      localStorage.setItem("GestorGastosDWEC", JSON.stringify(gestionPresu.listarGastos()));
  }
}

document.getElementById("guardar-gastos").addEventListener("click", new guardarGastosWeb());


function cargarGastosWeb(){

this.handleEvent = function(){
  let gastosGuardados = localStorage.getItem("GestorGastosDWEC");
  gestionPresu.cargarGastos(gastosGuardados ? JSON.parse(gastosGuardados) : []);
  repintar();
}
}
document.getElementById("cargar-gastos").addEventListener("click", new cargarGastosWeb() );


  //Nueva función cargarGastosApi
async function cargarGastosApi() 
{
  //Se deberá crear la URL correspondiente utilizando el nombre de usuario que se haya introducido en el control input#nombre_usuario
    let nombreUsuario = document.querySelector('#nombre_usuario').value;
    //tendrá que hacer una solicitud GET a la URL correspondiente de la API
    let url = ` https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;
    //se encargará de obtener mediante fetch el listado de gastos a través de la API de servidor.
    let respuesta = await fetch(url);
    if (respuesta.ok){
      //Una vez obtenida la lista de gastos de la API
      let listaGastos = await respuesta.json();
      //I deberá llamar a la función cargarGastos del paquete js/gestionPresupuesto.js para actualizar el array de gastos.
      gestionPresu.cargarGastos(listaGastos);
      repintar();
    } else  
    {
      alert("Error-HTTP: " + response.status);
    }
  }

//Esta función se utilizará como manejadora de eventos del evento click del botón cargar-gastos-api.
document.getElementById("cargar-gastos-api").addEventListener("click", new cargarGastosApi() );

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
 nuevoGastoWebformulario,
 btnCancelarHandle,
 EnviarHandleFormulario,
 EditarHandleFormulario,
 filtrarGastosWeb,
 guardarGastosWeb
}
//Texto de prueba para la resolución del problema de git basch
