'use strict'
import * as gestionPre from "./gestionPresupuesto.js";

function mostrarDatoEnId(valor, idElemento) {
    if (idElemento != null) {
        let elem = document.getElementById(idElemento);
        elem.innerHTML += "" + valor;
    }
}
function mostrarGastoWeb(idElemento, gasto) {
    let id = document.getElementById(idElemento);
    let divContenedor = document.createElement("div");
    divContenedor.className = "gasto";

    let divDes = document.createElement("div");
    divDes.className = "gasto-descripcion";
    divDes.textContent = gasto.descripcion;
    divContenedor.appendChild(divDes);

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = gasto.fecha;
    divContenedor.appendChild(divFecha);

    let divVal = document.createElement("div");
    divVal.className = "gasto-valor";
    divVal.textContent = gasto.valor;
    divContenedor.appendChild(divVal);

    let divEt = document.createElement("div");
    divEt.className = "gasto-etiquetas";
    divEt.textContent = gasto.etiquetas;

    gasto.etiquetas.forEach(etiqueta => {
        let spanEt = document.createElement("span");
        spanEt.className = "gasto-etiquetas-etiqueta";
        spanEt.textContent = etiqueta
        divEt.appendChild(spanEt);

        let borrarEt = new BorrarEtiquetasHandle();
        borrarEt.gasto = gasto;
        borrarEt.etiqueta = etiqueta;
        spanEt.addEventListener('click', borrarEt);

    });
    divContenedor.appendChild(divEt);

    let botonEditar = document.createElement('button');
    botonEditar.type = 'button';
    botonEditar.className = 'gasto-editar';
    botonEditar.textContent = 'Editar';

    let editar = new EditarHandle();
    editar.gasto = gasto;
    botonEditar.addEventListener('click', editar);
    divContenedor.appendChild(botonEditar);

    let botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.className = 'gasto-borrar'
    botonBorrar.textContent = 'Borrrar';

    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    botonBorrar.addEventListener('click', borrar);
    divContenedor.appendChild(botonBorrar);

    let botonEditarForm = document.createElement('button');
    botonEditarForm.className = 'gasto-editar-formulario';
    botonEditarForm.type = 'button';
    botonEditarForm.textContent = 'Editar (Formulario)';

    let editarForm = new EditarHandleFormulario();
    editarForm.gasto = gasto;
    editarForm.divContenedor = divContenedor;
    editarForm.botonEditarForm = botonEditarForm;
    botonEditarForm.addEventListener("click", editarForm);
    divContenedor.appendChild(botonEditarForm); 

    id.appendChild(divContenedor);
    return id;
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento) {
    if (idElemento != null) {
        let id = document.getElementById(idElemento);
        let divContenedor = document.createElement("div");
        divContenedor.className = "agrupacion";
        let h1 = document.createElement("h1")
        h1.innerHTML += "Gastos agrupados por " + periodo;
        divContenedor.appendChild(h1);
        for (let property in agrup) {
            let divAgrupDato = document.createElement("div");
            divAgrupDato.className = "agrupacion-dato";

            let spanAgrupClave = document.createElement("span");
            spanAgrupClave.className = "agrupacion-dato-clave";
            spanAgrupClave.innerHTML = property;
            divAgrupDato.appendChild(spanAgrupClave);
            let spanAgrupValor = document.createElement("span");
            spanAgrupValor.className = "agrupacion-dato-valor";
            spanAgrupValor.innerHTML = agrup[property];
            divAgrupDato.appendChild(spanAgrupValor);

            divContenedor.appendChild(divAgrupDato);
        }
        id.appendChild(divContenedor);
    }
}
function repintar() {
    mostrarDatoEnId(gestionPre.mostrarPresupuesto(), 'presupuesto');
    mostrarDatoEnId(gestionPre.calcularTotalGastos(), 'gastos-totales');
    mostrarDatoEnId(gestionPre.calcularBalance(), 'balance-total');
    let elem = document.getElementById('listado-gastos-completo');
    elem.innerHTML = "";
    gestionPre.listarGastos().forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    });
}
function actualizarPresupuestoWeb() {
    let respuesta = prompt('Introduce un presupuesto:');
    parseFloat(respuesta);
    gestionPre.actualizarPresupuesto(respuesta);
    repintar();
}
let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', function () { actualizarPresupuestoWeb() });

