/* import gestionPresupuesto */
import * as gestionPresupuesto from './gestionPresupuesto.js';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento
//idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
// valor - El valor a mostrar.

// https://monsterlessons.com/project/series/rabota-s-dom-derevom-v-javascript -- GUIDE
// https://es.javascript.info/searching-elements-dom - getElementById y innerHTML
function mostrarDatoEnId(valor, idElemento){

    if(idElemento != undefined){
        document.getElementById(idElemento).innerHTML = ` ${valor}`;
    }    
}

// Modificación de la función mostrarGastoWeb en la Actividad 9
function mostrarGastoWeb(idElemento, gasto){
    
    if(idElemento !== undefined){
        let elemento = document.getElementById(idElemento);
        // gasto
        let divGasto = document.createElement('div');
        divGasto.className = 'gasto';
        divGasto.style = "margin: 10px; padding: 5px; border: 1px dotted; background-color: #E0FFFF"; // añado mi estilo para mejorar la vista
        
        // - - - - - - - - - - -
        // gasto-descripcion
        let divDesc = document.createElement('div');
        divDesc.className = 'gasto-descripcion';
        divDesc.textContent = gasto.descripcion;
        divGasto.append(divDesc);
        // gasto-fecha
        let divFecha = document.createElement('div');
        divFecha.className = 'gasto-fecha';
        divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
        divGasto.append(divFecha);
        // gasto-valor
        let divValor = document.createElement('div');
        divValor.className = 'gasto-valor';
        divValor.textContent = gasto.valor;
        divGasto.append(divValor);
        // gasto-etiquetas
        let divEtiquetas = document.createElement('div');
        divEtiquetas.className = 'gasto-etiquetas';
        
        for(let i = 0; i <gasto.etiquetas.length; i++){
            // gasto-etiquetas-etiqueta
            let contenidoEtiqueta = gasto.etiquetas[i];
            let spanEtiqueta = document.createElement('span');
            spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
            spanEtiqueta.textContent = contenidoEtiqueta + ' ';
            
            // HANDLE BORRAR ETIQUETA - - - - - - - - - - - - - - - - -
            let borrarEtiquetas = new BorrarEtiquetasHandle();
            borrarEtiquetas.gasto = gasto;
            borrarEtiquetas.etiqueta = gasto.etiquetas[i];
            spanEtiqueta.addEventListener('click', borrarEtiquetas);
            divEtiquetas.append(spanEtiqueta);   
        }

        divGasto.append(divEtiquetas);
        
        
        // - - - - - - - - - - - - - -
        
            // HANDLE - editar gasto  - - - - - - - - - - - - - - - - - - -
            let btnEditar = document.createElement('button');
            btnEditar.className = 'gasto-editar';
            btnEditar.type = 'button';
            btnEditar.textContent = 'Editar';
            btnEditar.style = "margin-left: 3px; margin-right: 3px";
    
            let editarHandle = new EditarHandle();
            editarHandle.gasto = gasto;
            btnEditar.addEventListener('click', editarHandle); // addEventListener nos permite utilizar un objeto como manejador de eventos.
            divGasto.append(btnEditar);
            
            // HANDLE - borrar gasto - - - - - - - - - - - - - - - - - - - -
            let btnBorrar = document.createElement('button');
            btnBorrar.className = 'gasto-borrar';
            btnBorrar.type = 'button';
            btnBorrar.textContent = 'Borrar';
            btnBorrar.style = "margin-left: 3px; margin-right: 3px";

            let borrarHandle = new BorrarHandle();
            borrarHandle.gasto = gasto;
            btnBorrar.addEventListener('click', borrarHandle); // addEventListener nos permite utilizar un objeto como manejador de eventos.
            divGasto.append(btnBorrar);
            
            // Actividad 9 -- -- -- -- -- -- -- -- -- -- -- -- -- --

            // gasto-borrar-api -- Manejador de eventos de los botones .gasto-borrar-api
            let btnBorrarApi = document.createElement("button");
            btnBorrarApi.className = "gasto-borrar-api";
            btnBorrarApi.type = "button";
            btnBorrarApi.textContent = "Borrar (API)";

            // HANDLE BORRAR API - - - - - - - - - - - - - - - - - - -
            let borrarApi = new BorrarApiHandle();
            borrarApi.gasto = gasto;
            btnBorrarApi.addEventListener("click", borrarApi);
            divGasto.append(btnBorrarApi);      

            // HANDLE - editar formulario gasto  - - - - - - - - - - - - - - - - - - - -

            let btnEditarForm = document.createElement('button');
            btnEditarForm.className = 'gasto-editar-formulario';
            btnEditarForm.type = 'button';
            btnEditarForm.textContent = 'Editar Form';
            btnEditarForm.style = "margin-left: 3px; margin-right: 3px";

            let editarFormHandle = new EditarHandleFormulario();
            editarFormHandle.gasto = gasto;
            editarFormHandle.btnEditarGasto = btnEditarForm;
            editarFormHandle.divGasto = divGasto;
            btnEditarForm.addEventListener('click',editarFormHandle);
            divGasto.append(btnEditarForm);
            
            elemento.append(divGasto); 
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ACTIVIDAD 10
    let divP =  document.getElementById(idElemento);
    divP.innerHTML = '';

    let txt  =  '<div class="agrupacion">' +
                '<h1>Gastos agrupados por '+ periodo + '</h1>';

    for (let i in agrup)
    {
        txt +=  '<div class= "agrupacion-dato">' +
                '<span class= "agrupacion-dato-clave">' + i + '</span>' +
                '<span class= "agrupacion-dato-valor">' + ' ' + agrup[i] + '</span>' +
                '</div>';
    }

    txt += '</div>';
    divP.innerHTML += txt;

    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
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
        type: 'line',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#FD1300",
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
    divP.append(chart);


    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ACTIVIDAD 10 // FIN

    
    /*
    // id = elemento
    let elemento = document.getElementById(idElemento);

    // <div class="agrupacion">
    let divAgrup = document.createElement('div');
    divAgrup.className = 'agrupacion';
    // - - - - - - - - - - - - - - 
    // <h1>Gastos agrupados por mes</h1>
    let h1Agrup = document.createElement('h1');
    h1Agrup.textContent = `Gastos agrupados por ${periodo}`;
    divAgrup.append(h1Agrup);
    
    //for(let i = 0; i < agrup.length; i++){
    for(let prop of Object.keys(agrup)){

        // <div class="agrupacion-dato">
        let divDato = document.createElement('div');
        divDato.className = 'agrupacion-dato';

        //<span class="agrupacion-dato-clave">2021-09</span>
        let spanDatoClave = document.createElement('span');
        spanDatoClave.className = 'agrupacion-dato-clave';
        spanDatoClave.textContent = `${prop} `;
        
        // <span class="agrupacion-dato-valor">5</span>
        let spanDatoValor = document.createElement('span');
        spanDatoValor.className = 'agrupacion-dato-valor';
        spanDatoValor.textContent = `${prop.valueOf()}`;

        divDato.append(spanDatoClave);
        divDato.append(spanDatoValor);
        divAgrup.append(divDato);
    }

    elemento.append(divAgrup);   

    return elemento; */  
}
        /* 
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">2021-09</span>
            <span class="agrupacion-dato-valor">5</span>
        </div>

        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">2021-10</span>
            <span class="agrupacion-dato-valor">39</span>
        </div>
        */
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// ACTIVIDAD 5

function repintar(){
    
    document.getElementById('presupuesto').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';
    document.getElementById('balance-total').innerHTML = '';

    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), 'presupuesto');
    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), 'gastos-totales');
    mostrarDatoEnId(gestionPresupuesto.calcularBalance(), 'balance-total');

    document.getElementById('listado-gastos-completo').innerHTML = '';

    let gastosListados = gestionPresupuesto.listarGastos();
    for(let i = 0; i < gastosListados.length; i++){
        mostrarGastoWeb('listado-gastos-completo', gastosListados[i]);
    }
}

