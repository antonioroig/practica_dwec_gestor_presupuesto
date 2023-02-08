'use strict';
import * as gestionPresupuesto from "./gestionPresupuesto.js";
function mostrarDatoEnId(idElemento,valor)
{
    document.getElementById(idElemento).innerHTML = valor;
}
function mostrarGastoWeb(idElemento, gastos)
{
    let elemento = document.getElementById(idElemento);
    gastos.forEach(gasto => {
        let DIVgasto = document.createElement('div');
        DIVgasto.className = 'gasto';
        let DIVdescripcion = document.createElement('div');
        DIVdescripcion.className = 'gasto-descripcion';
        DIVdescripcion.innerHTML = gasto.descripcion;
        let DIVfecha = document.createElement('div');
        DIVfecha.className = 'gasto-fecha';
        let fechatostring = new Date(gasto.fecha);
        DIVfecha.innerHTML = fechatostring.toLocaleString();
        let DIVvalor = document.createElement('div');
        DIVvalor.className = 'gasto-valor';
        DIVvalor.innerHTML = gasto.valor;
        let DIVetiquetas = document.createElement('div');
        DIVetiquetas.className = 'gasto-etiquetas';
        DIVgasto.appendChild(DIVdescripcion);
        DIVgasto.appendChild(DIVfecha);
        DIVgasto.appendChild(DIVvalor);
        if(gasto.etiquetas.length > 0 && typeof (gasto.etiquetas) === 'object')
        {
            gasto.etiquetas.forEach(etiqueta => {
                let SPANetiqueta = document.createElement('span');
                SPANetiqueta.className = 'gasto-etiquetas-etiqueta';
                SPANetiqueta.innerHTML = " " + etiqueta;
                DIVetiquetas.appendChild(SPANetiqueta);
    
                let borraretiqueta = new BorrarEtiquetasHandle();
                borraretiqueta.gasto = gasto;
                borraretiqueta.etiquetas = etiqueta;
                SPANetiqueta.addEventListener('click',borraretiqueta);
            });
        }
        DIVgasto.appendChild(DIVetiquetas);

        let BUTTONeditar = document.createElement('button');
        BUTTONeditar.type = 'button';
        BUTTONeditar.className = 'gasto-editar';
        BUTTONeditar.innerHTML = "Editar";
        let editargasto = new EditarHandle();
        editargasto.gasto = gasto;
        BUTTONeditar.addEventListener('click',editargasto);
        
        let BUTTONborrar = document.createElement('button');
        BUTTONborrar.className = 'gasto-borrar';
        BUTTONborrar.innerHTML = "Borrar";
        BUTTONborrar.type = 'button';
        let borrargasto = new BorrarHandle();
        borrargasto.gasto = gasto;
        BUTTONborrar.addEventListener('click',borrargasto);
        
        let BUTTONeditarformulario = document.createElement('button');
        BUTTONeditarformulario.type = 'button';
        BUTTONeditarformulario.className = 'gasto-editar-formulario';
        BUTTONeditarformulario.innerHTML = "Editar (formulario)";

        let editargastoformulario = new EditarHandleformulario();
        editargastoformulario.gasto = gasto;
        editargastoformulario.DIVgasto = DIVgasto;
        editargastoformulario.BUTTONeditarformulario = BUTTONeditarformulario;
        BUTTONeditarformulario.addEventListener('click',editargastoformulario);

        let BUTTONborrarapi = document.createElement('button');
        BUTTONborrarapi.type = 'button';
        BUTTONborrarapi.className = 'gasto-borrar-api';
        BUTTONborrarapi.innerHTML = "Borrar (API)";
        let borrargastoapi = new BorrarAPIHandle();
        borrargastoapi.gasto = gasto;
        BUTTONborrarapi.addEventListener('click',borrargastoapi);

        DIVgasto.appendChild(BUTTONeditar);
        DIVgasto.appendChild(BUTTONborrar);
        DIVgasto.appendChild(BUTTONeditarformulario);
        DIVgasto.appendChild(BUTTONborrarapi);

        elemento.appendChild(DIVgasto);
    });
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = "";
    let DIVagrupacion = document.createElement('div');
    DIVagrupacion.className = 'agrupacion';
    let H1titulo = document.createElement('h1');
    H1titulo.innerHTML = 'Gastos agrupados por ' + periodo;
    DIVagrupacion.appendChild(H1titulo);
    for(let propiedad of Object.keys(agrup))
    {
        let DIVdato = document.createElement('div');
        DIVdato.className = 'agrupacion-dato';
        let SPANclave = document.createElement('span');
        SPANclave.className = 'agrupacion-dato-clave';
        SPANclave.innerHTML += " " + `${propiedad}`;
        let SPANvalor = document.createElement('span');
        SPANvalor.className = 'agrupacion-dato-valor';
        SPANvalor.innerHTML += " " + agrup[propiedad] + " €";
        DIVdato.appendChild(SPANclave);
        DIVdato.appendChild(SPANvalor);
        DIVagrupacion.appendChild(DIVdato);
    }
    elemento.appendChild(DIVagrupacion);
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
function actualizarPresupuestoWeb(){
    let mensaje = prompt("Introduce el presupuesto deseado:",0);
    gestionPresupuesto.actualizarPresupuesto(parseInt(`${mensaje}`,10));
    repintar();
}

let actualizarpresupuesto = document.getElementById('actualizarpresupuesto');
actualizarpresupuesto.addEventListener('click',actualizarPresupuestoWeb);

function repintar(){
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());
    mostrarDatoEnId('listado-gastos-completo', "");
    mostrarGastoWeb('listado-gastos-completo', gestionPresupuesto.listarGastos());
    mostrarDatoEnId('listado-gastos-filtrado-1', "");
    mostrarGastoWeb('listado-gastos-filtrado-1', gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}));
    mostrarDatoEnId('listado-gastos-filtrado-2', "");
    mostrarGastoWeb('listado-gastos-filtrado-2', gestionPresupuesto.filtrarGastos({valorMinimo: 50}));
    mostrarDatoEnId('listado-gastos-filtrado-3', "");
    mostrarGastoWeb('listado-gastos-filtrado-3', gestionPresupuesto.filtrarGastos({valorMinimo: 200,etiquetasTiene: ["seguros"]}));
    mostrarDatoEnId('listado-gastos-filtrado-4', "");
    mostrarGastoWeb('listado-gastos-filtrado-4', gestionPresupuesto.filtrarGastos({valorMaximo: 50,etiquetasTiene: ["comida","transporte"]}));
    mostrarDatoEnId('agrupacion-dia', "");
    mostrarGastosAgrupadosWeb('agrupacion-dia', gestionPresupuesto.agruparGastos("dia"),"día");
    mostrarDatoEnId('agrupacion-mes', "");
    mostrarGastosAgrupadosWeb('agrupacion-mes',gestionPresupuesto.agruparGastos("mes"),"mes");
    mostrarDatoEnId('agrupacion-anyo', "");
    mostrarGastosAgrupadosWeb('agrupacion-anyo',gestionPresupuesto.agruparGastos("anyo"),"año");
}
function nuevoGastoWeb(){
    let descripcion = prompt("Introduce la descripción del gasto:","");
    let aux = prompt("Introduce el valor del gasto:","");
    let valor = parseFloat(aux, 10);
    let fecha = prompt("Introduce la fecha del gasto:\n(Introducirla en el formato indicado)","yyyy/mm/dd");
    let cadena = prompt("Introduce las etiquetas del gasto:\n(Introduzca las etiquetas como en el ejemplo)","etiqueta1,etiqueta2,etiqueta3...");
    let etiquetas = cadena.split(',');
    let nuevogasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,etiquetas);
    gestionPresupuesto.anyadirGasto(nuevogasto);
    repintar();
}

