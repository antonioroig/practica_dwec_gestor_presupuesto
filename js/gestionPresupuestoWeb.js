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

    

    let elemento = document.getElementById(idElemento);



    let divContenedor = document.createElement("div"); 
    divContenedor.className = "gasto"; 

    elemento.append(divContenedor);

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

    return elemento;
}

let mostrarGastosAgrupadosWeb = function(){

}

















export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}