"use strict";
import * as exGp from './gestionPresupuesto.js';
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
/*
let btnActualizarpres = document.getElementById("actualizarpresupuesto");
btnActualizarpres.onclick = actualizarPresupuestoWeb;
let btnAnyadirgast = document.getElementById("anyadirgasto");
btnAnyadirgast.onclick =  nuevoGastoWeb;*/
//document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
//document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
function mostrarDatoEnId(valor, idElemento)
{
    let elem = document.getElementById(idElemento);
    //elem.innerHTML += valor;
    let p = document.createElement("p");
    //let pTexto = document.createTextNode(valor);
    //p.appendChild(pTexto);
    p.textContent = valor;
    elem.appendChild(p);
}
function mostrarGastoWeb(gasto, idElemento)
{
    let elem = document.getElementById(idElemento);
    let padre = document.createElement("div");
    padre.className  = "gasto";

    let gastDes = document.createElement("div");
    gastDes. className = "gasto-descripcion";
    gastDes.textContent = gasto.descripcion;
    padre.appendChild(gastDes);

    let gastFech = document.createElement("div");
    gastFech. className = "gasto-fecha";
    gastFech.textContent = new Date(gasto.fecha).toLocaleDateString();
    padre.appendChild(gastFech);

    let gastVal = document.createElement("div");
    gastVal. className = "gasto-valor";
    gastVal.textContent = gasto.valor;
    padre.appendChild(gastVal);

    let gastEtiq = document.createElement("div");
    gastEtiq. className = "gasto-etiquetas";
    /*gasto.etiquetas.forEach(etiqueta =>
        {
            let borrarEtiqueta = new BorrarEtiquetasHandle();
            borrarEtiqueta.gasto = gasto;
            borrarEtiqueta.etiqueta = etiqueta;
    
            let etiq = document.createElement('span');
            etiq.className = 'gasto-etiquetas-etiqueta';
            etiq.textContent = etiqueta +"";
            if(idElemento == "listado-gastos-completo"){
                etiq.addEventListener("click", borrarEtiqueta);
            }
            gastEtiq.appendChild(etiq);        
        });*/

   for(let i=0; i < gasto.etiquetas.length;i++)
    {
        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = gasto.etiquetas[i];

        let etiq = document.createElement('span');
        etiq.className = 'gasto-etiquetas-etiqueta';
        etiq.textContent = `${gasto.etiquetas[i]}` +"";
        etiq.addEventListener("click", borrarEtiqueta);
        gastEtiq.appendChild(etiq);
    }
  
   /* gasto.etiquetas.forEach(etiqueta => {
        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;

        let etiq = document.createElement('span');
        etiq.className = 'gasto-etiquetas-etiqueta';
        etiq.textContent = etiqueta +"";
        if(idElemento == "listado-gastos-completo"){
            etiq.addEventListener("click", borrarEtiqueta);
        }
        gastEtiq.appendChild(etiq);

    });*/
    /*
    for (let i = 0; i < gasto.etiquetas.length; i++)
    {
        let etiq = document.createElement('span');
        etiq.className = 'gasto-etiquetas-etiqueta';
        etiq.textContent = etiqueta;
        gastEtiq.appendChild(etiq);
    }  */      

    let botonEditar = document.createElement('button');
    botonEditar.className = 'gasto-editar';
    botonEditar.type = 'button';
    botonEditar.textContent = 'Editar';

    let editarEvento = new EditarHandle();
    editarEvento.gasto = gasto;
    botonEditar.addEventListener('click', editarEvento); 

    let botonBorrar = document.createElement('button');
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.type = 'button';
    botonBorrar.textContent = 'Borrar';

    let borrarEvento = new BorrarHandle();
    borrarEvento.gasto = gasto;
    botonBorrar.addEventListener('click', borrarEvento);

    let botonEditarForm=document.createElement("button");
    botonEditarForm.className="gasto-editar-formulario";
    botonEditarForm.type="button";
    botonEditarForm.textContent="Editar Form";

    let editarFormEvent = new EditarHandleFormulario();
    editarFormEvent.gasto=gasto;
    editarFormEvent.boton=botonEditarForm;
    editarFormEvent.elem= padre;
    botonEditarForm.addEventListener("click",editarFormEvent);
     
    padre.append(botonEditarForm);
    padre.append(botonEditar);
    padre.append(botonBorrar);
    padre.appendChild(gastEtiq);
    padre.appendChild(botonEditarForm);
    elem.appendChild(padre);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{   
    let elem = document.getElementById(idElemento);
    let padre = document.createElement("div");
    padre.className  = 'agrupacion';
    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;
    padre.appendChild(h1);

    for( let [nombre, valor] of Object.entries( agrup ))
    {
        let aux = document.createElement('div');
        aux.className = 'agrupacion-dato';
        let span1 = document.createElement('span');
        span1.className= 'agrupacion-dato-clave';
        span1.textContent = nombre;
        let span2 = document.createElement('span');
        span2.className= 'agrupacion-dato-valor';
        span2.textContent = valor;
        aux.appendChild(span1);
        aux.appendChild(span2);
        padre.appendChild(aux);
    }
    elem.appendChild(padre);
}
function repintar()
{
    /*
    document.getElementById('presupuesto').innerHTML = exGp.mostrarPresupuesto;
    document.getElementById('presupuesto').innerHTML += mostrarDatoEnId;

    document.getElementById('gastos-totales').innerHTML = exGp.calcularTotalGastos;
    document.getElementById('gastos-totales').innerHTML += mostrarDatoEnId;

    document.getElementById('balance-total').innerHTML = exGp.calcularTotalGastos;
    document.getElementById('balance-total').innerHTML += mostrarDatoEnId;*/
    document.getElementById('presupuesto').innerHTML="";
    document.getElementById('gastos-totales').innerHTML
    document.getElementById('balance-total').innerHTML
    mostrarDatoEnId(exGp.mostrarPresupuesto(), 'presupuesto');  
    mostrarDatoEnId(exGp.calcularTotalGastos(), 'gastos-totales');
    mostrarDatoEnId(exGp.calcularBalance(), 'balance-total');
    let aux = document.getElementById('listado-gastos-completo');
    aux.innerHTML = "";
    exGp.listarGastos().forEach(gasto => {
        mostrarGastoWeb(gasto,"listado-gastos-completo");
    });
}

function actualizarPresupuestoWeb()
{
    let presupuesto = prompt("Introduzca un presupuesto: ");
    presupuesto = parseFloat(presupuesto);
    exGp.actualizarPresupuesto(presupuesto);
    repintar();
} 
function nuevoGastoWeb ()
{
    let descripcion = prompt("Introduzca la descripcion: ");
    let valor = prompt("introduzca el valor: ");
    valor = parseFloat(valor);
    let fecha = prompt("Introduzca la fecha: ");
    let etiqueta = prompt("Introduzca las etiquetas separadas por comas ,: ")
    let etiquetas= etiqueta.split(',');
    let nuevoGasto = new exGp.CrearGasto(descripcion,valor,fecha,...etiquetas);
    exGp.anyadirGasto(nuevoGasto);
    repintar();
}
function EditarHandle()
{
    this.handleEvent = function (event)
    {
        let descripcion = prompt("Introduzca la descripcion: ");
        let valor = prompt("introduzca el valor: ");
        valor = parseFloat(valor);
        let fecha = prompt("Introduzca la fecha: ");
        let etiqueta = prompt("Introduzca las etiquetas separadas por comas ,: ")
        let etiquetas= etiqueta.split(',');
        
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    }
}
function BorrarHandle() 
{
    this.handleEvent = function()
    {
        exGp.borrarGasto(this.gasto.id);
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

function nuevoGastoWebFormulario()
{
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    let divContPrincipales = document.getElementById("controlesprincipales")
    divContPrincipales.appendChild(formulario);
    document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
   
    let enviar = new EnviarHandle();
    formulario.addEventListener('submit', enviar);

    let cancelar = new CancelarHandleFormulario();
    cancelar.form = form;
    let btnCancel = formulario.querySelector("button.cancelar");
    btnCancel.addEventListener("click", cancelar);
    
}

function EnviarHandleFormulario()
{
    this.handleEvent = function(event)
    {       
        event.preventDefault();
        this.gasto.descripcion = this.form.elements.descripcion.value;
        this.gasto.valor = parseFloat(this.form.elements.valor.value);
        this.gasto.fecha = new Date(this.form.elements.fecha.value);
        this.gasto.etiquetas = this.form.elements.etiquetas.value.split(",");
        repintar();
    }
}
function  EnviarHan dle()
{
    this.handleEvent = function(event)
    {
        /*
        */
        let form = event.currentTarget;
        let descripcion = form.elements.descripcion.value;
        let valor = parseFloat(form.elements.valor.value);
        let fecha = new Date(form.elements.fecha.value);
        let etiquetas = toString(form.elements.etiquetas.value).split(",");
        let Nuevogas = new exGp.CrearGasto(descripcion, valor, fecha, etiquetas);
        exGp.anyadirGasto(Nuevogas);
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
}
function CancelarHandleFormulario() 
{
    this.handleEvent = function (event)
    {
        event.currentTarget.parentNode.remove();
        let botonAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}
function EditarHandleFormulario()
{
    this.handleEvent = function(event)
    {
        let pFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var form = pFormulario.querySelector("form");
        
        /*let divControlesPrincipales = document.getElementById("controlesprincipales");
        divControlesPrincipales.appendChild(form);*/
        this.padre.appendChild(form);
       
        /*let botonEditarForm = event.currentTarget;
        botonEditarForm.appendChild(form);*/
        form.elements.descripcion.value  = this.event.descripcion;
        form.elements.valor.value = this.event.valor;
        form.elements.fecha.value = this.event.fecha;
        form.elements.etiquetas.value = this.event.etiquetas;


        
        let EditarFormHandle1 = new EnviarHandleFormulario();
        EditarFormHandle1.event = this.event;
        EditarFormHandle1.form = form;
        form.addEventListener('submit', EditarFormHandle1);


        botonEditarForm.setAttribute("disabled", "");

        
        let cancelarObj = new CancelarHandleFormulario();
        cancelarObj.form = form;
        cancelarObj.botonEditarForm = this.botonEditarForm;
        cancelarObj.form = form;
        let Cancelar = form.querySelector("button.cancelar");
        Cancelar.addEventListener("click", cancelarObj);

    }
}

export   {  
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
//npm cypress open//para ejecutar el text de la practica 4//
//type module//