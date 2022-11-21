import * as ges from "./gestionPresupuesto.js";


function mostrarDatoEnId(valor,idElemento){
    if(idElemento !== undefined){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento,gasto){
    
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divGD = document.createElement("div");
    divGD.className = "gasto-descripcion";
    divGD.innerHTML += gasto.descripcion;
    divGasto.append(divGD);

    let divF = document.createElement("div");
    divF.className = "gasto-fecha";
    divF.innerHTML += gasto.fecha
    divGasto.append(divF);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerHTML += gasto.valor;
    divGasto.append(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    for(let i = 0; i < gasto.etiquetas.length;i++){
        let spanE = document.createElement("span");
        spanE.className = "gasto-etiquetas-etiqueta";
        spanE.innerHTML = gasto.etiquetas[i];
        divEtiquetas.append(spanE);
    }
    divGasto.append(divEtiquetas);
    id.append(divGasto);
    
    return id;
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let id = document.getElementById(idElemento);

    let divAgrupado = document.createElement("div");
    divAgrupado.className = "agrupacion";

    let divAgrupadoH1 = document.createElement("h1");
    divAgrupadoH1.innerHTML += `Gastos agrupados por ${periodo}`;
    divAgrupado.append(divAgrupadoH1);

    for(let key of Object.keys(agrup)){
        let divAgrupacionDato = document.createElement("div");
        divAgrupacionDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.innerHTML = `${key}`;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.innerHTML = `${key.valueOf()}`;

        divAgrupado.append(divAgrupacionDato);
        divAgrupacionDato.append(spanClave);
        divAgrupacionDato.append(spanValor);

    }
    id.append(divAgrupado);
    return id;

}


//NO MODIFICAR.
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}