//gestionPresupuestoWeb.js
//
/*
mostrarDatoEnId
mostrarGastoWeb
mostrarGastosAgrupadosWeb
*/
import * as gesP from  "./gestionPresupuesto.js";


function mostrarDatoEnId(valor, idElemento)
{
    if (idElemento != undefined)
    {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto)
{
    if (idElemento != undefined)
    {
        
        let elemento = document.getElementById(idElemento);
        let divGasto = document.createElement('div');
        divGasto.className = "gasto";
        let divGastoDescripcion = document.createElement('div');
        divGastoDescripcion.className = "gasto-descripcion";
        divGastoDescripcion.innerHTML+=gasto.descripcion;
        divGasto.append(divGastoDescripcion);

        let divGastoFecha = document.createElement('div');
        divGastoFecha.className = "gasto-fecha";
        divGastoFecha.innerHTML+=gasto.fecha;
        divGasto.append(divGastoFecha);

        let divGastoValor = document.createElement('div');
        divGastoValor.className = "gasto-valor";
        divGastoValor.innerHTML+=gasto.valor;
        divGasto.append(divGastoValor);

        let divGastoEtiquetas = document.createElement('div');
        divGastoEtiquetas.className = "gasto-etiquetas";
        
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

            divGastoEtiquetas.append(divGastoEtiquetasEtiqueta);
        }
        divGasto.append(divGastoEtiquetas);
        elemento.append(divGasto);
        
        
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
        
        divGastoEtiquetas.addEventListener("click", handleBorrarEtiq);

        let btnEditForm = document.createElement("button");
        btnEditForm.className = "gasto-editar-formulario";
        btnEditForm.elemento = "gasto-editar-formulario";
        btnEditForm.type = "button";
        btnEditForm.textContent = "Editar (formulario)";


        let handleEditForm = new EditarHandleFormulario();
        handleEditForm.gasto = gasto;
        btnEditForm.addEventListener('click', handleEditForm);
        divGasto.append(btnEditForm);

        divGasto.append(divGastoEtiquetas);
        elemento.append(divGasto);

        return elemento;
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    if (idElemento != undefined)
    {
        let id = document.getElementById(idElemento);
        
        let divAgrupacion = document.createElement('div');
        divAgrupacion.className = "agrupacion";

        let divH1 = document.createElement('h1');
        divH1.innerHTML += `Gastos agrupados por ${periodo}`;
        divAgrupacion.append(divH1);

        for(let key of Object.keys(agrup)){
            let divAgrupacionDato = document.createElement('div');
            divAgrupacionDato.className = "agrupacion-dato";
            let spanAgrupacionDatoClave = document.createElement('span');
            spanAgrupacionDatoClave.className = "agrupacion-dato-clave";
            spanAgrupacionDatoClave.innerHTML += `${key}`;
            let spanAgrupacionDatoValor = document.createElement('span');
            spanAgrupacionDatoValor.className = "agrupacion-dato-valor";
            spanAgrupacionDatoValor.innerHTML += `${key.valueOf()}`;
            divAgrupacion.append(divAgrupacionDato);
            divAgrupacionDato.append(spanAgrupacionDatoClave);
            divAgrupacionDato.append(spanAgrupacionDatoValor);
        }
        id.append(divAgrupacion)
        return id;
    }
}
function repintar()
{
    document.getElementById("presupuesto").innerHTML = "";
    document.getElementById("gastos-totales").innerHTML = "";
    document.getElementById("balance-total").innerHTML = "";
    document.getElementById("listado-gastos-completo").innerHTML = "";

    mostrarDatoEnId(gesP.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(gesP.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(gesP.calcularBalance(), "balance-total");
    for(let gasto of gesP.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo",gasto)
    }

}
function actualizarPresupuestoWeb()
{
    let pregunta = prompt("introduce un presupuesto");
    let preguntaFloat = parseFloat(pregunta);
    gesP.actualizarPresupuesto(preguntaFloat);
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

    let gastoCreado = new gesP.CrearGasto(descripcion,valor,fecha,etiquetasArray);
    gesP.anyadirGasto(gastoCreado);
    repintar();
}
function EditarHandle()
{
    
        this.handleEvent= function() {
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
    
        this.handleEvent= function() {
            gesP.borrarGasto(this.gasto.id);
            repintar();
        }
}
function BorrarEtiquetasHandle()
{
    
        this.handleEvent= function() {

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

function EnviarFormHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let form = event.currentTarget;
        let desc = form.elements.descripcion.value;
        let valor = parseFloat(form.elements.valor.value)
        let fecha = form.elements.fecha.value;
        let etiq = form.elements.etiquetas.value;

        let gastoEnviar = new gesP.CrearGasto(desc, valor, fecha, etiq);

        gesP.anyadirGasto(gastoEnviar);
        repintar();
        let id = document.getElementById("anyadirgasto-formulario");
        id.disabled = false;
    }
}


function EditarHandleFormulario(){
    this.handleEvent = function(event){
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
function btnCancelarHandle(){
    this.handleEvent = function(event){
        this.btnAnyadirGasto.disabled = false;
        document.getElementById("anyadirgasto-formulario").disabled = false;
        event.currentTarget.parentNode.remove();
        repintar();
    }
}
function EnvEditarHandleForm(){
    this.handleEvent = function(event){
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


function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let form = event.currentTarget;

        let descripcion = form.elements["formulario-filtrado-descripcion"].value;
        let vMax = parseFloat(form.elements["formulario-filtrado-valor-maximo"].value);
        let vMin = parseFloat(form.elements["formulario-filtrado-valor-minimo"].value);
        let fInicial = form.elements["formulario-filtrado-fecha-desde"].value;
        let fFinal = form.elements["formulario-filtrado-fecha-hasta"].value;
        let etiq = form.elements["formulario-filtrado-etiquetas-tiene"].value;
        let etiqNuevo;
    

    if(etiq.length > 0){
        etiqNuevo = gesP.transformarListadoEtiquetas(etiq);
    }

    let obj = {
        fechaDesde : fInicial,
        fechaHasta : fFinal,
        valorMinimo : vMin,
        valorMaximo : vMax,
        descripcionContiene : descripcion,
        etiquetasTiene : etiqNuevo
    }

    document.getElementById("listado-gastos-completo").innerHTML = "";
    let filtrador = gesP.filtrarGastos(obj);

    filtrador.forEach(gasto=>{
        mostrarGastoWeb("listado-gastos-completo", gasto)
    })

    }

}


let formularioFilt = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", formularioFilt);



function guardarGastosWeb()
{
    localStorage.GestorGastosDWEC=JSON.stringify(gesP.listarGastos());
}

let btnGuardarGasto = document.getElementById('guardar-gastos');
btnGuardarGasto.onclick = guardarGastosWeb;

function cargarGastosWeb(){

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
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb
}

