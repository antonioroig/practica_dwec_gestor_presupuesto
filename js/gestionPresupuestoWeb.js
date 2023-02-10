import * as ges from "./gestionPresupuesto.js";


function mostrarDatoEnId(valor,idElemento){
    if(idElemento !== undefined){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }
}
var h1Suma = 0;
function mostrarGastoWeb(idElemento,gasto){
    
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    
    let h1 = document.createElement("h1");
    h1.innerHTML = `Filtrado ${h1Suma}`;
    divGasto.append(h1);

    let divGD = document.createElement("div");
    divGD.className = "gasto-descripcion";
    divGD.innerHTML += gasto.descripcion;
    divGasto.append(divGD);

    let divF = document.createElement("div");
    divF.className = "gasto-fecha";
    divF.innerHTML += new Date(gasto.fecha).toLocaleDateString();
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

    let btnBorrarApi = document.createElement("button");
    btnBorrarApi.className = "gasto-borrar-api";
    btnBorrarApi.type = "button";
    btnBorrarApi.innerHTML = "Borrar (API)";

    let handleBorrarGastosApi = new BorrarHandleGastosApi();
    handleBorrarGastosApi.gasto = gasto;
    btnBorrarApi.addEventListener('click',handleBorrarGastosApi);
    divGasto.append(btnBorrarApi);

    let btnEditarFormulario = document.createElement("button");
    btnEditarFormulario.className = "gasto-editar-formulario";
    btnEditarFormulario.id = "gasto-editar-formulario";
    btnEditarFormulario.type = "button"
    btnEditarFormulario.textContent = "Editar (formulario)";

    let handleEditarFormulario = new EditarHandleFormulario();
    handleEditarFormulario.gasto = gasto;
    btnEditarFormulario.addEventListener('click' , handleEditarFormulario);
    divGasto.append(btnEditarFormulario);
    
    id.append(divGasto);
    h1Suma++;
    return id;
    
}

function BorrarHandleGastosApi(){
    this.handleEvent =  async function(){
    let usuario = document.getElementById("nombre_usuario").value;
        let url =`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        fetch(url,
        { 
            method: 'DELETE'
        })
        .then(function(response)
        {
            if(response.ok){
            cargarGastosApi();
            }
        })
        
    } 
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
        // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    let id = document.getElementById(idElemento);

    let divAgrupado = document.createElement("div");
    divAgrupado.innerHTML = "";
    divAgrupado.className = "agrupacion";

    let divAgrupadoH1 = document.createElement("h1");
    divAgrupadoH1.innerHTML += `Gastos agrupados por ${periodo}`;
    divAgrupado.append(divAgrupadoH1);

    for(let key of Object.entries(agrup)){
        let divAgrupacionDato = document.createElement("div");
        divAgrupacionDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.innerHTML = `Fecha : ${key[0]} `;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.innerHTML = ` Valor: ${key[1]}`;

        divAgrupacionDato.append(spanClave);
        divAgrupacionDato.append(spanValor);
        divAgrupado.append(divAgrupacionDato);
        

    }
    // Estilos
    divAgrupado.style.width = "33%";
    divAgrupado.style.display = "inline-block";
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
divAgrupado.append(chart);
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

    document.getElementById('agrupacion-dia').innerHTML="";
    mostrarGastosAgrupadosWeb('agrupacion-dia', ges.agruparGastos('dia'), 'día');

    document.getElementById('agrupacion-mes').innerHTML="";
    mostrarGastosAgrupadosWeb('agrupacion-mes', ges.agruparGastos('mes'), 'mes');

    document.getElementById('agrupacion-anyo').innerHTML="";
    mostrarGastosAgrupadosWeb('agrupacion-anyo', ges.agruparGastos('anyo'), 'año');
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

   let dicControlesPrincipales = document.getElementById("controlesprincipales");
   dicControlesPrincipales.append(formulario);


   let botonAnyadir = document.getElementById("anyadirgasto-formulario");
   botonAnyadir.disabled = true;


   let botonSubmit = new SubmitHandle();
   formulario.addEventListener('submit', botonSubmit);


   let botonCancelar = formulario.querySelector("button.cancelar");
   let cancelar = new btnCancelarHandle();
   cancelar.buttonAnyadir = botonAnyadir;
   botonCancelar.addEventListener('click', cancelar);

   let enviar = new btnEnviarApiHandle();
   enviar.formulario = formulario;
   formulario.querySelector("button[class='gasto-enviar-api']").addEventListener('click', enviar);

}
function btnEnviarApiHandle(){
    this.handleEvent = async function(){
        let gasto = {
            descripcion: this.formulario.descripcion.value,
            valor: this.formulario.valor.value,
            fecha: this.formulario.fecha.value,
            etiquetas: (typeof this.formulario.etiquetas.value !== "undefined") ? this.formulario.etiquetas.value.split(",") : undefined,
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
        
        let editar = new EditarApiHandle();
        editar.formulario = formulario;
        editar.gasto = this.gasto;
        formulario.querySelector("button[class='gasto-enviar-api']").addEventListener('click', editar);
        
    }
}
function EditarApiHandle(){
    this.handleEvent = async function(){
        let gasto = {
            descripcion: this.formulario.descripcion.value,
            valor: this.formulario.valor.value,
            fecha: this.formulario.fecha.value,
            etiquetas: (typeof this.formulario.etiquetas.value !== "undefined") ? this.formulario.etiquetas.value.split(",") : undefined,
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


async function  cargarGastosApi(){
    let usuario = document.getElementById("nombre_usuario").value;
    const resPost = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`);
    const post = await resPost.json();
    ges.cargarGastos(post);
    repintar();
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
    cargarGastosApi,

}
