'use strict'
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(valor,idElemento) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);
}

/*
Primer mostrarGastoWeb
function mostrarGastoWeb(idElemento, gasto) {
    let elemento2 = document.getElementById(idElemento);

    //Creamos un div con class='gasto'.
    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';                                                                       

    let divDescripcion  = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion'; 
    divDescripcion.textContent = gasto.descripcion;
    //Para decir que está dentro del div divGasto:
    divGasto.appendChild(divDescripcion);

    let divFecha  = document.createElement('div');
    divFecha.className = 'gasto-fecha'; 
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiquetas';
    divGasto.appendChild(divGastoEtiquetas);
    
    //Ahora necesitamos un bucle para recorrer los gastos
    for(let i = 0; i < gasto.etiquetas.length; i++)
    {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent =  `${gasto.etiquetas[i]}\n`;
        divGastoEtiquetas.appendChild(spanEtiqueta);
    }
    elemento2.appendChild(divGasto);
}
*/

// mostrarGastoWeb modificado (práctica eventos)
function mostrarGastoWeb(idElemento, gasto){
    let elemento2 = document.getElementById(idElemento);

    //Creamos un div con class='gasto'.
    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';                                                                       

    let divDescripcion  = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion'; 
    divDescripcion.textContent = gasto.descripcion;
    //Para decir que está dentro del div divGasto:
    divGasto.appendChild(divDescripcion);

    let divFecha  = document.createElement('div');
    divFecha.className = 'gasto-fecha'; 
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiquetas';
    
    //Ahora necesitamos un bucle para recorrer los gastos
    for(let i = 0; i < gasto.etiquetas.length; i++)
    {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent =  `${gasto.etiquetas[i]} `;

        let borrarEtiquetas = new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiqueta = gasto.etiquetas[i];
        spanEtiqueta.addEventListener('click', borrarEtiquetas);
        divGastoEtiquetas.appendChild(spanEtiqueta);
    }
    // boton editar
    let btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.type = 'button';
    btnEditar.className = 'gasto-editar';

    // objeto editar
    let objetoEditar = new EditarHandle();
    objetoEditar.gasto = gasto;
    btnEditar.addEventListener('click', objetoEditar); 
    divGasto.append(btnEditar);

    // boton borrar
    let btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'Borrar';
    btnBorrar.type = 'button';
    btnBorrar.className = 'gasto-borrar';

    // objeto borrar
    let objetoBorrar = new BorrarHandle();
    objetoBorrar.gasto = gasto;
    btnBorrar.addEventListener('click', objetoBorrar);
    divGasto.append(btnBorrar);

    let botonEditarForm = document.createElement('button');
    botonEditarForm.textContent = 'Editar Formulario';
    botonEditarForm.type = 'button';
    botonEditarForm.className = 'gasto-editar-formulario';

    let editarForm = new EditarHandleFormulario();
    editarForm.gasto = gasto;
    editarForm.divGasto = divGasto;
    editarForm.botonEditarForm = botonEditarForm;
    botonEditarForm.addEventListener('click', editarForm);

    divGasto.appendChild(botonEditarForm);

    divGasto.appendChild(divGastoEtiquetas);
    elemento2.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento3 = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = 'agrupacion';
    elemento3.append(divAgrupacion);

    let encabezado = document.createElement('h1');
    encabezado.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(encabezado);

    for( let [nombre, valor] of Object.entries( agrup ))
    {
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = 'agrupacion-dato';
        divAgrupacion.append(divAgrupacionDato);

        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent = nombre;
        divAgrupacionDato.append(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent = valor;
        divAgrupacionDato.append(spanValor);
    }
}

// nueva práctica
function repintar(){

    //Limpia el contenido del div presupuesto, y lo muestra vacío.
    document.getElementById('presupuesto').innerHTML='';
    document.getElementById('gastos-totales').innerHTML='';
    document.getElementById('balance-total').innerHTML='';
    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), 'presupuesto');
    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), 'gastos-totales');
    mostrarDatoEnId(gestionPresupuesto.calcularBalance(), 'balance-total');

    //Limpiamos toda la estructura HTML para volver a mostrarla vacía.
    let auxiliar = document.getElementById('listado-gastos-completo');
    auxiliar.innerHTML = '';
    gestionPresupuesto.listarGastos().forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    });
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduzca un presupuesto nuevo: ');
    presupuesto = parseFloat(presupuesto);
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}
let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce la descripción del gasto');
    let valor = prompt('Introduce el valor del gasto'); //Utilizamos el parseFloat para convertir el string respuesta en número con decimales.
    valor = parseFloat(valor);
    let fecha = prompt('Introduce la fecha del gasto en formato yyyy-mm-dd');
    let etiqueta = prompt('Introduce las etiquetas del gasto separadas por ,');
    let etiquetas= etiqueta.split(','); //Eliminamos las ','.
    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}
let botonNuevo = document.getElementById('anyadirgasto');
botonNuevo.addEventListener('click', nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function (event)
    {
        let descripcion = prompt('Introduce la nueva descripción del gasto');
        let valor = prompt('Introduce el nuevo valor del gasto');
        valor = parseFloat(valor);
        let fecha = prompt('Introduce la fecha del gasto en formato yyyy-mm-dd');
        let etiqueta = prompt('Introduce las etiquetas del gasto separadas por ,');
        let etiquetas = etiqueta.split(',');
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id); // Pasamos el id del gasto a borrar.
        repintar();
    };
}

