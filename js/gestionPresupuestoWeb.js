import * as scriptsGestion from "./gestionPresupuesto.js";

function mostrarDatoEnId(valor, idElemento){
if(idElemento !== undefined){
    let id = document.getElementById(idElemento);
    id.innerHTML += " " + valor;    
}
}

function mostrarGastoWeb(idElemento, gasto){

    let id = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto"
    //
    let divGastoDescripcion = document.createElement("div");
    divGastoDescripcion.className = "gasto-descripcion";
    divGastoDescripcion.innerText += gasto.descripcion;
    divGasto.append(divGastoDescripcion);
    //
    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.innerText += gasto.fecha;
    divGasto.append(divGastoFecha);
    //
    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.innerHTML += gasto.valor;
    divGasto.append(divGastoValor);
    //
    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className = "gasto-etiquetas";

    for(let i = 0; i < gasto.etiquetas.length; i++){
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.innerHTML = gasto.etiquetas[i];
        divGastoEtiquetas.append(span);
    }
    divGasto.append(divGastoEtiquetas);
    //
    id.append(divGasto);

    return id;
}



function mostrarGastosAgrupadosWeb(idElemento, agroup, periodo){
    let id = document.getElementById(idElemento);
    
    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    let h1Agrupacion = document.createElement("h1");
    h1Agrupacion.innerHTML += `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1Agrupacion);


    for(let propi of Object.keys(agroup)){
        let divAgruDato = document.createElement("div");
        divAgruDato.className += "agrupacion-dato";
        
        let divAgruDatoClave = document.createElement("span");
        divAgruDatoClave.className = "agrupacion-dato-clave";
        divAgruDatoClave.innerHTML = `${propi}`;
        
        let divAgruDatoValor = document.createElement("span");
        divAgruDatoValor.className = "agrupacion-dato-valor";
        divAgruDatoValor.innerHTML = `${propi.valueOf()}`;

        divAgrupacion.append(divAgruDato);
        divAgruDato.append(divAgruDatoClave);
        divAgruDato.append(divAgruDatoValor);
    }
    id.append(divAgrupacion);
    return id;
}


function repintar(){

document.getElementById("presupuesto").innerHTML = "";
document.getElementById("gastos-totales").innerHTML = "";
document.getElementById("balance-total").innerHTML = "";
document.getElementById("listado-gastos-completo").innerHTML = "";

mostrarDatoEnId(scriptsGestion.mostrarPresupuesto(),"presupuesto");
mostrarDatoEnId(scriptsGestion.calcularTotalGastos(),"gastos-totales");
mostrarDatoEnId(scriptsGestion.calcularBalance(),"balance-total");

    for(let g of scriptsGestion.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo",g);
    }
}

function actualizarPresupuestoWeb (){
    let presupuesto = prompt('indique el presupuesto');
    scriptsGestion.actualizarPresupuesto(parseFloat(presupuesto));
    repintar();
}


function nuevoGastoWeb (){
    let descripcion = prompt('introduce la descripcion');
    let valor = parseFloat(prompt('introduce el valor'));
    let fecha = prompt('introduce la fecha');
    let etiqueta = prompt('introduce la/s etiquetas');
    let etiquetas = etiqueta.split(', ');

    let gastoNuevo = new scriptsGestion.CrearGasto(descripcion, valor, fecha, etiquetas);
    scriptsGestion.anyadirGasto(gastoNuevo);

    repintar();
}

actualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb);
anyadirgasto.addEventListener("click", nuevoGastoWeb);





export{
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb,
repintar,
actualizarPresupuestoWeb,
}