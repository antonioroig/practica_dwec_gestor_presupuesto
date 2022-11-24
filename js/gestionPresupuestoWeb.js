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
    if (idElemento != undefined && idElemento != null)
    {
        
        let element = document.getElementById(idElemento);
        let divGasto = document.createElement('div');
        divGasto.className = "gasto";

        let gastoDescripcion = document.createElement('div');
        gastoDescripcion.className = "gasto-descripcion";
        gastoDescripcion.innerHTML += gasto.descricpion;
        divGasto.append(gastoDescripcion);

        let gastoFecha = document.createElement('div');
        gastoFecha.className = "gasto-fecha";
        gastoFecha.innerHTML += gasto.fecha;
        divGasto.append(gastoFecha);

        let gastoValor = document.createElement('div');
        gastoValor.className = "gasto-valor";
        gastoValor.innerHTML += gasto.valor + '€';
        divGasto.append(gastoValor);

        let gastoEtiqueta = document.createElement('div');
        gastoEtiqueta.className = "gasto-etiquetas";
        
        for(let i = 0; i < gasto.etiquetas.length; i++)
        {
            let gastoEtiquetas= document.createElement('span');
            gastoEtiquetas.className = "gasto-etiquetas-etiqueta";
            gastoEtiquetas.innerHTML = gasto.etiquetas[i];
            gastoEtiqueta.append(gastoEtiquetas);
        }

        divGasto.append(gastoEtiqueta);
        
        element.append(divGasto);

        return divGasto;
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento)
{
    if (idElemento != undefined && idElemento != null)
    {
        let i = 0;
        let id = document.getElementById(idElemento);
        
        let divAgrup = document.createElement('div');
        divAgrup.className = "agrupacion";

        let titulo = document.createElement('h1');
        titulo.innerHTML = "Gastos agrrupados por " + periodo;
        divAgrup.append(titulo);

        let key = Object.keys(agrup);

        for(let agrupacion in agrup)
        {
            let divAgrupDato = document.createElement('div');
            divAgrupDato.className = "agrupacion-dato";

            let agrupDC = document.createElement('span');
            agrupDC.className = "agrupacion-dato-clave";
            agrupDC.innerHTML = key[i];
            divAgrupDato.append(agrupDC);

            let spanAgrupDV = document.createElement('span');
            spanAgrupDV.className = "agrupacion-dato-valor";
            spanAgrupDV.innerHTML = agrup [agrupacion];

            divAgrupDato.append(spanAgrupDV);
            divAgrup.append(divAgrupDato);

            i++;
        }

        id.append(divAgrup);
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}