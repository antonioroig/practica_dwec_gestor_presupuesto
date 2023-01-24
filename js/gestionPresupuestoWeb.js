import * as gestionP from  "./gestionPresupuesto.js";

function mostrarDatoEnId(valor, idElemento)
{
    if (idElemento != undefined)
    {
        let element = document.getElementById(idElemento);
        element.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto)
{
    if (idElemento != undefined && idElemento != null)
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

        let BtnEditarHandle = new EditarHandle();
        BtnEditarHandle.gasto = gasto;
        bEditar.addEventListener("click", BtnEditarHandle);
        divGasto.append(bEditar);
        
        let bBorrar = document.createElement("button");
        bBorrar.className = "gasto-borrar";
        bBorrar.type = "button";
        bBorrar.innerHTML = "Borrar";

        let BtnBorrarHandle = new BorrarHandle();
        BtnBorrarHandle.gasto = gasto;
        bBorrar.addEventListener("click", BtnBorrarHandle);
        divGasto.append(bBorrar);
        
        gastoEtiqueta.addEventListener("click", handleBorrarEtiq);

        let btnEditForm = document.createElement("button");
        btnEditForm.className = "gasto-editar-formulario";
        btnEditForm.elemento = "gasto-editar-formulario";
        btnEditForm.type = "button";
        btnEditForm.textContent = "Editar (formulario)";


        let handleEditForm = new EditarHandleFormulario();
        handleEditForm.gasto = gasto;
        btnEditForm.addEventListener('click', handleEditForm);
        divGasto.append(btnEditForm);

        divGasto.append(gastoEtiqueta);
        element.append(divGasto);

        return divGasto;
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento)
{
    if (idElemento != undefined && idElemento != null)
    {
        let i = 0;
        let id = document.getElementById(idElemento);
        
        let divAgrup = document.createElement('div');
        divAgrup.className = "agrupacion";

        let titulo = document.createElement('h1');
        titulo.innerHTML += "Gastos agrupados por " + periodo;
        divAgrup.append(titulo);

        let key = Object.keys(agrup);

        for(let agrupacion in agrup)
        {
            let divAgrupDato = document.createElement('div');
            divAgrupDato.className = "agrupacion-dato";

            let agrupDC = document.createElement('span');
            agrupDC.className = "agrupacion-dato-clave";
            agrupDC.innerHTML = key[i];
            divAgrupDato.append(agrupDC);

            let spanAgrupDV = document.createElement('span');
            spanAgrupDV.className = "agrupacion-dato-valor";
            spanAgrupDV.innerHTML = agrup [agrupacion];

            divAgrupDato.append(spanAgrupDV);
            divAgrup.append(divAgrupDato);

            i++;
        }

        id.append(divAgrup);
    }
}

function repintar()
{
    document.getElementById("presupuesto").innerHTML = "";
    document.getElementById("gastos-totales").innerHTML = "";
    document.getElementById("balance-total").innerHTML = "";
    document.getElementById("listado-gastos-completo").innerHTML = "";

    mostrarDatoEnId(gestionP.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(gestionP.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(gestionP.calcularBalance(), "balance-total");
    for(let gasto of gestionP.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo",gasto)
    }

}

function actualizarPresupuestoWeb()
{
    let pregunta = prompt("introduce un presupuesto");
    let preguntaFloat = parseFloat(pregunta);
    gestionP.actualizarPresupuesto(preguntaFloat);
    repintar();
}

function nuevoGastoWeb()
{
    let descripcion = prompt("introduce una descripcion");
    let valorSTR = prompt("introduce un valor para el gasto");
    let valor = parseFloat(valorSTR);
    let fecha = prompt("introduce una fecha en yyyy-mm-dd para el gasto");
    let etiquetas = prompt("introduce unas etiquetas para el gasto en fomato etiq1,etiq2,etiq3");
    let etiquetasArray = etiquetas.split(',');

    let gastoCreado = new gestionP.CrearGasto(descripcion,valor,fecha,etiquetasArray);
    gestionP.anyadirGasto(gastoCreado);
    repintar();
}

function EditarHandle()
{
        this.handleEvent= function() 
        {
            let descripcion = prompt("introduce una descripcion");
            let valorSTR = prompt("introduce un valor para el gasto");
            let valor = parseFloat(valorSTR);
            let fecha = prompt("introduce una fecha en yyyy-mm-dd para el gasto");
            let etiquetas = prompt("introduce unas etiquetas para el gasto en fomato etiq1,etiq2,etiq3");
            let etiquetasArray = etiquetas.split(',');

            this.gasto.actualizarValor(valor);
            this.gasto.actualizarDescripcion(descripcion);
            this.gasto.actualizarFecha(fecha);
            this.gasto.etiquetas = etiquetasArray;

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

function nuevoGastoWebFormulario()
{
    let plantillaForm = document.getElementById("formulario-template").content.cloneNode(true);;
    var form = plantillaForm.querySelector("form");

    let formControles = document.getElementById("controlesprincipales");
    formControles.appendChild(form);
    
    let btnAnyadirGasto = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGasto.disabled = true;

    let btnEnviar = new EnviarFormHandle();
    form.addEventListener("submit", btnEnviar);

    let btnCancelar = formControles.querySelector("button.cancelar");
    let cancelar = new btnCancelarHandle();
    cancelar.btnAnyadirGasto = btnAnyadirGasto;
    btnCancelar.addEventListener("click", cancelar);
}

function EnviarFormHandle()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let form = event.currentTarget;
        let desc = form.elements.descripcion.value;
        let valor = parseFloat(form.elements.valor.value)
        let fecha = form.elements.fecha.value;
        let etiq = form.elements.etiquetas.value;

        let gastoEnviar = new gestionP.CrearGasto(desc, valor, fecha, etiq);

        gestionP.anyadirGasto(gastoEnviar);
        repintar();
        let id = document.getElementById("anyadirgasto-formulario");
        id.disabled = false;
    }
}


function EditarHandleFormulario()
{
    this.handleEvent = function(event)
    {
        let plantForm = document.getElementById("formulario-template").content.cloneNode(true);
        var form = plantForm.querySelector("form");

        let formControles = document.getElementById("controlesprincipales");
        formControles.append(form);

        let btnEditarForm = event.currentTarget;
        btnEditarForm.after(form);
        btnEditarForm.disabled = true;

        form.elements.descripcion.value = this.gasto.descripcion;
        form.elements.valor.value = this.gasto.valor;
        form.elements.fecha.value = this.gasto.fecha
        form.elements.etiquetas.value = this.gasto.etiquetas;

        let envForm = new EnvEditarHandleForm();
        envForm.gasto = this.gasto;
        form.addEventListener('submit', envForm);

        let cancelForm = new btnCancelarHandle();
        cancelForm.btnAnyadirGasto = btnEditarForm;
        let btnCancelHandle = form.querySelector("button.cancelar");
        btnCancelHandle.addEventListener('click', cancelForm);
    }
}
function btnCancelarHandle()
{
    this.handleEvent = function(event)
    {
        this.btnAnyadirGasto.disabled = false;
        document.getElementById("anyadirgasto-formulario").disabled = false;
        event.currentTarget.parentNode.remove();
        repintar();
    }
}
function EnvEditarHandleForm()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let form = event.currentTarget;

        let descripcion = form.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = parseFloat(form.elements.valor.value);
        this.gasto.actualizarValor(valor);

        let fecha = form.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiq = form.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiq);
        repintar();
    }
}
actualizarpresupuesto.addEventListener("click",actualizarPresupuestoWeb);
anyadirgasto.addEventListener("click",nuevoGastoWeb);

