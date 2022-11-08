
import * as pres from './gestionPresupuesto.js';
function mostrarDatoEnId(valor,idElemento)
{
    let id = document.getElementById(idElemento);
    id.innerHTML = valor;
};
function mostrarGastoWeb(){};
function mostrarGastosAgrupadosWeb(){};
export{mostrarDatoEnId,mostrarGastoWeb,mostrarGastosAgrupadosWeb}