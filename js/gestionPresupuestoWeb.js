'use strict';
import * as gestionPresupuesto from  "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    if(idElemento != undefined)
    {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += valor;
    }
}

function mostrarGastoWeb(idElemento, gasto)
{
    if(idElemento != undefined)
    {
        let elemento=document.getElementById(idElemento);
        let divGasto = document.createElement("div");
        divGasto.className="gasto";
        elemento.append(divGasto);

        if (gasto.descripcion)
        {
            let divGastoDescripcion = document.createElement("div");
            divGastoDescripcion.className = "gasto-descripcion";
            divGastoDescripcion.innerHTML += gasto.descripcion;
            divGasto.append(divGastoDescripcion);
        }

        if(gasto.valor)
        {
            let divGastoValor = document.createElement("div");
            divGastoValor.className = "gasto-valor";
            divGastoValor.innerHTML += gasto.valor;
            divGasto.append(divGastoValor);
        }

        if (gasto.fecha)
        {
            let divGastoFecha = document.createElement("div");
            divGastoFecha.className = "gasto-fecha";
            divGastoFecha.innerHTML += gasto.fecha;
            divGasto.append(divGastoFecha);  
        }

        let divGastoEtiquetas = document.createElement("div");
        divGastoEtiquetas.className = "gasto-etiquetas";
        
        for(let i = 0; i < gasto.etiquetas.length; i++){
            let spanEtiquetas = document.createElement('span');
            spanEtiquetas.className= "gasto-etiquetas-etiqueta";
            spanEtiquetas.textContent = gasto.etiquetas[i] + " ";
            divGastoEtiquetas.append(spanEtiquetas)

            //evento borrar etiquetas practica 5
            let etBorradas = new BorrarEtiquetasHandle(gasto);
            etBorradas.gasto = gasto;
            etBorradas.etiquetas = gasto.etiquetas[i];
            spanEtiquetas.addEventListener('click',etBorradas);
        }
        
        let salto=document.createElement("br");
        divGasto.append(divGastoEtiquetas, salto);
    }

    //botones + eventos editar y borrar practica 5
    let btedit = document.createElement('button');
    btedit.type = 'button';
    btedit.className = 'gasto-editar';
    btedit.textContent = 'Editar';
    let objedit= new EditarHandle();
    objedit.gasto = gasto;
    btedit.addEventListener('click', objedit);
    divGasto.append(btedit);

    let btborrar = document.createElement('button');
    btborrar.type = 'button';
    btborrar.className = 'gasto-borrar';
    btborrar.textContent = 'Borrar';
    let objborrar = new BorrarHandle();
    objborrar.gasto = gasto;
    btborrar.addEventListener('click', objborrar);
    divGasto.append(btborrar);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let agrupDIV = document.createElement('div');
    agrupDIV.className = 'agrupacion';

    let agrupTit = document.createElement('h1');
    agrupTit.innerHTML = 'Gastos agrupados por ' + periodo;
    agrupDIV.append(agrupTit);

    for(let valor of Object.keys(agrup))
    {
        let datoDIV = document.createElement('div');
        datoDIV.className = 'agrupacion-dato';

        let datoClaveSPAN = document.createElement('span');
        datoClaveSPAN.className = 'agrupacion-dato-clave';
        datoClaveSPAN.innerHTML += `${valor}`;

        let datoValorSPAN = document.createElement('span');
        datoValorSPAN.className = 'agrupacion-dato-valor';
        datoValorSPAN.innerHTML += " " + agrup[valor] + " €";
        
        datoDIV.append(datoClaveSPAN);
        datoDIV.append(datoValorSPAN);
        agrupDIV.append(datoDIV);
    }
    elemento.append(agrupDIV);
}

function repintar()
{
   document.getElementById("presupuesto").innerHTML="";
   mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "presupuesto");

   document.getElementById("gastos-totales").innerHTML="";
   mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), "gastos-totales");

   document.getElementById("balance-total").innerHTML="";
   mostrarDatoEnId(gestionPresupuesto.calcularBalance(), "balance-total");

   document.getElementById("listado-gastos-completo").innerHTML="";

   gestionPresupuesto.listarGastos.array.forEach(element => mostrarGastoWeb("listado-gastos-completo", element));
}

function actualizarPresupuestoWeb()
{
    let presup = prompt ("introducir presupuesto:", '');
    let res= parseFloat(presup);
    gestionPresupuesto.actualizarPresupuesto(res);
    repintar();

    let actPres = document.getElementById('actualizarPresupuesto');
    actPres.addEventListener('click',actualizarPresupuestoWeb);
}



function nuevoGastoWeb()
{
    let descripcion = prompt("introducir descripcion", '');
    let valor = prompt("introducir valor", '');
    let fecha = prompt("introducir fecha", '');
    let etiquetas = prompt("introducir etiquetas", '');

    let res= parseFloat(valor);

    let gastonuevo = new gestionPresupuesto.CrearGasto(descripcion,res,fecha,etiquetas);
    gestionPresupuesto.anyadirGasto(gastonuevo);
    repintar();
}
let gastonew = document.getElementById('anyadirgasto');
gastonew.addEventListener('click',nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent = function (event)
    {
        let edFecha = promt("introducir fecha en formato internacional: ", this.gasto.fecha);
        let edvalor = prompt ("Introducir valor: ", this.gasto.valor);
        let edDesc = prompt ("Introducir descripción: ", this.gasto.descripcion);
        let edetiquetas = prompt ("Introducir etiquetas separadas por ','", this.gasto.etiquetas);
        let res = parseFloat(edvalor);

        this.gasto.etiquetas = edetiquetas.split(',');
        this.gasto.actualizarDescripcion(edDesc);
        this.gasto.actualizarFecha(edFecha);
        this.gasto.actualizarValor(res);
            
        repintar();
    }
};

function BorrarHandle()
{
    this.handleEvent = function (event)
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function (event)
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}