import * as scriptsGestion from "./gestionPresupuesto.js";

function mostrarDatoEnId(valor, idElemento){
if(idElemento !== undefined){
    let id = document.getElementById(idElemento);
    id.innerHTML +=" " + valor;    
}
}


function mostrarGastoWeb(idElemento, gasto){

    let id = document.getElementById(idElemento);


    const divGasto = document.createElement("div");
    divGasto.className = "gasto"
    //
    const divGastoDescripcion = document.createElement("div");
    divGastoDescripcion.className = "gasto-descripcion";
    divGastoDescripcion.textContent(gasto.descripcion);
    divGasto.appendChild(divGastoDescripcion);
    //
    const divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.textContent(gasto.fecha);
    divGasto.appendChild(divGastoFecha);
    //
    const divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.textContent(gasto.valor);
    divGasto.appendChild(divGastoValor);
    //
    const divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className = "gasto-etiquietas";

    for(let i = 0; i < gasto.etiqueta.lenght; i++){
        const span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.innerHTML = gasto.etiqueta[i].text;
        divGastoEtiquetas.appendChild(span);
    }

    divGasto.appendChild(divGastoEtiquetas);

    id.appendChild(divGasto);


}



function mostrarGastosAgrupadosWeb(){

}








export{
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb
}