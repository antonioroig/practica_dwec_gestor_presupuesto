import * as gestionPresupuesto from '../js/gestionPresupuesto.js';
import * as generarDatosEstaticos from '../js/generarDatosEstaticos.js';

function fecha4y2m2d(hoy = new Date()) {

    let y = hoy.getFullYear() + "-";

    let mes = hoy.getMonth() + 1;
    let m = "";
    if (mes < 10) {
        m = "0" + mes;
    } else {
        m += mes;
    }
    m += "-"

    let d = "";
    if (hoy.getDate() < 10) {
        d = "0" + hoy.getDate();
    } else {
        d += hoy.getDate()
    }
    
    let fecha = y + m + d
    return fecha;
}

function mostrarDatoEnId(idElemento, valor) {
    if(idElemento != undefined) {
        let div = document.getElementById(idElemento);
        //let valor = valor.toFixed(2);
        div.innerHTML += "" + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    if(idElemento != undefined){
        let div = document.getElementById(idElemento);

        let divgasto = document.createElement('div');
        divgasto.className = "gasto";

        let gastodes = document.createElement('div');
        gastodes.className = "gasto-descripcion";
        gastodes.innerHTML = gasto.descripcion;
        divgasto.append(gastodes);

        let gastofecha = document.createElement('div');
        gastofecha.className = "gasto-fecha";
        let fecha1 = new Date(gasto.fecha);
        let txtfecha = fecha1.toLocaleString();
        gastofecha.innerHTML = txtfecha;
        divgasto.append(gastofecha);

        let gastovalor = document.createElement('div');
        gastovalor.className = "gasto-valor";
        gastovalor.innerHTML = gasto.valor;
        divgasto.append(gastovalor);

        let gastoeti = document.createElement('div');
        gastoeti.className = "gasto-etiquetas";
        
        
        //if (gasto.etiquetas.length != undefined) {
        for (let i = 0; i < gasto.etiquetas.length; i++) {
            let eti = document.createElement('span');
            eti.className = "gasto-etiquetas-etiqueta";
            eti.innerHTML = gasto.etiquetas[i] + " ";

            let era = new BorrarEtiquetasHandle();
            era.gasto = gasto;
            era.etiqueta = gasto.etiquetas[i];

            eti.addEventListener("click", era)

            gastoeti.append(eti);
        }                       
        //}      

        divgasto.append(gastoeti);
        
        let editar = document.createElement('button');
        editar.className = "gasto-editar";
        editar.innerHTML = "Editar";

        let edit = new EditarHandle();
        edit.gasto = gasto;

        editar.addEventListener("click", edit);

        divgasto.append(editar);

        let borrar = document.createElement('button');
        borrar.className = "gasto-borrar";
        borrar.innerHTML = "Borrar";

        let eraser = new BorrarHandle();
        eraser.gasto = gasto;

        borrar.addEventListener("click", eraser);

        divgasto.append(borrar);

        let editF = document.createElement('button');
        editF.className = "gasto-editar-formulario";
        editF.innerHTML = "Editar (formulario)";

        let editForm = new EditarHandleformulario();
        editForm.gasto = gasto;

        editF.addEventListener("click", editForm);

        divgasto.append(editF);

        div.append(divgasto);      
    }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let div = document.getElementById(idElemento);

    let agrupacion = document.createElement('div');
    agrupacion.className = "agrupacion";

    let encabezado = document.createElement('h1');
    let claves = Object.keys(agrup);
    let long = claves.length;
    encabezado.innerHTML = "Gastos agrupados por " + periodo;
    
    agrupacion.append(encabezado);
    let valores = Object.values(agrup);

    for (let i = 0; i < long ; i++) {
        let agrupaciondato = document.createElement('div');
        agrupaciondato.className = "agrupacion-dato";

        let dataclave = document.createElement('span');
        dataclave.className = "agrupacion-dato-clave";    
        dataclave.innerHTML += claves[i];
        agrupaciondato.append(dataclave);

        let datavalor = document.createElement('span');
        datavalor.className = "agrupacion-dato-valor";
        datavalor.innerHTML += valores[i]; 
        agrupaciondato.append(datavalor); 

        agrupacion.append(agrupaciondato); 
    }
    div.append(agrupacion);
}

function repintar() {
    let div = document.getElementById("presupuesto");
    div.innerHTML = "";
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    div = document.getElementById("gastos-totales");
    div.innerHTML = "";
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    div = document.getElementById("balance-total");
    div.innerHTML = "";
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    div = document.getElementById("listado-gastos-completo"); 
    div.innerHTML = "";
    let listaGastos1 = gestionPresupuesto.listarGastos();
    for (let i = 0; i < listaGastos1.length; i++) {
        mostrarGastoWeb("listado-gastos-completo", listaGastos1[i]);
    }
}


function actualizarPresupuestoWeb() {
    let presupuesto = prompt("Introduce un presupuesto");
    let presupuesto_num;
    if (parseFloat(presupuesto)) {
        presupuesto_num = parseFloat(presupuesto);
    }
    gestionPresupuesto.actualizarPresupuesto(presupuesto_num);
    repintar();   
}

let boton_actualizar = document.getElementById("actualizarpresupuesto");
boton_actualizar.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce una descripción:");
    let valor = prompt("Introduce un valor:");
    let fecha = prompt("Introduce una fecha:", fecha4y2m2d());
    let etiquetas = prompt("Introduce las etiquetas:").split(",");

    valor = Number(valor);

    let newgasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(newgasto);

    repintar();
}

