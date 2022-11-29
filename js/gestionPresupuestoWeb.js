import * as gestionPresupuesto from './gestionPresupuesto.js';

'use strict';

function mostrarDatoEnId(idElemento, valor)
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

    for(let etiqueta of gasto.etiquetas)
    {
        let spanEtiqueta = document.createElement('span');

        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        
        spanEtiqueta.textContent = " " + etiqueta;

        divEtiquetas.appendChild(spanEtiqueta);
    }

    divGasto.appendChild(divEtiquetas);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elem = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');

    divAgrupacion.className = 'agrupacion';

    let titulo = document.createElement('h1');

    titulo.textContent = `Gastos agrupados por ${periodo}`;

    divAgrupacion.appendChild(titulo);

    for(let propiedad of Object.keys(agrup))
    {
        let divDato = document.createElement('div');
        divDato.className = 'agrupacion-dato';
        divAgrupacion.appendChild(divDato);

        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent += `${propiedad}`;
        divDato.appendChild(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent += ` ${propiedad.valueOf()}`;
        divDato.appendChild(spanValor);
    }

    elem.appendChild(divAgrupacion);
}

function repintar()
{

    document.getElementById('presupuesto').textContent = '';
    gestionPresupuesto.mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());

    document.getElementById('gastos-totales').textContent = '';
    gestionPresupuesto.mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularBalance());

    document.getElementById('listado-gastos').textContent = '';
    for(let lista of gestionPresupuesto.listarGastos())
    {
        gestionPresupuesto.mostrarGastoWeb('listado-gastos', lista);
    }

    document.getElementById('listado-gastos-completo').textContent = '';
    for(let listaCompleta of gestionPresupuesto.listarGastos())
    {
        gestionPresupuesto.mostrarGastoWeb('listado-gastos-completo', listaCompleta);
    }
};

function actualizarPresupuestoWeb()
{
    let presupuesto = parseInt(prompt('Introduce un presupuesto:'));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);

    repintar();
};

let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click', actualizarPresupuestoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}