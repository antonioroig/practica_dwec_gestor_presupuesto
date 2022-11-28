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


    for(let i = 0; i < gasto.etiquetas.length; i++){
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.innerHTML = gasto.etiquetas[i];
        divGastoEtiqueta.append(span);
    }

        let BotonEditar = document.createElement("button");
        BotonEditar.className = "gasto-editar";
        BotonEditar.type = "button";
        BotonEditar.innerHTML = "Editar";
    
        let handleEditar = new EditarHandle();
        handleEditar.gasto = gasto;
        BotonEditar.addEventListener("click", handleEditar);
        divGasto.append(BotonEditar);
    
    

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
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
};

function actualizarPresupuestoWeb(){

    let presupuesto = prompt("Introduce un presupuesto");
    gestion.actualizarPresupuesto(parseFloat(presupuesto));
    repintar();
}

function nuevoGastoWeb(){

    let descripcion = prompt("Introduce la descripción");
    let valor = parseFloat(prompt("Introduce el valor"));
    let fecha = prompt("Introduce la fecha");
    let etiquetas = prompt("Introduce las etiquetas");
    let arr = etiquetas.split(', ');

    let gasto = new gestion.CrearGasto(descripcion,valor,fecha,arr);
    gestion.anyadirGasto(gasto);
    repintar();
};

function EditarHandle(){
    this.handleEvent = function(){
        let descripcion = prompt("Introduce la descripción");
        let valor = parseFloat(prompt("Introduce el valor"));
        let fecha = prompt("Introduce la fecha");
        let etiquetas = prompt("Introduce las etiquetas");
        let arr = etiquetas.split(', ');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.etiquetas = arr;
        repintar();
    }
}

actualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb);

anyadirgasto.addEventListener("click", nuevoGastoWeb);

export	{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}