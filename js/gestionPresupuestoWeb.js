import * as gasto from "./gestionPresupuesto";

function mostrarDatoEnId(id, valor)
{

    if (id != undefined)
    {
        let elemento = document.getElementById(id);
        elemento.innerHTML += " " + valor;
    }

}

function mostrarGastoWeb(id, gasto)
{

    if(id = undefined)
    {

        let documento = document.getElementById(id);
        let gastoDiv = document.createElement('div');

        gastoDiv.className = "gasto";


        let divDescripcionPorGasto = document.createElement('div');

        divDescripcionPorGasto.className = "gasto-descripcion";
        divDescripcionPorGasto.innerHTML += gasto.descripcion;

        gastoDiv.append(divDescripcionPorGasto);


        let divFechaPorGasto = document.createElement('div');

        divFechaPorGasto.className = "gasto-fecha";
        divFechaPorGasto.innerHTML += gasto.fecha;

        gastoDiv.append(divFechaPorGasto);


        let divValorPorGasto = document.createElement('div');

        divValorPorGasto.className = "gasto-valor";
        divValorPorGasto.innerHTML += gasto.valor;

        gastoDiv.append(divValorPorGasto);


        let divEtiquetaPorGasto = document.createElement('div');

        for(let i = 0; i < gasto.etiquetas.length; i++)
        {

            let divEtiquetaNuevaGasto = document.createElement('span');

            divEtiquetaNuevaGasto.className = "gasto-etiquetas-etiqueta";
            divEtiquetaNuevaGasto.innerHTML += gasto.etiquetas[i];

            gastoDiv.append(divEtiquetaNuevaGasto);

        }
        gastoDiv.append(divEtiquetaPorGasto);
        documento.append(gastoDiv)

    }

}

function mostrarGastosAgrupadosWeb(idElement, agrupar, period)
{

        if(idElement != undefined)
        {

            let id = document.getElementById(idElement);

            let agrupacionDiv = document.createElement('div');

            agrupacionDiv.className = "agrupación";

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

export{

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb

}