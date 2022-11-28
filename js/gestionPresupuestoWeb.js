import * as gestionPresupuesto from './gestionPresupuesto.js';

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
    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(gestionPresupuesto.calcularBalance(), "balance-total");
    mostrarDatoEnId("", "listado-gastos-completo");

    gestionPresupuesto.listarGastos().forEach(gasto =>{
        mostrarGastoWeb(gasto, "listado-gastos-completo");
    });
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt("Introduce un presupuesto");
    if(presupuesto != null){
        presupuesto = parseFloat(presupuesto);
        gestionPresupuesto.actualizarPresupuesto(presupuesto);
        repintarWeb();
    }
    else{
        alert(`No es númerico`);
    }
}

let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descripcionGasto = prompt("Introduzca una descripción");
    let valor = prompt("Introduzca un valor");
    let fecha = prompt("Introduzca una fecha");
    let etiquetas = prompt("Introduzca las etiquetas");
    let arrayEtiquetas = etiquetas.split(",");
    let nuevoGastoWeb = new gestionPresupuesto.CrearGasto(descripcionGasto, valor, fecha, arrayEtiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGastoWeb);
    repintarWeb();
}

let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(gasto){
    this.gasto = gasto;
    this.handleEvent = function(){
        let descripcionGasto = prompt("Introduzca una descripcion", "");
        if(descripcionGasto){
            gasto.actualizarDescripcion(descripcionGasto);
        }
        let valor = parseFloat(prompt("Introduzca un valor", 100));
        if(valor){
            gasto.actualizarValor(valor);
        }
        let fecha = new Date(prompt("Introduzca una fecha", "2000-01-21"));
        if(fecha){
            gasto.actualizarFecha(fecha);
        }
        let etiquetas = prompt("Introduzca las etiquetas","");
        let arrayEtiquetas = [];
        if(etiquetas){
            arrayEtiquetas = etiquetas.split(',');
            gasto.anyadirEtiquetas(arrayEtiquetas);
        }
        repintarWeb();
    }
}

function BorrarHandle(gasto){
    this.gasto = gasto;
    this.handleEvent = function(){
        gestionPresupuesto.borrarGasto(this.gasto.idElemento);
        repintarWeb();
    }
}

function BorrarEtiquetasHandle(gasto, etiqueta){
    this.gasto = gasto;
    this.etiqueta = etiqueta
    this.handleEvent = function(){
        this.gasto.gestionPresupuesto.borrarEtiquetas(this.etiqueta);
        repintarWeb();
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintarWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}