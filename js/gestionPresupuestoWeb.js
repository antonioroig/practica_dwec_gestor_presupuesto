import * as gestion from './gestionPresupuesto.js';

function mostrarDatoEnId(valor,idElemento){
    
    if(idElemento !== undefined){
        let id = document.getElementById(idElemento);
        id.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto){
    
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";


    let divGastoDes = document.createElement("div");
    divGastoDes.className = "gasto-descripcion";
    divGastoDes.innerHTML += gasto.descripcion;
    divGasto.append(divGastoDes);


    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.innerHTML += gasto.fecha;
    divGasto.append(divGastoFecha);


    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.innerHTML += gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiqueta = document.createElement("div");
    divGastoEtiqueta.className = "gasto-etiquetas";


    for(let i = 0; i < gasto.etiquetas.length;i++){
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.innerHTML = gasto.etiquetas[i];
        divGastoEtiqueta.append(span);
    }
    divGasto.append(divGastoEtiqueta);
    id.append(divGasto);

    return id;

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let id = document.getElementById(idElemento);

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";


    let h1GastosAgrupados = document.createElement("h1");
    h1GastosAgrupados.innerHTML += `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1GastosAgrupados);

    for(let key of Object.keys(agrup)){
        let divAgrupacionDato = document.createElement("div");
        divAgrupacionDato.className = "agrupacion-dato";
        let span = document.createElement("span");
        span.className = "agrupacion-dato-clave";
        span.innerHTML = `${key}`;
        let span2 = document.createElement("span");
        span2.className = "agrupacion-dato-valor";
        span2.innerHTML = `${key.valueOf()}`;
        divAgrupacion.append(divAgrupacionDato);
        divAgrupacionDato.append(span);
        divAgrupacionDato.append(span2);
    }
    id.append(divAgrupacion);
    return id;
};

function repintar(){

    document.getElementById('presupuesto').innerHTML = "";
    document.getElementById('gastos-totales').innerHTML = "";
    document.getElementById('balance-total').innerHTML = "";
    document.getElementById('listado-gastos-completo').innerHTML = "";


    mostrarDatoEnId(gestion.mostrarPresupuesto(),"presupuesto");
    mostrarDatoEnId(gestion.calcularTotalGastos(),"gastos-totales");
    mostrarDatoEnId(gestion.calcularBalance(),"balance-total");
    for(let gasto of gestion.listarGastos()){
        mostrarGastoWeb(gasto,"listado-gastos-completo");
    }
};

function actualizarPresupuestoWeb(){

    let presupuesto = prompt("Introduce un presupuesto");
    parseInt(presupuesto);
    gestion.actualizarPresupuesto(presupuesto);
    repintar();
}
actualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb());


export	{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}