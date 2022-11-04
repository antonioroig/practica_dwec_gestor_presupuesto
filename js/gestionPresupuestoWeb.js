import * as gestionpr from './gestionPresupuesto.js';
"use strict";

function mostrarDatoEnId(valor,idElemento)
{
    if(idElemento!==undefined){
        let elem= document.getElementById(idElemento);
        elem.innerHTML+= "" + valor;
    }
}


let mostrarGastoWeb = function(idElemento,gasto){

    let id = document.getElementById(idElemento);
    const divContenedor = document.createElement("div"); 
    divContenedor.className = "gasto"; 


    const divDes = document.createElement("div"); 
    divDes.className = "gasto-descripcion"; 
    divDes.textContent = gasto.descripcion ;

    const divFecha = document.createElement("div"); 
    divFecha.className = "gasto-fecha";
    divFecha.textContent =gasto.fecha;


    const divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent= gasto.valor;

    const divEti = document.createElement("div"); 
    divEti.className = "gasto-etiquetas";
    divEti.textContent = gasto.etiquetas;

    for(let et of gasto.etiquetas)
    {
        const s = document.createElement("span");
        s.className = "gasto-etiquetas-etiqueta";
        s.textContent = et;
        divEti.createElement(s);
    }

    divContenedor.appendChild(divDes,divFecha,divValor,divEti);
    id.appendChild(divContenedor);
    return id;
}

let mostrarGastosAgrupadosWeb = function(){

}

















export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}