import * as ges from "./gestionPresupuesto.js";


function mostrarDatoEnId(valor,idElemento){
    if(idElemento !== undefined){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento,gasto){
    
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divGD = document.createElement("div");
    divGD.className = "gasto-descripcion";
    divGD.innerHTML += gasto.descripcion;
    divGasto.append(divGD);

    let divF = document.createElement("div");
    divF.className = "gasto-fecha";
    divF.innerHTML += gasto.fecha
    divGasto.append(divF);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerHTML += gasto.valor;
    divGasto.append(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    let handleBorrarEtiq = document.createElement("div");
    handleBorrarEtiq.gasto = gasto;

    for(let i = 0; i < gasto.etiquetas.length;i++){
        let spanE = document.createElement("span");
        spanE.className = "gasto-etiquetas-etiqueta";
        spanE.innerHTML = gasto.etiquetas[i];
        
        let btnBorrarHandle = new BorrarEtiquetasHandle();
        btnBorrarHandle.gasto = gasto;
        btnBorrarHandle.petiquetas = gasto.etiquetas[i];
        spanE.addEventListener("click", btnBorrarHandle);
        spanE.textContent = gasto.etiquetas[i] + " ";

        divEtiquetas.append(spanE);
    }
    divGasto.append(divEtiquetas);
        
    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    btnEditar.innerHTML = "Editar";

    let editarHandlebtn = new EditarHandle();
    editarHandlebtn.gasto = gasto;
    btnEditar.addEventListener("click",editarHandlebtn);
    divGasto.append(btnEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    btnBorrar.innerHTML = "Borrar";

    let borrarHandlebtn = new BorrarHandle();
    borrarHandlebtn.gasto = gasto;
    btnBorrar.addEventListener("click",borrarHandlebtn);
    divGasto.append(btnBorrar);

    divEtiquetas.addEventListener('click' , handleBorrarEtiq);

    let btnEditarFormulario = document.createElement("button");
    btnEditarFormulario.className = "gasto-editar-formulario";
    btnEditarFormulario.id = "gasto-editar-formulario";
    btnEditarFormulario.type = "button"
    btnEditarFormulario.textContent = "Editar (formulario)";

    let handleEditarFormulario = new EditarHandleFormulario();
    handleEditarFormulario.gasto = gasto;
    btnEditarFormulario.addEventListener('click' , handleEditarFormulario);
    divGasto.append(btnEditarFormulario);
    
    divGasto.append(divEtiquetas);
    id.append(divGasto);
    
    return id;
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let id = document.getElementById(idElemento);

    let divAgrupado = document.createElement("div");
    divAgrupado.className = "agrupacion";

    let divAgrupadoH1 = document.createElement("h1");
    divAgrupadoH1.innerHTML += `Gastos agrupados por ${periodo}`;
    divAgrupado.append(divAgrupadoH1);

    for(let key of Object.keys(agrup)){
        let divAgrupacionDato = document.createElement("div");
        divAgrupacionDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.innerHTML = `${key}`;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.innerHTML = `${key.valueOf()}`;

        divAgrupado.append(divAgrupacionDato);
        divAgrupacionDato.append(spanClave);
        divAgrupacionDato.append(spanValor);

    }
    id.append(divAgrupado);
    return id;

}

function repintar(){
    document.getElementById('presupuesto').innerHTML = "";
    document.getElementById('gastos-totales').innerHTML = "";
    document.getElementById('balance-total').innerHTML = "";
    document.getElementById('listado-gastos-completo').innerHTML = "";

    mostrarDatoEnId(ges.mostrarPresupuesto(),"presupuesto");
    mostrarDatoEnId(ges.calcularTotalGastos(),"gastos-totales");
    mostrarDatoEnId(ges.calcularBalance(),"balance-total");
    for(let gasto of ges.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo",gasto);
    }
}

function actualizarPresupuestoWeb(){
    let interaccion = prompt("Introduce un presupuesto");
    let presupuesto = parseFloat(interaccion);
    ges.actualizarPresupuesto(presupuesto);
    repintar();
}


function nuevoGastoWeb(){
    let descripcion = prompt("Introduce una descripcion");
    let valorStr = prompt("Introduce un valor");
    let valorFloat = parseFloat(valorStr);
    let fecha = prompt("Introduce una fecha");
    let etiquetas = prompt("Introduce las etiquetas");
    
    let arrayEtiquetas = etiquetas.split(',');

    let gasto = new ges.CrearGasto(descripcion,valorFloat,fecha,arrayEtiquetas);
    ges.anyadirGasto(gasto);
    repintar();
}

actualizarpresupuesto.addEventListener('click',actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click',nuevoGastoWeb);

function EditarHandle(){
        this.handleEvent = function(){
        let descripcion = prompt("Introduce una descripcion");
        let valorStr = prompt("Introduce un valor");
        let valorFloat = parseFloat(valorStr);
        let fecha = prompt("Introduce una fecha");
        let etiquetas = prompt("Introduce las etiquetas");
    
        let arrayEtiquetas = etiquetas.split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.etiquetas = arrayEtiquetas;
        this.gasto.actualizarValor(valorFloat);

        repintar();
    }   
}

function BorrarHandle(){
    this.handleEvent = function(){
    ges.borrarGasto(this.gasto.id);
    repintar();
}  
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.petiquetas);
        repintar();
    }
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    
    let formControles = document.getElementById("controlesprincipales");
    formControles.appendChild(formulario);

    let btnAnyadirGasto = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGasto.disabled = true;

    let btnSubmit = new SubmitHandle();
    formulario.addEventListener('submit', btnSubmit);

    let btnCancelar = formulario.querySelector("button.cancelar");
    let cancelar = new btnCancelarHandle();
    cancelar.buttonAnyadir = btnAnyadirGasto;
    btnCancelar.addEventListener('click' , cancelar);
}

let anyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
anyadirGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

function SubmitHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let datos = event.currentTarget;
        let descripcion = datos.elements.descripcion.value;
        let valor = parseFloat(datos.elements.valor.value);
        let fecha = datos.elements.fecha.value;
        let etiquetas = datos.elements.etiquetas.value;
        
        let gasto = new ges.CrearGasto(descripcion,valor,fecha,etiquetas);
        ges.anyadirGasto(gasto);
        repintar();
        let id = document.getElementById("anyadirgasto-formulario");
        id.disabled = false;
    }
}

