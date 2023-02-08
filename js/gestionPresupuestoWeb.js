import * as gestionPresupuesto from './gestionPresupuesto.js';
'use strict';

function mostrarDatoEnId(idElemento, valor)
{
    let element = document.getElementById(idElemento);
    element.innerHTML = valor;
}


function mostrarGastoWeb(idElemento,gastos)
{
    let element = document.getElementById(idElemento);
    
    gastos.forEach(gasto => {
        let gastoDiv = document.createElement('div');
        gastoDiv.className = 'gasto';
        let gastoDes = document.createElement('div');
        gastoDes.className ='gasto-descripcion';
        gastoDes.innerHTML = gasto.descripcion;
        let gastoDate = document.createElement('div');
        gastoDate.className = 'gasto-fecha';
        gastoDate.innerHTML = gasto.fecha;
        let gastoVal = document.createElement('div');
        gastoVal.className = 'gasto-valor';
        gastoVal.innerHTML = gasto.valor;
        let gastoEti = document.createElement('div');
        gastoEti.className = 'gasto-etiquetas';
        gastoDiv.appendChild(gastoDes);
        gastoDiv.appendChild(gastoDate);
        gastoDiv.appendChild(gastoVal);

        if(typeof (gasto.etiquetas) === 'object'){
            gasto.etiquetas.forEach(etiqueta => {
                let spanEti = document.createElement('span');
                spanEti.className = 'gasto-etiquetas-etiqueta';
                spanEti.innerHTML = etiqueta;
                gastoEti.appendChild(spanEti);
    
                let BorrarEtiqueta = new BorrarEtiquetasHandle();
                BorrarEtiqueta.gasto = gasto;
                BorrarEtiqueta.etiquetas = etiqueta;
                spanEti.addEventListener('click', BorrarEtiqueta);
            }); 
            gastoDiv.appendChild(gastoEti);
        }
        

        let gastoButtonEditar = document.createElement('button');
        gastoButtonEditar.type = 'button';
        gastoButtonEditar.className = 'gasto-editar';
        gastoButtonEditar.innerHTML = 'Editar gasto';   
        let EditarGasto = new EditarHandle();
        EditarGasto.gasto = gasto;
        gastoButtonEditar.addEventListener('click',EditarGasto);
        gastoDiv.appendChild(gastoButtonEditar);
        
        let gastoButtonBorrar = document.createElement('button');
        gastoButtonBorrar.type ='button';
        gastoButtonBorrar.className = 'gasto-borrar';
        gastoButtonBorrar.innerHTML = 'Borrar gasto';
        let BorrarGasto = new BorrarHandle();
        BorrarGasto.gasto = gasto;
        gastoButtonBorrar.addEventListener('click',BorrarGasto);
        gastoDiv.appendChild(gastoButtonBorrar);

        let gastoButtonBorrarApi = document.createElement('button');
        gastoButtonBorrarApi.type ='button';
        gastoButtonBorrarApi.className = 'gasto-borrar-api';
        gastoButtonBorrarApi.innerHTML = 'Borrar gasto (API)';
        let BorrarGastoApi = new BorrarApi();
        BorrarGastoApi.gasto = gasto;
        gastoButtonBorrarApi.addEventListener('click',BorrarGastoApi);
        gastoDiv.appendChild(gastoButtonBorrarApi);
        
        let gastoButtonEditarForm = document.createElement('button');
        gastoButtonEditarForm.type = 'button';
        gastoButtonEditarForm.className = 'gasto-editar-formulario';
        gastoButtonEditarForm.innerHTML = 'Editar (formulario)'; 
        let EditarGastoForm = new EditarHandleFormulario();
        EditarGastoForm.gasto = gasto;
        EditarGastoForm.gastoDiv = gastoDiv;
        EditarGastoForm.gastoButtonEditarForm = gastoButtonEditarForm;
        gastoButtonEditarForm.addEventListener('click',EditarGastoForm);
        gastoDiv.appendChild(gastoButtonEditarForm);
    
        element.appendChild(gastoDiv); 
        });
    
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{
    let element = document.getElementById(idElemento);
    element.innerHTML = "";
    let agrupDIV = document.createElement('div');
    agrupDIV.className = 'agrupacion';
    let agrupH1 = document.createElement('h1');
    agrupH1.innerHTML = 'Gastos agrupados por ' + periodo;
    agrupDIV.appendChild(agrupH1);
    for(let valor of Object.keys(agrup)){
        let datoDIV = document.createElement('div');
        datoDIV.className = 'agrupacion-dato';
        let datoClaveSPAN = document.createElement('span');
        datoClaveSPAN.className = 'agrupacion-dato-clave';
        datoClaveSPAN.innerHTML += `${valor}`;
        let datoValorSPAN = document.createElement('span');
        datoValorSPAN.className = 'agrupacion-dato-valor';
        datoValorSPAN.innerHTML += " " + agrup[valor] + " €";
        datoDIV.appendChild(datoClaveSPAN);
        datoDIV.appendChild(datoValorSPAN);
        agrupDIV.appendChild(datoDIV);
    }
    element.appendChild(agrupDIV);

    // Estilos
    element.style.width = "33%";
    element.style.display = "inline-block";
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
    element.append(chart);
}

function repintar(){
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('presupuesto',"");
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());
    mostrarDatoEnId('listado-gastos-completo',"");
    mostrarGastoWeb('listado-gastos-completo',gestionPresupuesto.listarGastos());
    mostrarDatoEnId('listado-gastos-filtrado-1',"");
    mostrarGastoWeb('listado-gastos-filtrado-1',gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}));
    mostrarDatoEnId('listado-gastos-filtrado-2',"");
    mostrarGastoWeb('listado-gastos-filtrado-2',gestionPresupuesto.filtrarGastos({valorMinimo: 50}));
    mostrarDatoEnId('listado-gastos-filtrado-3', "");
    mostrarGastoWeb('listado-gastos-filtrado-3', gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}));
    mostrarDatoEnId('listado-gastos-filtrado-4',"");
    mostrarGastoWeb('listado-gastos-filtrado-4',gestionPresupuesto.filtrarGastos({valorMaximo: 50,etiquetasTiene: ["comida", "transporte"]}));
    mostrarDatoEnId('agrupacion-dia',"");
    mostrarDatoEnId('agrupacion-mes',"");
    mostrarDatoEnId('agrupacion-anyo',"");
    mostrarGastosAgrupadosWeb('agrupacion-dia',gestionPresupuesto.agruparGastos("dia"),"día");
    mostrarGastosAgrupadosWeb('agrupacion-mes',gestionPresupuesto.agruparGastos("mes"),"mes");
    mostrarGastosAgrupadosWeb('agrupacion-anyo',gestionPresupuesto.agruparGastos("anyo"),"año");
}

