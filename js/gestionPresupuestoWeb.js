import * as scriptsGestion from './gestionPresupuesto';

function mostrarDatoEnId(valor, idElemento){

let id = document.getElementById(idElemento);
id.innerHTML += valor;

}


function mostrarGastoWeb(idElementolor, gasto){
    const divGasto = document.createElement("div");
    divGasto.id = "gasto";
    //
    const divGastoDescripcion = document.createElement("div");
    divGastoDescripcion.id = "gasto-descripcion";
    divGasto.appendChild(divGastoDescripcion);
    //
    const divGastoFecha = document.createElement("div");
    divGastoFecha.id = "gasto-fecha";
    divGasto.appendChild(divGastoFecha);
    //
    const divGastoValor = document.createElement("div");
    divGastoValor.id = "gasto-valor";
    divGasto.appendChild(divGastoValor);
    //
    const divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.id = "gasto-etiquietas";
    divGasto.appendChild(divGastoEtiquetas);

    for(let i = 0; i < gasto.etiqueta.lenght; i++){
        const span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        divGastoEtiquetas.appendChild(span);
        span.innerHTML = gasto.etiqueta[i].text;
    }


}

function mostrarGastosAgrupadosWeb(){

}








export{
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb
}