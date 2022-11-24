"use strict";

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
    agrupD.classList = "agrupacion";
    elemento.appendChild(agrupD)
    
    let elementoAgrup = document.getElementsByClassName("agrupacion")

    let agrupH1 = document.createElement("h1");
    agrupH1.textContent = `Gastos agrupados por ${periodo}`;
    elementoAgrup.appendChild(agrupH1)

    let propiedades = Object.keys(agrup)
    let valores = Object.values(agrup)

    for (let i = 0; i < propiedades.length; i++){

        let gastoAgrupDato = document.createElement("div");
        gastoAgrupDato.classList = "agrupacion-dato";

        let gastoAgrupDatoClave = document.createElement("span");
        gastoAgrupDatoClave.classList = "agrupacion-dato-clave";
        gastoAgrupDatoClave.textContent = propiedades[i];
        gastoAgrupDato.appendChild(gastoAgrupDatoClave)

        let gastoAgrupDatoValor = document.createElement("span");
        gastoAgrupDatoValor.classList = "agrupacion-dato-valor";
        gastoAgrupDatoValor.textContent = valores[i];
        gastoAgrupDato.appendChild(gastoAgrupDatoValor)

        elementoAgrup.appendChild(gastoAgrupDato)
    }

    elemento.appendChild(elementoAgrup)
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}