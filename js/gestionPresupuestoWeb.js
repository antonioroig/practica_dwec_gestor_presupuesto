import * as gestionP from  "./gestionPresupuesto.js";

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
    let plantillaForm = document.getElementById("formulario-template").content.cloneNode(true);;
    var form = plantillaForm.querySelector("form");

    let formControles = document.getElementById("controlesprincipales");
    formControles.appendChild(form);
    
    let btnAnyadirGasto = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGasto.disabled = true;

    let btnEnviar = new AnyadirGastoFormulario();
    form.addEventListener("submit", btnEnviar);

    let btnCancelar = formControles.querySelector("button.cancelar");
    let cancelar = new CancelarGastoFormulario();
    cancelar.btnAnyadirGasto = btnAnyadirGasto;
    btnCancelar.addEventListener("click", cancelar);
}

document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

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

function mostrarDatoEnId(valor, idElemento)
{
    if (idElemento != undefined)
    {
        let elementoHTML = document.getElementById(idElemento);
        elementoHTML.innerHTML += " " + valor;
    }
}

let EditarHandle = function()
{
    this.handleEvent = function()
    {
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
    this.eventHandle = function(event)
    {
        let plantillaForm = document.getElementById("formulario-template").content.cloneNode(true);
        
        let formulario = plantillaForm.querySelector("form");

        let controlesForm = document.getElementById("control-principal");
        controlesForm.append(form);

        let btonEditarF = event.currentTarget;
        btonEditarF.after(form);
        btonEditarF.disabled = true;

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
        let form = event.currentTarget;

        let descripcion = form.elements.descricpion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let fecha = form.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let valor = form.elements.valor.value;
        this.gasto.actualizarValor(valor);

        let etiqueta = form.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiqueta);
        
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

        gestionP.anyadirGasto(new gestionP.CrearGasto(descricpion, valor, fecha, ...etiquetas));
        repintar();
    }
}

actualizarpresupuesto.addEventListener("click",actualizarPresupuestoWeb);
anyadirgasto.addEventListener("click",nuevoGastoWeb);

let anyadirgastoForm = document.getElementById("anyadirgasto-formulario");
anyadirgastoForm.addEventListener('click', nuevoGastoWebFormulario);

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
