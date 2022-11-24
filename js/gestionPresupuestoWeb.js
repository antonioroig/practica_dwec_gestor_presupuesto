import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento)
{
    gestionPresupuesto.actualizarPresupuesto(valor);
    document.getElementById(idElemento).innerHTML = gestionPresupuesto.mostrarPresupuesto();
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elem = document.getElementById(idElemento);

    let divGasto = document.createElement('div');

    divGasto.className = 'gasto';

    let divDescripcion = document.createElement('div');

    divDescripcion.className = 'gasto-descripcion';

    divDescripcion.innerHTML = gasto.descripcion;

    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement('div');

    divFecha.className = 'gasto-fecha';

    divFecha.innerHTML = gasto.fecha;

    divGasto.appendChild(divFecha);

    let divValor = document.createElement('div');

    divValor.className = 'gasto-valor';

    divValor.innerHTML = gasto.valor;

    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement('div');

    divEtiquetas.className = 'gasto-etiquetas';

    for(let i = 0; i <= gasto.etiquetas.length; i++)
    {
        let spanEtiqueta = document.createElement('span');

        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        
        spanEtiqueta.innerHTML = gasto.etiquetas[i];

        divEtiquetas.appendChild(spanEtiqueta);
    }



    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}