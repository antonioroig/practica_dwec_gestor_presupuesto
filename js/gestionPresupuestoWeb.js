import * as gp from './gestionPresupuesto.js';


"use strict";

function mostrarDatoEnId(valor, idElemento){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML=valor;
}

function mostrarGastoWeb(idElemento, gasto){
    
    let elemento = document.getElementById(idElemento);
    
    let gastoD = document.createElement("div"); 
    gastoD.classList = "gasto";

    let gastoDesc = document.createElement("div");
    gastoDesc.classList = "gasto-descripcion";
    gastoDesc.textContent = gasto.descripcion;
    gastoD.appendChild(gastoDesc)

    let gastoFecha = document.createElement("div");
    gastoFecha.classList = "gasto-fecha";
    gastoFecha.textContent = gasto.fecha;
    gastoD.appendChild(gastoFecha)

    let gastoValor = document.createElement("div");
    gastoValor.classList = "gasto-valor";
    gastoValor.textContent = gasto.valor;
    gastoD.appendChild(gastoValor)

    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.classList = "gasto-etiquetas";
    gasto.etiquetas.forEach(element => {
        let gastoEtiqueta = document.createElement("span");
        gastoEtiqueta.classList = "gasto-etiquetas-etiqueta";
        gastoEtiqueta.textContent = element;
        let objBorrarEqt = new BorrarEtiquetasHandle();
        objBorrarEqt.gasto=gasto;
        objBorrarEqt.etiqueta=element;
        gastoEtiqueta.addEventListener("click", objBorrarEqt);
        gastoEtiquetas.appendChild(gastoEtiqueta)
    });
    gastoD.appendChild(gastoEtiquetas)

    elemento.appendChild(gastoD)


    let objEdit = new EditarHandle();
    objEdit.gasto=gasto;

    let btnEdit = document.createElement("button");
    btnEdit.type="button";
    btnEdit.textContent="Editar";
    btnEdit.classList="gasto-editar";

    btnEdit.addEventListener("click", objEdit);
    gastoD.appendChild(btnEdit);

    
    let objBorrar = new BorrarHandle();
    objBorrar.gasto=gasto;

    let btnborrar = document.createElement('button');
    btnborrar.type="button";
    btnborrar.textContent="Borrar";
    btnborrar.classList="gasto-borrar";

    btnborrar.addEventListener("click", objBorrar);
    gastoD.appendChild(btnborrar);

    

    let btnEditarGastoForm = document.createElement("button");
    btnEditarGastoForm.type="button";
    btnEditarGastoForm.textContent="Editar (formulario)";
    btnEditarGastoForm.classList="gasto-editar-formulario";

    let objEditarGastoForm = new EditarHandleFormulario();
    objEditarGastoForm.gasto=gasto;
    objEditarGastoForm.gastoD = gastoD;
    objEditarGastoForm.btnEditar = btnEditarGastoForm;

    btnEditarGastoForm.addEventListener("click", objEditarGastoForm);
    gastoD.appendChild(btnEditarGastoForm);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo  ){
    let elemento = document.getElementById(idElemento);
    
    let agrupD = document.createElement("div");
    agrupD.classList = "agrupacion";
    
    
    let agrupH1 = document.createElement("h1");
    agrupH1.textContent = `Gastos agrupados por ${periodo}`;
    agrupD.appendChild(agrupH1)

    let propiedades = Object.keys(agrup)
    let valores = Object.values(agrup)

    for (let i = 0; i < propiedades.length; i++){

        let gastoAgrupDato = document.createElement("div");
        gastoAgrupDato.classList = "agrupacion-dato";

        let gastoAgrupDatoClave = document.createElement("span");
        gastoAgrupDatoClave.classList = "agrupacion-dato-clave";
        gastoAgrupDatoClave.textContent = propiedades[i];
        gastoAgrupDato.appendChild(gastoAgrupDatoClave)

        let gastoAgrupDatoValor = document.createElement("span");
        gastoAgrupDatoValor.classList = "agrupacion-dato-valor";
        gastoAgrupDatoValor.textContent = valores[i];
        gastoAgrupDato.appendChild(gastoAgrupDatoValor)

        agrupD.appendChild(gastoAgrupDato)
    }

    elemento.appendChild(agrupD)
}

function repintar(){

    mostrarDatoEnId(gp.mostrarPresupuesto(), "presupuesto")
    mostrarDatoEnId(gp.calcularTotalGastos(), "gastos-totales")
    mostrarDatoEnId(gp.calcularBalance(), "balance-total")
    let element = document.getElementById("listado-gastos-completo")
    element.innerHTML = "";

    gp.listarGastos().forEach(gasto =>{
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });
}

