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

function mostrarGastosAgrupadosWeb(){
    
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}