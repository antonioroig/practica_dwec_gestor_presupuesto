import * as gestion from './gestionPresupuesto.js';

function mostrarDatoEnId(valor,idElemento){
    
    if(idElemento !== undefined){
        let id = document.getElementById(idElemento);
        id.innerHTML += " " + valor;
    }
}

var h1Suma = 1;
function mostrarGastoWeb(idElemento, gasto){
    
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let h1 = document.createElement("h1");
    h1.innerHTML =`Filtrado ${h1Suma}`;
    divGasto.append(h1);

    let divGastoDes = document.createElement("div");
    divGastoDes.className = "gasto-descripcion";
    divGastoDes.innerHTML += gasto.descripcion;
    divGasto.append(divGastoDes);


    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    divGastoFecha.innerHTML += new Date(gasto.fecha).toLocaleDateString();
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
    divGasto.append(divGastoEtiqueta);


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

        let botonBorrarApi = document.createElement("button");
        botonBorrarApi.className = "gasto-borrar-api";
        botonBorrarApi.type = "button";
        botonBorrarApi.textContent = "Borrar (API)";

        let handleBorrarApi = new BorrarHandleApi();
        handleBorrarApi.gasto = gasto;
        botonBorrarApi.addEventListener("click",handleBorrarApi);
        divGasto.append(botonBorrarApi);



        let botonEditarForm = document.createElement("button");
        botonEditarForm.className = "gasto-editar-formulario";
        botonEditarForm.id = "gasto-editar-formulario";
        botonEditarForm.type = "button";
        botonEditarForm.textContent = "Editar (formulario)";

        let editarHandleFormulario = new EditarHandleFormulario();
        editarHandleFormulario.gasto = gasto;
        botonEditarForm.addEventListener("click", editarHandleFormulario);
        divGasto.append(botonEditarForm);


    id.append(divGasto);
    h1Suma++;
    return id;

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let id = document.getElementById(idElemento);

    let divAgrupacion = document.createElement("div");
    divAgrupacion.innerHTML = "";
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
        span2.innerHTML = `${key.valueOf}`;
        divAgrupacion.append(divAgrupacionDato);
        divAgrupacionDato.append(span);
        divAgrupacionDato.append(span2);
    }
   
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

    let agrupacion = gestion.agruparGastos("dia");
    mostrarDatoEnId("agrupacion-dia","");
    mostrarGastosAgrupadosWeb("agrupacion-dia",agrupacion,"día");

    agrupacion = gestion.agruparGastos("mes");
    mostrarDatoEnId("agrupacion-mes","");
    mostrarGastosAgrupadosWeb("agrupacion-mes",agrupacion,"mes");

    agrupacion = gestion.agruparGastos("anyo");
    mostrarDatoEnId("agrupacion-año","");
    mostrarGastosAgrupadosWeb("agrupacion-anyo",agrupacion,"año");
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

   let enviar = new EnviarHandleApi();
   enviar.formulario = formulario;
   formulario.querySelector("button[class='gasto-enviar-api']").addEventListener('click', enviar);
}

function SubmitHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let datosFormulario = event.currentTarget;
        let descripcion = datosFormulario.elements.descripcion.value;
        let valor = parseFloat(datosFormulario.elements.valor.value);
        let fecha = datosFormulario.elements.fecha.value;
        let etiquetas = datosFormulario.elements.etiquetas.value;

        let gasto1 = new gestion.CrearGasto(descripcion,valor,fecha,etiquetas);
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


function EditarHandleFormulario(){
    this.handleEvent = function(event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let divControlesPrincipales = document.getElementById("controlesprincipales");
        divControlesPrincipales.append(formulario);

        let botonEdit = event.currentTarget;
        botonEdit.after(formulario);
        botonEdit.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().split('T')[0];
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviarFormulario = new EnviarEditarHandle();
        enviarFormulario.gasto = this.gasto;
        formulario.addEventListener('submit', enviarFormulario);

        let cancelar = new botonCancelarHandle();
        cancelar.buttonAnyadir = botonEdit;
        let botonCancelar = formulario.querySelector("button.cancelar");
        botonCancelar.addEventListener('click', cancelar);

       
        let enviar = new EditarHandleApi();
        enviar.formulario = formulario;
        enviar.gasto = this.gasto;
        formulario.querySelector("button[class='gasto-enviar-api']").addEventListener('click', enviar);

    }
}

function EnviarEditarHandle(){
    this.handleEvent = function(event){
        event.preventDefault();

        let formulario = event.currentTarget;

        let descripcion = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = parseFloat(formulario.elements.valor.value);
        this.gasto.actualizarValor(valor);

        let fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiquetas);

        repintar();
    }
}

function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = event.currentTarget;

        let descripcion = formulario.elements["formulario-filtrado-descripcion"].value;
        let valorMin =  parseFloat(formulario.elements["formulario-filtrado-valor-minimo"].value);
        let valorMax = parseFloat(formulario.elements["formulario-filtrado-valor-maximo"].value);
        let fechaInicial = formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaFinal = formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetas = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;
        let etiquetasTienes;

        if(etiquetas.length > 0){
            etiquetasTienes = gestion.transformarListadoEtiquetas(etiquetas);
        }

        let gasto = {
            fechaDesde : fechaInicial,
            fechaHasta : fechaFinal,
            valorMinimo : valorMin,
            valorMaximo : valorMax,
            descripcionContiene : descripcion,
            etiquetasTiene : etiquetasTienes
        }

        document.getElementById("listado-gastos-completo").innerHTML = "";

        let Filtrado = gestion.filtrarGastos(gasto);

        Filtrado.forEach(g => {
            mostrarGastoWeb("listado-gastos-completo",g);
        })
    }
}

function guardarGastosWeb(){
    localStorage.GestorGastosDWEC=JSON.stringify(gestion.listarGastos());
}

function cargarGastosWeb(){
    let cargarGastos = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
    if(cargarGastos != null && cargarGastos.length >= 0){
        gestion.cargarGastos(cargarGastos);
    }else{
        gestion.cargarGastos([]);
    }
    repintar();
}

async function cargarGastosApi(){

        let usuario = document.getElementById("nombre_usuario").value;
        let rePost = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`);
        let post = await rePost.json();
        gestion.cargarGastos(post);
        repintar();
}

 function BorrarHandleApi(){
    this.handleEvent = async function(){

        let usuario = document.getElementById('nombre_usuario').value;
        
        fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`, 
        {
            method: "DELETE",
        })
        .then(function(response)
        {
            if(response.ok)
            {
                cargarGastosApi();
            }
            
        })   
          }
    }

 function EnviarHandleApi(){
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
 

 
 function EditarHandleApi(){
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


 let btnCargarGastosdApi = document.getElementById("cargar-gastos-api");
 btnCargarGastosdApi.onclick = cargarGastosApi;

let btnGuardarGastosWeb = document.getElementById("guardar-gastos");
btnGuardarGastosWeb.onclick = guardarGastosWeb;

let btnCargarGastos = document.getElementById("cargar-gastos");
btnCargarGastos.onclick = cargarGastosWeb;

let formularioFiltrado = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", formularioFiltrado);

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
    nuevoGastoWebFormulario,
    cargarGastosWeb,
    cargarGastosApi
}