let anyadirgastoForm = document.getElementById("anyadirgasto-formulario");
anyadirgastoForm.addEventListener('click', nuevoGastoWebFormulario);

let filtrarGastosWeb = function ()
{
    this.handleEvent = function(evento)
    {
        evento.preventDefault();

        let valorMinimo = this.form.elements["formulario-filtrado-valor-minimo"].value;
        let valorMaximo = this.form.elements["formulario-filtrado-valor-maximo"].value;
        let fechaDesde = this.form.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = this.form.elements["formulario-filtrado-fecha-hasta"].value;
        let descripcionContiene = this.form.elements["formulario-filtrado-descripcion"].value;
        let etiquetasTiene = this.form.elements["formulario-filtrado-etiquetas-tiene"].value;

        if (etiquetasTiene)
        {
            etiquetasTiene = gestionP.transformarListadoEtiquetas(etiquetasTiene);
        }

        document.getElementById("listado-gastos-completo").innerHTML = "";

        let filtro = gestionP.filtrarGastos({valorMinimo, valorMaximo, fechaDesde, fechaHasta, 
            descripcionContiene, etiquetasTiene});

        filtro.forEach(gasto => 
        {
            mostrarGastoWeb ("listado-gastos-completo", gasto);
        });
    } 
}

let formFiltrado = document.getElementById("formulario-filtrado");

let formFiltradoRes = new filtrarGastosWeb();
formFiltradoRes.form = formFiltrado;
formFiltrado.addEventListener('submit', formFiltradoRes);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario
}