function actualizarPresupuestoWeb(){
    let pres = prompt("Dame un presupuesto", 0)
    pres = parseFloat(pres, 10)

    if ((pres !== null) && (pres !== undefined)){
      gp.actualizarPresupuesto(pres)
      repintar()  
    }
}

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);


function nuevoGastoWeb(){
    let desc = prompt("Dame la descripcion del nuevo gasto: ", "Descripcion");
    let val = prompt("Dame el valor del nuevo gasto: ", 100);
    val = parseFloat(val, 10)
    let fecha = prompt("Dame la fecha del nuevo gasto: ", "2023-02-01");
    let etiquetas = prompt("Dame las etiquetas del nuevo gasto separadas por comas: ", "et1,et2,et3");

    let arrayEtiquetas = etiquetas.split(",");
    let nuevoGasto = new gp.CrearGasto(desc, val, fecha, arrayEtiquetas);
    gp.anyadirGasto(nuevoGasto);
    repintar();
}

document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function() {
        
        let desc = prompt("Dame la nueva descripcion del gasto: ", this.gasto.descripcion);
        let val = prompt("Dame el valor del nuevo gasto: ", this.gasto.valor);
        val = parseFloat(val, 10)
        let fecha = prompt("Dame la nueva fecha del gasto: ", this.gasto.fecha);
        let etiquetas = prompt("Pón etiquetas al gasto separadas por comas: ", this.gasto.etiquetas.join(", "));

        let arrayEtiquetas = etiquetas.split(",");
        
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(val);
        this.gasto.actualizarFecha(new Date(fecha));
        this.gasto.anyadirEtiquetas(arrayEtiquetas);
        
        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function() {
        
        gp.borrarGasto(this.gasto.id)
        
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function() {
        
        this.gasto.borrarEtiquetas(this.etiqueta);
        
        repintar();
    }
}

function NuevoGastoHandle(){
    this.handleEvent = function(event) {
        event.preventDefault()
        const form = event.currentTarget;
        
        let nuevoGasto = new gp.CrearGasto(
            form.elements.descripcion.value,
            Number(form.elements.valor.value),
            new Date(form.elements.fecha.value),
            form.elements.etiquetas.value.split(",")
        )
        gp.anyadirGasto(nuevoGasto)

        repintar();

        let btnAnyadirGasto = document.getElementById("anyadirgasto-formulario")
        btnAnyadirGasto.removeAttribute("disabled")

    }
}

function CancelarGastoHandle(boton){ 
    this.handleEvent = function(event) {
        
        document.forms[0].remove();
        boton.removeAttribute("disabled");
    }
}

function EditarHandleFormulario(){ 
    this.handleEvent = function() {
    
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form")
    
    this.btnEditar.setAttribute('disabled', "")

    formulario.elements.descripcion.value = this.gasto.descripcion;
    formulario.elements.valor.value = this.gasto.valor;
    formulario.elements.fecha.value = this.gasto.fecha;
    formulario.elements.etiquetas.value = this.gasto.etiquetas;

    let editGF = new EditarGastoHandleFormulario();
    editGF.gasto = this.gasto;
    formulario.addEventListener("submit", editGF);

    let cancelar = formulario.querySelector("button.cancelar")
    cancelar.addEventListener("click", new CancelarGastoHandle(this.btnEditar))
    this.gastoD.appendChild(plantillaFormulario)
    }
}
function EditarGastoHandleFormulario(){ 
    this.handleEvent = function(event) {
        event.preventDefault()
        const form = event.currentTarget;

        this.gasto.descripcion = form.elements.descripcion.value
        this.gasto.valor = Number(form.elements.valor.value)
        this.gasto.fecha = new Date(form.elements.fecha.value)
        this.gasto.etiquetas = form.elements.etiquetas.value.split(",")
        
        repintar()
    }
}

function nuevoGastoWebFormulario(){
    
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form")

    formulario.addEventListener("submit", new NuevoGastoHandle())

    let anyadirGastoform = document.getElementById("anyadirgasto-formulario")
    anyadirGastoform.setAttribute("disabled", "");
    
    let cancelar = formulario.querySelector("button.cancelar")
    cancelar.addEventListener("click", new CancelarGastoHandle(anyadirGastoform))

    document.getElementById("controlesprincipales").appendChild(formulario);
} 

document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);


let filtrarGastosWeb1 = document.getElementById("filtrar-gastos")
let filtrarGastosWeb2 = filtrarGastosWeb1.querySelector("form")
filtrarGastosWeb2.addEventListener("submit", filtrarGastosWeb());

function filtrarGastosWeb(){
    this.handleEvent = function(event) {
        event.preventDefault()
        const form = event.currentTarget;
        let a = form.elements

        repintar()
    }
}



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
}