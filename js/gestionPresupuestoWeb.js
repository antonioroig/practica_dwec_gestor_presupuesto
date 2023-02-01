import * as gestionPresupuesto from './gestionPresupuesto.js';

'use strict';

function mostrarDatoEnId(idElemento, valor)
{
    let elem = document.getElementById(idElemento);
    elem.innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elem = document.getElementById(idElemento);

    let divGasto = document.createElement('div');

    divGasto.className = 'gasto';

    elem.append(divGasto);

    let divDescripcion = document.createElement('div');

    divDescripcion.className = 'gasto-descripcion';

    divDescripcion.textContent = gasto.descripcion;

    divGasto.append(divDescripcion);

    let divFecha = document.createElement('div');

    divFecha.className = 'gasto-fecha';

    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    divGasto.append(divFecha);

    let divValor = document.createElement('div');

    divValor.className = 'gasto-valor';

    divValor.textContent = gasto.valor;

    divGasto.append(divValor);

    let divEtiquetas = document.createElement('div');

    divEtiquetas.className = 'gasto-etiquetas';

    for(let etiqueta of gasto.etiquetas)
    {
        let spanEtiqueta = document.createElement('span');

        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        
        spanEtiqueta.textContent = " " + etiqueta;

        divEtiquetas.append(spanEtiqueta);

        let borrarEtiquetas = new BorrarEtiquetasHandle();
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

    let botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.className = 'gasto-borrar';
    botonEliminar.textContent = 'Borrar';

    let borrar = new BorrarHandle(gasto);
    borrar.gasto = gasto;
    botonEliminar.addEventListener('click', borrar);
    divGasto.append(botonEliminar);

    let botonEditarForm = document.createElement('button');
    botonEditarForm.type = 'button';
    botonEditarForm.className = 'gasto-editar-formulario';
    botonEditarForm.textContent = 'Editar(Formulario)';

    let editarFormulario = new EditarHandleFormulario(gasto);
    editarFormulario.gasto = gasto;

    botonEditarForm.addEventListener('click', editarFormulario);
    divGasto.append(botonEditarForm);

    let botonBorrarAPI = document.createElement('button');
    botonBorrarAPI.className = 'gasto-borrar-api';
    botonBorrarAPI.type = 'button';
    botonBorrarAPI.textContent = 'Borrar (API)';

    let borrarAPI = new borrarGastosApi(gasto);
    borrarAPI.gasto = gasto;
    botonBorrarAPI.addEventListener('click', borrarAPI);
    divGasto.append(botonBorrarAPI);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elem = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');

    divAgrupacion.className = 'agrupacion';

    let titulo = document.createElement('h1');

    titulo.textContent = `Gastos agrupados por ${periodo}`;

    divAgrupacion.append(titulo);

    for(let propiedad of Object.keys(agrup))
    {
        let divDato = document.createElement('div');
        divDato.className = 'agrupacion-dato';
        divAgrupacion.append(divDato);

        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent += `${propiedad}`;
        divDato.append(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent += ` ${propiedad.valueOf()}`;
        divDato.append(spanValor);
    }

    elem.append(divAgrupacion);
}

function repintar()
{

    document.getElementById('presupuesto')
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());

    document.getElementById('gastos-totales');
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());

   document.getElementById('balance-total');
   mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

    document.getElementById('listado-gastos-completo').textContent = '';
    for(let listaCompleta of gestionPresupuesto.listarGastos())
    {
        mostrarGastoWeb('listado-gastos-completo', listaCompleta);
    }
};

function actualizarPresupuestoWeb()
{
    let presupuesto = parseInt(prompt('Introduce un presupuesto:'));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);

    repintar();
};

let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    let descripcion = prompt('Introduce una descripción:');
    let valor = parseFloat(prompt('Introduce un valor:'));
    let fecha = Date.parse(prompt('Introduce una fecha:'));
    let etiquetas = prompt('Introduce etiquetas:').split(',');

    let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
    gestionPresupuesto.anyadirGasto(gastoNuevo);

    repintar();
}

