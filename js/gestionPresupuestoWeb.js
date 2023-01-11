import * as gestionP from  "./gestionPresupuesto.js";

function repintar()
{
    document.getElementById("presupuesto").innerHTML = "";
    document.getElementById("gastos-totales").innerHTML = "";
    document.getElementById("balance-total").innerHTML = "";
    document.getElementById("listado-gastos-completo").innerHTML = "";

    mostrarDatoEnId(gestionP.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(gestionP.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(gestionP.calcularBalance(), "balance-total");

    for(let gasto of gestionP.listarGastos())
    {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb()
{
    let presupuesto = prompt("Introduzcir presupuesto");

    if(presupuesto != undefined)
    {
        presupuesto = parseFloat(presupuesto);
        gestionP.actualizarPresupuesto(presupuesto);
        repintar();
    }

    else
    {
        alert("El valor introducido no es valido");
    }
}

let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
btnActualizarPresupuesto.onclick = actualizarPresupuestoWeb;

function nuevoGastoWeb()
{
    let descripcion = prompt("Introduzcir descripción");
    let valor = parseFloat(prompt("Introduzcir valor"));
    let fecha = prompt("Introduzcir fecha");
    let etiquetas = prompt("Introduzcir etiquetas").split(',');

    let newGasto = new gestionP.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionP.anyadirGasto(newGasto);

    repintar();
}

let btnAnyadirGasto = document.getElementById('anyadirgasto');
btnAnyadirGasto.onclick = nuevoGastoWeb;

let EditarHandle = function(){
    this.handleEvent = function(){
        let descripcion = prompt("Introduzcir descripción");
        let valor = parseFloat(prompt("Introduzcir valor"));
        let fecha = prompt("Introduzcir fecha");
        let etiquetas = prompt("Introduzcir etiquetas").split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(new Date(fecha));
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}

function BorrarHandle()
{
    
        this.handleEvent= function()
        {
            gestionP.borrarGasto(this.gasto.id);
            repintar();
        }
}
function BorrarEtiquetasHandle()
{
    
        this.handleEvent= function() 
        {

            this.gasto.borrarEtiquetas(this.petiquetas);

            repintar();
        }
}

function mostrarDatoEnId(valor, idElemento)
{
    if (idElemento != undefined)
    {
        let elementoHTML = document.getElementById(idElemento);
        elementoHTML.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto)
{
    if (idElemento != undefined)
    {
        
        let element = document.getElementById(idElemento);
        let divGasto = document.createElement('div');
        divGasto.className = "gasto";

        let gastoDescripcion = document.createElement('div');
        gastoDescripcion.className = "gasto-descripcion";
        gastoDescripcion.innerHTML += gasto.descricpion;
        divGasto.append(gastoDescripcion);

        let gastoFecha = document.createElement('div');
        gastoFecha.className = "gasto-fecha";
        gastoFecha.innerHTML += gasto.fecha;
        divGasto.append(gastoFecha);

        let gastoValor = document.createElement('div');
        gastoValor.className = "gasto-valor";
        gastoValor.innerHTML += gasto.valor;
        divGasto.append(gastoValor);

        let gastoEtiqueta = document.createElement('div');
        gastoEtiqueta.className = "gasto-etiquetas";

        let handleBorrarEtiq = document.createElement("div");
        handleBorrarEtiq.gasto = gasto;

        for(let i = 0; i < gasto.etiquetas.length; i++){
            let divGastoEtiquetasEtiqueta = document.createElement('span');
            divGastoEtiquetasEtiqueta.className = "gasto-etiquetas-etiqueta";
            divGastoEtiquetasEtiqueta.textContent = gasto.etiquetas[i];
            

            let BtnEtiqBorrarHandle = new BorrarEtiquetasHandle();
            BtnEtiqBorrarHandle.gasto = gasto;
            BtnEtiqBorrarHandle.petiquetas = gasto.etiquetas[i];
            divGastoEtiquetasEtiqueta.addEventListener("click", BtnEtiqBorrarHandle);
            divGastoEtiquetasEtiqueta.textContent = gasto.etiquetas[i] + " ";

            gastoEtiqueta.append(divGastoEtiquetasEtiqueta);
        }

        divGasto.append(gastoEtiqueta);

        element.append(divGasto);

        let bEditar = document.createElement("button");
        bEditar.className = "gasto-editar";
        bEditar.type = "button";
        bEditar.innerHTML = "Editar";

        let btonEditarH = new EditarHandle();
        btonEditarH.gasto = gasto;
        bEditar.addEventListener("click", btonEditarH);
        divGasto.append(bEditar);
        
        let bBorrar = document.createElement("button");
        bBorrar.className = "gasto-borrar";
        bBorrar.type = "button";
        bBorrar.innerHTML = "Borrar";

        let btonBorrarH = new BorrarHandle();
        btonBorrarH.gasto = gasto;
        bBorrar.addEventListener("click", btonBorrarH);
        divGasto.append(bBorrar);
        
        gastoEtiqueta.addEventListener("click", handleBorrarEtiq);

        let btnEditForm = document.createElement("button");
        btnEditForm.className = "gasto-editar-formulario";
        btnEditForm.elemento = "gasto-editar-formulario";
        btnEditForm.type = "button";
        btnEditForm.textContent = "Editar (formulario)";


        let formEdit = new EditarHandleFormulario();
        formEdit.gasto = gasto;
        btnEditForm.addEventListener('click', formEdit);
        divGasto.append(btnEditForm);

        divGasto.append(gastoEtiqueta);
        element.append(divGasto);

        return divGasto;
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    if (idElemento !== undefined)
    {
        let id = document.getElementById(idElemento);
        
        let divAgrup = document.createElement('div');
        divAgrup.className = "agrupacion";

        let titulo = document.createElement('h1');
        titulo.innerHTML = "Gastos agrrupados por " + periodo;
        divAgrup.append(titulo);

        let key = Object.keys(agrup);

        for(let agrupacion in agrup)
        {
            let divAgrupDato = document.createElement('div');
            divAgrupDato.className = "agrupacion-dato";

            let spanAgrupDC = document.createElement('span');
            spanAgrupDC.className = "agrupacion-dato-clave";
            spanAgrupDC.innerHTML = key [i];
            divAgrupDato.append(spanAgrupDC);

            let spanAgrupDV = document.createElement('span');
            spanAgrupDV.className = "agrupacion-dato-valor";
            spanAgrupDV.innerHTML = agrup [agrupacion];

            divAgrupDato.append(spanAgrupDV);
            divAgrup.append(divAgrupDato);
        }

        id.append(divAgrup);
        return id;
    }
}

function nuevoGastoWebFormulario()
{
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    let formulario = plantillaFormulario.querySelector("form");

    let divControles = document.getElementById("controlesprincipales");
    divControles.append(formulario);

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

let CancelarGastoFormulario = function()
{
    this.eventHandle = function(event)
    {
        this.formulario.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

let CancelarCrearGastoFormulario = function(boton)
{
    this.eventHandle = function(event)
    {
        document.forms[0].remove();
        boton.removeAttribute("disabled");
    }
}

let EditarHandleFormulario = function()
{
    this.eventHandle = function()
    {
        let plantillaForm = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaForm.querySelector("form");

        this.gastoHtml.appendchild(formulario);
        this.editBoton.setAttribute('disabled', "");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let form = new EditarGastoHandle();
        form.gasto = this.gasto;
        formulario.addEventListener("submit", form);

        let cancelBoton = formulario.querySelector("button.cancelar");
        let cancelForm = new CancelarCrearGastoFormulario(this.editBoton);
        cancelBoton.addEventListener('click', cancelForm);
    }
}

let EditarGastoHandle = function()
{
    this.eventHandle = function(event)
    {
        event.preventDefault();
        let form = document.forms[0];

        this.gasto.descricpion = form.elements.descricpion.value;
        this.gasto.valor = Number(form.elements.valor.value);
        this.gasto.fecha = new Date(form.elements.fecha.value);
        this.gasto.etiquetas = form.elements.etiquetas.value.split(",");

        repintar();
    }
}

function AnyadirGastoFormulario()
{
    this.eventHandle = function(event)
    {
        event.preventDefault();

        let formulario = document.forms[0];
        let descricpion = formulario.elements.descricpion.value;
        let valor = Number(formulario.elements.valor.value);
        let fecha = new Date(formulario.elements.fecha.value);
        let etiquetas = formulario.elements.etiquetas.value;

        gestionP.anyadirGasto(new gestionP.CrearGasto(descricpion, valor, fecha, etiquetas));
        repintar();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    nuevoGastoWebFormulario,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}
