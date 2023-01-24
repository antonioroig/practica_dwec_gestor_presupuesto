import * as gestionPresupuesto from './gestionPresupuesto.js';
"use strict";

function mostrarDatoEnId(idElemento,valor){
    let idE = document.getElementById(idElemento);
    idE.innerHTML += valor;
};

function mostrarGastoWeb(idElemento,gasto){
    let id = document.getElementById(idElemento);

    let divGastos = document.createElement('div');
    divGastos.className = 'gasto';
    id.append(divGastos);

    let divDesc = document.createElement('div');
    divDesc.className = 'gasto-descripcion';
    divDesc.textContent = gasto.descripcion;
    divGastos.append(divDesc);

    let divDate = document.createElement('div');
    divDate.className = 'gasto-fecha';
    divDate.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGastos.append(divDate);

    let divValue = document.createElement('div');
    divValue.className = 'gasto-valor';
    divValue.textContent = gasto.valor + "";
    divGastos.append(divValue);

    let divEtiq = document.createElement('div');
    divEtiq.className = 'gasto-etiquetas';
    for(let etiqueta of gasto.etiquetas){
        let span = document.createElement('span');
        span.className = 'gasto-etiquetas-etiqueta';
        span.textContent = etiqueta;
        divEtiq.append(span);

        let etiquetaBorradas = new BorrarEtiquetasHandle(gasto);
        etiquetaBorradas.gasto = gasto;
        etiquetaBorradas.etiquetas = etiqueta;
        span.addEventListener("click", etiquetaBorradas)
    }
    divGastos.append(divEtiq);

    //Modificación de la función
    let editarBut = document.createElement('button');
    editarBut.type = 'button';
    editarBut.className = 'gasto-editar';
    editarBut.textContent = 'Editar';
    
    let editarNuevo = new EditarHandle(gasto);
    editarNuevo.gasto = gasto;
    editarBut.addEventListener("click", editarNuevo);
    divGastos.append(editarBut);

    let borrarBut = document.createElement('button');
    borrarBut.className = 'gasto-borrar';
    borrarBut.type = 'button';
    borrarBut.textContent = 'Borrar';
    
    let borrarNuevo = new BorrarHandle(gasto);
    borrarNuevo.gasto = gasto;
    borrarBut.addEventListener("click", borrarNuevo);
    divGastos.append(borrarBut);

    //Botón de borrar API
    let borrarAPI = document.createElement('button');
    borrarAPI.className = 'gasto-borrar-api';
    borrarAPI.type = 'button';
    borrarAPI.textContent = 'Borrar (API)';

    let borrarHandleAPI = new BorrarGastosApi(gasto);
    borrarHandleAPI.gasto = gasto;
    borrarAPI.addEventListener("click", borrarHandleAPI);
    divGastos.append(borrarAPI);


    let editarHandleForm = document.createElement('button');
    editarHandleForm.className = 'gasto-editar-formulario';
    editarHandleForm.type = 'button';
    editarHandleForm.textContent = 'Editar (Formulario)';

    let editarHandle = new EditarHandleFormulario(gasto);
    editarHandle.gasto = gasto;
    editarHandleForm.addEventListener("click", editarHandle);
    divGastos.append(editarHandleForm); 
};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
// Obtener la capa donde se muestran los datos agrupados por el período indicado.
// Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
// Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
// Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";

    let div = `<div class="agrupacion"> <h1>Gastos agrupados por ${periodo}</h1>`;
    for(let agrupacion in agrup){
        div +=`<div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${agrupacion}</span>
                <span class="agrupacion-dato-valor">${agrup[agrupacion]}</span>
            </div>`;
    }
    div += '</div>';
    divP.innerHTML = div;
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
};

function repintar(){
    //Mostrar presupuesto en div#presupuesto
    document.getElementById("presupuesto").innerHTML = "";
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    //Mostrar gastos totales en div#gastos-totales
    document.getElementById("gastos-totales").innerHTML = "";
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    //Mostrar el balance total en div#balance-total
    document.getElementById("balance-total").innerHTML = "";
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    //Borrar el contenido de div#listado-gastos-completo
    document.getElementById("listado-gastos-completo").innerHTML = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo
    document.getElementById("listado-gastos-completo").innerHTML = "";
    for(let element of gestionPresupuesto.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", element);
    }
    
};