function actualizarPresupuestoWeb(){
    let alert = prompt("Introduce un nuevo presupuesto:",0);
    gestionPresupuesto.actualizarPresupuesto(parseInt(`${alert}`,10));
    repintar();
}

let actualizarpresupuesto5 = document.getElementById('actualizarpresupuesto');
actualizarpresupuesto5.addEventListener('click',actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descripción = prompt("Introduce una nueva descripción:",'');
    let valor = parseFloat(prompt("Introduce un nuevo valor:",''));
    let fecha = prompt("Introduce una nueva fecha:",'');
    let etiquetas = prompt("Introduce nuevas etiquetas:",'');
    let arretiquetas = etiquetas.split(',');
    let newgasto = new gestionPresupuesto.CrearGasto(descripción, valor, fecha, arretiquetas);
    gestionPresupuesto.anyadirGasto(newgasto);
    repintar();
}

let anyadirGasto5 = document.getElementById('anyadirgasto');
anyadirGasto5.addEventListener('click', nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function (event) {
        let descripción = prompt("Introduce una nueva descripción:",'');
        let valor = parseFloat(prompt("Introduce un nuevo valor:",''));
        let fecha = prompt("Introduce una nueva fecha:",'');
        let etiquetas = prompt("Introduce nuevas etiquetas:",'');
        let arretiquetas = etiquetas.split(',');

        this.gasto.actualizarDescripcion(descripción);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(arretiquetas);

        repintar();
    };
}

function BorrarHandle(){
    this.handleEvent = function (event) {
        let Gastoid = this.gasto.id;
        gestionPresupuesto.borrarGasto(Gastoid);

        repintar();
    };
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function (event) {
        this.gasto.borrarEtiquetas(this.etiquetas);
        
        repintar();
    };
}

