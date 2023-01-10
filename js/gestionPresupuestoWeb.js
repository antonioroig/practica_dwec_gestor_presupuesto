
import * as pres from './gestionPresupuesto.js';

"use strict";
function mostrarDatoEnId(valor,idElemento)
{
    let id = document.getElementById(idElemento);
    id.innerHTML = valor;
};
function mostrarGastoWeb(idElemento,gasto)
{
 let id = document.getElementById(idElemento);
 let div = document.createElement('div');
 div.className ="gasto";
 id.append(div);
 let idGasto = document.getElementsByClassName("gasto");

 let desc_gasto = document.createElement('div');
 desc_gasto.className = "gasto-descripcion";
 desc_gasto.textContent = gasto.descripcion;
 div.append(desc_gasto);

 let fecha_gasto = document.createElement('div');
 fecha_gasto.className = "gasto-fecha";
 fecha_gasto.textContent = new Date(gasto.fecha).toLocaleDateString();
 div.append(fecha_gasto);

 let valor_gasto = document.createElement('div');
 valor_gasto.className = "gasto-valor";
 valor_gasto.textContent = gasto.valor;
 div.append(valor_gasto);

 let etiquetas_gasto = document.createElement('div');
 etiquetas_gasto.className = "gasto-etiquetas";
 for(let etiqueta of gasto.etiquetas)                    
 {
    let span = document.createElement('span');
    span.className = "gasto-etiquetas-etiqueta";
    span.textContent = " " + etiqueta;
    etiquetas_gasto.append(span);

    let etiquetas_borradas = new BorrarEtiquetasHandle();
    etiquetas_borradas.gasto = gasto;
    etiquetas_borradas.etiquetas = etiqueta;
    span.addEventListener('click',etiquetas_borradas);
 }
 div.append(etiquetas_gasto);

 let btnEditar = document.createElement('button');
 btnEditar.type ='button';
 btnEditar.className = 'gasto-editar';
 btnEditar.textContent = 'Editar';
 
 let gasto_editar = new EditarHandle(gasto);
 gasto_editar.gasto = gasto;

 btnEditar.addEventListener('click',gasto_editar)
 div.append(btnEditar);

 let btnBorrar = document.createElement('button');
 btnBorrar.type ='button';
 btnBorrar.className = 'gasto-borrar';
 btnBorrar.textContent = 'Borrar';
 
 let borrar_gasto = new BorrarHandle(gasto);
 borrar_gasto.gasto = gasto;

 btnBorrar.addEventListener('click',borrar_gasto)
 div.append(btnBorrar);

 let btnEditarForm = document.createElement('button');
 
 btnEditarForm.type = "button";
 btnEditarForm.className = 'gasto-editar-formulario';

 btnEditarForm.textContent = 'Editar(formulario)';

 let editarFormulario= new EditarHandleFormulario(gasto);
 editarFormulario.gasto = gasto;

 btnEditarForm.addEventListener('click',editarFormulario);
 div.append(btnEditarForm);
};
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{
    let id = document.getElementById(idElemento);
    let agrupacion = '<div class="agrupacion"> <h1> Gastos agrupados por ' +  periodo + '</h1>';

    for(let agrupado in agrup)
    {
        agrupacion += `<div class="agrupacion-dato"> <span class="agrupacion-dato-clave"> ${agrupado} </span>
        <span class="agrupacion-dato-valor"> ${agrup[agrupado]} </span></div>`;
    }
    agrupacion += '</div>';
    id.innerHTML = agrupacion;
};

function repintar()
{
   
    mostrarDatoEnId(pres.mostrarPresupuesto(),'presupuesto');
    mostrarDatoEnId(pres.calcularTotalGastos(),'gastos-totales');
    mostrarDatoEnId(pres.calcularBalance(),'balance-total');
    document.getElementById('listado-gastos-completo').innerHTML = '';
    // for(let gasto_completo of pres.listarGastos())
    // {
    //     mostrarGastoWeb('listado-gastos-completo',gasto_completo);
    // }
     pres.listarGastos().forEach(gasto =>{
        mostrarGastoWeb("listado-gastos-completo", gasto);
     });
}

function actualizarPresupuestoWeb()
{
    let presupuesto = parseInt(prompt('Introduce el presupuesto actualizado'));
    pres.actualizarPresupuesto(presupuesto);
    repintar();
}

let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click',actualizarPresupuestoWeb);