let annyadirgasto = document.getElementById('anyadirgasto');
annyadirgasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function (event) {
        let descripcion = prompt("Introduce la descripción del gasto:","");
        let aux = prompt("Introduce el valor del gasto:","");
        let valor = parseFloat(aux, 10);
        let fecha = prompt("Introduce la fecha del gasto:\n(Introducirla en el formato indicado)","yyyy/mm/dd");
        let cadena = prompt("Introduce las etiquetas del gasto:\n(Introduzca las etiquetas como en el ejemplo)","etiqueta1,etiqueta2,etiqueta3...");
        let etiquetas = cadena.split(',');
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    };
}

function BorrarHandle(){
    this.handleEvent = function(event){
        let id = this.gasto.id;
        gestionPresupuesto.borrarGasto(id);
        repintar();
    };
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function (event){
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    };
}

function EditarHandleformulario(){
    this.handleEvent = function (event) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");
        this.DIVgasto.append(formulario);
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        let fecha = new Date (this.gasto.fecha)
        formulario.elements.fecha.value = fecha.toLocaleString();
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
 
        let EnviarForm = new EnviarEditarHandleformulario();
        EnviarForm.gasto = this.gasto;
        EnviarForm.formulario = formulario;
        formulario.addEventListener("submit",EnviarForm);
        this.BUTTONeditarformulario.setAttribute('disabled','');
        let CancelarForm =  new CancelarEditarHandleformulario();
        CancelarForm.formulario = formulario;
        CancelarForm.BUTTONeditarformulario = this.BUTTONeditarformulario;
        CancelarForm.formulario = formulario;
        let BUTTONcancelar = formulario.querySelector('button.cancelar');
        BUTTONcancelar.addEventListener('click',CancelarForm);
        let BUTTONenviarapi = formulario.querySelector("button.gasto-enviar-api");
        let EditarAPI = new EditarAPIHandle();
        EditarAPI.gasto = this.gasto;
        EditarAPI.formulario = formulario;
        EditarAPI.BUTTONenviarapi = BUTTONenviarapi;
        BUTTONenviarapi.addEventListener('click',EditarAPI);
    };
}

