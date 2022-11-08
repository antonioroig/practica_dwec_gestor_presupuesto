import * as Presupuesto from './gestionPresupuesto';
function mostrarDatoEnId(idElemento,valor)
{
    idElemento.valor = valor;
    return valor;
}
function mostrarGastoWeb(idGasto)
{
    let res = false;
    Presupuesto.filtrarGastos().forEach(gasto => {
        if(gasto.id === idGasto)
        {
            res = gasto;
        }
    });
    return res;
}
function mostrarGastosAgrupadosWeb()
{

}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}