function nuevoGastoWeb()
{
    let descripcion = prompt('Introduce la descripcion:');
    let valor = parseFloat(prompt('Introduce el valor del gasto:'));
    let fecha = Date.parse(prompt('Introduce la fecha en formato yyyy/mm/dd'));
    let etiquetas = prompt('Introduce las estiquetas de este gasto separadas por ,').split(',');

    let gasto_nuevo = new pres.CrearGasto(descripcion,valor,fecha,...etiquetas);

    pres.anyadirGasto(gasto_nuevo);

    repintar();
}

let botonAñadirGasto = document.getElementById('anyadirgasto');
botonAñadirGasto.addEventListener('click',nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent = function (event) 
    {
        let new_descripcion = prompt('Introduce la nueva descripcion:', this.gasto.descripcion);
        let new_valor = parseFloat(prompt('Introduce el nuevo valor del gasto:', this.gasto.valor));
        let new_fecha = Date.parse(prompt('Introduce la nueva fecha en formato yyyy/mm/dd', this.gasto.fecha));
        let new_etiqueta = prompt('Introduce las estiquetas nuevas de este gasto separadas por ,', this.gasto.etiquetas.join(', '));
        let new_etiquetas = new_etiqueta.split(',');

        this.gasto.actualizarDescripcion(new_descripcion);
        this.gasto.actualizarValor(new_valor);
        this.gasto.actualizarFecha(new_fecha);
        this.gasto.anyadirEtiquetas(new_etiquetas);

        repintar();

    }

}
function BorrarHandle()
{
    this.handleEvent = function (event) 
    {
        pres.borrarGasto(this.gasto.id);
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
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let controles = document.getElementById('controlesprincipales');
    controles.append(formulario);

    document.getElementById('anyadirgasto-formulario').setAttribute('disabled',"");

    let cancelar = new CancelarHandleFormulario();
    let cancelar_boton = formulario.querySelector('button.cancelar');

    cancelar_boton.addEventListener('click',cancelar);

    let enviar = new EnviarHandleFormulario();
    formulario.addEventListener('submit', enviar);
}

let botonFormulario = document.getElementById('anyadirgasto-formulario');
botonFormulario.addEventListener('click', nuevoGastoWebFormulario);

function EnviarHandleFormulario()
{
    this.handleEvent = function (event)
    {
        event.preventDefault();
        let formulario = event.currentTarget;

        let new_desc = formulario.elements.descripcion.value;
        let new_valor = parseFloat(formulario.elements.valor.value);
        let new_fecha = formulario.elements.fecha.value;
        let new_etiquetas = formulario.elements.etiquetas.value;

        let new_gasto = new pres.CrearGasto(new_desc,new_valor,new_fecha,...new_etiquetas);

        pres.anyadirGasto(new_gasto);

        repintar();

        document.getElementById('anyadirgasto-formulario').removeAttribute("disabled");
    } 
}
function CancelarHandleFormulario()
{
    this.handleEvent = function (event)
    {
        event.preventDefault();
        event.currentTarget.parentNode.remove();
        document.getElementById('anyadirgasto-formulario').removeAttribute("disabled");
        repintar();
    }
}

function EditarHandleFormulario()
{
    this.handleEvent = function (event)
    {
        event.preventDefault();
        
        let template = document.getElementById('formulario-template').content.cloneNode(true);

        let formulario = template.querySelector('form');

        let controles = document.getElementById('controlesprincipales');
        controles.append(formulario);

        let btnFormulario = event.currentTarget;
        btnFormulario.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toLocaleString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let cancelar = new CancelarHandleFormulario();
        let cancelar_boton = formulario.querySelector('button.cancelar');
        cancelar_boton.addEventListener('click',cancelar);

        let enviar = new EnviarHandle();
        enviar.gasto = this.gasto;
        formulario.addEventListener('submit', enviar);

        btnFormulario.setAttribute('disabled', "");
    }
}
function EnviarHandle()
{
    this.handleEvent = function (event)
    {
        event.preventDefault();
        let formulario = event.currentTarget;

        let new_desc = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(new_desc);

        let new_valor = parseFloat(formulario.elements.valor.value);
        this.gasto.actualizarValor(new_valor);

        let new_fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(new_fecha);

        let new_etiquetas = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(...new_etiquetas);

       repintar();
    }
}
export{mostrarDatoEnId,mostrarGastoWeb,mostrarGastosAgrupadosWeb,repintar,actualizarPresupuestoWeb,nuevoGastoWeb,EditarHandle,BorrarHandle,BorrarEtiquetasHandle,EnviarHandle,EditarHandleFormulario,EnviarHandleFormulario,CancelarHandleFormulario,nuevoGastoWebFormulario}