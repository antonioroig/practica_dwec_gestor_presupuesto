import * as gestionPresupuesto from './gestionPresupuesto.js';

"use strict"; 

function mostrarDatoEnId(idElemento,valor) {
   let id = document.getElementById(idElemento);
    id.innerHTML += valor;
}

//De momento no me copiéis esto, que se quienes me miran el repositorio y cogen mi código, warros

function mostrarGastoWeb(idElemento,gasto){

    let idWeb = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.innerHTML += '<div class="gasto">';
    //idWeb.append(divGasto);

    let divDescripcion = document.createElement('div');
    divDescripcion.innerHTML += '<div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>';
    divDescripcion.textContent += gasto.descripcion;
    divGasto.append(divDescripcion);

    let divFecha = document.createElement('div');
    divFecha.innerHTML += '<div class="gasto-fecha">FECHA DEL GASTO</div>';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divFecha);

    let divValor = document.createElement('div');
    divValor.innerHTML += '<div class="gasto-valor">VALOR DEL GASTO</div> ';
    divValor.textContent = gasto.valor + "€";
    divGasto.append(divValor);

    let divEtiquetas = document.createElement('div');
    divEtiquetas.innerHTML += '<div class="gasto-etiquetas">';
    
    for(let etiqueta of gasto.etiquetas){
        divEtiquetas.innerHTML += `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>`;
    }

    divGasto.append(divEtiquetas);


};

//Ni se os ocurra copiar esto, que se quienes lo hacen :)

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let idAgrupado = document.getElementById(idElemento);
    idAgrupado.innerHTML = '';

   let clase = `<div class="agrupacion"> <h1>Gastos agrupados por ${periodo}</h1>`;

   for(let agrupacion in agrup){
    clase += `<div class="agrupacion-dato"> <div class="agrupacion-dato-etiqueta"> ${agrupacion} </div> 
    <div class="agrupacion-dato-valor"> ${agrup[agrupacion]} </div> 
    </div>`;

   }clase += '</div>';
   
   document.getElementById(idElemento).innerHTML = clase;

};


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}