function BorrarEtiquetasHandle() 
{
    this.handleEvent = function ()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}


// Práctica 6
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector('form');

    let divControlesPrincipales = document.getElementById('controlesprincipales');
    divControlesPrincipales.append(formulario);

    document.getElementById('anyadirgasto-formulario').setAttribute('disabled', '');

    let enviarForm = new EnviarHandleFormulario();
    formulario.addEventListener("submit", enviarForm);

    let cancelarForm = new CancelarHandleFormulario(); 
    cancelarForm.formulario = formulario;
    let botonCancelar = formulario.querySelector('button.cancelar');
    botonCancelar.addEventListener('click', cancelarForm); 
  
    repintar();
}
let botonNuevoGasto = document.getElementById('anyadirgasto-formulario');
botonNuevoGasto.addEventListener('click', nuevoGastoWebFormulario);


function EnviarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = new Date(formulario.elements.fecha.value);
        let etiquetas = toString(formulario.elements.etiquetas.value).split(',');
        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gestionPresupuesto.anyadirGasto(nuevoGasto);
        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
        repintar();
    }
}

function CancelarHandleFormulario(){
    this.handleEvent = function(event)
    {
        this.formulario.remove();
        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
  
    }
}


function EditarHandleFormulario(){
    this.handleEvent = function(){

        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector('form');
    
        this.divGasto.append(formulario);

        formulario.elements.descripcion.value=this.gasto.descripcion;
        formulario.elements.valor.value=this.gasto.valor;
        formulario.elements.fecha.value=this.gasto.fecha;
        formulario.elements.etiquetas.value=this.gasto.etiquetas;

        let enviarForm = new EnviarHandleEditarFormulario();
        enviarForm.gasto = this.gasto;
        enviarForm.formulario = formulario;
        formulario.addEventListener("submit", enviarForm);

        this.botonEditarForm.setAttribute('disabled','')

        let cancelarForm = new CancelarHandleEditarFormulario(); 
        cancelarForm.formulario = formulario;
        cancelarForm.botonEditarForm = this.botonEditarForm;
        cancelarForm.formulario = formulario;
        let botonCancelar = formulario.querySelector('button.cancelar');
        botonCancelar.addEventListener('click', cancelarForm); 
    }
}
function CancelarHandleEditarFormulario(){
    this.handleEvent = function(event)
    {
        this.formulario.remove();
        this.botonEditarForm.removeAttribute("disabled");
    }
}
function EnviarHandleEditarFormulario(){
    this.handleEvent = function(event)
    {
        event.preventDefault();

        this.gasto.descripcion = this.formulario.elements.descripcion.value;

        this.gasto.valor = Number(this.formulario.elements.valor.value);

        this.gasto.fecha = new Date(this.formulario.elements.fecha.value);

        this.gasto.etiquetas = this.formulario.elements.etiquetas.value.split(",");

        repintar();
    };
}

// Práctica Regexp
function filtrarGastoWeb(){
    this.handleEvent = function(event) 
    {
        event.preventDefault();
        let formulario = event.currentTarget;
        let descripcion1 = formulario.elements["formulario-filtrado-descripcion"].value;
        let valorMinimo1 = parseFloat(formulario.elements["formulario-filtrado-valor-minimo"].value);
        let valorMaximo1 = parseFloat(formulario.elements["formulario-filtrado-valor-maximo"].value);
        let fechaDesde1 = new Date(formulario.elements["formulario-filtrado-fecha-desde"].value);
        let fechaHasta1 = new Date(formulario.elements["formulario-filtrado-fecha-hasta"].value);
        let etiqueta = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;
        
        if (etiqueta !== undefined) {
            etiqueta = gestionPresupuesto.transformarListadoEtiquetas(etiqueta);
        }
        // Creo el objeto para pasarle el objeto entero a filtrarGastos.
        let filtrado = ({fechaDesde : fechaDesde1, fechaHasta : fechaHasta1, valorMinimo : valorMinimo1, valorMaximo : valorMaximo1, descripcionContiene : descripcion1, etiquetasTiene : etiqueta});
        let formularioFiltrado = gestionPresupuesto.filtrarGastos(filtrado); // almaceno el objeto filtrado en otro objeto
        document.getElementById("listado-gastos-completo").innerHTML="";
        for (let gastoForm of formularioFiltrado) {
            mostrarGastoWeb("listado-gastos-completo",gastoForm);
        }
    };
}

let erFiltrar = new filtrarGastoWeb();
let formulario = document.getElementById("formulario-filtrado");
formulario.addEventListener("submit", erFiltrar);

// Práctica almacenamiento

function guardarGastosWeb()
{
    this.handleEvent = function(event) 
    {
        let listarGastos = gestionPresupuesto.listarGastos();
        localStorage.GestorGastosDWEC = JSON.stringify(listarGastos);
    }
}

let listar = new guardarGastosWeb();
let listarForm = document.getElementById("guardar-gastos");
listarForm.addEventListener("submit", listar);


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}