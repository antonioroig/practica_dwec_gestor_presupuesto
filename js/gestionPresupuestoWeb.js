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

    if(idElemento != undefined)
    {

        let elemento = document.getElementById(idElemento);
        let divGasto = document.createElement('div');

        divGasto.className = "gasto";


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
        elemento.append(divGasto);

    }

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

export{

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb

}