let botonNuevoGasto = document.getElementById('anyadirgasto');
botonNuevoGasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent = function (event)
    {
        let nuevaDescripcion = prompt('Introduce una nueva descripción:');
        let nuevoValor = parseFloat(prompt('Introduce un nuevo valor:'));
        let nuevaFecha = Date.parse(prompt('Introduce una nueva fecha:'));
        let nuevasEtiquetas = prompt('Introduce nuevas etiquetas:').split(',');

        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarFecha(nuevaFecha);
        this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

        repintar();
    }
}

function BorrarHandle()
{
    this.handleEvent = function (event)
    {
        let gastoElim = this.gasto.id;
        gestionPresupuesto.borrarGasto(gastoElim);

        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function (event)
    {
        this.gasto.borrarEtiquetas(this.etiquetas);

        repintar();
    }
}

function nuevoGastoWebFormulario()
{
    let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);

    let formulario = plantillaFormulario.querySelector('form');

    let botones = document.getElementById('controlesprincipales');
    botones.append(formulario);

    document.getElementById('anyadirgasto-formulario').setAttribute('disabled',"");

    let cancelar = new CancelarHandleFormulario();
    let botonCancelar = formulario.querySelector('button.cancelar');
    botonCancelar.addEventListener('click', cancelar);

    let enviar = new EnviarHandleFormulario();
    formulario.addEventListener('submit', enviar);

    let enviarAPI = formulario.querySelector("button.gasto-enviar-api");
    enviarAPI.addEventListener('click', new enviarGastosApi());
}

let botonGastoFormulario = document.getElementById('anyadirgasto-formulario');
botonGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

function CancelarHandleFormulario()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        event.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        repintar();
    }
}

function EnviarHandleFormulario()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();

        let form = event.currentTarget;
        let desc = form.elements.descripcion.value;
        let valor = parseFloat(form.elements.valor.value);
        let fecha = form.elements.fecha.value;
        let etiquetas = form.elements.etiquetas.value;

        let gastoNuevo = new gestionPresupuesto.CrearGasto(desc,valor,fecha,...etiquetas);
        gestionPresupuesto.anyadirGasto(gastoNuevo);

        repintar();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}


function EditarHandleFormulario()
{
    this.handleEvent = function (event)
    {
        event.preventDefault();

        let plantilla = document.getElementById('formulario-template').content.cloneNode(true);

        let formulario = plantilla.querySelector('form');

        let botones = document.getElementById('controlesprincipales');
        botones.append(formulario);

        let botonFormulario = event.currentTarget;
        botonFormulario.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toLocaleString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let cancelar = new CancelarHandleFormulario();
        let botonCancelarForm = formulario.querySelector('button.cancelar');
        botonCancelarForm.addEventListener('click', cancelar);

        let enviar = new EnviarHandle();
        enviar.gasto = this.gasto;
        formulario.addEventListener('submit', enviar);

        botonFormulario.setAttribute('disabled',"");

        let editarAPI = new editarGastosApi();
        let botonEnviarAPI = formulario.querySelector('button.gasto-enviar-api');
        editarAPI.gasto = this.gasto;
        botonEnviarAPI.addEventListener('click', editarAPI);
    }
}

function EnviarHandle()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();

        let formulario = event.currentTarget;

        let desc = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(desc);

        let valor = parseFloat(formulario.elements.valor.value);
        this.gasto.actualizarValor(valor);

        let fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
}

function filtrarGastosWeb()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();

        let form = event.currentTarget;
        
        let desc = form.elements["formulario-filtrado-descripcion"].value;
        let valorMin = parseFloat(form.elements["formulario-filtrado-valor-minimo"].value);
        let valorMax = parseFloat(form.elements["formulario-filtrado-valor-maximo"].value);
        let fechaIni = form.elements["formulario-filtrado-fecha-desde"].value;
        let fechaFin = form.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetas = form.elements["formulario-filtrado-etiquetas-tiene"].value;
        let filtrado ={};

        if(desc != "")
        {
            filtrado.descripcionContiene = desc;
        }
        
        if(!isNaN(valorMin))
        {
            filtrado.valorMinimo = valorMin;
        }
        if(!isNaN(valorMax))
        {
            filtrado.valorMaximo = valorMax;
        }
        if(fechaIni != ""){
            filtrado.fechaDesde = fechaIni;
        }
        
        if(fechaFin != ""){
            filtrado.fechaHasta = fechaFin;
        }

        if(etiquetas.length > 0)
        {
            filtrado.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetas);
        }
        

        console.log(filtrado);
        
        document.getElementById("listado-gastos-completo").innerHTML = "";
        let filtroGasto = gestionPresupuesto.filtrarGastos(filtrado);

       console.log(filtroGasto);

        for(let gasto of filtroGasto)
            {
                mostrarGastoWeb("listado-gastos-completo",gasto);
                console.log(gasto);
            }
    }
}

