
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
    span.textContent = etiqueta;
    etiquetas_gasto.appendChild(span);
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
    for(let gasto_completo of pres.listarGastos())
    {
        mostrarGastoWeb('listado-gasto-completo',gasto_completo);
    }
    
}

function actualizarPresupuestoWeb()
{
    let presupuesto = parseInt(prompt('Introduce el presupuesto actualizado'));
    pres.actualizarPresupuesto(presupuesto);
}

let botonActualizar = document.getElementById('actualizarPresupuesto');
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
        let new_descripcion = prompt('Introduce la nueva descripcion:');
        let new_valor = parseFloat(prompt('Introduce el nuevo valor del gasto:'));
        let new_fecha = Date.parse(prompt('Introduce la nueva fecha en formato yyyy/mm/dd'));
        let new_etiquetas = prompt('Introduce las estiquetas nuevas de este gasto separadas por ,').split(',');

        this.gasto.actualizarDescripcion(new_descripcion);
        this.gasto.actualizarValor(new_valor);
        this.gasto.actualizarFecha(new_fecha);
        this.gasto.anyadirEtiquetas(...new_etiquetas);

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
export{mostrarDatoEnId,mostrarGastoWeb,mostrarGastosAgrupadosWeb,repintar,actualizarPresupuestoWeb,nuevoGastoWeb,EditarHandle,BorrarHandle,BorrarEtiquetasHandle}