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
    let elem = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');

    divAgrucpacion.className = 'agrupacion';

    let titulo = document.createElement('h1');

    titulo.textContent = 'Gastos agrupados por' + periodo;

    divAgrupacion.appendChild(titulo);

    Object.getOwnPropertyNames(agrup).forEach(function(fecha)
    {
        let divDato = document.createElement('div');

        divDato.className = 'agrupacion-dato';

        divAgrupacion.appendChild(divDato);

        let spanClave = document.createElement('span');

        spanClave.className = 'agrupacion-dato-clave';

        spanClave.textContent = fecha;

        divDato.appendChild(spanClave);

        let spanValor = document.createElement('span');

        spanValor.className = 'agrupacion-dato-valor';

        spanValor.textContent = agrup[fecha];

        divDato.appendChild(spanValor);
    });

    elem.appendChild(divAgrupacion);

    return elem;
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}