function nuevoGastoWebFormulario(){  
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let DIVcontrolesprincipales = document.getElementById('controlesprincipales');
    DIVcontrolesprincipales.append(formulario);

    let enviarForm = new EnviarHandleFormulario();
    formulario.addEventListener('submit',enviarForm);
    
    let BEnviarApi = formulario.querySelector("button.gasto-enviar-api");
    BEnviarApi.addEventListener('click',new EnviarApiHandle); 

    document.getElementById('anyadirgasto-formulario').setAttribute('disabled','');

    let cancelarForm = new CancelarHandleFormulario(); 
    cancelarForm.formulario = formulario;
    let botonCancelar = formulario.querySelector('button.cancelar');
    botonCancelar.addEventListener('click', cancelarForm);

    repintar();
}

let anyadirGastoForm6 = document.getElementById('anyadirgasto-formulario');
anyadirGastoForm6.addEventListener('click', nuevoGastoWebFormulario);

function EnviarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = event.currentTarget;
        let descripción = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = new Date(formulario.elements.fecha.value);
        let etiquetas = toString(formulario.elements.etiquetas.value);
        let arretiquetas = etiquetas.split(',');
        let newgasto = new gestionPresupuesto.CrearGasto(descripción, valor, fecha, arretiquetas);
        gestionPresupuesto.anyadirGasto(newgasto);
        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
        repintar();
    }
}

function CancelarHandleFormulario(){
    this.handleEvent = function(){
        this.formulario.remove();
        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled',);
    }
}



function EditarHandleFormulario(){
    this.handleEvent = function () {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        this.gastoDiv.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviarEditarForm = new EnviarEditarHandleFormulario();
        enviarEditarForm.gasto = this.gasto;
        enviarEditarForm.formulario = formulario;
        formulario.addEventListener('submit',enviarEditarForm);

        this.gastoButtonEditarForm.setAttribute('disabled','');

        

        let EditarApi = new EditarHandleApi();
        let BEditarApi = formulario.querySelector('button.gasto-enviar-api')
        EditarApi.gasto = this.gasto;
        BEditarApi.addEventListener('click',EditarApi)

        let cancelarForm = new CancelarEditarHandleFormulario(); 
        cancelarForm.formulario = formulario;
        cancelarForm.gastoButtonEditarForm = this.gastoButtonEditarForm;
        cancelarForm.formulario = formulario;
        let botonCancelar = formulario.querySelector('button.cancelar');
        botonCancelar.addEventListener('click', cancelarForm);

        
    };
}

function EnviarEditarHandleFormulario(){
    this.handleEvent = function (event){
        event.preventDefault();
        this.gasto.descripcion = this.formulario.elements.descripcion.value;
        this.gasto.valor = parseFloat(this.formulario.elements.valor.value);
        this.gasto.fecha = new Date (this.formulario.elements.fecha.value);
        let arretiquetas = toString(this.formulario.elements.etiquetas.value).split(',');
        this.gasto.etiquetas = arretiquetas;

        repintar();
    }
}

function CancelarEditarHandleFormulario(){
    this.handleEvent = function(){
        this.formulario.remove();
        this.gastoButtonEditarForm.removeAttribute("disabled");
    }
}

function filtrarGastosWeb(){
    this.handleEvent = function (event){
        event.preventDefault();
        let formulario = event.currentTarget;

        let descripcionContiene =  formulario.elements["formulario-filtrado-descripcion"].value;
        let valorMinimo = parseFloat(formulario.elements["formulario-filtrado-valor-minimo"].value);
        let valorMaximo = parseFloat(formulario.elements["formulario-filtrado-valor-maximo"].value);
        let fechaDesde = (formulario.elements["formulario-filtrado-fecha-desde"].value);
        let fechaHasta = (formulario.elements["formulario-filtrado-fecha-hasta"].value);
        let etiquetasTiene = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

        console.log(descripcionContiene);
        console.log(valorMinimo);
        console.log(valorMaximo);
        console.log(fechaDesde);
        console.log(fechaHasta);
        console.log(etiquetasTiene);
        let gasto = {};
        
        if(fechaDesde != ""){
            gasto.fechaDesde = fechaDesde;
        }
        if(fechaHasta != ""){
            gasto.fechaHasta = fechaHasta;
        }
        if(!isNaN(valorMinimo)){
            gasto.valorMinimo = valorMinimo;
        }
        if(!isNaN(valorMaximo)){
            gasto.valorMaximo = valorMaximo;
        }
        if(descripcionContiene != "")
        {
            gasto.descripcionContiene = descripcionContiene;
        }
        if(etiquetasTiene.length > 0){
            etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene);
            gasto.etiquetasTiene = etiquetasTiene;
        }

        console.log(gasto);

        document.getElementById("listado-gastos-completo").innerHTML = "";

        let filtrar = gestionPresupuesto.filtrarGastos(gasto);

        mostrarGastoWeb("listado-gastos-completo", filtrar);
        
    }
}

