import * as gestion from './gestionPresupuesto.js';

function mostrarDatoEnId(valor,idElemento){
    
    if(idElemento !== undefined){
        let id = document.getElementById(idElemento);
        id.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto){
    
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";


    let divGastoDes = document.createElement("div");
    divGastoDes.className = "gasto-descripcion";
    divGastoDes.innerHTML += gasto.descripcion;
    divGasto.append(divGastoDes);


    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.innerHTML += gasto.fecha;
    divGasto.append(divGastoFecha);


    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    divGastoValor.innerHTML += gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiqueta = document.createElement("div");
    divGastoEtiqueta.className = "gasto-etiquetas";

    let handleBorrarEtiqueta = new BorrarEtiquetasHandle();
    handleBorrarEtiqueta.gasto = gasto;

    for(let i = 0; i < gasto.etiquetas.length; i++){
        handleBorrarEtiqueta.etiqueta = gasto.etiquetas[i];
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.innerHTML = gasto.etiquetas[i];
        divGastoEtiqueta.append(span);
    }
        

        let botonEditar = document.createElement("button");
        botonEditar.className = "gasto-editar";
        botonEditar.type = "button";
        botonEditar.innerHTML = "Editar";
    
        let handleEditar = new EditarHandle();
        handleEditar.gasto = gasto;
        botonEditar.addEventListener("click", handleEditar);
        divGasto.append(botonEditar);
        

        let botonBorrar = document.createElement("button");
        botonBorrar.className = "gasto-borrar";
        botonBorrar.type = "button";
        botonBorrar.innerHTML = "Borrar";

        let handleBorrar = new BorrarHandle();
        handleBorrar.gasto = gasto;
        botonBorrar.addEventListener("click", handleBorrar);
        divGasto.append(botonBorrar);

        divGastoEtiqueta.addEventListener("click", handleBorrarEtiqueta);


    divGasto.append(divGastoEtiqueta);
    id.append(divGasto);

    return id;

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let id = document.getElementById(idElemento);

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";


    let h1GastosAgrupados = document.createElement("h1");
    h1GastosAgrupados.innerHTML += `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1GastosAgrupados);

    for(let key of Object.keys(agrup)){
        let divAgrupacionDato = document.createElement("div");
        divAgrupacionDato.className = "agrupacion-dato";
        let span = document.createElement("span");
        span.className = "agrupacion-dato-clave";
        span.innerHTML = `${key}`;
        let span2 = document.createElement("span");
        span2.className = "agrupacion-dato-valor";
        span2.innerHTML = `${key.valueOf()}`;
        divAgrupacion.append(divAgrupacionDato);
        divAgrupacionDato.append(span);
        divAgrupacionDato.append(span2);
    }
    id.append(divAgrupacion);
    return id;
};

function repintar(){

    document.getElementById('presupuesto').innerHTML = "";
    document.getElementById('gastos-totales').innerHTML = "";
    document.getElementById('balance-total').innerHTML = "";
    document.getElementById('listado-gastos-completo').innerHTML = "";


    mostrarDatoEnId(gestion.mostrarPresupuesto(),"presupuesto");
    mostrarDatoEnId(gestion.calcularTotalGastos(),"gastos-totales");
    mostrarDatoEnId(gestion.calcularBalance(),"balance-total");
    for(let gasto of gestion.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
};

function actualizarPresupuestoWeb(){

    let presupuesto = prompt("Introduce un presupuesto");
    gestion.actualizarPresupuesto(parseFloat(presupuesto));
    repintar();
}

function nuevoGastoWeb(){

    let descripcion = prompt("Introduce la descripción");
    let valor = parseFloat(prompt("Introduce el valor"));
    let fecha = prompt("Introduce la fecha");
    let etiquetas = prompt("Introduce las etiquetas");
    let arr = etiquetas.split(', ');

    let gasto = new gestion.CrearGasto(descripcion,valor,fecha,arr);
    gestion.anyadirGasto(gasto);
    repintar();
};

function EditarHandle(){
    this.handleEvent = function(){
        let descripcion = prompt("Introduce la descripción");
        let valor = parseFloat(prompt("Introduce el valor"));
        let fecha = prompt("Introduce la fecha");
        let etiquetas = prompt("Introduce las etiquetas");
        let arr = etiquetas.split(', ');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.etiquetas = arr;
        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(){
        gestion.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function nuevoGastoWebFormulario(){
   let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
   var formulario = plantillaFormulario.querySelector("form");

   let dicControlesPrincipales = document.getElementById("controlesprincipales");
   dicControlesPrincipales.append(formulario);


   let botonAnyadir = document.getElementById("anyadirgasto-formulario");
   botonAnyadir.disabled = true;


   let botonSubmit = new SubmitHandle();
   formulario.addEventListener('submit', botonSubmit);


   let botonCancelar = formulario.querySelector("button.cancelar");
   let cancelar = new botonCancelarHandle();
   cancelar.buttonAnyadir = botonAnyadir;
   botonCancelar.addEventListener('click', cancelar);
}

function SubmitHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let datosFormulario = event.currentTarget;
        let descripcion = datosFormulario.elements.descripcion.value;
        let valor = parseFloat(datosFormulario.elements.valor.value);
        let fecha = datosFormulario.elements.fecha.value;
        let etiquetas = datosFormulario.elements.etiquetas.value;

        let gasto1 =new gestion.CrearGasto(descripcion,valor,fecha,etiquetas);
        gestion.anyadirGasto(gasto1);
        repintar();
        let id = document.getElementById("anyadirgasto-formulario");
        id.disabled = false;
    };
}

function botonCancelarHandle(){
    this.handleEvent = function(event){
        this.buttonAnyadir.disabled = false;
        document.getElementById("anyadirgasto-formulario").disabled = false;
        event.currentTarget.parentNode.remove();
        repintar();
    }
}

actualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb);

anyadirgasto.addEventListener("click", nuevoGastoWeb);

let anyadirgastoForm = document.getElementById("anyadirgasto-formulario");
anyadirgastoForm.addEventListener('click', nuevoGastoWebFormulario);

export	{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario
}