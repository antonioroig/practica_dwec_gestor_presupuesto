import * as gestionPresupuesto from '.gestionPresupuesto';
function mostrarDatoEnId(idElemento, valor)
{
    let element = document.getElementById(idElemento);
    element.valor = valor;
    return element;
}

function mostrarGastoWeb(idElemento,gasto)
{
    
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}