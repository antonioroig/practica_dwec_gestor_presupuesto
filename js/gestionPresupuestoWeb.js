'use strict';

import * as gesPresupuesto from "./gestionPresupuesto.js";

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

        let divGasto = document.createElement('div');
        let elemento = document.getElementById(idElemento);

        divGasto.className = "gasto";

        elemento.append(divGasto);
        

        let divDescripcionPorGasto = document.createElement('div');

        divDescripcionPorGasto.className = "gasto-descripcion";
        divDescripcionPorGasto.innerHTML += gasto.descripcion;

        divGasto.append(divDescripcionPorGasto);


        let divFechaPorGasto = document.createElement('div');

        divFechaPorGasto.className = "gasto-fecha";
        divFechaPorGasto.innerHTML += gasto.fecha;

        divGasto.append(divFechaPorGasto);


        let divValorPorGasto = document.createElement('div');

        divValorPorGasto.className = "gasto-valor";
        divValorPorGasto.innerHTML += gasto.valor;

        divGasto.append(divValorPorGasto);


        let divEtiquetaPorGasto = document.createElement('div');
        divEtiquetaPorGasto.className = "gasto-etiquetas";

        for(let i = 0; i < gasto.etiquetas.length; i++)
        {

            let divEtiquetaNuevaGasto = document.createElement('span');

            divEtiquetaNuevaGasto.className = "gasto-etiquetas-etiqueta";
            divEtiquetaNuevaGasto.innerHTML += gasto.etiquetas[i];

            divEtiquetaPorGasto.append(divEtiquetaNuevaGasto);

        }
        divGasto.append(divEtiquetaPorGasto);

    }

function mostrarGastosAgrupadosWeb(idElemento, agrupar, periodo)
{

        if(idElemento != undefined)
        {

            let id = document.getElementById(idElemento);

            let agrupacionDiv = document.createElement('div');

            agrupacionDiv.className = "agrupacion";

            let h1Div = document.createElement('h1');

            h1Div.innerHTML += `Gastos agrupados por ${periodo}`;
            agrupacionDiv.append(h1Div);

            for(let llave of Object.keys(agrupar))
            {

                let divDatoAgrupado = document.createElement('div');
                divDatoAgrupado.className = "agrupacion-dato";

                let spanDatoAgrupado = document.createElement('span');
                spanDatoAgrupado.className = "agrupacion-dato-clave";

                spanDatoAgrupado.innerHTML += `${llave}`;

                let spanValorDatoAgrupado = document.createElement('span');
                spanValorDatoAgrupado.className = "agrupacion-dato-valor";

                spanValorDatoAgrupado.innerHTML += `${llave.valueOf()}`;

                agrupacionDiv.append(divDatoAgrupado);
                divDatoAgrupado.append(spanDatoAgrupado);
                divDatoAgrupado.append(spanValorDatoAgrupado);

            }

            id.append(agrupacionDiv);

            return id;

        }

}

function repintar()
{

    document.getElementById('presupuesto').innerHTML = "";
    mostrarDatoEnId(gesPresupuesto.mostrarPresupuesto("presupuesto"));

    document.getElementById('gastos-totales').innerHTML = "";
    mostrarDatoEnId(gesPresupuesto.mostrarPresupuesto("gastos-totales"));

    document.getElementById('balance-total').innerHTML = "";
    mostrarDatoEnId(gesPresupuesto.mostrarPresupuesto("balance-total"));
    
    document.getElementById('listado-gastos-completo').innerHTML = "";
    for(let gastos of gesPresupuesto.listarGastos())
    {

        mostrarGastoWeb("listado-gastos-completo", gastos)

    }

}

function nuevoGastoWeb()
{

    let descripcion = prompt("introduce una descripcion");

    let strValor = prompt("introduce un valor de el gasto");

    let valor = parseFloat(strValor);

    let date = prompt("introduce una fecha (formato yyy-mm-dd)");

    let etiquetas = prompt("introduce las etiquetas para el gasto (formato etiq1 qtiq2 etiq3)");

    let etiquetasarray = etiquetas.split(',');

    let crearGasto = new gesPresupuesto.CrearGasto(descripcion, valor, date, etiquetasarray);

    gesPresupuesto.anyadirGasto(crearGasto);

    repintar();

}

function actualizarPresupuestoWeb()
{

    let question = prompt("introduce un presupuesto");
    
    let questionFloat = parseFloat(question);

    gesPresupuesto.actualizarPresupuesto(questionFloat);

    repintar();

}

function EditarHandle()
{

    this.handleEvent = function()
    {

        let descripcion = prompt("introduce una descripcion");

        let strValor = prompt("introduce un valor de el gasto");

        let valor = parseFloat(strValor);

        let date = prompt("introduce una fecha (formato yyy-mm-dd)");

        let etiquetas = prompt("introduce las etiquetas para el gasto (formato etiq1 qtiq2 etiq3)");

        let etiquetasarray = etiquetas.split(',');

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(date);
        this.gasto.anyadirEtiquetas(etiquetas);

        repintar();

    }

}

function BorrarHandle()
{

    this.handleEvent = function()
    {

        gesPresupuesto.borrarGasto(this.gasto.id);
        
        repintar();

    }

}

function borrarEtiquetasHandle()
{

    this.handleEvent = function()
    {

        this.gasto.borrarEtiquetas(this.etiquetas)

        repintar();

    }

}


export{

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,

}