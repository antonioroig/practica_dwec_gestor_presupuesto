import * as gestionPresupuesto from './gestionPresupuesto.js';
"use strict";

function mostrarDatoEnId(idElemento,valor){
    let idE = document.getElementById(idElemento);
    idE.innerHTML += valor;
};

function mostrarGastoWeb(idElemento,gasto){
    let id = document.getElementById(idElemento);

    let divGastos = document.createElement('div');
    divGastos.className = 'gasto';
    id.append(divGastos);

    let divDesc = document.createElement('div');
    divDesc.className = 'gasto-descripcion';
    divDesc.textContent = gasto.descripcion;
    divGastos.append(divDesc);

    let divDate = document.createElement('div');
    divDate.className = 'gasto-fecha';
    divDate.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGastos.append(divDate);

    let divValue = document.createElement('div');
    divValue.className = 'gasto-valor';
    divValue.textContent = gasto.valor + "€";
    divGastos.append(divValue);

    let divEtiq = document.createElement('div');
    divEtiq.className = 'gasto-etiquetas';
    for(let etiqueta of gasto.etiquetas){
        let span = document.createElement('span');
        span.className = 'gasto-etiquetas-etiqueta';
        span.textContent = etiqueta;
        divEtiq.append(span);

        let etiquetaBorradas = new BorrarEtiquetasHandle(gasto);
        etiquetaBorradas.gasto = gasto;
        etiquetaBorradas.etiqueta = etiqueta;
        span.addEventListener("click", etiquetaBorradas)
    }
    divGastos.append(divEtiq);

    //Modificación de la función
    let editarBut = document.createElement('button');
    editarBut.className = 'gasto-editar';
    editarBut.type = 'button';
    editarBut.textContent = 'Editar';
    
    let editarNuevo = new EditarHandle(gasto);
    editarNuevo.gasto = gasto;

    editarBut.addEventListener("click", editarNuevo);

    divGastos.append(editarBut);

    let borrarBut = document.createElement('button');
    borrarBut.className = 'gasto-borrar';
    borrarBut.type = 'button';
    borrarBut.textContent = 'Borrar';
    
    let borrarNuevo = new BorrarHandle(gasto);
    borrarNuevo.gasto = gasto;

    borrarBut.addEventListener("click", borrarNuevo);

    divGastos.append(borrarBut);
};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let idAgrup = document.getElementById(idElemento);
    idAgrup.innerHTML = '';

    let div = `<div class="agrupacion"> <h1>Gastos agrupados por ${periodo}</h1>`;
    for(let agrupacion in agrup){
        div +=`<div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${agrupacion}</span>
                <span class="agrupacion-dato-valor">${agrup[agrupacion]}</span>
            </div>`;
    }
    div += '</div>';
    idAgrup.innerHTML = div;
};

function repintar(){
    //Mostrar presupuesto en div#presupuesto
    document.getElementById("presupuesto").innerHTML = "";
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    //Mostrar gastos totales en div#gastos-totales
    document.getElementById("gastos-totales".innerHTML) = "";
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    //Mostrar el balance total en div#balance-total
    document.getElementById("balance-total".innerHTML) = "";
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    //Borrar el contenido de div#listado-gastos-completo
    document.getElementById("listado-gastos-completo").innerHTML = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo
    document.getElementById("listado-gastos-completo").innerHTML = "";
    mostrarGastoWeb("listado-gastos-completo", gestionPresupuesto.listarGastos());
};

function actualizarPresupuestoWeb(){
    //Pedir al usuario que introduzca un presupuesto
    let pres = prompt("Introduce un presupuesto");
    //Convertir el valor a número
    pres = parseInt(pres);
    //Actualizar el presupuesto
    gestionPresupuesto.actualizarPresupuesto(pres);
    //Llamar a la función repintar
    repintar();
};

//Botón actualizar presupuesto
document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descripcion = prompt("Introduce una descripción:");
    let valor = parseFloat(prompt("Introduce un valor:"));
    let fecha = Date.parse(prompt("Introduce la fecha:"));
    let etiquetas = prompt("Introduce las etiquetas:".split(','));

    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas));

    repintar();
};

//Botón añadir gasto
document.getElementById("anyadirgasto").addEventListener("click",gestionPresupuesto.anyadirGasto)

function EditarHandle(){
    this.handleEvent = function(){
        let valor = parseFloat(prompt("Introduce un valor:"));
        let descripcion = prompt("Introduce una descripción:");
        let fecha = Date.parse(prompt("Introduce la fecha:"));
        let etiquetas = prompt("Introduce las etiquetas:".split(','));
        
        this.gasto = gestionPresupuesto.actualizarValor(valor);
        this.gasto = gestionPresupuesto.actualizarDescripcion(descripcion);
        this.gasto = gestionPresupuesto.actualizarFecha(fecha);
        this.gasto = gestionPresupuesto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
};

function BorrarHandle(){
    this.handleEvent = function(){
        this.gasto = gestionPresupuesto.borrarGasto(id);

        repintar();
    }
};

function BorrarEtiquetasHandle(){
    this.handleEvent = function(){
        this.gasto = gestionPresupuesto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
};



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
};