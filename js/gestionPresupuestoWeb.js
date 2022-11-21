import * as gp from './gestionPresupuesto';

function mostrarDatoEnId(idElemento, valor) {
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += valor;
    }
}
  
function mostrarGastoWeb(idElemento, gasto) {
     if(idElemento != null){
        let gastoHTML = document.createElement("div");
        gastoHTML.className = "gasto";

        let elementoHTML = document.getElementById(idElemento);
        elementoHTML.appendChild(gastoHTML);

        let descripcionHTML = document.createElement("div");
        descripcionHTML.className = "gasto-descripcion";
        descripcionHTML.innerHTML += gasto.descripcion;
        gastoHTML.appendChild(descripcionHTML);
        
        let fechaHTML = document.createElement("div");
        fechaHTML.className = "gasto-fecha";
        fechaHTML.innerHTML += gasto.fecha;
        gastoHTML.appendChild(fechaHTML);
        
        let valorHTML = document.createElement("div");
        valorHTML.className = "gasto-valor";
        valorHTML.innerHTML += gasto.valor;
        gastoHTML.appendChild(valorHTML);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup) {

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};