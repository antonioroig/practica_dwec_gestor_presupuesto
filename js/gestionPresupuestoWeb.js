import * as gestionpr from './gestionPresupuesto.js';
"use strict";

function mostrarDatoEnId(valor,idsento)
{
    if(idsento!==undefined){
        let s= document.getElementById(idsento);
        s.innerHTML+= '' + valor;
    }
}


let mostrarGastoWeb = function(idsento,gasto){
    let sento = document.getElementById(idsento);
    let divContenedor = document.createElement("div"); 
    divContenedor.className = "gasto"; 

    sento.append(divContenedor);

    divContenedor.innerHTML += `<div class="gasto-descripcion">${gasto.descripcion}</div>
                                <div class="gasto-fecha">${gasto.fecha}</div> 
                                <div class="gasto-valor">${gasto.valor}</div>`

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divContenedor.append(divEtiquetas);
    for(let et of gasto.etiquetas)
    {
        divEtiquetas.innerHTML += `<span class="gasto-etiquetas-etiqueta">${et}</span>`
    }
    return sento;
}

let mostrarGastosAgrupadosWeb = function(idsento,agrup,periodo){

    let id = document.getElementById(idsento);

    let divContenedor = document.createElement('div');
    divContenedor.className= "agrupacion";
    id.append(divContenedor);

    divContenedor.innerHTML += `<h1>Gastos agrupados por ${periodo}</h1>`;

    

    for(let propiedad of Object.keys(agrup))
    {
        let divAgrupacion = document.createElement('div');
        divContenedor.append(divAgrupacion);
        divAgrupacion.className= "agrupacion-dato";
        divAgrupacion.innerHTML += `
                <span class="agrupacion-dato-clave">${propiedad}</span>
                <span class="agrupacion-dato-valor">${propiedad.valueOf()}</span>`;
    }
    return id;
}


let repintar = function()
{
    document.getElementById('presupuesto').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';
    document.getElementById('balance-total').innerHTML = '';
    document.getElementById('listado-gastos-completo').innerHTML = '';

    
    mostrarDatoEnId(gestionpr.mostrarPresupuesto(),'presupuesto');
    mostrarDatoEnId(gestionpr.calcularTotalGastos(),'gastos-totales');
    mostrarDatoEnId(gestionpr.calcularBalance(),'balance-total');

        for (let k of  gestionpr.listarGastos())
        mostrarGastoWeb("listado-gastos-completo", k);

        
}



let actualizarPresupuestoWeb  = function()
{
    let result = prompt("Actualiza");
    gestionpr.actualizarPresupuesto(parseInt(result));
    repintar();
}


let nuevoGastoWeb = function()  
{
    let des = prompt("descripción");
    let valor = parseInt(prompt("valor"));
    let fecha = prompt("fecha");
    let eti = prompt("etiquetas");

    let arr = eti.split(', ');
    
    let gasto = new gestionpr.CrearGasto(des,valor,fecha,arr);
    gestionpr.anyadirGasto(gasto);
    repintar();

}
let s = document.getElementById('actualizarpresupuesto')

s.onclick = actualizarPresupuestoWeb;

let e = document.getElementById('anyadirgasto');

e.onclick = nuevoGastoWeb;


function EditarHandle(){
    this.handleEvent()= function(){
        let des = prompt("descripción");
        let valor = parseInt(prompt("valor"));
        let fecha = prompt("fecha");
        let etiqe = prompt("etiquetas");
    

        this.gasto.actualizarDescripcion(des)
        this.gasto.actualizarFecha(fecha);
        this.gasto.actualizarValor(valor);
        let etiquetas = new Array();
            etiquetas = etiqe.split(",");
            etiquetas.forEach(e => {
                this.gasto.anyadirEtiquetas(e);
            });
        repintar();
    }
  };

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}