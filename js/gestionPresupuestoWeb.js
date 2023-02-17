'use strict'
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(valor,idElemento) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);
}

/*
Primer mostrarGastoWeb
function mostrarGastoWeb(idElemento, gasto) {
    let elemento2 = document.getElementById(idElemento);

    //Creamos un div con class='gasto'.
    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';                                                                       

    let divDescripcion  = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion'; 
    divDescripcion.textContent = gasto.descripcion;
    //Para decir que está dentro del div divGasto:
    divGasto.appendChild(divDescripcion);

    let divFecha  = document.createElement('div');
    divFecha.className = 'gasto-fecha'; 
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiquetas';
    divGasto.appendChild(divGastoEtiquetas);
    
    //Ahora necesitamos un bucle para recorrer los gastos
    for(let i = 0; i < gasto.etiquetas.length; i++)
    {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent =  `${gasto.etiquetas[i]}\n`;
        divGastoEtiquetas.appendChild(spanEtiqueta);
    }
    elemento2.appendChild(divGasto);
}
*/

// mostrarGastoWeb modificado (práctica eventos)
function mostrarGastoWeb(idElemento, gasto){
    let elemento2 = document.getElementById(idElemento);

    //Creamos un div con class='gasto'.
    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';                                                                       

    let divDescripcion  = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion'; 
    divDescripcion.textContent = gasto.descripcion;
    //Para decir que está dentro del div divGasto:
    divGasto.appendChild(divDescripcion);

    let divFecha  = document.createElement('div');
    divFecha.className = 'gasto-fecha'; 
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiquetas';
    
    //Ahora necesitamos un bucle para recorrer los gastos
    gasto.etiquetas.forEach((etiqueta)=> 
        //i = 0; i < gasto.etiquetas.length; i++)
    {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent =  `${etiqueta} `;

        let borrarEtiquetas = new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiqueta = gasto.etiqueta;
        spanEtiqueta.addEventListener('click', borrarEtiquetas);
        divGastoEtiquetas.appendChild(spanEtiqueta);
    }
    );
    divGasto.appendChild(divGastoEtiquetas);
    elemento2.appendChild(divGasto);
    // boton editar
    let btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.type = 'button';
    btnEditar.className = 'gasto-editar';

    // objeto editar
    let objetoEditar = new EditarHandle();
    objetoEditar.gasto = gasto;
    btnEditar.addEventListener('click', objetoEditar); 
    divGasto.append(btnEditar);

    // boton borrar
    let btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'Borrar';
    btnBorrar.type = 'button';
    btnBorrar.className = 'gasto-borrar';

    // objeto borrar
    let objetoBorrar = new BorrarHandle();
    objetoBorrar.gasto = gasto;
    btnBorrar.addEventListener('click', objetoBorrar);
    divGasto.append(btnBorrar);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Inclusión de la práctica de async                                                                                       /
    // (gasto-borrar-api)                                                                                                      /

    // evento borrar API
    let eventoBorrarAPI = new BorrarGastoApiHandle();
    eventoBorrarAPI.gasto = gasto;

    // boton borrar API
    let btnBorrarAPI = document.createElement("button");
    btnBorrarAPI.className = "gasto-borrar-api";
    btnBorrarAPI.type = "button";
    btnBorrarAPI.textContent = "Borrar (API)";
    btnBorrarAPI.addEventListener('click', eventoBorrarAPI);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    let botonEditarForm = document.createElement('button');
    botonEditarForm.textContent = 'Editar Formulario';
    botonEditarForm.type = 'button';
    botonEditarForm.className = 'gasto-editar-formulario';

    let editarForm = new EditarHandleFormulario();
    editarForm.gasto = gasto;
    editarForm.divGasto = divGasto;
    editarForm.botonEditarForm = botonEditarForm;
    botonEditarForm.addEventListener('click', editarForm);

    divGasto.appendChild(botonEditarForm);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    /*
    let elemento3 = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = 'agrupacion';
    elemento3.append(divAgrupacion);

    let encabezado = document.createElement('h1');
    encabezado.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(encabezado);

    for( let [nombre, valor] of Object.entries( agrup ))
    {
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = 'agrupacion-dato';
        divAgrupacion.append(divAgrupacionDato);

        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent = nombre;
        divAgrupacionDato.append(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent = valor;
        divAgrupacionDato.append(spanValor);
    }
    */


    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
    let Agrup = "";


        for( let [nombre, valor] of Object.entries( agrup ) ){
            Agrup += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${nombre}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>
            `;
        }


        divP.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${Agrup}
            </div>
        `;

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
divP.append(chart);
}

// nueva práctica
function repintar(){

    /*
    //Limpia el contenido del div presupuesto, y lo muestra vacío.
    document.getElementById('presupuesto').innerHTML='';
    document.getElementById('gastos-totales').innerHTML='';
    document.getElementById('balance-total').innerHTML='';
    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), 'presupuesto');
    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), 'gastos-totales');
    mostrarDatoEnId(gestionPresupuesto.calcularBalance(), 'balance-total');
    */
    //Limpiamos toda la estructura HTML para volver a mostrarla vacía.
    let auxiliar = document.getElementById('listado-gastos-completo');
    auxiliar.innerHTML = '';
    gestionPresupuesto.listarGastos().forEach(gasto => {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    });

    let aux1 = document.getElementById("listado-gastos-filtrado-1");
    aux1.innerHTML="";
    gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}).forEach(a => {
        mostrarGastoWeb(a,"listado-gastos-filtrado-1");
    });

    let aux2 = document.getElementById("listado-gastos-filtrado-2");
    aux2.innerHTML = "";
    gestionPresupuesto.filtrarGastos({valorMinimo: 50}).forEach(a => {
        mostrarGastoWeb(a,"listado-gastos-filtrado-2");
    });

    let aux3 = document.getElementById("listado-gastos-filtrado-3");
    aux3.innerHTML = "";
    gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["guacamole"]}).forEach(a => {
        mostrarGastoWeb(a,"listado-gastos-filtrado-3");
    });

    let aux4 = document.getElementById("listado-gastos-filtrado-4");
    aux4.innerHTML = "";
    gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["arroz" , "aceite"]}).forEach(a => {
        mostrarGastoWeb(a,"listado-gastos-filtrado-4");
    });

    document.getElementById("agrupacion-dia").innerHTML="";
    mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "día");

    document.getElementById("agrupacion-mes").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");

    document.getElementById("agrupacion-anyo").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "año");
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduzca un presupuesto nuevo: ');
    presupuesto = parseFloat(presupuesto);
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}
let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce la descripción del gasto');
    let valor = prompt('Introduce el valor del gasto'); //Utilizamos el parseFloat para convertir el string respuesta en número con decimales.
    valor = parseFloat(valor);
    let fecha = prompt('Introduce la fecha del gasto en formato yyyy-mm-dd');
    let etiqueta = prompt('Introduce las etiquetas del gasto separadas por ,');
    let etiquetas= etiqueta.split(','); //Eliminamos las ','.
    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}
