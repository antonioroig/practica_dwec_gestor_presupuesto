'use strict'
import * as gestionPre from "./gestionPresupuesto.js";

function mostrarDatoEnId(valor, idElemento) {
    if (idElemento != null) {
        let elem = document.getElementById(idElemento);
        elem.innerHTML = "" + valor;
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

    let botonBorrarApi = document.createElement('button');
    botonBorrarApi.type = 'button';
    botonBorrarApi.className = 'gasto-borrar';
    botonBorrarApi.textContent = 'Borrar (API)';

    let borrarApi = new BorrarApiHandle();
    borrarApi.gasto = gasto;
    botonBorrarApi.addEventListener('click', borrarApi);
    divContenedor.appendChild(botonBorrarApi);


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
        id.innerHTML = "";
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
        id.style.width = "33%";
        id.style.display = "inline-block";
        let chart = document.createElement("canvas");
        let unit ="";
        switch(periodo) {
            case "anyo": 
                unit = "year";
                break;
            case "mes":
                unit = "month";
                break;
            case "dia":
            default:
                unit = "day";
                break;
        }
        const myChart = new Chart(chart.getContext("2d"), {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: `Gastos por ${periodo}`,
                        background: "#555555",
                        data: agrup
                    }
                ],
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: unit
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        id.append(chart);
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
    this.handleEvent = function () {
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

function nuevoGastoWebFormulario() {
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

    let botonEnviarApi = formulario.querySelector("button.gasto-enviar-api")
    let enviarFormApi = new EnviarApiHandleFormulario();
    enviarFormApi.formulario = formulario;
    enviarFormApi.boton = botonEnviarApi;
    botonEnviarApi.addEventListener("click", enviarFormApi)

    document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    repintar();
};
function EnviarApiHandleFormulario() {
    this.handleEvent= function(event){
        event.preventDefault();
        let form = document.forms[0];
        let nuevoGasto = {
            descripcion :form.elements.descripcion.value, 
            valor:form.elements.valor.value, 
            fecha:form.elements.fecha.value, 
            etiquetas: form.elements.etiquetas.value.split(",")
          
        }
        let nombreUsuario = document.querySelector("#nombre_usuario").value
        fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`, 
        {method: 'Post',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(nuevoGasto)})
        //.then(response => response.json())
        .then(data => {
            console.log(data);
            cargarGastoApi();
        })
        .catch(err => console.log(err));
            document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");  
    }
}


function EnviarHandleFormulario() {
    this.handleEvent = function (event) {
        event.preventDefault();
        let formulario = document.forms[0];
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = new Date(formulario.elements.fecha.value);
        let etiquetas = toString(formulario.elements.etiquetas.value).split(',');
        let nuevoGasto = new gestionPre.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gestionPre.anyadirGasto(nuevoGasto);
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        repintar();
    }
}

function CancelarHandleFormulario() {
    this.handleEvent = function (event) {
        this.formulario.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

    }
}
let botonAnyadirGastoForm = document.getElementById('anyadirgasto-formulario');
botonAnyadirGastoForm.addEventListener('click', function () { nuevoGastoWebFormulario() });

function EditarHandleFormulario() {
    this.handleEvent = function () {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");

        this.divContenedor.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviarForm = new EnviarHandleEditarFormulario();
        enviarForm.gasto = this.gasto;
        enviarForm.formulario = formulario;
        formulario.addEventListener("submit", enviarForm);

        this.botonEditarForm.setAttribute("disabled", "")

        let cancelarForm = new CancelarHandleEditarFormulario();
        cancelarForm.formulario = formulario;
        cancelarForm.botonEditarForm = this.botonEditarForm;
        cancelarForm.formulario = formulario;
        let botonCancelar = formulario.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", cancelarForm);

        let botonEnviarApi = formulario.querySelector("button.gasto-enviar-api")
        let enviarFormApi = new EditarApiHandleFormulario();
        enviarFormApi.formulario = formulario;
        enviarFormApi.gasto = this.gasto;
        botonEnviarApi.addEventListener("click", enviarFormApi)
    }
}
function EditarApiHandleFormulario() {
    this.handleEvent= function(event){
        event.preventDefault();
        let form = document.forms[1];

        let nuevoGasto = new gestionPre.CrearGasto(form.elements.descripcion.value, Number(form.elements.valor.value), new Date(form.elements.fecha.value), form.elements.etiquetas.value.split(","));
        
        let nombreUsuario = document.querySelector("#nombre_usuario").value
    fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`, 
    {method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoGasto)})
    //.then(response => response.json())
    .then(data => {
        console.log(data);
        cargarGastoApi();
    })
    .catch(err => console.log(err));
      
}
}
function CancelarHandleEditarFormulario() {
    this.handleEvent = function (event) {
        this.formulario.remove();
        this.botonEditarForm.removeAttribute("disabled");
    }
}
function EnviarHandleEditarFormulario() {
    this.handleEvent = function (event) {
        event.preventDefault();

        this.gasto.descripcion = this.formulario.elements.descripcion.value;

        this.gasto.valor = Number(this.formulario.elements.valor.value);

        this.gasto.fecha = new Date(this.formulario.elements.fecha.value);

        this.gasto.etiquetas = this.formulario.elements.etiquetas.value.split(",");

        repintar();
    }
}
function filtrarGastosWeb() {
    this.handleEvent = function (event) {
        event.preventDefault();
        let etiquetas = this.formulario.elements["formulario-filtrado-etiquetas-tiene"].value

        if (etiquetas) {
            etiquetas = gestionPre.transformarListadoEtiquetas(etiquetas)
        }

        let filtrado = {
            descripcionContiene: this.formulario.elements["formulario-filtrado-descripcion"].value,
            valorMinimo: Number(this.formulario.elements["formulario-filtrado-valor-minimo"].value),
            valorMaximo: Number(this.formulario.elements["formulario-filtrado-valor-maximo"].value),
            fechaDesde: new Date(this.formulario.elements["formulario-filtrado-fecha-desde"].value),
            fechaHasta: new Date(this.formulario.elements["formulario-filtrado-fecha-hasta"].value),
            etiquetasTiene: etiquetas
        }
        document.getElementById("listado-gastos-completo").innerHTML = "";

        gestionPre.filtrarGastos(filtrado).forEach(gasto => {
            mostrarGastoWeb("listado-gastos-completo", gasto);
        })
    }
}
let divFormulario = document.getElementById("filtrar-gastos")
let formulario = divFormulario.querySelector("form");

let form = new filtrarGastosWeb();
form.formulario = formulario;
formulario.addEventListener('submit', form);

function guardarGastosWeb() {
    this.handleEvent = function () {
        //localStorage.GestorGastosDWEC = JSON.stringify(gestionPre.listarGastos())
        localStorage.GestorGastosDWEC = JSON.stringify(gestionPre.listarGastos())
    }

}
let botonGuardar = document.getElementById("guardar-gastos")
botonGuardar.addEventListener('click', new guardarGastosWeb())

function cargarGastosWeb() {
    this.handleEvent = function () {

        if (localStorage.GestorGastosDWEC != null) {
            gestionPre.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC))
        } else {
            gestionPre.cargarGastos([])
        }
        repintar()
    }
}

let botonCargar = document.getElementById("cargar-gastos")
botonCargar.addEventListener('click', new cargarGastosWeb())

function BorrarApiHandle() {
    this.handleEvent = function () {
        let nombreUsuario = document.querySelector("#nombre_usuario").value
        fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Recurso eliminado');
                }
                cargarGastoApi()
            })
            .catch(error => {
                console.log('Error al eliminar el recurso: ' + error);
            });

    }
}



function cargarGastosApiHandle() {
    this.handleEvent = function () {
        cargarGastoApi()
    }
}
function cargarGastoApi() {
    let nombreUsuario = document.querySelector("#nombre_usuario").value
    fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`)
        .then(response => response.json())
        .then(data => {
            gestionPre.cargarGastos(data);
            console.log(data)
            repintar();
            // aquí puedes trabajar con los datos obtenidos
        })
        .catch(error => console.error(error));
}
let botonCargarApi = document.getElementById("cargar-gastos-api")
botonCargarApi.addEventListener('click', new cargarGastosApiHandle())
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    filtrarGastosWeb
}