let filtrarResultados = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener('submit', filtrarResultados);

function guardarGastosWeb(){
    this.handleEvent = function() {
        localStorage.GestorGastosDWEC = JSON.stringify(gestionPresupuesto.listarGastos());
    }
}

let guardarGastos = new guardarGastosWeb();
document.getElementById("guardar-gastos").addEventListener('click', guardarGastos);

function cargarGastosWeb(){
    this.handleEvent = function() {
        let gastos = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        if((gastos != null) && (gastos.length >= 0))
        {
            gestionPresupuesto.cargarGastos(gastos);
        }
        else
        {
            gestionPresupuesto.cargarGastos([]);
        }
        repintar();
    }
}

let cargarGastos = new cargarGastosWeb();
document.getElementById("cargar-gastos").addEventListener('click', cargarGastos);

function cargarGastosApi(){
    this.handleEvent = function(){
        let user = (document.getElementById("nombre_usuario")).value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
        console.log(user);
        console.log(url);
        fetch(url, {method: 'GET'})
            .then(res => res.json())
            .then((datos) => {
                if(datos != "")
                {
                    gestionPresupuesto.cargarGastos(datos);
                    repintar();
                }
                else console.log("No hay gastos")
            });
    }
}

function cargarTodo (){
    let user = (document.getElementById("nombre_usuario")).value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
    console.log(user);
    console.log(url);
    fetch(url, {method: 'GET'})
        .then(res => res.json())
        .then((datos) => {
            if(datos != "")
            {
                gestionPresupuesto.cargarGastos(datos);
                repintar();
            }
            else console.log("No hay gastos")
        })
}

let BcargarGastosApi = new cargarGastosApi();
document.getElementById("cargar-gastos-api").addEventListener('click', BcargarGastosApi);

function BorrarApi (){
    this.handleEvent = function(){
        let user = (document.getElementById("nombre_usuario")).value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;
        console.log(user);
        console.log(url);
        fetch(url, {method: 'DELETE'})
            .then(res => {
                if(res.ok){
                    console.log('Eliminado Correctamente');
                }
                cargarTodo();
            })
            .catch(error => {
                console.log('No se ha eliminado ' + error);
            });
    }
}



function EnviarApiHandle(){
    this.handleEvent = function(event){
        let formulario = event.currentTarget.form;

        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        let gasto = {
            descripcion :descripcion, 
            valor:valor, 
            fecha:fecha, 
            etiquetas: etiquetas.split(", "),
        }
        let jsonGasto = JSON.stringify(gasto)
        let user = (document.getElementById("nombre_usuario")).value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
        console.log(user);
        console.log(url);
        fetch(url, {method: 'POST', body: jsonGasto, headers: {'Content-Type': 'application/json'}})
            .then(response => response.json())
            .then(datos => {
                cargarTodo();
            })
            .catch(error => console.log('No se ha enviado el gasto ' + error));
    }
}

function EditarHandleApi(){
    this.handleEvent = function (event){
        let formulario = event.currentTarget.form;

        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        
        let gasto = {
            descripcion :descripcion, 
            valor:valor, 
            fecha:fecha, 
            etiquetas: etiquetas.split(", "),
        }
        
        let jsonGasto = JSON.stringify(gasto)
        let user = (document.getElementById("nombre_usuario")).value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;
        console.log(user);
        console.log(url);
        fetch(url, {method: 'PUT', body:  jsonGasto, headers: {'Content-Type': 'application/json'}})
            .then(response => response.json())
            .then(gasto => {
                cargarTodo();})
            .catch(error => console.log("El gasto no se ha editado " + error));
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}