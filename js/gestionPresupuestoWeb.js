import * as gestionP from  "./gestionPresupuesto.js";

function mostrarDatoEnId(valor, idElemento)
{
    if (idElemento != undefined)
    {
        let element = document.getElementById(idElemento);
        element.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto)
{
    if (idElemento != undefined)
    {
        
        let element = document.getElementById(idElemento);
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
        
        for(let i = 0; i < gasto.etiquetas.length; i++)
        {
            let divGastoEtiquetasEtiqueta = document.createElement('span');
            divGastoEtiquetasEtiqueta.className = "gasto-etiquetas-etiqueta";
            divGastoEtiquetasEtiqueta.innerHTML = gasto.etiquetas[i];
            divGastoEtiquetas.append(divGastoEtiquetasEtiqueta);
        }

        divGasto.append(divGastoEtiquetas);
        element.append(divGasto);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    if (idElemento != undefined)
    {
        let id = document.getElementById(idElemento);
        
        let divAgrupacion = document.createElement('div');
        divAgrupacion.className = "agrupacion";

        let divH1 = document.createElement('h1');
        divH1.innerHTML += `Gastos agrupados por ${periodo}`;
        divAgrupacion.append(divH1);

        for(let key of Object.keys(agrup))
        {
            let divAgrupacionDato = document.createElement('div');
            divAgrupacionDato.className = "agrupacion-dato";

            let spanAgrupacionDatoClave = document.createElement('span');
            spanAgrupacionDatoClave.className = "agrupacion-dato-clave";
            spanAgrupacionDatoClave.innerHTML += `${key}`;

            let spanAgrupacionDatoValor = document.createElement('span');
            spanAgrupacionDatoValor.className = "agrupacion-dato-valor";
            spanAgrupacionDatoValor.innerHTML += `${key.valueOf()}`;

            divAgrupacion.append(divAgrupacionDato);
            divAgrupacionDato.append(spanAgrupacionDatoClave);
            divAgrupacionDato.append(spanAgrupacionDatoValor);
        }

        id.append(divAgrupacion)
        return id;
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}