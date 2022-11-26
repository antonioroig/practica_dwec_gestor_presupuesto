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
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += valor;
    }
}

function mostrarGastoWeb(gasto, idElemento){
   if(idElemento != null){
        let divGasto = document.createElement("div");
        divGasto.className = "gasto";

        let elemento = document.getElementById(idElemento);
        elemento.appendChild(divGasto);

        let divDescripcion = document.createElement("div");
        divDescripcion.className = "gasto-descripcion";
        divDescripcion.innerHTML += gasto.descripcion;
        divGasto.appendChild(divDescripcion);
        
        let divFecha = document.createElement("div");
        divFecha.className = "gasto-fecha";
        divFecha.innerHTML += gasto.fecha;
        divGasto.appendChild(divFecha);
        
        let divValor = document.createElement("div");
        divValor.className = "gasto-valor";
        divValor.innerHTML += gasto.valor;
        divGasto.appendChild(divValor);

        let divEtiquetas = document.createElement("div");
        divEtiquetas.className = "gasto-etiquetas";
        divGasto.appendChild(divEtiquetas);
        gasto.etiquetas.forEach(etiqueta => {
            let span = document.createElement("span");
            span.className = "gasto-etiquetas-etiqueta";
            span.innerHTML = etiqueta;
            divEtiquetas.appendChild(span);
        });
        divGasto.appendChild(divEtiquetas);
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);

        let divAgrup = document.createElement("div");
        divAgrup.className = "agrupacion";
            
        let tituloH1 = document.createElement('h1');
        tituloH1.innerHTML = "Gastos agrupados por " + periodo;
        divAgrup.appendChild(tituloH1);
    
        let contador = 0;
        let claves = Object.keys(agrup);
        for(let agrupCurrent in agrup){
            let divAgrupDato = document.createElement('div');
            divAgrupDato.className = "agrupacion-dato";
                
            let spanClave = document.createElement('span');
            spanClave.className = "agrupacion-dato-clave";
            spanClave.innerHTML = claves[contador];
            contador++;
            divAgrupDato.appendChild(spanClave);
    
            let spanValor = document.createElement('span');
            spanValor.className = "agrupacion-dato-valor";
            spanValor.innerHTML = agrup[agrupCurrent];
            
            divAgrupDato.appendChild(spanValor);
    
            divAgrup.appendChild(divAgrupDato);
        }
        elemento.appendChild(divAgrup);
    }
}

function repintarWeb(){
    mostrarDatoEnId(mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(calcularBalance(), "balance-total");
    mostrarDatoEnId("", "listado-gastos-completo");
    listarGastos().forEach(gasto => {
        mostrarGastoWeb(gasto, "listado-gastos-completo");
    });
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt("Introduce un presupuesto");
    if(presupuesto != null){
        presupuesto = parseFloat(presupuesto);
        actualizarPresupuesto(presupuesto);
        repintarWeb();
    }
    else{
        alert(`No es númerico`);
    }
}

function actualizarpresupuesto(){
    let presupuesto = prompt("Introduce un presupuesto");
    if(presupuesto != null){
        presupuesto = parseFloat(presupuesto);
        actualizarPresupuesto(presupuesto);
        repintarWeb();
    }
    else{
        alert(`No es númerico`);
    }
}

let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
botonActualizarPresupuesto.addEventListener("click", actualizarpresupuesto);

function nuevoGastoWeb(){
    let descripcionGasto = prompt("Introduzca una descripción");
    if(descripcionGasto != null){
        let valor = prompt("Introduzca un valor");
        if(valor != null){
            let fecha = prompt("Introduzca una fecha");
            if(fecha != null){
                let etiquetas = prompt("Introduzca las etiquetas");
                if(etiquetas != null){
                    let arrayEtiquetas = etiquetas.split(",");
                    let gastoNuevo = CrearGasto(descripcionGasto, valor, fecha, arrayEtiquetas);
                    anyadirGasto(gastoNuevo);
                    repintarWeb();
                }
                else{
                    alert(`ERROR ETIQUETAS`);
                }
            }
            else{
                alert(`ERROR FECHA ${fecha}`);
            }
        }
        else{
            alert(`ERROR VALOR ${valor}`);
        }
    }
    else{
        alert(`ERROR DESCRIPCION ${descripcionGasto}`);
    }
}

let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function anyadirgasto(){

}

function EditarHandle(){

}

function BorrarHandle(){

}

function BorrarEtiquetasHandle(){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintarWeb,
    actualizarPresupuestoWeb,
    actualizarpresupuesto
}