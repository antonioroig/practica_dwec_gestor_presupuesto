import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId (valor, idElemento)
{
    let dato;

    if (idElemento !== undefined)
    {
        dato = document.getElementById(idElemento);
        dato.innerHTML += "" + valor;
    }
}

function mostrarGastoWeb (idElemento, gasto)
{
    let dato;
    if (idElemento !== undefined)
    {
        dato = document.getElementById(idElemento);

        let divGasto = document.createElement('div');
        divGasto.className = "gasto";

        let divGastoDesc = document.createElement('div');
        divGastoDesc.className = "gasto-Descripción";
        divGastoDesc.innerHTML += gasto.descripcion;
        divGasto.append(divGastoDesc);

        let divGastoFecha = document.createElement('div');
        divGastoFecha.className = "gasto-Fecha";
        divGastoFecha.innerHTML += gasto.fecha;
        divGasto.append(divGastoFecha);

        let divGastoValor = document.createElement('div');
        divGastoValor.className = "gasto-Valor";
        divGastoValor.innerHTML += gasto.valor;
        divGasto.append(divGastoValor);

        let divGastoEt = document.createElement('div');
        divGastoEt.className = "gasto-Etiqueta";

        for (let i = 0; i < gasto.etiquetas.length; i++)
        {
            let divGastoEtiquetas = document.createElement('span');
            divGastoEtiquetas.className = "gasto-Etiquetas";
            divGastoEtiquetas.innerHTML += gasto.etiquetas[i];
            divGastoEt.append(divGastoEtiquetas);
        }

        divGasto.append(divGastoEt);
        
        dato.append(divGasto);
    }
}

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo)
{

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}