function actualizarPresupuestoWeb(){
    //Pedir al usuario que introduzca un presupuesto
    let pres = prompt("Introduce un presupuesto");
    //Convertir el valor a número
    pres = parseInt(pres);
    //Actualizar el presupuesto
    gestionPresupuesto.actualizarPresupuesto(pres);
    //Llamar a la función repintar
    repintar();
};

function nuevoGastoWeb(){
    let descripcion = prompt("Introduce una descripción:");
    let valor = parseFloat(prompt("Introduce un valor:"));
    let fecha = Date.parse(prompt("Introduce la fecha:"));
    let etiquetas = prompt("Introduce las etiquetas:").split(',');

    gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas));

    repintar();
};

function EditarHandle(){
    this.handleEvent = function(event){
        let descripcion = prompt("Introduce una descripción:");
        let valor = parseFloat(prompt("Introduce un valor:"));
        let fecha = Date.parse(prompt("Introduce la fecha:"));
        let etiquetas = prompt(("Introduce las etiquetas:").split(','));
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
};

function BorrarHandle(){
    this.handleEvent = function(event){
        let borrarHandle = this.gasto.id;
        gestionPresupuesto.borrarGasto(borrarHandle);
        repintar();
    }
};

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    };
};

//Función nuevo gasto web formulario
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");
    
    let divControles = document.getElementById('controlesprincipales');
    divControles.append(formulario);

    document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");

    let cancel = new CancelarHandleFormulario();
    let butCancel = formulario.querySelector("button.cancelar");
    butCancel.addEventListener("click", cancel); 

    let enviadorForm = new EnviarHandleFormulario();
    formulario.addEventListener("submit", enviadorForm);

    //Botón enviar Api
    let enviarAPI = formulario.querySelector('button.gasto-enviar-api');
    enviarAPI.addEventListener("click", enviarGastosApi);
};

function EditarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");

        let divControles = document.getElementById('controlesprincipales');
        divControles.append(formulario);
        
        let editForm = event.currentTarget;
        editForm.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        
        let cancel = new CancelarHandleFormulario();
        let butCancel = formulario.querySelector("button.cancelar");
        butCancel.addEventListener("click", cancel);

        let enviador = new EnviarHandle();
        enviador.gasto = this.gasto;

        formulario.addEventListener("submit", enviador);

        editForm.setAttribute("disabled", "");

        //Botón Editar Api
        let editarAPI = new EditarGastosApi();
        editarAPI.gasto = this.gasto;
        formulario.querySelector('button.gasto-enviar-api').addEventListener("click", editarAPI);
    }
};
function CancelarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();

        event.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
};

function EnviarHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = event.currentTarget;

        let descripcion = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = parseFloat(formulario.elements.valor.value);
        this.gasto.actualizarValor(valor);

        let fecha = Date.parse(formulario.elements.fecha.value);
        this.gasto.actualizarFecha(fecha);

        let etiquetas = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
};
function EnviarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = event.currentTarget;

        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = Date.parse(formulario.elements.fecha.value);
        let etiquetas = formulario.elements.etiquetas.value;

        gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas));
        repintar();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
};

function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let desc = document.getElementById("formulario-filtrado-descripcion").value;
        let minValor = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let MaxValor = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let fechaInicial = document.getElementById("formulario-filtrado-fecha-desde").value;
        let fechaFinal = document.getElementById("formulario-filtrado-fecha-hasta").value;
        let eti = document.getElementById("formulario-filtrado-etiquetas-tiene").value;

        let miFiltrado = [];

        if(eti.length > 0){
            miFiltrado.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(eti);
        }

        miFiltrado.descripcionContiene = desc;
        miFiltrado.valorMinimo = minValor;
        miFiltrado.valorMaximo = MaxValor;
        miFiltrado.fechaDesde = fechaInicial;
        miFiltrado.fechaHasta = fechaFinal;

        document.getElementById("listado-gastos-completo").innerHTML = "";
        let miFiltro = gestionPresupuesto.filtrarGastos(miFiltrado);

        for(let misGastosCompletos of miFiltro){
            mostrarGastoWeb("listado-gastos-completo",misGastosCompletos);
        };
    };
};

function guardarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        localStorage.setItem('GestorGastosDWEC', JSON.stringify(gestionPresupuesto.listarGastos()));
    };
};

function cargarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let miArrayGastos = JSON.parse(localStorage.getItem('GestorGastosDWEC'));

        if(miArrayGastos != null)
            gestionPresupuesto.cargarGastos(miArrayGastos);
        else{
            miArrayGastos = [];
            gestionPresupuesto.cargarGastos(miArrayGastos);
        }
        repintar();
    };
};

function cargarGastosApi(){ 
    let user = document.getElementById('nombre_usuario').value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;

    if(user == null || user == ""){
        alert("Debes introducir un nombre de usuario");
    }
    fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(mis_gastos =>{
        gestionPresupuesto.cargarGastos(mis_gastos);
        console.log(mis_gastos);
        repintar();
    })
    .catch(error => console.log(error));
};

function BorrarGastosApi(){
    this.handleEvent = function(event){
        event.preventDefault();
        let user = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;
        
        if(user == null || user == ""){
            alert("El nombre de usuario está vacío");
        }
        try{
            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(mis_datos => {
                console.log(mis_datos);
                console.log("Gasto borrado");
            cargarGastosApi()});
        }
        catch{(error => console.log(error))};
    };
};

function enviarGastosApi(e){
    let user = document.getElementById('nombre_usuario').value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
    console.log(url);

    let form = e.currentTarget.form;
    let des = form.elements.descripcion.value;
    let val = parseFloat(form.elements.valor.value);
    let fec = form.elements.fecha.value;
    let eti = (form.elements.etiquetas.value).split(',');

    let miObjGasto = {
        descripcion: des,
        valor: val,
        fecha: fec,
        etiquetas: eti
    }
    if(user == null || user == ""){
        alert("El nombre de usuario está vacío");
    }

    try{
        fetch (url, {
            method: 'POST',
            body: JSON.stringify(miObjGasto),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
            .then(response => {
                if(response.ok)
                {
                    console.log('gasto guardado');
                    cargarGastosApi();
                }
                else console.log('error al cargar el gasto');
            })
    
    }
    catch{(error => console.log(error))}; 
};

function EditarGastosApi(){
    this.handleEvent = function(event){
        event.preventDefault();
        let user = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;

        let form = event.currentTarget.form;
        let des = form.elements.descripcion.value;
        let val = parseFloat(form.elements.valor.value);
        let fec = form.elements.fecha.value;
        let eti = form.elements.etiquetas.value.split(',');

        let miObjGasto = {
            descripcion: des,
            valor: val,
            fecha: fec,
            etiquetas: eti
        }

        if(user == null || user == ""){
            alert("El nombre de usuario está vacío");
        }
        try{
            fetch(url, {method: 'PUT',
            body: JSON.stringify(miObjGasto),
            headers: {'Content-Type': 'application/json; charset=utf-8'}})
            .then(response => {
                if(response.ok)
                {
                    console.log('gasto guardado');
                    cargarGastosApi();
                }
            })
        }
        catch{(error => console.log(error))}
    }
};

//He puesto aquí los botones todos juntos porque luego no los encuentro.
//Botones
document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click",nuevoGastoWebFormulario);
document.getElementById("formulario-filtrado").addEventListener("submit", new filtrarGastosWeb());
document.getElementById("guardar-gastos").addEventListener("click", new guardarGastosWeb());
document.getElementById("cargar-gastos").addEventListener("click", new cargarGastosWeb());
document.getElementById("cargar-gastos-api").addEventListener("click", cargarGastosApi);

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
    EditarHandleFormulario,
    CancelarHandleFormulario,
    EnviarHandle,
    EnviarHandleFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi,
    BorrarGastosApi,
    enviarGastosApi,
    EditarGastosApi
};