let botonSubmit = document.getElementById("formulario-filtrado");
botonSubmit.addEventListener("submit", new filtrarGastosWeb());

function guardarGastosWeb()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();

        localStorage.setItem("GestorGastosDWEC",JSON.stringify(gestionPresupuesto.listarGastos()));
    }
}

function cargarGastosWeb()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();

        if(localStorage.getItem("GestorGastosDWEC") != null)
        {
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.getItem("GestorGastosDWEC")));
        }
        else
        {
            gestionPresupuesto.cargarGastos([]);
        }

        repintar();
    }
}

let botonGuardar = document.getElementById("guardar-gastos");
botonGuardar.addEventListener("click", new guardarGastosWeb());

let botonCargar = document.getElementById("cargar-gastos");
botonCargar.addEventListener("click", new cargarGastosWeb());

function cargarGastosApi()
{
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

        if(usuario == null || usuario == "")
        {
            alert('Introduce un nombre de usuario.')
        }

        fetch(url, {method: 'GET'})
            .then(respuesta => respuesta.json())
            .then(gastos =>
                {
                    gestionPresupuesto.cargarGastos(gastos);
                    repintar();
                })
            .catch(error => console.log(error));
}

let botonCargarAPI = document.getElementById('cargar-gastos-api');
botonCargarAPI.addEventListener('click', cargarGastosApi);

function borrarGastosApi()
{
    this.handleEvent = async function (event)
    {
        event.preventDefault();

        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        try
        {
            let respuestaActual = await fetch(url, {method: 'DELETE'});

            if(respuestaActual.ok)
            {
                cargarGastosApi();
            }            
        }
        catch(error)
        {
            console.log(error);
        }
    }
}

function enviarGastosApi()
{
    this.handleEvent = function(event)
    {
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`
        let form = document.querySelector("#controlesprincipales form");

        let gasto = 
        {
            "descripcion" : form.elements.descripcion.value,
            "valor" : parseFloat(form.elements.valor.value),
            "fecha" : form.elements.fecha.value,
            "etiquetas" : form.elements.etiquetas.value.split(",")
        }

        try
        {
            fetch(url, {method: 'POST', body: JSON.stringify(gasto), headers: {'Content-type': 'application/json; charset=utf-8'}})
                .then(respuesta => respuesta.json())
                .then(gastos =>
                    {
                        cargarGastosApi(gastos);
                    })
                .catch(error => console.log(error));
        }
        catch(error)
        {
            console.log(error);
        }  
    }    
}

function editarGastosApi()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();

        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        let form = event.currentTarget.form;

        let gasto = 
        {
            "descripcion" : form.elements.descripcion.value,
            "valor" : parseFloat(form.elements.valor.value),
            "fecha" : form.elements.fecha.value,
            "etiquetas" : form.elements.etiquetas.value.split(",")
        }
        
        try
        {
            fetch(url, {method: 'PUT', body: JSON.stringify(gasto), headers: {'Content-type': 'application/json; charset=utf-8'}})
                .then(respuesta => respuesta.json())
                .then(gastos =>
                    {
                        cargarGastosApi(gastos);
                    })
                .catch(error => console.log(error))
        }
        catch(error)
        {
            console.log(error);
        } 
    }
}

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
    EnviarHandle,
    EditarHandleFormulario,
    EnviarHandleFormulario,
    CancelarHandleFormulario,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi,
    borrarGastosApi,
    enviarGastosApi,
    editarGastosApi
}