function nuevoGastoWeb() {
    let descripcion = prompt('Introduce descripción:');
    let valor = parseFloat(prompt('Introduce valor:'));
    let fecha = prompt('Introduce fecha:');
    let etiquetas = toString(prompt('Introduce las etiquetas:')).split(',');
    let nuevoGasto = new gestionPre.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPre.anyadirGasto(nuevoGasto);
    repintar();
}
let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener('click', function () { nuevoGastoWeb() });

function EditarHandle() {
    this.handleEvent = function(){
        let descripcion = prompt('Introduce descripción:');
        let valor = parseFloat(prompt('Introduce valor:'));
        let fecha = prompt('Introduce fecha:');
        let etiquetas = toString(prompt('Introduce las etiquetas:')).split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(new Date(fecha));
        this.gasto.anyadirEtiquetas(etiquetas);

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function () {
        gestionPre.borrarGasto(this.gasto.id)
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");

    let divControles = document.getElementById('controlesprincipales');
    divControles.append(formulario);

    let enviarForm = new EnviarHandleFormulario();
    formulario.addEventListener("submit", enviarForm);

    let cancelarForm = new CancelarHandleFormulario(); 
    cancelarForm.formulario = formulario;
    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", cancelarForm); 

    document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
  
    repintar();
};

function EnviarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = document.forms[0];
        let descripcion = formulario.elements.descripcion.value;
        let  valor = parseFloat(formulario.elements.valor.value);
        let fecha = new Date(formulario.elements.fecha.value);
        let etiquetas = toString(formulario.elements.etiquetas.value).split(',');
        let nuevoGasto = new gestionPre.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gestionPre.anyadirGasto(nuevoGasto);
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        repintar();
    }
}

function CancelarHandleFormulario(){
    this.handleEvent = function(event)
    {
        this.formulario.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
  
    }
}
let botonAnyadirGastoForm = document.getElementById('anyadirgasto-formulario');
botonAnyadirGastoForm.addEventListener('click', function () { nuevoGastoWebFormulario() });

function EditarHandleFormulario(){
    this.handleEvent = function(){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");
    
        this.divContenedor.append(formulario);

        formulario.elements.descripcion.value=this.gasto.descripcion;
        formulario.elements.valor.value=this.gasto.valor;
        formulario.elements.fecha.value=this.gasto.fecha;
        formulario.elements.etiquetas.value=this.gasto.etiquetas;

        let enviarForm = new EnviarHandleEditarFormulario();
        enviarForm.gasto = this.gasto;
        enviarForm.formulario = formulario;
        formulario.addEventListener("submit", enviarForm);

        this.botonEditarForm.setAttribute("disabled","")

        let cancelarForm = new CancelarHandleEditarFormulario(); 
        cancelarForm.formulario = formulario;
        cancelarForm.botonEditarForm = this.botonEditarForm;
        cancelarForm.formulario = formulario;
        let botonCancelar = formulario.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", cancelarForm); 
    
       
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
    }
}
function filtrarGastosWeb()
{
    this.handleEvent = function(event){
        event.preventDefault();
     
        let descripcion = document.getElementById("formulario-filtrado-descripcion").value
        let valorMinimo = Number(document.getElementById("formulario-filtrado-valor-minimo").value)
        let valorMaximo = Number(document.getElementById("formulario-filtrado-valor-maximo").value)
        let fechaInicial = Date(document.getElementById("formulario-filtrado-fecha-desde").value)
        let fechaFinal = Date(document.getElementById("formulario-filtrado-fecha-hasta").value)
        let etiquetas = this.formulario.elements["formulario-filtrado-etiquetas-tiene"].value

        if(etiquetas){
            etiquetas = transformarListadoEtiquetas(etiquetas)
        }
        
        let filtrado = {
            descripcion: descripcion,
            valorMinimo: valorMinimo,
            valorMaximo: valorMaximo,
            fechaInicial: fechaInicial,
            fechaFinal: fechaFinal,
            etiquetas: etiquetas
        }
        gestionPre.filtrarGastos(filtrado);
    }
}
let divFormulario = document.getElementById("filtrar-gastos")
let formulario = divFormulario.querySelector("form");

let form = new filtrarGastosWeb();
form.formulario = formulario;
formulario.addEventListener('submit', form);
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
