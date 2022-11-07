//gestionPresupuestoWeb.js

/*
mostrarDatoEnId
mostrarGastoWeb
mostrarGastosAgrupadosWeb
*/
import * as gesP from  "./gestionPresupuesto.js";


function mostrarDatoEnId(valor, idElemento)
{
    if (idElemento != undefined)
    {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto)
{
    if (idElemento != undefined)
    {
        
        let elemento = document.getElementById(idElemento);
        let divGasto = document.createElement('div');
        divGasto.className = "gasto";
        let divGastoDescripcion = document.createElement('div');
        divGastoDescripcion.className = "gasto-descripcion";
        divGastoDescripcion.innerHTML+=gasto.descricpion;
        divGasto.append(divGastoDescripcion);

        let divGastoFecha = document.createElement('div');
        divGastoFecha.className = "gasto-fecha";
        divGastoFecha.innerHTML+=gasto.fecha;
        divGasto.append(divGastoFecha);

        let divGastoValor = document.createElement('div');
        divGastoValor.className = "gasto-valor";
        divGastoValor.innerHTML+=gasto.valor;
        divGasto.append(divGastoValor);

        let divGastoEtiquetas = document.createElement('div');
        divGastoEtiquetas.className = "gasto-etiquetas";
        
        for(let i = 0; i < gasto.etiquetas.length; i++){
            let divGastoEtiquetasEtiqueta = document.createElement('div');
            divGastoEtiquetasEtiqueta.className = "gasto-etiquetas-etiqueta";
            divGastoEtiquetasEtiqueta.innerHTML += gasto.etiquetas[i];
            divGastoEtiquetasEtiqueta.innerHTML += "</span>";
            divGastoEtiquetas.append(divGastoEtiquetasEtiqueta);
        }
        divGasto.append(divGastoEtiquetas);
        
        

    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}