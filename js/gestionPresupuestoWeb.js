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
function mostrarGastoWeb(gasto, idElemento)
{
    let elem = document.getElementById(idElemento);
    let padre = document.createElement("div");
    padre.className  = "gasto";

    let gastDes = document.createElement("div");
    gastDes. className = "gasto-descripcion";
    gastDes.textContent = gasto.descripcion;
    padre.appendChild(gastDes);

    let gastFech = document.createElement("div");
    gastFech. className = "gasto-fecha";
    gastFech.textContent = new Date(gasto.fecha).toLocaleDateString();
    padre.appendChild(gastFech);

    let gastVal = document.createElement("div");
    gastVal. className = "gasto-valor";
    gastVal.textContent = gasto.valor;
    padre.appendChild(gastVal);

    let gastEtiq = document.createElement("div");
    gastEtiq. className = "gasto-etiquetas";
    gasto.etiquetas.forEach(etiqueta => {
        let etiq = document.createElement('span');
        etiq.className = 'gasto-etiquetas-etiqueta';
        etiq.textContent = etiqueta;
        gastEtiq.appendChild(etiq);
    });
    /*
    for (let i = 0; i < gasto.etiquetas.length; i++)
    {
        let etiq = document.createElement('span');
        etiq.className = 'gasto-etiquetas-etiqueta';
        etiq.textContent = etiqueta;
        gastEtiq.appendChild(etiq);
    }  */      
    padre.appendChild(gastEtiq);
    elem.appendChild(padre);
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