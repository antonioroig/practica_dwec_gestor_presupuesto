"use strict";

function mostrarDatoEnId(valor, idElemento){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML+=valor;
}

function mostrarGastoWeb(idElemento, gasto){
    
    let elemento = document.getElementById(idElemento);
    
    let gastoD = document.createElement("div"); 
    gastoD.classList = "gasto";
    
    //let elementoGasto = document.getElementsByClassName("gasto") elemento.appendChild(gastoD)
    

    let gastoDesc = document.createElement("div");
    gastoDesc.classList = "gasto-descripcion";
    gastoDesc.textContent = gasto.descripcion;
    gastoD.appendChild(gastoDesc)

    let gastoFecha = document.createElement("div");
    gastoFecha.classList = "gasto-fecha";
    gastoFecha.textContent = gasto.fecha;
    gastoD.appendChild(gastoFecha)

    let gastoValor = document.createElement("div");
    gastoValor.classList = "gasto-valor";
    gastoValor.textContent = gasto.valor;
    gastoD.appendChild(gastoValor)

    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.classList = "gasto-etiquetas";
    gasto.etiquetas.forEach(element => {
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.classList = "gasto-etiquetas-etiqueta";
        gastoEtiqueta.textContent = element;
        gastoEtiquetas.appendChild(gastoEtiqueta)
    });
    gastoD.appendChild(gastoEtiquetas)

    elemento.appendChild(gastoD)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo  ){
    let elemento = document.getElementById(idElemento);
    
    let agrupD = document.createElement("div");
    agrupD.classList = "agrupacion";
    
    
    // let elementoAgrup = document.getElementsByClassName("agrupacion") elemento.appendChild(agrupD)

    let agrupH1 = document.createElement("h1");
    agrupH1.textContent = `Gastos agrupados por ${periodo}`;
    agrupD.appendChild(agrupH1)

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

        agrupD.appendChild(gastoAgrupDato)
    }

    elemento.appendChild(agrupD)
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}