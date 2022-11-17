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
                for(let i = 0; i < gasto.etiquetas.lenght; i++ ){
                    let spanEtiqueta = document.createElement("span");
                    spanEtiqueta.className = "gasto-etiquetas-etiqueta";
                    spanEtiqueta.innerHTML = gasto.etiquetas[i];
                    divGastoEtiquetas.appendChild(spanEtiqueta);
                }
                divGasto.appendChild(divGastoEtiquetas);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);

        let divAgrupacion = document.createElement("div");
            divAgrupacion.className = "agrupacion";
            elemento.appendChild(divAgrupacion);

        if(periodo){
            let titPeriodo = document.createElement("h1");
                titPeriodo.innerHTML += "Gastos agrupados por " + periodo;
                divAgrupacion.appendChild(titPeriodo);
        }
        if(agrup){
                let keys = Object.keys(agrup);
                let i = 0;
                for(let property in agrup){
                    let divAgrup = document.createElement("div");
                        divAgrup.className = "agrupacion-dato";
                    let spanAgrupClave = document.createElement("span");
                        spanAgrupClave.className = "agrupacion-dato-clave";
                        spanAgrupClave.innerHTML += keys[i];
                        divAgrup.appendChild(spanAgrupClave);
                    let spanAgrupValor = document.createElement("span");
                        spanAgrupValor.className = "agrupacion-dato-valor";
                        spanAgrupValor.innerHTML += agrup[property];
                        divAgrup.appendChild(spanAgrupValor);
                    
                    divAgrupacion.appendChild(divAgrup);
                    i++;
                }
        }
    }

}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}