let botonNuevo = document.getElementById('anyadirgasto');
botonNuevo.addEventListener('click', nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function (event)
    {
        let descripcion = prompt("Introduzca la descripcion: ");
        let valor = prompt("introduzca el valor: ");
        valor = parseFloat(valor);
        let fecha = prompt("Introduzca la fecha: ");
        let etiqueta = prompt("Introduzca las etiquetas separadas por comas ,: ");
        let etiquetas  = etiqueta.split(',');

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id); // Pasamos el id del gasto a borrar.
        repintar();
    };
}

function BorrarEtiquetasHandle() 
{
    this.handleEvent = function ()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}


// Práctica 6
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector('form');

    let divControlesPrincipales = document.getElementById('controlesprincipales');
    divControlesPrincipales.append(formulario);

    document.getElementById('anyadirgasto-formulario').setAttribute('disabled', '');

    let enviarForm = new EnviarHandleFormulario();
    formulario.addEventListener("submit", enviarForm);

    let cancelarForm = new CancelarHandleFormulario(); 
    cancelarForm.formulario = formulario;
    let botonCancelar = formulario.querySelector('button.cancelar');
    botonCancelar.addEventListener('click', cancelarForm); 
  

    //Botón del método de la práctica async
    let apiEnviar = formulario.querySelector("button.gasto-enviar-api");
    apiEnviar.addEventListener("click", new EnviarGastoApi);

    repintar();
}
let botonNuevoGasto = document.getElementById('anyadirgasto-formulario');
botonNuevoGasto.addEventListener('click', nuevoGastoWebFormulario);


function EnviarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = new Date(formulario.elements.fecha.value);
        let etiquetas = toString(formulario.elements.etiquetas.value).split(',');
        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        gestionPresupuesto.anyadirGasto(nuevoGasto);
        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
        repintar();
    }
}

function CancelarHandleFormulario(){
    this.handleEvent = function(event)
    {
        this.formulario.remove();
        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
  
    }
}


function EditarHandleFormulario(){
    this.handleEvent = function(){

        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector('form');
    
        this.divGasto.append(formulario);

        formulario.elements.descripcion.value=this.gasto.descripcion;
        formulario.elements.valor.value=this.gasto.valor;
        formulario.elements.fecha.value=this.gasto.fecha;
        formulario.elements.etiquetas.value=this.gasto.etiquetas;

        let enviarForm = new EnviarHandleEditarFormulario();
        enviarForm.gasto = this.gasto;
        enviarForm.formulario = formulario;
        formulario.addEventListener("submit", enviarForm);

        this.botonEditarForm.setAttribute('disabled','')

        let cancelarForm = new CancelarHandleEditarFormulario(); 
        cancelarForm.formulario = formulario;
        cancelarForm.botonEditarForm = this.botonEditarForm;
        cancelarForm.formulario = formulario;
        let botonCancelar = formulario.querySelector('button.cancelar');
        botonCancelar.addEventListener('click', cancelarForm); 

        let editarFormularioApi = formulario.querySelector("button.gasto-enviar-api");
        let eventEditar = new EditarGastoApi();
        eventEditar.gasto = this.gasto;
        editarFormularioApi.addEventListener("click", eventEditar);  

    }
}
function CancelarHandleEditarFormulario(){
    this.handleEvent = function(event)
    {
        this.formulario.remove();
        this.botonEditarForm.removeAttribute("disabled");
    }
}
function EnviarHandleEditarFormulario(){
    this.handleEvent = function(event)
    {
        event.preventDefault();

        this.gasto.descripcion = this.formulario.elements.descripcion.value;

        this.gasto.valor = Number(this.formulario.elements.valor.value);

        this.gasto.fecha = new Date(this.formulario.elements.fecha.value);

        this.gasto.etiquetas = this.formulario.elements.etiquetas.value.split(",");

        repintar();
    };
}

// Práctica Regexp
function filtrarGastoWeb(){
    this.handleEvent = function(event) 
    {
        event.preventDefault();
        let formulario = event.currentTarget;
        let descripcion1 = formulario.elements["formulario-filtrado-descripcion"].value;
        let valorMinimo1 = parseFloat(formulario.elements["formulario-filtrado-valor-minimo"].value);
        let valorMaximo1 = parseFloat(formulario.elements["formulario-filtrado-valor-maximo"].value);
        let fechaDesde1 = new Date(formulario.elements["formulario-filtrado-fecha-desde"].value);
        let fechaHasta1 = new Date(formulario.elements["formulario-filtrado-fecha-hasta"].value);
        let etiqueta = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;
        
        if (etiqueta !== undefined) {
            etiqueta = gestionPresupuesto.transformarListadoEtiquetas(etiqueta);
        }
        // Creo el objeto para pasarle el objeto entero a filtrarGastos.
        let filtrado = ({fechaDesde : fechaDesde1, fechaHasta : fechaHasta1, valorMinimo : valorMinimo1, valorMaximo : valorMaximo1, descripcionContiene : descripcion1, etiquetasTiene : etiqueta});
        let formularioFiltrado = gestionPresupuesto.filtrarGastos(filtrado); // almaceno el objeto filtrado en otro objeto
        document.getElementById("listado-gastos-completo").innerHTML="";
        for (let gastoForm of formularioFiltrado) {
            mostrarGastoWeb("listado-gastos-completo",gastoForm);
        }
    };
}

