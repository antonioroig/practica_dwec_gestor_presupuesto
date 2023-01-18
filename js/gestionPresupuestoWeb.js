import * as gestionPresupuesto from './gestionPresupuesto.js';
'use strict';

function mostrarDatoEnId(idElemento, valor)
{
    let id = document.getElementById(idElemento);
     id.innerHTML += valor;
}
 
function mostrarGastoWeb(idElemento, gasto)
{
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
    divValor.textContent = gasto.valor + "";
    divGasto.append(divValor);

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';
    
    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = etiqueta;
        divEtiquetas.append(spanEtiqueta);

        let borrarEtiquetas = new BorrarEtiquestasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiquetas = etiqueta;
        spanEtiqueta.addEventListener('click', borrarEtiquetas);
    }
    divGasto.append(divEtiquetas);

    let botonEditar = document.createElement('button');
    botonEditar.type = 'button';
    botonEditar.className = 'gasto-editar';
    botonEditar.textContent = 'Editar';

    let editar = new EditarHandle(gasto);
    editar.gasto = gasto;
    botonEditar.addEventListener('click', editar);
    divGasto.append(botonEditar);

    let botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.textContent = 'Borrrar';

    let botonBorrarAPI = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.className = 'gasto-borrar-api';
    botonBorrar.textContent = 'Borrrar (API)';

    let borrarAPI = new borrarApiHandle (gasto);
    borrarAPI.gasto = gasto;
    botonBorrarAPI.addEventListener('click', borrarAPI);
    divGasto.append(botonBorrarAPI);

    let borrar = new BorrarHandle(gasto);
    borrar.gasto = gasto;
    botonBorrar.addEventListener('click', borrar);
    divGasto.append(botonBorrar);

    let botonEditarForm = document.createElement('button');
    botonEditarForm.type = 'button';
    botonEditarForm.className = 'gasto-editar-formulario';
    botonEditarForm.textContent = 'Editar (formulario)';

    let editarForm = new EditarHandleFormulario(gasto);
    editarForm.gasto = gasto;
    botonEditarForm.addEventListener('click',editarForm);
    divGasto.append(botonEditarForm);


    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let idAgrup = document.getElementById(idElemento);
    idAgrup.innerHTML = '';

    let agrupDiv = `<div class="agrupacion"> <h1>Gastos agrupados por ${periodo}</h1>`;

    for (let agrupacion in agrup) {
        agrupDiv +='<div class="agrupacion-dato"><span class="agrupacion-dato-clave">${agrupacion}</span><span class="agrupacion-dato-valor">${agrup[agrupacion]}</span></div>';
    }
    agrupDiv += '</div>';
    idAgrup.innerHTML = agrupDiv;
}

function repintar() {
    document.getElementById('presupuesto');
    let miPresupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", miPresupuesto);

    document.getElementById('gastos-totales');
    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);

    document.getElementById('balance-total');
    let balance = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", balance);
    
    document.getElementById('listado-gastos-completo').innerHTML = ''

    let gastosListados = gestionPresupuesto.listarGastos();
    for(let elemento of gastosListados){
    mostrarGastoWeb("listado-gastos-completo",elemento);
    }   
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = parseInt(prompt('Introduce el nuevo presupuesto:'));
    gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto)
    repintar()
}

function nuevoGastoWeb() {
    let nuevaDescripcion = prompt('Introduce la descripcion de la nueva etiqueta');
    let nuevoValor = parseFloat(prompt('Introduce el valor del nuevo gasto'));
    let nuevaFecha = Date.parse(prompt('Introduce la fecha del nuevo gasto'));
    let nuevasEtiquetas = prompt('Introduce las etiquetas separadas por una ,').split(',')
    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevasEtiquetas))
    repintar();
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
   
        let controles = document.getElementById("controlesprincipales");
        controles.append(formulario);

        document.getElementById("anyadirgasto-formulario").setAttribute('disabled', "");

        let cancelar = new CancelarHandleFormulario();
        let botonCancelar = formulario.querySelector("button.cancelar")
        botonCancelar.addEventListener('click',cancelar);

        let enviar = new EnviarHandleFormulario();
        formulario.addEventListener('submit',enviar);

        let enviarAPI = formulario.querySelector('button.gasto-enviar-api');
        enviarAPI.addEventListener('click', enviarGastoApi);

};

function EditarHandle() {
    this.handleEvent = function (event) {
        let nuevaDescripcion = prompt('Introduce la descripcion de la nueva etiqueta');
        let nuevoValor = parseFloat(prompt('Introduce el valor del nuevo gasto'));
        let nuevaFecha = Date.parse(prompt('Introduce la fecha del nuevo gasto'));
        let nuevasEtiquetas = prompt('Introduce las etiquetas separadas por una ,').split(',');
    
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarFecha(nuevaFecha);
        this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

        repintar();
    }
    
}

function BorrarHandle() {
    this.handleEvent = function (event) {
        let borrarGasto = this.gasto.id;
        gestionPresupuesto.borrarGasto(borrarGasto);

        repintar();
    }
}

function BorrarEtiquestasHandle() {
    this.handleEvent = function (event) {
        this.gasto.borrarEtiquetas(this.etiquetas);

        repintar();
    }
}