function btnCancelarHandle(){
    this.handleEvent = function(event){
    this.buttonAnyadir.disabled = false;
    document.getElementById("anyadirgasto-formulario").disabled = false;
    event.currentTarget.parentNode.remove();
    repintar();
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let formControles = document.getElementById("controlesprincipales");
        formControles.append(formulario);

        let botonEditarForm = event.currentTarget;
        botonEditarForm.after(formulario);
        botonEditarForm.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviarForm = new EnviarEditarHandleFormulario();
        enviarForm.gasto = this.gasto;
        formulario.addEventListener('submit', enviarForm);

        let cancelarForm = new btnCancelarHandle();
        cancelarForm.buttonAnyadir = botonEditarForm;
        let btnCancelarForm = formulario.querySelector("button.cancelar");
        btnCancelarForm.addEventListener('click', cancelarForm);
    }
}
function EnviarEditarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let form = event.currentTarget;
        
        let descripcion = form.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);
        
        let valor = parseFloat(form.elements.valor.value);
        this.gasto.actualizarValor(valor);
        
        let fecha = form.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = form.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();

    }
}
function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let form = event.currentTarget;

        let descripcion = form.elements["formulario-filtrado-descripcion"].value;
        let valorMin = parseFloat(form.elements["formulario-filtrado-valor-minimo"].value);
        let valorMax = parseFloat(form.elements["formulario-filtrado-valor-maximo"].value);
        let fechaInicial = form.elements["formulario-filtrado-fecha-desde"].value;
        let fechaFinal = form.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetas = form.elements["formulario-filtrado-etiquetas-tiene"].value;
        let etiquetasNuevo;

        if(etiquetas.length > 0 ){
            etiquetasNuevo = ges.transformarListadoEtiquetas(etiquetas);
        }
        
        let obj = {
            fechaDesde : fechaInicial,
            fechaHasta : fechaFinal,
            valorMinimo : valorMin,
            valorMaximo : valorMax,
            descripcionContiene : descripcion,
            etiquetasTiene : etiquetasNuevo

        }

        document.getElementById("listado-gastos-completo").innerHTML = "";
        let filt = ges.filtrarGastos(obj);

        filt.forEach(gasto=>{
            mostrarGastoWeb("listado-gastos-completo", gasto)
        })

    }
}

let formularioFilt = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", formularioFilt);

function guardarGastosWeb(){
    localStorage.GestorGastosDWEC=JSON.stringify(ges.listarGastos());
}

let btnGuardarGastoWeb = document.getElementById('guardar-gastos');
btnGuardarGastoWeb.onclick = guardarGastosWeb;

function cargarGastosWeb(){
    let cargarG = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
    if((cargarG != null) && (cargarG.length >= 0)){
        ges.cargarGastos(cargarG);
    }
    else{
       ges.cargarGastos([]); 
    }
    repintar();
}
let btnCargarGastoWeb = document.getElementById('cargar-gastos');
btnCargarGastoWeb.onclick = cargarGastosWeb;

function cargarGastosApi(){
    let usuario = document.getElementById("nombre_usuario");
    

}
let btnCargarGastoApi = document.getElementById('cargar-gastos-api');
btnCargarGastoApi.onclick = cargarGastosApi;
//NO MODIFICAR.
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi
}
