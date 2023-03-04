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


    let objBorrarApi = new borrarApi();
    objBorrarApi.gasto=gasto;

    let btnborrarApi = document.createElement('button');
    btnborrarApi.type="button";
    btnborrarApi.textContent="Borrar (API)";
    btnborrarApi.classList="gasto-borrar-api";

    btnborrarApi.addEventListener("click", objBorrarApi);
    gastoD.appendChild(btnborrarApi);  
    

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

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo ){
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = "";

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
    // Estilos
    elemento.style.width = "33%";
    elemento.style.display = "inline-block";
// Crear elemento <canvas> necesario para crear la gráfica
// https://www.chartjs.org/docs/latest/getting-started/
let chart = document.createElement("canvas");
// Variable para indicar a la gráfica el período temporal del eje X
// En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
let unit = "";
switch (periodo) {
case "anyo":
    unit = "year";
    break;
case "mes":
    unit = "month";
    break;
case "dia":
default:
    unit = "day";
    break;
}

// Creación de la gráfica
// La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
const myChart = new Chart(chart.getContext("2d"), {
    // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
    type: 'bar',
    data: {
        datasets: [
            {
                // Título de la gráfica
                label: `Gastos por ${periodo}`,
                // Color de fondo
                backgroundColor: "#555555",
                // Datos de la gráfica
                // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                data: agrup
            }
        ],
    },
    options: {
        scales: {
            x: {
                // El eje X es de tipo temporal
                type: 'time',
                time: {
                    // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                    unit: unit
                }
            },
            y: {
                // Para que el eje Y empieza en 0
                beginAtZero: true
            }
        }
    }
});
// Añadimos la gráfica a la capa
elemento.append(chart);
}

function repintar(){
    let element = document.getElementById("listado-gastos-completo")
    element.innerHTML = "";

    mostrarDatoEnId(gp.mostrarPresupuesto(), "presupuesto")
    mostrarDatoEnId("Gastos totales: " + gp.calcularTotalGastos(), "gastos-totales")
    mostrarDatoEnId("Balance total: " + gp.calcularBalance(), "balance-total")

    mostrarGastosAgrupadosWeb("agrupacion-dia",gp.agruparGastos("dia"),"día");
    mostrarGastosAgrupadosWeb("agrupacion-mes",gp.agruparGastos("mes"),"mes");
    mostrarGastosAgrupadosWeb("agrupacion-anyo",gp.agruparGastos("anyo"),"año");

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
        const formulario = event.currentTarget.parentElement;
        
        formulario.remove();
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

    let editargastoApi = formulario.querySelector("button.gasto-enviar-api")
    let apiEditar = new editarApi();
    apiEditar.formulario = formulario;
    apiEditar.gasto = this.gasto;
    editargastoApi.addEventListener("click", apiEditar)

    this.gastoD.appendChild(formulario)
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
    
    let enviargastoApi = formulario.querySelector("button.gasto-enviar-api")
    let apiEnviar = new enviarApi();
    apiEnviar.formulario = formulario;
    enviargastoApi.addEventListener("click", apiEnviar)

    document.getElementById("controlesprincipales").appendChild(formulario);
} 

document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

function filtrarGastosWeb(){
    this.handleEvent = function(event) {
        event.preventDefault()

        let desc = this.formulario.elements["formulario-filtrado-descripcion"].value
        let vMin = this.formulario.elements["formulario-filtrado-valor-minimo"].value
        let vMax = this.formulario.elements["formulario-filtrado-valor-maximo"].value
        let fechaInicial = this.formulario.elements["formulario-filtrado-fecha-desde"].value
        let fechaFinal = this.formulario.elements["formulario-filtrado-fecha-hasta"].value
        let etiquetas = this.formulario.elements["formulario-filtrado-etiquetas-tiene"].value

        let FiltrarPor = {
            fechaDesde: fechaInicial,
            fechaHasta: fechaFinal,
            valorMinimo: vMin,
            valorMaximo: vMax,
            descripcionContiene: desc,
            etiquetasTiene: etiquetas
        }

        let lgc = document.getElementById("listado-gastos-completo");
        lgc.innerHTML="";

        if(FiltrarPor.etiquetasTiene){
            FiltrarPor.etiquetasTiene = gp.transformarListadoEtiquetas(FiltrarPor.etiquetasTiene);
        }

        gp.filtrarGastos(FiltrarPor).forEach(gasto => {
            mostrarGastoWeb("listado-gastos-completo",gasto)
        })

    }
}
let fgw = new filtrarGastosWeb()
let filtrarGastosWebform = document.getElementById("formulario-filtrado")
fgw.formulario = filtrarGastosWebform;
filtrarGastosWebform.addEventListener("submit", fgw);


function guardarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        localStorage.setItem("GestorGastosDWEC", JSON.stringify(gp.listarGastos()));
    }
}

let btnGuardarGastos = document.getElementById("guardar-gastos");
btnGuardarGastos.addEventListener("click", new guardarGastosWeb());

function cargarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        if(localStorage.getItem("GestorGastosDWEC")){
            gp.cargarGastos(JSON.parse(localStorage.getItem("GestorGastosDWEC")));
        }else{
            gp.cargarGastos([]);
        }
        repintar();
    }
}

let btnCargarGastos = document.getElementById('cargar-gastos');
btnCargarGastos.addEventListener("click", new cargarGastosWeb());

function cargarGastosApi(){
    this.handleEvent = async function(evento){
        evento.preventDefault();
        cargarGastosApiFuncion()
    }
}

async function cargarGastosApiFuncion(){
    let usuario = document.getElementById("nombre_usuario").value;
    let gastosUsuario = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`);

    let json = await gastosUsuario.json();
    
    gp.cargarGastos(json);
    repintar();
}

function borrarApi(){
    this.handleEvent = async function(event){
        event.preventDefault();
        let usuario = document.getElementById("nombre_usuario").value;
        let idGasto = this.gasto.gastoId;
        
        await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${idGasto}`, {method:'DELETE'})
        cargarGastosApiFuncion();
    }
}

let btnCargarGastosAPI = document.getElementById('cargar-gastos-api');
btnCargarGastosAPI.addEventListener("click", new cargarGastosApi());


function enviarApi(){
    this.handleEvent = async function(event){
        event.preventDefault();
        
        let nuevoGasto = new gp.CrearGasto(
            this.formulario.elements.descripcion.value,
            Number(this.formulario.elements.valor.value),
            new Date(this.formulario.elements.fecha.value),
            gp.transformarListadoEtiquetas(this.formulario.elements.etiquetas.value)
        )

        let json = JSON.stringify(nuevoGasto);
        let usuario = document.getElementById("nombre_usuario").value;
        let userApi = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/` + usuario;
        
        await fetch(userApi, {method: 'POST', body: json, headers: {
            'Content-Type': 'application/json'
        }})
        cargarGastosApiFuncion();
    }
}

function editarApi(){
    this.handleEvent = async function(event){
        event.preventDefault();
        
        let nuevoGasto = new gp.CrearGasto(
            this.formulario.elements.descripcion.value,
            Number(this.formulario.elements.valor.value),
            new Date(this.formulario.elements.fecha.value),
            gp.transformarListadoEtiquetas(this.formulario.elements.etiquetas.value)
        )
        let json = JSON.stringify(nuevoGasto);
        let usuario = document.getElementById("nombre_usuario").value;
        let userApi = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/` + usuario + `/` + this.gasto.gastoId;
        
        await fetch(userApi, {method: 'PUT', body: json, headers: {
            'Content-Type': 'application/json'
        }})
        cargarGastosApiFuncion();
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