let boton_anyadirgasto = document.getElementById("anyadirgasto");
boton_anyadirgasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function() {
        let descripcion = prompt("Introduce una descripción:", this.gasto.descripcion);
        let valor = prompt("Introduce un valor:", this.gasto.valor);
        let fecha = new Date(this.gasto.fecha);
        fecha = prompt("Introduce una fecha:", fecha4y2m2d(fecha));
        let etis = "";

        valor = Number(valor);
        for (let i = 0; i < this.gasto.etiquetas.length; i++) {
            if (i < this.gasto.etiquetas.length - 1) {
                etis += this.gasto.etiquetas[i] + ",";
            } else {
                etis += this.gasto.etiquetas[i];
            }           
        };

        
        let etiquetas = prompt("Introduce las etiquetas:", etis).split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();     
    }
     
}

function BorrarHandle() {
    this.handleEvent = function() {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();     
    }    
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }    
}

function SubmitHandle(event) {
    this.handleEvent =  function(event) {
        event.preventDefault();
        let formsubmit = event.currentTarget;
        let newGasto = new gestionPresupuesto.CrearGasto(formsubmit.elements.descripcion.value, Number(formsubmit.elements.valor.value),
                                                        formsubmit.elements.fecha.value, ...formsubmit.elements.etiquetas.value.split(","));
        gestionPresupuesto.anyadirGasto(newGasto);    
        repintar();
        let btform = document.getElementById("anyadirgasto-formulario");
        btform.disabled = false;
    }   
}

function CancelHandle() {
    this.handleEvent =  function(event) {
        event.currentTarget.parentNode.remove();
        repintar();
        let btform = document.getElementById("anyadirgasto-formulario");
        btform.disabled = false;
    }   
}

function EditSubmit() {       
    this.handleEvent = function(event) {
        event.preventDefault();
        let formulario = event.currentTarget;
        this.gasto.actualizarDescripcion(formulario.elements.descripcion.value);
        this.gasto.actualizarValor(Number(formulario.elements.valor.value));
        this.gasto.actualizarFecha(formulario.elements.fecha.value);
        this.gasto.anyadirEtiquetas(...formulario.elements.etiquetas.value.split(","));
        repintar();
    }
}



function EditarHandleformulario() {
    this.handleEvent =  function(event) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let div = document.getElementById("controlesprincipales");
        div.append(formulario);

        let btEditform = event.currentTarget;
        btEditform.after(formulario);
        btEditform.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        let fecha = new Date(this.gasto.fecha);
        formulario.elements.fecha.value = fecha4y2m2d(fecha);

        let etis = "";
        for (let i = 0; i < this.gasto.etiquetas.length; i++) {
            if (i < this.gasto.etiquetas.length - 1) {
                etis += this.gasto.etiquetas[i] + ",";
            } else {
                etis += this.gasto.etiquetas[i];
            }           
        };

        formulario.elements.etiquetas.value = etis;

        let submit = new EditSubmit();
        submit.gasto = this.gasto;
        formulario.addEventListener("submit", submit); 

        let bt_cancelar = formulario.querySelector("button.cancelar");  
        let objCancel = new CancelHandle();
        bt_cancelar.addEventListener("click", objCancel);

        
    }  
}

function nuevoGastoWebFormulario() {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let div = document.getElementById("controlesprincipales");
    div.append(formulario);

    let submit = new SubmitHandle();

    formulario.addEventListener("submit", submit);  

    let bt_cancelar = formulario.querySelector("button.cancelar");  
    let objCancel = new CancelHandle();
    bt_cancelar.addEventListener("click", objCancel);

    let btform = document.getElementById("anyadirgasto-formulario");
    btform.disabled = true;

}

let bt_anyadir_gastoForm = document.getElementById("anyadirgasto-formulario");
bt_anyadir_gastoForm.addEventListener("click", nuevoGastoWebFormulario);

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}