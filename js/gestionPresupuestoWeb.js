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
function mostrarGastoWeb(idElemento, {descripcion, valor, fecha, ...etiquetas}){

    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        
        let divGasto = document.createElement("div");
            divGasto.className = "gasto";
            elemento.appendChild(divGasto);
        if(descripcion){
            let divGastoDescripcion = document.createElement("div");
                divGastoDescripcion.className = "gasto-descripcion";
                divGastoDescripcion.innerHTML += descripcion;
                divGasto.appendChild(divGastoDescripcion);
        }
        if(valor){
            let divGastoFecha = document.createElement("div");
                divGastoFecha.className = "gasto-fecha";
                divGastoFecha.innerHTML += fecha;
                divGasto.appendChild(divGastoFecha);
        }
        if(fecha){
            let divGastoValor = document.createElement("div");
                divGastoValor.className = "gasto-valor";
                divGastoValor.innerHTML += valor;
                divGasto.appendChild(divGastoValor);
        }
        if(etiquetas){
            let divGastoEtiquetas = document.createElement("div");
                divGastoEtiquetas.className = "gasto-etiquetas";
                divGasto.appendChild(divGastoEtiquetas);
                for(let i = 0; i < etiquetas.lenght; i++ ){
                    console.log(etiquetas.lenght)
                    let spanEtiqueta = document.createElement("span");
                    spanEtiqueta.className = "gasto-etiquetas-etiqueta";
                    spanEtiqueta.innerHTML += etiquetas[i];
                    divGastoEtiquetas.appendChild(spanEtiqueta);
                }
        }
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
                for(const property in agrup){
                    let divAgrup = document.createElement("div");
                        divAgrup.className = "agrupacion-dato";
                        divAgrupacion.appendChild(divAgrup);
                    let spanAgrupClave = document.createElement("span");
                        spanAgrupClave.className = "agrupacion-dato-clave";
                        spanAgrupClave.innerHTML += property;
                    let spanAgrupValor = document.createElement("span");
                        spanAgrupValor.className = "agrupacion-dato-valor";
                        spanAgrupValor.innerHTML += agrup[property];
                }

                /*
                for...in
                */
        }
    }

}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}