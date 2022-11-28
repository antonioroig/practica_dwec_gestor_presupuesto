import * as exGp from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
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
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    
    let elem = document.getElementById(idElemento);
    let padre = document.createElement("div");
    padre.className  = 'agrupacion';
    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;
    padre.appendChild(h1);

    for( let [nombre, valor] of Object.entries( agrup ))
    {
        let aux = document.createElement('div');
        aux.className = 'agrupacion-dato';
        let span1 = document.createElement('span');
        span1.className= 'agrupacion-dato-clave';
        span1.textContent = nombre;
        let span2 = document.createElement('span');
        span2.className= 'agrupacion-dato-valor';
        span2.textContent = valor;
        aux.appendChild(span1);
        aux.appendChild(span2);
        padre.appendChild(aux);
    }
    elem.appendChild(padre);
}
function repintar()
{
    /*
    document.getElementById('presupuesto').innerHTML = exGp.mostrarPresupuesto;
    document.getElementById('presupuesto').innerHTML += mostrarDatoEnId;

    document.getElementById('gastos-totales').innerHTML = exGp.calcularTotalGastos;
    document.getElementById('gastos-totales').innerHTML += mostrarDatoEnId;

    document.getElementById('balance-total').innerHTML = exGp.calcularTotalGastos;
    document.getElementById('balance-total').innerHTML += mostrarDatoEnId;*/
    document.getElementById('presupuesto').innerHTML = "";
    mostrarDatoEnId(exGp.mostrarPresupuesto, 'presupuesto');

    document.getElementById('gastos-totales').innerHTML = "";
    mostrarDatoEnId(exGp.calcularTotalGastos, 'gastos-totales');

    document.getElementById('balance-total').innerHTML = "";
    mostrarDatoEnId(exGp.calcularBalance, 'balance-total');

    document.getElementById('listado-gastos-completo').innerHTML ="";

    document.getElementById('listado-gastos-completo').innerHTML = "";
    exGp.listarGastos().forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });
}

function actualizarPresupuestoWeb()
{
    let presupuesto = prompt("Introduzca un presupuesto: ");
    presupuesto = parseFloat(presupuesto);
    exGp.actualizarPresupuesto(presupuesto);
    repintar();
}
function nuevoGastoWeb ()
{
    let descripcion = prompt("Introduzca la descripcion: ");
    let valor = prompt("introduzca el valor: ");
    valor = parseFloat(valor);
    let fecha = prompt("Introduzca la fecha: ");
    let etiqueta = prompt("Introduzca las etiquetas separadas por comas ,: ")
    let etiquetas= etiqueta.split(',');
    let nuevoGasto = new exGp.CrearGasto(descripcion,v1,fecha,...etiquetas);
    exGp.anyadirGasto(nuevoGasto);
    repintar();
}
function EditarHandle()
{
    this.handleEvent = function (event)
    {
        let descripcion = prompt("Introduzca la descripcion: ");
        let valor = prompt("introduzca el valor: ");
        valor = parseFloat(valor);
        let fecha = prompt("Introduzca la fecha: ");
        let etiqueta = prompt("Introduzca las etiquetas separadas por comas ,: ")
        let etiquetas= etiqueta.split(',');
        
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}
export   {  
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
//npm cypress open//para ejecutar el text de la practica 4//
//type module//