'use strict';

import * as gesPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(valor, idElemento)
{

    if (idElemento != undefined)
    {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }

}

function mostrarGastoWeb(idElemento, gasto)
{

    let elemento = document.getElementById(idElemento);
    let divGasto = document.createElement('div');

    divGasto.className = "gasto";
    let divDescripcionPorGasto = document.createElement('div');
    divDescripcionPorGasto.className = "gasto-descripcion";

    divDescripcionPorGasto.innerHTML+=gasto.descricpion;
    divGasto.append(divDescripcionPorGasto);

    let divFechaPorGasto = document.createElement('div');
    divFechaPorGasto.className = "gasto-fecha";
    divFechaPorGasto.innerHTML+=gasto.fecha;
    divGasto.append(divFechaPorGasto);

    let divValorPorGasto = document.createElement('div');
    divValorPorGasto.className = "gasto-valor";
    divValorPorGasto.innerHTML+=gasto.valor;
    divGasto.append(divValorPorGasto);

    let divEtiquetasPorGasto = document.createElement('div');
    divEtiquetasPorGasto.className = "gasto-etiquetas";
    
    for(let i = 0; i < gasto.etiquetas.length; i++){

        let divEtiquetaNuevoGasto = document.createElement('span');

        divEtiquetaNuevoGasto.className = "gasto-etiquetas-etiqueta";
        divEtiquetaNuevoGasto.textContent = gasto.etiquetas[i];
        
        let BtnEtiqBorrarHandle = new BorrarEtiquetasHandle();
        BtnEtiqBorrarHandle.gasto = gasto;
        BtnEtiqBorrarHandle.etiquetas = gasto.etiquetas[i];
        divEtiquetaNuevoGasto.addEventListener("click", BtnEtiqBorrarHandle);
        divEtiquetaNuevoGasto.textContent = gasto.etiquetas[i] + " ";
        divEtiquetasPorGasto.append(divEtiquetaNuevoGasto);
        
    }
    divGasto.append(divEtiquetasPorGasto);
    elemento.append(divGasto);
    
    
    let btnEditar = document.createElement("button");
    
    btnEditar.className = "gasto-editar";
    
    btnEditar.type = "button";
    
    btnEditar.innerHTML = "Editar";

    
    let BtnEditarHandle = new EditarHandle();
    
    BtnEditarHandle.gasto = gasto;
    
    btnEditar.addEventListener("click", BtnEditarHandle);
    
    divGasto.append(btnEditar);
    

    let btnBorrar = document.createElement("button");
    
    btnBorrar.className = "gasto-borrar";
    
    btnBorrar.type = "button";
    
    btnBorrar.innerHTML = "Borrar";

    
    let BtnBorrarHandle = new BorrarHandle();
    
    BtnBorrarHandle.gasto = gasto;
    
    btnBorrar.addEventListener("click", BtnBorrarHandle);
    
    divGasto.append(btnBorrar);


    let btnEditarForm = document.createElement("button");
    
    btnEditarForm.className = "gasto-editar-formulario";

    btnEditarForm.elemento = "gasto-editar-formulario";

    btnEditarForm.type = "button";

    btnEditarForm.textContent = "Editar (formulario)";


    let handleEditarFormulario = new EditarHandleFormulario();

    handleEditarFormulario.gasto = gasto;

    btnEditarForm.gasto = gasto;

    divGasto.append(btnEditarForm);

    return elemento;

    }

function mostrarGastosAgrupadosWeb(idElemento, agrupar, periodo)
{

        if(idElemento != undefined)
        {

            let id = document.getElementById(idElemento);

            let agrupacionDiv = document.createElement('div');

            agrupacionDiv.className = "agrupacion";

            let h1Div = document.createElement('h1');

            h1Div.innerHTML += `Gastos agrupados por ${periodo}`;
            agrupacionDiv.append(h1Div);

            for(let llave of Object.keys(agrupar))
            {

                let divDatoAgrupado = document.createElement('div');
                divDatoAgrupado.className = "agrupacion-dato";

                let spanDatoAgrupado = document.createElement('span');
                spanDatoAgrupado.className = "agrupacion-dato-clave";

                spanDatoAgrupado.innerHTML += `${llave}`;

                let spanValorDatoAgrupado = document.createElement('span');
                spanValorDatoAgrupado.className = "agrupacion-dato-valor";

                spanValorDatoAgrupado.innerHTML += `${llave.valueOf()}`;

                agrupacionDiv.append(divDatoAgrupado);
                divDatoAgrupado.append(spanDatoAgrupado);
                divDatoAgrupado.append(spanValorDatoAgrupado);

            }

            id.append(agrupacionDiv);

            return id;

        }

}