function CancelarEditarHandleformulario(){
    this.handleEvent = function (event){
        this.formulario.remove();
        this.BUTTONeditarformulario.removeAttribute("disabled");
    }

}

function EnviarEditarHandleformulario(){
    this.handleEvent = function (event){
        event.preventDefault();
        this.gasto.descripcion = this.formulario.elements.descripcion.value;
        this.gasto.valor = parseFloat(this.formulario.elements.valor.value);
        this.gasto.fecha = this.formulario.elements.fecha.value;
        let array = (this.formulario.elements.etiquetas.value).split(",");
        this.gasto.etiquetas = array;
        repintar();
    }
}
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    let DIVcontrolesprincipales = document.getElementById('controlesprincipales');
    DIVcontrolesprincipales.append(formulario);
    document.getElementById('anyadirgasto-formulario').setAttribute('disabled','');
    let Enviar = new funcionEnviar();
    formulario.addEventListener("submit",Enviar);
    let Cancelar =  new funcionCancelar();
    Cancelar.formulario = formulario;
    let BUTTONcancelar = formulario.querySelector("button.cancelar");
    BUTTONcancelar.addEventListener('click',Cancelar);
    let BUTTONenviarapi = formulario.querySelector("button.gasto-enviar-api");
    let EnviarAPI = new EnviarAPIHandle();
    EnviarAPI.formulario = formulario;
    EnviarAPI.BUTTONenviarapi = BUTTONenviarapi;
    BUTTONenviarapi.addEventListener('click',EnviarAPI);
    repintar();
}

let gastoformulario = document.getElementById('anyadirgasto-formulario');
gastoformulario.addEventListener('click', nuevoGastoWebFormulario);

function funcionEnviar(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let aux = formulario.elements.valor.value;
        let valor = parseFloat(aux, 10);
        let fecha = new Date(formulario.elements.fecha.value);
        let cadena = toString(formulario.elements.etiquetas.value);
        let etiquetas = cadena.split(',');
        let gasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha, ...etiquetas);
        gestionPresupuesto.anyadirGasto(gasto);
        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
        repintar();
    }
}

function funcionCancelar(){
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = this.formulario;
        formulario.remove();
        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
        repintar();
    }
}
function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let FormularioFiltrado = event.currentTarget;
        let Etiquetas = FormularioFiltrado.elements["formulario-filtrado-etiquetas-tiene"].value;
        let ValMinimo = parseFloat(FormularioFiltrado.elements["formulario-filtrado-valor-minimo"].value);
        let ValMaximo = parseFloat(FormularioFiltrado.elements["formulario-filtrado-valor-maximo"].value);
        let FechDesde = FormularioFiltrado.elements["formulario-filtrado-fecha-desde"].value;
        let FechHasta = FormularioFiltrado.elements["formulario-filtrado-fecha-hasta"].value;
        let Descripcion = FormularioFiltrado.elements["formulario-filtrado-descripcion"].value;
        let Filtro = [];
        if(Etiquetas.length > 0)
        {
            Filtro.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(Etiquetas);
        }
        if(!isNaN(ValMinimo))
        {
            Filtro.valorMinimo = ValMinimo;
        }
        if(!isNaN(ValMaximo))
        {
            Filtro.valorMaximo = ValMaximo;
        }
        if(FechDesde != "")
        {
            Filtro.fechaDesde = FechDesde;
        }
        if(FechHasta != "")
        {
            Filtro.fechaHasta = FechHasta;
        }
        if(Descripcion != "")
        {
            Filtro.descripcionContiene = Descripcion;
        }
        let Filtrado = gestionPresupuesto.filtrarGastos(Filtro);
        
        mostrarDatoEnId("listado-gastos-completo", "");

        mostrarGastoWeb("listado-gastos-completo",Filtrado)
    }
}

