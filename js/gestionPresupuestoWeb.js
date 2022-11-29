import * as gp from './gestionPresupuesto.js';

function repintar(){
    mostrarDatoEnId(gp.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(gp.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(gp.calcularBalance(), "balance-total");
    mostrarDatoEnId(gp.element.innerHTML, "listado-gastos-completo");

    gp.listarGastos().forEach(gasto => {
        mostrarGastoWeb(gasto, "listado-gastos-completo");
    });
}

function actualizarPresupuestoWeb(){
    let presupuesto = parseFloat(prompt("Introduzca presupuesto"));
    gp.actualizarPresupuesto(presupuesto);
    repintar();
}

let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
btnActualizarPresupuesto.onclick = actualizarPresupuestoWeb();

function nuevoGastoWeb(){
    let descripcion = prompt("Introduzca la descripcion");
    let valor = parseFloat(prompt("Introduzca el valor"));
    let fecha = prompt("Introduzca la fecha");
    let etiquetas = prompt("Introduzca las etiquetas").split(",");

    let ng = gp.CrearGasto(descripcion, valor, fecha, etiquetas);
    gp.anyadirGasto(ng);
    repintar();
}

let btnAnyadirGasto = document.getElementById('anyadirgasto');
btnAnyadirGasto.onclick = nuevoGastoWeb();

let editarHandle = function(){
    this.handleEvent = function(){
        let descripcion = prompt("Introduzca la descripcion");
        let valor = parseFloat(prompt("Introduzca el valor"));
        let fecha = prompt("Introduzca la fecha");
        let etiquetas = prompt("Introduzca las etiquetas").split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    }
}

let borrarHandle = function(){
    this.handleEvent = function(){
        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}

let borrarEtiquetasHandle = function(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function mostrarDatoEnId(valor, idElemento) {
    if(idElemento != null){
        let elementoHTML = document.getElementById(idElemento);
        elementoHTML.innerHTML += valor;
    }
}

function mostrarGastoWeb(gasto, idElemento) {
    if(idElemento != null){
        let gastoHTML = document.createElement("div");
        gastoHTML.className = "gasto";

        let elementoHTML = document.getElementById(idElemento);
        elementoHTML.appendChild(gastoHTML);

        let descripcionHTML = document.createElement("div");
        descripcionHTML.className = "gasto-descripcion";
        descripcionHTML.innerHTML += gasto.descripcion;
        gastoHTML.appendChild(descripcionHTML);
        
        let fechaHTML = document.createElement("div");
        fechaHTML.className = "gasto-fecha";
        fechaHTML.innerHTML += gasto.fecha;
        gastoHTML.appendChild(fechaHTML);
        
        let valorHTML = document.createElement("div");
        valorHTML.className = "gasto-valor";
        valorHTML.innerHTML += gasto.valor;
        gastoHTML.appendChild(valorHTML);

        let etiquetasHTML = document.createElement("div");
        etiquetasHTML.className = "gasto-etiquetas";
        gastoHTML.appendChild(etiquetasHTML);
        gasto.etiquetas.forEach(etiqueta => {
            let span = document.createElement("span");
            span.className = "gasto-etiquetas-etiqueta";
            span.innerHTML = etiqueta;
            etiquetasHTML.appendChild(span);
        });

        gastoHTML.appendChild(etiquetasHTML);
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    if(idElemento != null) {
        let i = 0;
        let elemento = document.getElementById(idElemento);

        let agrupHTML = document.createElement("div");
        agrupHTML.className = "agrupacion";
            
        let titleHTML = document.createElement('h1');
        titleHTML.innerHTML = "Gastos agrupados por " + periodo;
        agrupHTML.appendChild(titleHTML);
    
        let keys = Object.keys(agrup);
        for(let actualAgroup in agrup){
            let agrupInfoHTML = document.createElement('div');
            agrupInfoHTML.className = "agrupacion-dato";
                
            let keysHTML = document.createElement('span');
            keysHTML.className = "agrupacion-dato-clave";
            keysHTML.innerHTML = keys[i];
            agrupInfoHTML.appendChild(keysHTML);
    
            let valueHTML = document.createElement('span');
            valueHTML.className = "agrupacion-dato-valor";
            valueHTML.innerHTML = agrup[actualAgroup];
            
            agrupInfoHTML.appendChild(valueHTML);
    
            agrupHTML.appendChild(agrupInfoHTML);

            i++;
        }

        elemento.appendChild(agrupHTML);
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}