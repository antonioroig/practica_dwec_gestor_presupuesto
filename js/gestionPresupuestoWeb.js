//gestionPresupuestoWeb.js

/*
mostrarDatoEnId
mostrarGastoWeb
mostrarGastosAgrupadosWeb
*/
import * as gesP from  "./gestionPresupuesto";
function mostrarDatoEnId(valor, idElemento)
{
    let elemento = gesP.getElementById(idElemento);
    elemento.innerHTML += valor;
    return elemento;
}
function mostrarGastoWeb(idElemento, gasto)
{

}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}