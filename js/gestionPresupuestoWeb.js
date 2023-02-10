//gestionPresupuestoWeb.js
// hacer el html menos horrible
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

//let h1Suma = 0;
function mostrarGastoWeb(idElemento, gasto)
{
    if (idElemento != undefined)
    {
        
        let elemento = document.getElementById(idElemento);
        let divGasto = document.createElement('div');

        let h1 = document.createElement("h1");
        h1.innerHTML = `Gasto:`;
        divGasto.append(h1);

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
        
        let bBorrarAPI = document.createElement("button");
        bBorrarAPI.className = "gasto-borrar-api";
        bBorrarAPI.type = "button";
        bBorrarAPI.innerHTML = "Borrar (API)";

        let BtnBorrarAPIHandle = new BorrarAPIHandle();
        BtnBorrarAPIHandle.gasto = gasto;
        bBorrarAPI.addEventListener("click", BtnBorrarAPIHandle);
        divGasto.append(bBorrarAPI);
/*
        
*/
        
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


        elemento.append(divGasto);

        //h1Suma++;
        return elemento;
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    

    if (idElemento != undefined)
    {
        // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código

    // Borrar el contenido de la capa para que no se duplique el contenido al repintar


        let id = document.getElementById(idElemento);
        
        let divAgrupacion = document.createElement('div');
        divAgrupacion.innerHTML = "";
        divAgrupacion.className = "agrupacion";

        let divH1 = document.createElement('h1');
        divH1.innerHTML += `Gastos agrupados por ${periodo}`;
        divAgrupacion.append(divH1);

        for(let key of Object.keys(agrup)){
            let divAgrupacionDato = document.createElement('div');
            divAgrupacionDato.className = "agrupacion-dato";
            let spanAgrupacionDatoClave = document.createElement('span');
            spanAgrupacionDatoClave.className = "agrupacion-dato-clave";
            spanAgrupacionDatoClave.innerHTML += `${key}`;//
            let spanAgrupacionDatoValor = document.createElement('span');
            spanAgrupacionDatoValor.className = "agrupacion-dato-valor";
            spanAgrupacionDatoValor.innerHTML += `${key.valueOf()}`;//
            divAgrupacion.append(divAgrupacionDato);
            divAgrupacionDato.append(spanAgrupacionDatoClave);
            divAgrupacionDato.append(spanAgrupacionDatoValor);
        }

        //
        // Estilos
        divAgrupacion.style.width = "33%";
        divAgrupacion.style.display = "inline-block";
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
    divAgrupacion.append(chart);
    //
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
    
    //terminar repintar
    document.getElementById("agrupacion-dia").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-dia", gesP.agruparGastos("dia"),"día");

    document.getElementById("agrupacion-mes").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-mes", gesP.agruparGastos("mes"),"mes");

    document.getElementById("agrupacion-anyo").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gesP.agruparGastos("anyo"),"año");

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
function BorrarAPIHandle(){
    this.handleEvent = async function(){
        let usuario = document.getElementById("nombre_usuario").value;
        let url =`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        fetch(url,{
            method: 'DELETE'
        })
        .then(function(response){
            if(response.ok){
                cargarGastosApi();
            }
        })
    }
}

function BtnAPIEnviarHandle(){
    this.handleEvent = async function(event){

        let form = event.currentTarget.form
        let gasto = {
            descripcion: form.descripcion.value,//this.formulario.descripcion.value,
            valor: form.valor.value,//this.formulario.valor.value,
            fecha: form.fecha.value,//this.formulario.fecha.value,
            etiquetas: (typeof form.etiquetas.value !== "undefined") ? form.etiquetas.value.split(",") : undefined,
        }
        
        let response = await fetch(
            `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${document.getElementById("nombre_usuario").value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(gasto)
        });
        
        if (response.ok) {
            cargarGastosApi();
        }
    
    }
}

function EditarAPIHandle(){
    this.handleEvent = async function(event){

        let form = event.currentTarget.form
        let gasto = {
            descripcion: form.descripcion.value,//this.formulario.descripcion.value,
            valor: form.valor.value,//this.formulario.valor.value,
            fecha: form.fecha.value,//this.formulario.fecha.value,
            etiquetas: (typeof form.etiquetas.value !== "undefined") ? form.etiquetas.value.split(",") : undefined,
        }
        
        let response = await fetch(
            `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${document.getElementById("nombre_usuario").value}/${this.gasto.gastoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(gasto)
        });
        
        if (response.ok) {
            cargarGastosApi();
        }
    
    }
}

function nuevoGastoWebFormulario()
{
    let plantillaForm = document.getElementById("formulario-template").content.cloneNode(true);;
    let form = plantillaForm.querySelector("form");

    let formControles = document.getElementById("controlesprincipales");
    formControles.append(form);
    
    let btnAnyadirGasto = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGasto.disabled = true;

    let btnEnviar = new EnviarFormHandle();
    form.addEventListener("submit", btnEnviar);

    let btnCancelar = formControles.querySelector("button.cancelar");
    let cancelar = new btnCancelarHandle();
    cancelar.buttonAnyadirGasto = btnAnyadirGasto;
    btnCancelar.addEventListener("click", cancelar);

    let BtnAPIEnviar = document.querySelector("button[class='gasto-enviar-api']");
    
        let enviarAPI = new BtnAPIEnviarHandle();

        BtnAPIEnviar.addEventListener('click', enviarAPI);


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
        btnEditarForm.append(form);
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

        let btnEditarAPIHandle = document.querySelector("button[class='gasto-enviar-api']");
        let editarAPIHandle = new EditarAPIHandle();
        editarAPIHandle.gasto = this.gasto;
        btnEditarAPIHandle.addEventListener('click', editarAPIHandle);
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

function cargarGastosWeb()
{
    let gastosCargados = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

    if((gastosCargados != null) && (gastosCargados.length >= 0))
        gesP.cargarGastos(gastosCargados)
    else {
        gesP.cargarGastos([]);
    }
    
    repintar();
}
let btnCargarGasto = document.getElementById('cargar-gastos');
btnCargarGasto.onclick = cargarGastosWeb;
async function cargarGastosApi()
{
    let usuario = document.getElementById("nombre_usuario").value;
    const resPost = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`);
    const post = await resPost.json();
    gesP.cargarGastos(post)
    repintar();
}
let btnCargarGastoApi = document.getElementById('cargar-gastos-api');
btnCargarGastoApi.onclick = cargarGastosApi;
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
    cargarGastosWeb,
    cargarGastosApi
}

