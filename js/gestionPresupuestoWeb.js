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

        let elemento = document.getElementById(idElemento);
        let divGasto = document.createElement('div');

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

        for(let etiquetas of gasto.etiquetas)
        {

            let divEtiquetaNuevaGasto = document.createElement('span');

            divEtiquetaNuevaGasto.className = "gasto-etiquetas-etiqueta";
            
            divEtiquetaNuevaGasto.innerHTML = etiquetas;
            divGasto.append(divEtiquetaPorGasto);

        }
        elemento.append(divEtiquetaPorGasto);

        let btnEditar = document.createElement("button");

        btnEditar.className = "gasto-editar";

        btnEditar.type = "button";

        btnEditar.innerHTML += "Editar";


        let editarHandleBtn = new EditarHandle();

        editarHandleBtn.gasto = gasto;

        btnEditar.addEventListener("click", editarHandleBtn);

        divGasto.append(btnEditar);


        let btnBorrar = document.createElement("button");

        btnEditar.className = "gasto-borrar";

        btnEditar.type = "button";

        btnEditar.innerHTML += "Borrar";


        let borrarHandleBtn = new BorrarHandle();

        borrarHandleBtn.gasto = gasto;

        btnEditar.addEventListener("click", borrarHandleBtn);

        divGasto.append(btnBorrar);

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

    document.getElementById('presupuesto');
    mostrarDatoEnId("presupuesto",gesPresupuesto.mostrarPresupuesto);

    document.getElementById('gastos-totales');
    mostrarDatoEnId("gastos-totales",gesPresupuesto.calcularTotalGastos);

    document.getElementById('balance-total');
    mostrarDatoEnId("balance-total",gesPresupuesto.calcularBalance);
    
    document.getElementById('listado-gastos-completo').innerHTML = "";

    for(let gastos of gesPresupuesto.listarGastos())
    {

        mostrarGastoWeb("listado-gastos-completo", gastos)

    }

}

function actualizarPresupuestoWeb()
{

    let question = prompt("introduce un presupuesto");
    
    let questionFloat = parseFloat(question);

    gesPresupuesto.actualizarPresupuesto(questionFloat);

    repintar();

}

let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
btnActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb()
{

    let descripcion = prompt("introduce una descripcion");

    let strValor = prompt("introduce un valor de el gasto");

    let valor = parseFloat(strValor);

    let date = prompt("introduce una fecha (formato yyy-mm-dd)");

    let fecha = Date.parse(date);

    let etiquetasarray = prompt('Etiquetas:').split(',');

    let crearGasto = new gesPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetasarray);

    gesPresupuesto.anyadirGasto(crearGasto);

    repintar();

}

let btnAddGasto = document.getElementById('anyadirgasto');
btnAddGasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle()
{

    this.handleEvent = function(array)
    {

        let descripcion = prompt("introduce una descripcion");

        let strValor = prompt("introduce un valor de el gasto");

        let valor = parseFloat(strValor);

        let date = prompt("introduce una fecha (formato yyy-mm-dd)");
        
        let fecha = Date.parse(date);

        let etiquetasarray = prompt('Etiquetas: Separador " , "').split(',');

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetasarray);

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

function BorrarEtiquetasHandle()
{

    this.handleEvent = function()
    {

        this.gasto.borrarEtiquetas(this.etiquetas)

        repintar();

    }

}

actualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb);

anyadirgasto.addEventListener("click", nuevoGastoWeb);

export{

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle

}