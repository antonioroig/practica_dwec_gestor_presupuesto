import * as gp from './gestionPresupuesto.js';


function repintar(){
    mostrarDatoEnId(gp.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(gp.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(gp.calcularBalance(), "balance-total");
    
    let actLista = document.getElementById("listado-gastos-completo");
    actLista.innerHTML='';

    gp.listarGastos().forEach(gasto => {
        mostrarGastoWeb(gasto, "listado-gastos-completo");
    });
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt("Introduzca presupuesto");
    if(presupuesto != null){
        presupuesto = parseFloat(presupuesto);
        gp.actualizarPresupuesto(presupuesto);
        repintar();
    }
    else{
        alert("El valor introducido no es valido");
    }
}

let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
btnActualizarPresupuesto.onclick = actualizarPresupuestoWeb;

function nuevoGastoWeb(){
    let descripcion = prompt("Introduzca la descripcion");
    let valor = parseFloat(prompt("Introduzca el valor"));
    let fecha = prompt("Introduzca la fecha");
    let etiquetas = prompt("Introduzca las etiquetas").split(',');

    let newGasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);
    gp.anyadirGasto(newGasto);
    repintar();
}

let btnAnyadirGasto = document.getElementById('anyadirgasto');
btnAnyadirGasto.onclick = nuevoGastoWeb;

let editarHandle = function(){
    this.handleEvent = function(){
        let descripcion = prompt("Introduzca la descripcion");
        let valor = parseFloat(prompt("Introduzca el valor"));
        let fecha = prompt("Introduzca la fecha");
        let etiquetas = prompt("Introduzca las etiquetas").split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(new Date(fecha));
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    }
}

let borrarHandle = function(){
    this.handleEvent = function(){
        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}

let borrarEtiquetasHandle = function(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function mostrarDatoEnId(valor, idElemento) {
    if(idElemento != null){
        let elementoHTML = document.getElementById(idElemento);
        elementoHTML.innerHTML += valor;
    }
}

function mostrarGastoWeb(gasto, idElemento) {
    if(idElemento != null){
        let gastoHTML = document.createElement("div");
        gastoHTML.className = "gasto";

        let elementoHTML = document.getElementById(idElemento);
        elementoHTML.appendChild(gastoHTML);

        let descripcionHTML = document.createElement("div");
        descripcionHTML.className = "gasto-descripcion";
        descripcionHTML.innerHTML += gasto.descripcion;
        gastoHTML.appendChild(descripcionHTML);
        
        let fechaHTML = document.createElement("div");
        fechaHTML.className = "gasto-fecha";
        fechaHTML.innerHTML += gasto.fecha;
        gastoHTML.appendChild(fechaHTML);
        
        let valorHTML = document.createElement("div");
        valorHTML.className = "gasto-valor";
        valorHTML.innerHTML += gasto.valor;
        gastoHTML.appendChild(valorHTML);

        let etiquetasHTML = document.createElement("div");
        etiquetasHTML.className = "gasto-etiquetas";
        gastoHTML.appendChild(etiquetasHTML);
        gasto.etiquetas.forEach(etiqueta => {
            let span = document.createElement("span");
            span.className = "gasto-etiquetas-etiqueta";
            span.innerHTML = etiqueta;
            etiquetasHTML.appendChild(span);

            let objBorrarEtiqueta = new borrarEtiquetasHandle();
            objBorrarEtiqueta.gasto = gasto;
            objBorrarEtiqueta.etiqueta = etiqueta;
            span.addEventListener("click", objBorrarEtiqueta);

        });
        gastoHTML.appendChild(etiquetasHTML);

        let btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.className = "gasto-editar";

        let objEditar = new editarHandle();
        objEditar.gasto = gasto;

        btnEditar.addEventListener("click", objEditar);
        gastoHTML.appendChild(btnEditar);

        let btnBorrar = document.createElement("button");
        btnBorrar.type = "button";
        btnBorrar.textContent = "Borrar";
        btnBorrar.className = "gasto-borrar";

        let objBorrar = new borrarHandle();
        objBorrar.gasto = gasto;

        btnBorrar.addEventListener("click", objBorrar);
        gastoHTML.appendChild(btnBorrar);

        let btnEditarFormulario = document.createElement('button');
        btnEditarFormulario.type = "button";
        btnEditarFormulario.textContent = "Editar (formulario)";
        btnEditarFormulario.classList = "gasto-editar-formulario";

        let objEditarFormulario = new EditarHandleFormulario();
        objEditarFormulario.gasto = gasto;
        objEditarFormulario.gastoHTML = gastoHTML;
        objEditarFormulario.btnEditar = btnEditarFormulario;

        btnEditarFormulario.addEventListener("click", objEditarFormulario);
        gastoHTML.appendChild(btnEditarFormulario);
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    if(idElemento != null) {
        let i = 0;
        let elemento = document.getElementById(idElemento);

        let agrupHTML = document.createElement("div");
        agrupHTML.className = "agrupacion";
            
        let titleH1HTML = document.createElement('h1');
        titleH1HTML.innerHTML = "Gastos agrupados por " + periodo;
        agrupHTML.appendChild(titleH1HTML);
    
        let keys = Object.keys(agrup);
        for(let actualAgroup in agrup){
            let agrupInfoHTML = document.createElement('div');
            agrupInfoHTML.className = "agrupacion-dato";
                
            let keysHTML = document.createElement('span');
            keysHTML.className = "agrupacion-dato-clave";
            keysHTML.innerHTML = keys[i];
            agrupInfoHTML.appendChild(keysHTML);
    
            let valueHTML = document.createElement('span');
            valueHTML.className = "agrupacion-dato-valor";
            valueHTML.innerHTML = agrup[actualAgroup];
            
            agrupInfoHTML.appendChild(valueHTML);
    
            agrupHTML.appendChild(agrupInfoHTML);

            i++;
        }
        
        elemento.appendChild(agrupHTML);
    }
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let divControles = document.getElementById("controlesprincipales");
    divControles.appendChild(formulario);

    let anyadirForm = new AnyadirGastoFormulario();
    formulario.addEventListener("submit", anyadirForm);
    
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.setAttribute("disabled", "");
    
    let cancelarForm = new CancelarGastoFormulario();
    cancelarForm.formulario = formulario;

    let btnCancelarForm = formulario.querySelector("button.cancelar");
    btnCancelarForm.addEventListener("click", cancelarForm);
}

document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

let CancelarGastoFormulario = function(){
    this.handleEvent = function(event){
        this.formulario.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

let CancelarCrearGastoFormulario = function(boton){
    this.handleEvent= function(event){
        document.forms[0].remove();

        boton.removeAttribute("disabled");
    }
}

let EditarHandleFormulario = function(){
    this.handleEvent = function() {
        
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        this.gastoHTML.appendChild(formulario);
        this.btnEditar.setAttribute('disabled', "");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let form = new EditarGastoHandle();
        form.gasto = this.gasto;
        formulario.addEventListener("submit", form);

        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarForm = new CancelarCrearGastoFormulario(this.btnEditar);
        btnCancelar.addEventListener('click', cancelarForm);
    }
}

let EditarGastoHandle=function(){
    this.handleEvent = function(event) {
        event.preventDefault();
        let form = document.forms[0];
        this.gasto.descripcion = form.elements.descripcion.value;
        this.gasto.valor = Number(form.elements.valor.value);
        this.gasto.fecha = new Date(form.elements.fecha.value);
        this.gasto.etiquetas = form.elements.etiquetas.value.split(",");

        repintar();
    }
}

function AnyadirGastoFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();

        let formulario = document.forms[0];
        let descripcion = formulario.elements.descripcion.value;
        let valor = Number(formulario.elements.valor.value);
        let fecha = new Date (formulario.elements.fecha.value);
        let etiquetas = formulario.elements.etiquetas.value;
        
        gp.anyadirGasto(new gp.CrearGasto(descripcion, valor, fecha, etiquetas));
        repintar();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

let filtrarGastoWeb = function(){
    this.handleEvent = function(evento) {
        evento.preventDefault();

        let descripcionContiene = this.formulario.elements["formulario-filtrado-descripcion"].value;
        let valorMinimo = this.formulario.elements["formulario-filtrado-valor-minimo"].value;
        let valorMaximo = this.formulario.elements["formulario-filtrado-valor-maximo"].value;
        let fechaDesde = this.formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = this.formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetasTiene = this.formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

        if(etiquetasTiene){
            etiquetasTiene = gp.transformarListadoEtiquetas(etiquetasTiene);
        }

        document.getElementById("listado-gastos-completo").innerHTML="";
        
        let filtrado = gp.filtrarGastos({descripcionContiene, valorMinimo, valorMaximo, fechaDesde, fechaHasta, etiquetasTiene});

        filtrado.forEach(gasto=>{
            mostrarGastoWeb(gasto, "listado-gastos-completo");
        });
    }
}

let formulario = document.getElementById("formulario-filtrado");

let filtrarResultados = new filtrarGastoWeb();
filtrarResultados.formulario = formulario;
formulario.addEventListener('submit', filtrarResultados);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    nuevoGastoWebFormulario,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
}