function repintar()
{


    document.getElementById("presupuesto").innerHTML = "";
   
    document.getElementById("gastos-totales").innerHTML = "";
   
    document.getElementById("balance-total").innerHTML = "";
   
    document.getElementById("listado-gastos-completo").innerHTML = "";

    mostrarDatoEnId(gesPresupuesto.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(gesPresupuesto.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(gesPresupuesto.calcularBalance(), "balance-total");
   
    for(let gasto of gesPresupuesto.listarGastos()){

        mostrarGastoWeb("listado-gastos-completo",gasto);

    }

}

function actualizarPresupuestoWeb()
{

    let question = prompt("introduce un presupuesto");
    
    let questionFloat = parseFloat(question);

    gesPresupuesto.actualizarPresupuesto(questionFloat);

    repintar();

}

let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
btnActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb()
{

    let descripcion = prompt("introduce una descripcion");

    let strValor = prompt("introduce un valor de el gasto");

    let valor = parseFloat(strValor);

    let date = prompt("introduce una fecha (formato yyy-mm-dd)");

    let fecha = Date.parse(date);

    let etiquetasarray = prompt('Etiquetas:').split(',');

    let crearGasto = new gesPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetasarray);

    gesPresupuesto.anyadirGasto(crearGasto);

    repintar();

}

let btnAddGasto = document.getElementById('anyadirgasto');
btnAddGasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle()
{

    this.handleEvent= function() 
    {
           
        let descripcion = prompt("introduce una descripcion");
       
        let strValor = prompt("introduce un valor para el gasto");
       
        let valor = parseFloat(strValor);
       
        let date = prompt("introduce una fecha en yyyy-mm-dd para el gasto");
       
        let etiquetas = prompt("introduce unas etiquetas para el gasto en fomato etiq1,etiq2,etiq3");
       
        let etiquetasArray = etiquetas.split(',');

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(date);
        this.gasto.anyadirEtiquetas(etiquetas);

        repintar();
    }

}

function BorrarHandle()
{

    this.handleEvent = function()
    {

        gesPresupuesto.borrarGasto(this.gasto.id);
        
        repintar();

    }

}

function BorrarEtiquetasHandle()
{

    this.handleEvent= function() 
        {

            this.gasto.borrarEtiquetas(this.etiquetas);

            repintar();
            
        }

}

function nuevoGastoWebFormulario(){
    
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let evento = document.getElementById('controlesprincipales');
    evento.append(formulario);

    document.getElementById("anyadirgasto-formulario").setAttribute('disabled', "");
    
    let cancelar = new btnCancelarHandle();
    let botonCancelar = formulario.querySelector("button.cancelar")
      botonCancelar.addEventListener('click',cancelar);

    let botonenviar = new EnviarFormHandle();
    formulario.addEventListener('submit', botonenviar);

}

function btnCancelarHandle()
{

    this.handleEvent = function(event)
    {

        event.preventDefault();

        event.currentTarget.parentNode.remove();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

        repintar();

    }

}

function EnviarFormHandle()
{

    this.handleEvent = function(event)
    {

        event.preventDefault();

        let formularios = event.currentTarget;

        let descricpion = formularios.elements.descricpion.value;
        this.gasto.actualizarDescripcion(descricpion);

        let valor = parseFloat(formularios.elements.valor.value);
        this.gasto.actualizarDescripcion(valor);

        let date = formularios.elements.fecha.value;
        this.gasto.actualizarDescripcion(date);

        let etiqueta = formularios.elements.etiquetas.value;
        this.gasto.actualizarDescripcion(...etiqueta);

        repintar();

    }

}


function EditarHandleFormulario()
{

    this.handleEvent = function(event)
    {

        let editarForm = document.getElementById("formulario-template").content.cloneNode(true);

        var formularios = editarForm.querySelector("form");


        let controlesForm = document.getElementById("controlesprincipales");

        controlesForm.append(form);


        let btnEditarFormulario = event.currentTarget;

        btnEditarFormulario.after(formularios);

        btnEditarFormulario.disbled = true;


        formularios.elements.descricpion.value = this.gasto.descricpion;

        formularios.elements.valor.value = this.gasto.valor;

        formularios.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);;

        formularios.elements.etiquetas.value = this.gasto.etiquetas;


        let eventFormulario = new editarHandleFormularioEnv();

        eventFormulario.gasto = this.gasto;

        formularios.addEventListener("submit", eventFormulario);


        let cancelarForm = new btnCancelarHandle();

        cancelarForm.btnAddGastoo = btnEditarFormulario;

        let btnCancelarHandle = form.querySelector("button.cancelar");

        btnCancelarHandle.addEventListener("click", cancelarForm);

    }

}


function editarHandleFormularioEnv()
{

    this.handleEvent = function(event)
    {

        event.preventDefault();

        let formulario = event.currentTarget;

        let descricpion = formulario.elements.descricpion.value;

        let valor = parseFloat(formulario.elements.valor.value);

        let fecha = formulario.elements.fecha.value;

        let etiqueta = formulario.elements.etiquetas.value;

        let gasto = new gesPresupuesto.CrearGasto(descricpion, valor, fecha, ...etiqueta);

        gesPresupuesto.anyadirGasto(gasto);

        repintar();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

    }

}

actualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb);

anyadirgasto.addEventListener("click", nuevoGastoWeb);


let addGastoForm = document.getElementById("anyadirgasto-formulario");
addGastoForm.addEventListener("click", nuevoGastoWebFormulario);

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
    nuevoGastoWebFormulario,


}