let erFiltrar = new filtrarGastoWeb();
let formulario = document.getElementById("formulario-filtrado");
formulario.addEventListener("submit", erFiltrar);

// Práctica almacenamiento

function guardarGastosWeb()
{
    this.handleEvent = function() 
    {
        let listarGastos = gestionPresupuesto.listarGastos();
        localStorage.GestorGastosDWEC = JSON.stringify(listarGastos);
    }
}

let listar = new guardarGastosWeb();
let listarForm = document.getElementById("guardar-gastos");
listarForm.addEventListener("click", listar);

function cargarGastosWeb() 
{
    this.handleEvent = function() 
    {
        if (localStorage.GestorGastosDWEC == null) 
            gestionPresupuesto.cargarGastos([]);
        else 
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
        repintar();    
    }
}

let cargar = new cargarGastosWeb();
let cargarForm = document.getElementById("cargar-gastos");
cargarForm.addEventListener("click", cargar);


// Práctica Async

function CargarGastosApi(){
    let usuario = document.getElementById('nombre_usuario').value;
    if(usuario != '')
    {
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

        fetch(url, {

            method: "GET",
        })
        .then(response => response.json())

        .then(function(gastosAPI)
        {
            gestionPresupuesto.cargarGastos(gastosAPI);
            repintar();
        })
        .catch(err => alert(err));
    }else
    {
        alert('Introduzca un usuario');
    }
}

//let apiCargar = new cargarGastosWeb();
let botonCargaApi = document.getElementById("cargar-gastos-api");
botonCargaApi.addEventListener("click", CargarGastosApi);

function BorrarGastoApiHandle()
{
   
    this.handleEvent = function(event){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        if (usuario == "")
        {
            console.log("Campo vacio");
        }
        else
        {
            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(datos => {
                if(!datos.errorMessage)
                {
                    CargarGastosApi();
                }
                else
                {
                    console.log(datos.errorMessage);
                }
            })
            .catch(err => console.error(err));
        }
    }
}

function EnviarGastoApi(event)
{
    this.handleEvent = function(event)
    {

    let usuario = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
   
    let form = event.currentTarget.form;
    let descripcion = form.elements.descripcion.value;
    let valor = form.elements.valor.value;
    let fecha = form.elements.fecha.value;
    let etiquetas = form.elements.etiquetas.value;
    valor = parseFloat(valor);
    etiquetas = etiquetas.split(",");

    let nObjeto = {
        descripcion: descripcion,
        fecha: fecha,
        valor: valor,
        etiquetas: etiquetas
    }

    console.log(nObjeto);

    if(usuario == "")
    {
        console.log("No ha introducido el nombre de usuario");
    }
   
    else
    {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(nObjeto),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
           
            if(response.ok)
            {
                console.log("Se ha añadido Correctamente");
                CargarGastosApi();
            }
           
            else
            {
                console.log("Se ha añadido Incorrectamente");
            }
        })
        .catch(err => console.error(err));
    }
  }
}

function EditarGastoApi()
{

    this.handleEvent = function(event){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
       
        let form = event.currentTarget.form;
        let descripcion = form.elements.descripcion.value;
        let valor = form.elements.valor.value;
        let fecha = form.elements.fecha.value;
        let etiquetas = form.elements.etiquetas.value;

        valor = parseFloat(valor);
        etiquetas = etiquetas.split(",");
   
        let nObjeto = {
            descripcion: descripcion,
            fecha: fecha,
            valor: valor,
            etiquetas: etiquetas
        }

        if(usuario == ""){
            console.log("No ha introducido el nombre de usuario");
        } else {
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(nObjeto),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
               
                if(response.ok){
                    console.log("Modificacion correcta");
                    CargarGastosApi();
                }else{
                    console.log("Modificacion INcorrecta");
                }
            })
            .catch(err => console.error(err));
        }
    }
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}