let FiltrarGastos = new filtrarGastosWeb();
let FormularioFiltrado = document.getElementById("formulario-filtrado");
FormularioFiltrado.addEventListener("submit",FiltrarGastos);

function guardarGastosWeb(){
    this.handleEvent = function(event){
        localStorage.GestorGastosDWEC = JSON.stringify(gestionPresupuesto.listarGastos());
    }
}

let Guardar = new guardarGastosWeb();
let BUTTONguardar = document.getElementById("guardar-gastos");
BUTTONguardar.addEventListener("click",Guardar);

function cargarGastosWeb(){
    this.handleEvent = function(event){
        let GastosGuardados = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        if(GastosGuardados != null)
        {
            gestionPresupuesto.cargarGastos(GastosGuardados);
        }
        else
        {
            gestionPresupuesto.cargarGastos([]);
        }
        repintar();
    }
}


let Cargar = new cargarGastosWeb();
let BUTTONcargar = document.getElementById("cargar-gastos");
BUTTONcargar.addEventListener("click",Cargar);

function cargarGastosApi(){
    this.handleEvent = function(event) {
        let usuario = (document.getElementById("nombre_usuario")).value;
        let URL = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
        fetch(URL,{method: "GET"})
            .then(solucion => solucion.json())
            .then((datos)  => {
                if(datos != "")
                {
                    gestionPresupuesto.cargarGastos(datos);
                    console.log("Gastos Introducidos Correctamente");
                    repintar();
                }
                else
                {
                    console.log("No hay gastos");
                }
            })
    }
}

function actualizarAPI ()
{
    let usuario = (document.getElementById("nombre_usuario")).value;
    let URL = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
    fetch(URL,{method: "GET"})
        .then(solucion => solucion.json())
        .then((datos)  => {
            if(datos != "")
                {
                    gestionPresupuesto.cargarGastos(datos);
                    console.log("Gastos Introducidos Correctamente");
                    repintar();
                }
            else
            {
                console.log("No hay gastos");
            }
        })
}

let CargarApi = new cargarGastosApi();
let BUTTONcargarapi = document.getElementById("cargar-gastos-api");
BUTTONcargarapi.addEventListener("click",CargarApi);

function BorrarAPIHandle(){
    this.handleEvent = function(event) {
        let id = this.gasto.gastoId;
        let usuario = (document.getElementById("nombre_usuario")).value;
        let URL = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${id}`;
        fetch(URL,{method: "DELETE"})
            .then((datos)  => {
                if(datos.ok)
                {
                    console.log("Se ha eliminado el gaston de id " + id + " correctamente");
                }
                else
                {
                    console.log("Error este gasto no se encuentra en la API");
                }
                actualizarAPI();
            })
    }
}

function EnviarAPIHandle(){
    this.handleEvent = function(event){
        let usuario = (document.getElementById("nombre_usuario")).value;
        let URL = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
        let descripcion = this.formulario.elements.descripcion.value;
        let valor = parseFloat(this.formulario.elements.valor.value);
        let fecha = this.formulario.elements.fecha.value;
        let etiquetas = this.formulario.elements.etiquetas.value;
        let JSONgasto = JSON.stringify(new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,etiquetas));
        fetch(URL,{method: "POST", body: JSONgasto,headers: {
            'Content-Type': 'application/json'
        }})
            .then(solucion => solucion.json())
            .then(data =>{
                console.log("Gasto Enviado Correctamente");
            })
            .then(() => {actualizarAPI()})
            .catch(error => console.log(error));
    }
}


function EditarAPIHandle(){
    this.handleEvent = function(event){
        let usuario = (document.getElementById("nombre_usuario")).value;
        let URL = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        let descripcion = this.formulario.elements.descripcion.value;
        let valor = parseFloat(this.formulario.elements.valor.value);
        let fecha =  this.formulario.elements.fecha.value;
        let etiquetas = this.formulario.elements.etiquetas.value;
        let JSONgasto = JSON.stringify(new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,etiquetas));
        fetch(URL,{method: "PUT", body: JSONgasto,headers: {
            'Content-Type': 'application/json'
        }})
            .then(solucion => solucion.json())
            .then(data =>{
                console.log("Gasto Enviado Correctamente");
            })
            .then(() => {actualizarAPI()})
            .catch(error => console.log(error));

    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    repintar,
    nuevoGastoWebFormulario,
    nuevoGastoWeb,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb
}