import * as exGp from './gestionPresupuesto.js';
function mostrarDatoEnId(valor, idElemento)
{
    let elem = document.getElementById(idElemento);
    //elem.innerHTML += valor;
    let p = document.createElement("p");
    //let pTexto = document.createTextNode(valor);
    //p.appendChild(pTexto);
    p.textContent = valor;
    elem.appendChild(p);
}
function mostrarGastoWeb(idElemento, gasto)
{
    let elem = document.getElementById(idElemento);
    let padre = document.createElement("div");
    padre.className  = "gasto";

    let gastDes = document.createElement("div");
    gastDes. className = "gasto-descripcion";
    gastDes.textContent = gasto.descripcion;
    padre.appendChild(gastDes);

    let gastFech = document.createElement("div");
    gastDes. className = "gasto-fecha";
    gastDes.textContent = new Date(gasto.fecha).toLocaleDateString();
    padre.appendChild(gastDes);


}
function mostrarGastosAgrupadosWeb()
{
    
}
export   {  
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
//npm cypress open//para ejecutar el text de la practica 4//
//type module//