// actualizarPresupuestoWeb
function actualizarPresupuestoWeb(){
        let presupuestoNuevo = prompt('Introduce un presupuesto: ');
        gestionPresupuesto.actualizarPresupuesto(parseFloat(presupuestoNuevo));
        repintar();
}
// nuevoGastoWeb
function nuevoGastoWeb()
{
    let desc = prompt('Introduce la descripción: ');
    let valor = parseFloat(prompt('Introduce el valor: '));
    let fecha = prompt('Introduce fecha (aaaa-mm-dd): ');
    let etiquetasTiene = prompt('Introduce las etiquetas: ');
    let etiquetas = etiquetasTiene.split(', ');

    let gasto = new gestionPresupuesto.CrearGasto(desc, valor, fecha, etiquetas);

    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}
// Actividad 7 - filtrarGastosWeb
function FiltrarGastosWeb()
{
    this.handleEvent = function(evento)
    {
        evento.preventDefault(); // enunciado 

        let etiquetasBuscar = new Array();
        let filtro = {};


        let descFunc = document.getElementById('formulario-filtrado-descripcion').value;

        let valorMinFunc = parseFloat(document.getElementById('formulario-filtrado-valor-minimo').value);
        let valorMaxFunc = parseFloat(document.getElementById('formulario-filtrado-valor-maximo').value);

        let fechaDesdeFunc = document.getElementById('formulario-filtrado-fecha-desde').value;
        let fechaHastaFunc = document.getElementById('formulario-filtrado-fecha-hasta').value;

        let etiquetasTiene = document.getElementById('formulario-filtrado-etiquetas-tiene').value;


        typeof etiquetasTiene != 'undefined' && etiquetasTiene != '' ? etiquetasBuscar = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene) : etiquetasTiene;

        typeof descFunc != 'undefined' && descFunc != '' ? filtro.descripcionContiene = descFunc : descFunc;

        typeof valorMinFunc != 'undefined' && !isNaN(valorMinFunc) && valorMinFunc != '' ?  filtro.valorMinimo = valorMinFunc : valorMinFunc;
        typeof valorMaxFunc != 'undefined' && !isNaN(valorMaxFunc) && valorMaxFunc!= '' ? filtro.valorMaximo = valorMaxFunc : valorMaxFunc;
        
        typeof fechaDesdeFunc != 'undefined' && fechaDesdeFunc != '' ? filtro.fechaDesde = fechaDesdeFunc : fechaDesdeFunc;
        typeof fechaHastaFunc != 'undefined' && fechaHastaFunc != '' ? filtro.fechaHasta = fechaHastaFunc : fechaHastaFunc;
        
        etiquetasBuscar.length > 0 ? filtro.etiquetasTiene = etiquetasBuscar : etiquetasBuscar;
           
        
        let filtroGasto = gestionPresupuesto.filtrarGastos(filtro);
        document.getElementById('listado-gastos-completo').innerHTML = ''; 

        filtroGasto.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-completo', gastoFiltrado);});

        
    };
}

