import * as gestionPresupuesto from '../js/gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    if(idElemento != undefined) {
        let div = document.getElementById(idElemento);
        //let valor = valor.toFixed(2);
        div.innerHTML += "" + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    if(idElemento != undefined){
        let div = document.getElementById(idElemento);

        let divgasto = document.createElement('div');
        divgasto.className = "gasto";

        let gastodes = document.createElement('div');
        gastodes.className = "gasto-descripcion";
        gastodes.innerHTML = gasto.descripcion;
        divgasto.append(gastodes);

        let gastofecha = document.createElement('div');
        gastofecha.className = "gasto-fecha";
        let fecha1 = new Date(gasto.fecha);
        let txtfecha = fecha1.toLocaleString();
        gastofecha.innerHTML = txtfecha;
        divgasto.append(gastofecha);

        let gastovalor = document.createElement('div');
        gastovalor.className = "gasto-valor";
        gastovalor.innerHTML = gasto.valor;
        divgasto.append(gastovalor);

        let gastoeti = document.createElement('div');
        gastoeti.className = "gasto-etiquetas";
        
        //if (gasto.etiquetas.length != undefined) {
        for (let i = 0; i < gasto.etiquetas.length; i++) {
            let eti = document.createElement('span');
            eti.className = "gasto-etiquetas-etiqueta";
            eti.innerHTML = gasto.etiquetas[i];
            gastoeti.append(eti);
        }                       
        //}

        divgasto.append(gastoeti);
        div.append(divgasto);       
    }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let div = document.getElementById(idElemento);

    let agrupacion = document.createElement('div');
    agrupacion.className = "agrupacion";

    let encabezado = document.createElement('h1');
    let claves = Object.keys(agrup);
    let long = claves.length;
    encabezado.innerHTML = "Gastos agrupados por " + periodo;
    
    agrupacion.append(encabezado);
    let valores = Object.values(agrup);

    for (let i = 0; i < long ; i++) {
        let agrupaciondato = document.createElement('div');
        agrupaciondato.className = "agrupacion-dato";

        let dataclave = document.createElement('span');
        dataclave.className = "agrupacion-dato-clave";    
        dataclave.innerHTML += claves[i];
        agrupaciondato.append(dataclave);

        let datavalor = document.createElement('span');
        datavalor.className = "agrupacion-dato-valor";
        datavalor.innerHTML += valores[i]; 
        agrupaciondato.append(datavalor); 

        agrupacion.append(agrupaciondato); 
    }
    div.append(agrupacion);
}


function repintar() {
    let div = document.getElementById("presupuesto");
    div.innerHTML = "";
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    div = document.getElementById("gastos-totales");
    div.innerHTML = "";
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    div = document.getElementById("balance-total");
    div.innerHTML = "";
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    listado_completo = document.getElementById("listado-gastos-completo"); 
    listado_completo.innerHTML += "";
    let listaGastos1 = gestionPresupuesto.listarGastos();
    for (let i = 0; i < listaGastos1.length; i++) {
        gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", listaGastos1[i]);
    }
}


function actualizarPresupuestoWeb() {
    let presupuesto = prompt("Introduce un presupuesto");
    let presupuesto_num;
    if (parseFloat(presupuesto)) {
        presupuesto_num = parseFloat(presupuesto);
    }
    gestionPresupuesto.actualizarPresupuesto(presupuesto_num);
    repintar();   
}

let boton_actualizar = document.getElementById("actualizarpresupuesto");
boton_actualizar.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let presupuesto = prompt("Introduce un presupuesto");
    let presupuesto_num;
    if (parseFloat(presupuesto)) {
        presupuesto_num = parseFloat(presupuesto);
    }
    gestionPresupuesto.actualizarPresupuesto(presupuesto_num);
    repintar();   
}


export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}