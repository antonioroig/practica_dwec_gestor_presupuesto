
import * as pres from './gestionPresupuesto.js';
function mostrarDatoEnId(valor,idElemento)
{
    idElemento = document.getElementById('presupuesto');
    valor = pres.mostrarPresupuesto(idElemento);
    idElemento.innerHTML = valor;
};
function mostrarGastoWeb(gasto)
{
    pres.filtrarGastos(gasto);
    let div = document.createElement('div');
    div.className = "gasto";
    div.innerHTML =( "<div class=gasto-descripcion>"+ gasto.descripcion +"</div><div class=gasto-fecha>"+ gasto.fecha
    +"FECHA DEL GASTO</div> <div class=gasto-valor>"+ gasto.valor +"</div>")
};
function mostrarGastosAgrupadosWeb(){};
export{mostrarDatoEnId,mostrarGastoWeb,mostrarGastosAgrupadosWeb}