// Handle Functions
function EditarHandle()
{
    this.handleEvent = function()
    {
        let etiquetas = new Array();
        let desc = prompt('Introduce la descripción: ');
        let valor = parseFloat(prompt('Introduce el valor: '));
        let fecha = prompt('Introduce fecha (aaaa-mm-dd): ');
        let etiquetasTiene = prompt('Introduce las etiquetas: ');
        
        etiquetas = etiquetasTiene.split(',');
        
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        this.gasto.etiquetas = etiquetas;
        repintar();
    };
}

function BorrarHandle()
{    
    this.handleEvent = function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// ACTIVIDAD 6
function nuevoGastoWebFormulario()
{
    document.getElementById('anyadirgasto-formulario').disabled = true; // desabilitar button Añadir Gasto (Formulario)
    // Clonar plantilla (template)
    let formTemplate = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = formTemplate.querySelector("form");

    let divFormControles = document.getElementById("controlesprincipales");
    divFormControles.appendChild(formulario);

    // submit form == enviar form
    formulario.addEventListener('submit', this.handleEvent = function(event)
    {
        event.preventDefault();

        let desc = formulario.elements.descripcion;
        let valor = formulario.elements.valor;
        let fecha = formulario.elements.fecha;
        let etiquetas = formulario.elements.etiquetas;

        etiquetas = etiquetas.value.split(',');
        
        let gasto = new gestionPresupuesto.CrearGasto(desc.value, parseFloat(valor.value), fecha.value, ...etiquetas);        
        gestionPresupuesto.anyadirGasto(gasto);
        
        document.getElementById('anyadirgasto-formulario').disabled = false;
        document.getElementById('controlesprincipales').removeChild(formulario);
        repintar();
    });
    // cancelar Form
    document.getElementById('controlesprincipales').append(formulario);    
    formulario.querySelector('button.cancelar').addEventListener('click', this.handleEvent = function()
    {
        document.getElementById('anyadirgasto-formulario').disabled = false;
        document.getElementById('controlesprincipales').removeChild(formulario);
        repintar();
    });

    // Actividad 9 Manejador de eventos del botón .gasto-enviar-api dentro de nuevoGastoWebFormulario
    formulario.querySelector("button.gasto-enviar-api").addEventListener("click",this.handleEvent= async function()
    {
        let desc = formulario.elements.descripcion;
        let valor = formulario.elements.valor;
        let fecha = formulario.elements.fecha;
        let etiquetas = formulario.elements.etiquetas;

        etiquetas = etiquetas.value.split(",");

        let gasto = new gestionPresupuesto.CrearGasto(desc.value, parseFloat(valor.value), fecha.value, ...etiquetas);
        let nombre_usuario = document.getElementById("nombre_usuario").value;

        let nuevoGastoApi = await fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombre_usuario, {method:'POST',headers:
        {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(gasto)});

        if (nuevoGastoApi.ok)
        {
            document.getElementById("anyadirgasto-formulario").disabled = false;
            document.getElementById("controlesprincipales").removeChild(formulario);
            cargarGastosApi();
        }
        else
            alert("Error: " + nuevoGastoApi.status);
            
        
    });
}
// HUNDLE evento 
// MODIFICADO Actividad 9 - Manejador de eventos del botón .gasto-enviar-api dentro de EditarHandleFormulario
function EditarHandleFormulario()
{    
    this.handleEvent = function()
    {
        let gastoForm = this.gasto;
        let btnEditarGasto = this.btnEditarGasto;
        let divGastoForm = this.divGasto;

        this.btnEditarGasto.disabled = true;
        // Clonar plantilla (template)
        let formTemplate = document.getElementById('formulario-template').content.cloneNode(true);;
        let formulario = formTemplate.querySelector('form');

        formulario.elements.descripcion.value = gastoForm.descripcion;
        formulario.elements.valor.value = gastoForm.valor;
        formulario.elements.fecha.value = new Date(gastoForm.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value = gastoForm.etiquetas.toString();
        
        divGastoForm.appendChild(formulario);
        // Editar Gasto
        formulario.addEventListener('submit', this.handleEvent = function(event)
        {
            let etiquetasFormulario = formulario.elements.etiquetas;          

            event.preventDefault();

            gastoForm.actualizarDescripcion(formulario.elements.descripcion.value);
            gastoForm.actualizarValor(parseFloat(formulario.elements.valor.value));
            gastoForm.actualizarFecha(formulario.elements.fecha.value);   

            etiquetasFormulario = etiquetasFormulario.value.split(',');

            gastoForm.borrarEtiquetas(...gastoForm.etiquetas);
            gastoForm.anyadirEtiquetas(...etiquetasFormulario);

            btnEditarGasto.disabled = false;
            divGastoForm.removeChild(formulario);

            repintar();
        });
        // cancelar Edición Gasto
        formulario.querySelector('button.cancelar').addEventListener('click', this.handleEvent = function()
        {
            btnEditarGasto.disabled = false;
            divGastoForm.removeChild(formulario);
            repintar();
        });

        // Actividad 9 - Manejador de eventos del botón .gasto-enviar-api dentro de EditarHandleFormulario
        formulario.querySelector("button.gasto-enviar-api").addEventListener("click", this.handleEvent = async function()
        {
            gasto.actualizarDescripcion(formulario.elements.descripcion.value);
            gasto.actualizarValor(parseFloat(formulario.elements.valor.value));
            gasto.actualizarFecha(formulario.elements.fecha.value);

            let etiquetasForm = formulario.elements.etiquetas;
            etiquetasForm = etiquetasForm.value.split(",");

            gasto.borrarEtiquetas(...gasto.etiquetas);
            gasto.anyadirEtiquetas(...etiquetasForm);

            btnEditarGasto.disabled = false;

            divGastoForm.removeChild(formulario);

            let nombre_usuario = document.getElementById("nombre_usuario").value;
            let gastoApi = await fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombre_usuario + "/" + gasto.gastoId, {method:'PUT',headers:
            {
                'Content-Type': 'application/json;charset=utf-8'
            },            
            body:JSON.stringify(gasto)});

            if (gastoApi.ok)
            {
                cargarGastosApi();
            }
            
            else
            {
                alert("Error: "+ gastoApi.status);
            }
        });
    }
}
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// ACTIVIDAD 8
function guardarGastosWeb()
{
    localStorage.GestorGastosDWEC=JSON.stringify(gestionPresupuesto.listarGastos()); // almacenamiento de localstorage denominada GestorGastosDWEC --> solo string
    // stringfy --> convierte a JSON string
}

function CargarGastosWeb()
{
    this.handleEvent = function()
    {
        let cargarGastos = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

        if((cargarGastos != null) && (cargarGastos.length >=0 ))
            gestionPresupuesto.cargarGastos(cargarGastos);
        
        repintar();
    }
}

function cargarGastosWeb()
{
    let cargarGastos = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

    if((cargarGastos != null) && (cargarGastos.length >= 0))
        gestionPresupuesto.cargarGastos(cargarGastos)
    else 
        gestionPresupuesto.cargarGastos([]);
    
    repintar();
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// ACTIVIDAD 9

//cargarGastosApi
async function cargarGastosApi()
{
    let nombre_usuario = document.getElementById("nombre_usuario").value;
    // Se encargará de obtener mediante fetch el listado de gastos a través de la API de servidor.
    let gastoApi = await fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombre_usuario);

    if (gastoApi.ok)
    {
        let json = await gastoApi.json(); 
        gestionPresupuesto.cargarGastos(json); // Una vez obtenida la lista de gastos de la API deberá llamar a la función cargarGastos del paquete js/gestionPresupuesto.js
        
        console.log(json);
        repintar(); //  llamar a la función repintar
    }
    
    else
    {
        alert("Error: " + gastoApi.status);
    }
}

// HANDLE BorrarApi 
function BorrarApiHandle()
{
    this.handleEvent = async function()
    {
        if (this.gasto.hasOwnProperty("gastoId"))
        {
            let nombre_usuario = document.getElementById("nombre_usuario").value;
            let gastoApi = await fetch("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombre_usuario + "/" + this.gasto.gastoId, {method:'DELETE'});

            (gastoApi.ok) ? cargarGastosApi() : alert("Error: " + gastoApi.status);
        }
        
        else
        {
            alert("Gasto no encontrado en la API.")
        }
    }
}


// * * * * BUTTONS * * * * 

// BUTTONES ACTIVIDAD 5
let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
btnActualizarPresupuesto.onclick = actualizarPresupuestoWeb;

let btnAnyadirGasto = document.getElementById('anyadirgasto');
btnAnyadirGasto.onclick = nuevoGastoWeb;

// BUTTONES ACTIVIDAD 6
let btnAnyadirFormulario = document.getElementById('anyadirgasto-formulario');
btnAnyadirFormulario.onclick = nuevoGastoWebFormulario;

// Actividad 7
let FormularioHandler = new FiltrarGastosWeb();

let form = document.getElementById('formulario-filtrado');
form.addEventListener('submit', FormularioHandler);

// Actividad 8
let btnGuardarGasto = document.getElementById('guardar-gastos');
btnGuardarGasto.onclick = guardarGastosWeb;

let btnCargarGasto = document.getElementById('cargar-gastos');
btnCargarGasto.onclick = cargarGastosWeb;

// Actividad 9
let btnCargarApi = document.getElementById("cargar-gastos-api");
btnCargarApi.onclick = cargarGastosApi;


// npx cypress open -- PARA HACER TEST GRÁFICO
// npm run test --> pasa todos los tests
// EXPORT
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    // - - - - - - -
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    // actividad 5
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    // actividad 6
    nuevoGastoWebFormulario,
    EditarHandleFormulario,
    // actividad 7
    FiltrarGastosWeb,
    // Actividad 8
    guardarGastosWeb,
    CargarGastosWeb,
    cargarGastosWeb,
    // Actividad 9 Una vez completada la petición, se deberá llamar a la función cargarGastosApi para actualizar la lista en la página.
    cargarGastosApi,
    BorrarApiHandle,

    


}

// Mis cosas
/*
    https://www.w3schools.com/jsref/event_onclick.asp
 */
