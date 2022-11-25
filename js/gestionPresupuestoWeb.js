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
function mostrarGastoWeb(idElemento, gasto){

    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        
        let divGasto = document.createElement("div");
            divGasto.className = "gasto";
            elemento.appendChild(divGasto);

        if(gasto.descripcion){
            let divGastoDescripcion = document.createElement("div");
                divGastoDescripcion.className = "gasto-descripcion";
                divGastoDescripcion.innerHTML += gasto.descripcion;
                divGasto.appendChild(divGastoDescripcion);
        }
        if(gasto.valor){
            let divGastoFecha = document.createElement("div");
                divGastoFecha.className = "gasto-fecha";
                divGastoFecha.innerHTML += gasto.fecha;
                divGasto.appendChild(divGastoFecha);
        }
        if(gasto.fecha){
            let divGastoValor = document.createElement("div");
                divGastoValor.className = "gasto-valor";
                divGastoValor.innerHTML += gasto.valor;
                divGasto.appendChild(divGastoValor);
        }
        let divGastoEtiquetas = document.createElement("div");
            divGastoEtiquetas.className = "gasto-etiquetas";
            
            gasto.etiquetas.forEach(etiqueta => {
                var spanEtiqueta = document.createElement('span');
                spanEtiqueta.className="gasto-etiquetas-etiqueta";
                spanEtiqueta.innerHTML = etiqueta;
                divGastoEtiquetas.appendChild(spanEtiqueta);
            });
            divGasto.appendChild(divGastoEtiquetas);
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
    
        let divAgrupacion = document.createElement("div");
            divAgrupacion.className = "agrupacion";

        if(periodo){
            let titPeriodo = document.createElement("h1");
                titPeriodo.innerHTML += "Gastos agrupados por " + periodo;
                divAgrupacion.appendChild(titPeriodo);
        }

        if(agrup){
            for(let property in agrup){
                var divAgrup = document.createElement('div');
                divAgrup.className = "agrupacion-dato";
                
                var spanAgrupClave = document.createElement('span');
                spanAgrupClave.className = "agrupacion-dato-clave";
                spanAgrupClave.innerHTML += property;
                divAgrup.appendChild(spanAgrupClave);
    
                var spanAgrupValor = document.createElement('span');
                spanAgrupValor.className = "agrupacion-dato-valor";
                spanAgrupValor.innerHTML += agrup[property];
                divAgrup.appendChild(spanAgrupValor);

                divAgrupacion.appendChild(divAgrup);
            }
        }
        elemento.appendChild(divAgrupacion);
    }

}
function repintar(){
    mostrarDatoEnId(mostrarPresupuesto(),"presupuesto");
    mostrarDatoEnId(calcularTotalGastos(),"gastos-totales");
    mostrarDatoEnId(calcularBalance(),"balance-total");
    mostrarDatoEnId("","listado-gastos-completo");
    //let elemento = document.getElementById("listado-gastos-completo");
    //elemento.innerHTML = "";
    listarGastos().forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo",gasto); 
    });
}

function actualizarPresupuestoWeb(){
    let presupuesto = Number(prompt("Introduzca un nuevo presupuesto", 100));
    actualizarPresupuesto(presupuesto);
    repintar()
}

let btnPresupuesto = document.getElementById("actualizarpresupuesto");
btnPresupuesto.addEventListener("click", actualizarPresupuestoWeb()) 

function nuevoGastoWeb(){
    let descripcion = prompt("Introduzca una descripcion", "");
    let valor = Number(prompt("Introduzca un valor", 100));
    let fecha = new Date(prompt("Introduzca una fecha", "2000-01-21"));
    let etiquetas = prompt("Introduzca las etiquetas","");
    let arrEtiquetas = [];
    if(etiquetas){
        arrEtiquetas = etiquetas.split(',');
    }

    anyadirGasto(new CrearGasto(descripcion, valor, fecha, ...arrEtiquetas))
    repintar();
}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb()) 

function EditarHandle(gasto){
    this.gasto = gasto;
    this.handleEvent = function(){
        let descripcion = prompt("Introduzca una descripcion", "");
        if(descripcion){
            gasto.actualizarDescripcion(descripcion);
        }
        let valor = Number(prompt("Introduzca un valor", 100));
        if(valor){
            gasto.actualizarValor(valor);
        }
        let fecha = new Date(prompt("Introduzca una fecha", "2000-01-21"));
        if(fecha){
            gasto.actualizarFecha(fecha);
        }
        let etiquetas = prompt("Introduzca las etiquetas","");
        let arrEtiquetas = [];
        if(etiquetas){
            arrEtiquetas = etiquetas.split(',');
            gasto.anyadirEtiquetas(arrEtiquetas);
        }
        repintar();
    }
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}