function borrarApiHandle(){
    this.handleEvent = function (event) {
        let usuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

        if(usuario != "")
        {
            fetch(url, {method: 'DELETE'})
                .then(response => response.json())
                .then(datos => {
                    if(!datos.errorMessage){
                        cargarGastosApi();
                    }
                    else console.log(datos.errorMessage);
                })
        }
        else console.log('usuario incorrecto')
    }
};

function enviarGastoApi(event){
        let usuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

        
        let formulario = event.currentTarget.form;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = (formulario.elements.etiquetas.value).split(',');

        let gastoapi = {
            descripcion: descripcion,
            valor: valor,
            fecha: fecha,
            etiquetas: etiquetas
        }

        console.log(gastoapi);

        if(usuario != "")
        {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(gastoapi),
                headers:{
                    'Content-type':'application/json'
                }

        })
                .then(response => {
                    if(response.ok)
                    {
                        console.log('gasto guardado')
                        cargarGastosApi;
                    }
                    else console.log('error al cargar el gasto');
                })
        }
        else console.log('usuario incorrecto')
    }


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
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        
        let cancelar = new CancelarHandleFormulario();
        let botonCancelar = formulario.querySelector("button.cancelar")
        botonCancelar.addEventListener('click',cancelar);

        let enviar = new EnviarHandle();
        enviar.gasto = this.gasto;
        formulario.addEventListener('submit',enviar);

        botonFormulario.setAttribute('disabled', "");

        let editarFormApi = formulario.querySelector('button.gasto-enviar-api');
        let eventEditarGastoApi = new actualizarGastoApiHandle();
        eventEditarGastoApi.gasto = this.gasto;
        eventEditarGastoApi.formulario = formulario;
        editarFormApi.addEventListener('click', eventEditarGastoApi);

    }
}

function actualizarGastoApiHandle(){
    this.handleEvent = function(event){
        let usuario = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

        event.preventDefault();

        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = (formulario.elements.etiquetas.value).split(',');

        let gastoapi = {
            descripcion: descripcion,
            valor: valor,
            fecha: fecha,
            etiquetas: etiquetas
        }

        console.log(gastoapi);

        if(usuario != "")
        {
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(gastoapi),
                headers:{
                    'Content-type':'application/json'
                }

        })
                .then(response => {
                    if(response.ok)
                    {
                        console.log('gasto guardado')
                        cargarGastosApi;
                    }
                    else console.log('error al cargar el gasto');
                })
        }
        else console.log('usuario incorrecto')
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

function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();

        let descripcion = document.getElementById("formulario-filtrado-descripcion").value;
        let valorMin = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let valorMax = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let fechaDesde =  document.getElementById("formulario-filtrado-fecha-desde").value;
        let fechaHasta =  document.getElementById("formulario-filtrado-fecha-hasta").value;
        let etiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene").value;

        let filtronuevo ={};

        if(etiquetas.length > 0){
            filtronuevo.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetas);
        }

        filtronuevo.descripcionContiene = descripcion;
        filtronuevo.valorMinimo = valorMin;
        filtronuevo.valorMaximo = valorMax;
        filtronuevo.fechaDesde = fechaDesde;
        filtronuevo.fechaHasta = fechaHasta;
        filtronuevo.etiquetas = etiquetas;

        document.getElementById("listado-gastos-completo").innerHTML = "";
        let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtronuevo);

        for(let gasto of gastosFiltrados){
            mostrarGastoWeb("listado-gastos-completo",gasto);
        };

    }

};

function guardarGastosWeb()
{
    localStorage.setItem('GestorGastosDWEC', JSON.stringify(gestionPresupuesto.listarGastos()))
}

function cargarGastosWeb()
{
    let storage = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

    if(storage != null){
        gestionPresupuesto.cargarGastos(storage);
    }
    else{
        gestionPresupuesto.cargarGastos([])
    }

    repintar();
}

function cargarGastosApi(){
    let usuario = document.getElementById('nombre_usuario').value
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
    console.log(usuario);
    console.log(url);
    fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then((result) => {
            let resultado = result;
            if(resultado != "")
            {
                gestionPresupuesto.cargarGastos(resultado);
                repintar();
            }
            else console.log("Gastos Vacios")
        });
};


let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', function () { actualizarPresupuestoWeb() });
    
let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener('click', function () { nuevoGastoWeb() });

let botonNuevoGasto = document.getElementById('anyadirgasto-formulario');
botonNuevoGasto.addEventListener('click', function () { nuevoGastoWebFormulario() });

let botonFiltrar = document.getElementById('formulario-filtrado');
botonFiltrar.addEventListener('submit', new filtrarGastosWeb());

let botonGuardarGastos = document.getElementById('guardar-gastos');
botonGuardarGastos.addEventListener('click',  guardarGastosWeb);

let botonCargarGastos = document.getElementById('cargar-gastos');
botonCargarGastos.addEventListener('click', cargarGastosWeb);

let botonCargarGastosApi = document.getElementById('cargar-gastos-api');
botonCargarGastosApi.addEventListener('click', cargarGastosApi);


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquestasHandle,
    filtrarGastosWeb
}