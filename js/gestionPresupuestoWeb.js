import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento)
{
    let elem = document.getElementById(idElemento);
    elem.innerHTML += valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elem = document.getElementById(idElemento);

    let divGasto = document.createElement('div');

    divGasto.className = 'gasto';

    elem.appendChild(divGasto);

    let divDescripcion = document.createElement('div');

    divDescripcion.className = 'gasto-descripcion';

    divDescripcion.textContent = gasto.descripcion;

    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement('div');

    divFecha.className = 'gasto-fecha';

    divFecha.textContent = gasto.fecha;

    divGasto.appendChild(divFecha);

    let divValor = document.createElement('div');

    divValor.className = 'gasto-valor';

    divValor.textContent = gasto.valor;

    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement('div');

    divEtiquetas.className = 'gasto-etiquetas';

    for(let i = 0; i <= gasto.etiquetas.length; i++)
    {
        let spanEtiqueta = document.createElement('span');

        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        
        spanEtiqueta.textContent = gasto.etiquetas[i];

        divEtiquetas.appendChild(spanEtiqueta);
    }

    divEtiquetas.appendChild(divEtiquetas);

    return elem;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}