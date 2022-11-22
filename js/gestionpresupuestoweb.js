import{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos 
} from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento){
   let elemento = document.getElementById(idElemento);
   elemento.innerHTML(valor)
}

function mostrarGastoWeb(idElemento, gasto){
    let elemento = document.getElementById(idElemento);
    
    let gastoD = document.createElement("div");
    gastoD.classList = "gasto";
    elemento.appendChild(gastoD)
    
    let elementoGasto = document.getElementsByClassName("gasto")

    let gastoDesc = document.createElement("div");
    gastoDesc.classList = "gasto-descripcion";
    gastoDesc.textContent = gasto.descripcion;
    elementoGasto.appendChild(gastoDesc)

    let gastoFecha = document.createElement("div");
    gastoFecha.classList = "gasto-fecha";
    gastoFecha.textContent = gasto.descripcion;
    elementoGasto.appendChild(gastoFecha)

    let gastoValor = document.createElement("div");
    gastoValor.classList = "gasto-valor";
    gastoValor.textContent = gasto.descripcion;
    elementoGasto.appendChild(gastoValor)

    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.classList = "gasto-etiquetas";
    gasto.etiquetas.forEach(element => {
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.classList = "asto-etiquetas-etiqueta";
        gastoEtiqueta.textContent = element;
        gastoEtiquetas.appendChild(gastoEtiqueta)
    });
    elementoGasto.appendChild(gastoEtiquetas)

    elemento.appendChild(elementoGasto)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo  ){
    let elemento = document.getElementById(idElemento);
    
    let agrupD = document.createElement("div");
    gastoD.classList = "agrupacion";
    elemento.appendChild(gastoD)
    
    let elementoGasto = document.getElementsByClassName("gasto")

    let gastoDesc = document.createElement("div");
    gastoDesc.classList = "gasto-descripcion";
    gastoDesc.textContent = gasto.descripcion;
    elementoGasto.appendChild(gastoDesc)

    let gastoFecha = document.createElement("div");
    gastoFecha.classList = "gasto-fecha";
    gastoFecha.textContent = gasto.descripcion;
    elementoGasto.appendChild(gastoFecha)

    let gastoValor = document.createElement("div");
    gastoValor.classList = "gasto-valor";
    gastoValor.textContent = gasto.descripcion;
    elementoGasto.appendChild(gastoValor)

    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.classList = "gasto-etiquetas";
    gasto.etiquetas.forEach(element => {
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.classList = "asto-etiquetas-etiqueta";
        gastoEtiqueta.textContent = element;
        gastoEtiquetas.appendChild(gastoEtiqueta)
    });
    elementoGasto.appendChild(gastoEtiquetas)

    elemento.appendChild(elementoGasto)
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}