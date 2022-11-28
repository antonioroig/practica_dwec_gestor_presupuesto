'use strict'
import * as gestionPre from  "./gestionPresupuesto.js";

function mostrarDatoEnId(valor,idElemento){
    if (idElemento != null)
    {
        let elem = document.getElementById(idElemento);
        elem.innerHTML += "" + valor;
    }
}
function mostrarGastoWeb(idElemento, gasto){
    let id = document.getElementById(idElemento);
    let divContenedor = document.createElement("div"); 
    divContenedor.className = "gasto"; 

    let divDes = document.createElement("div"); 
    divDes.className = "gasto-descripcion"; 
    divDes.textContent = gasto.descripcion ;
    divContenedor.appendChild(divDes);

    let divFecha = document.createElement("div"); 
    divFecha.className = "gasto-fecha";
    divFecha.textContent =gasto.fecha;
divContenedor.appendChild(divFecha);

    let divVal = document.createElement("div");
    divVal.className = "gasto-valor";
    divVal.textContent= gasto.valor;
    divContenedor.appendChild(divVal);

    let divEt = document.createElement("div"); 
    divEt.className = "gasto-etiquetas";
    divEt.textContent = gasto.etiquetas;

    gasto.etiquetas.forEach(etiqueta => {
        let spanEt = document.createElement("span");
        spanEt.className = "gasto-etiquetas-etiqueta";
        spanEt.textContent = etiqueta
        divEt.appendChild(spanEt);

    });
    divContenedor.appendChild(divEt);
    
    id.appendChild(divContenedor);

    return id;
}

function mostrarGastosAgrupadosWeb(agrup,periodo, idElemento ){
if(idElemento != null)
{
    let id = document.getElementById(idElemento);
    let divContenedor = document.createElement("div"); 
    divContenedor.className = "agrupacion"; 
    let h1 = document.createElement("h1")
    h1.innerHTML += "Gastos agrupados por " + periodo;
    divContenedor.appendChild(h1);
    for( let property in agrup)
    {
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
function repintar(){
    mostrarDatoEnId(gestionPre.mostrarPresupuesto(),'presupuesto');
    mostrarDatoEnId(gestionPre.calcularTotalGastos(), 'gastos-totales');
    mostrarDatoEnId(gestionPre.calcularBalance(), 'balance-total');
    let elem = document.getElementById('listado-gastos-completo');
    elem.innerHTML = "" ;
    gestionPre.listarGastos().forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto)
    });
}
function actualizarPresupuestoWeb()
 let respuesta = prompt('Introduce un presupuesto:');
 parseInt(respuesta);
 gestionPre.actualizarPresupuesto(respuesta);
 repintar()
}
let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener('click', function () { actualizarPresupuestoWeb() });
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
   
}