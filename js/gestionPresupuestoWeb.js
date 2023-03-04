import * as gestionPresupuesto from './gestionPresupuesto.js';
'use strict';
function mostrarDatoEnId(idElemento,valor){
    let elemento=document.getElementById(idElemento);
    elemento.innerHTML = valor;
}
function mostrarGastoWeb(idElemento, gasto){
    let elemento=document.getElementById(idElemento);
    let divClase=document.createElement('div');
    divClase.className='gasto';
    elemento.append(divClase);
    let divDescripcion=document.createElement('div');
    divDescripcion.className='gasto-descripcion';
    divDescripcion.textContent=gasto.descripcion;
    divClase.append(divDescripcion);
    let divFecha=document.createElement('div');
    divFecha.className='gasto-fecha';
    divFecha.textContent=gasto.fecha;
    divClase.append(divFecha);
    let divValor=document.createElement('div');
    divValor.className='gasto-valor';
    divValor.textContent=gasto.valor;
    divClase.append(divValor);
    let divEtiquetas=document.createElement('div');
    divEtiquetas.className='gasto-etiquetas';
    for(let etiqueta of gasto.etiquetas){
        let spanEtiqueta=document.createElement('span');
        spanEtiqueta.className='gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent=etiqueta;
        divEtiquetas.append(spanEtiqueta);
        let borrarEtiquetas= new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto=gasto;
        borrarEtiquetas.etiquetas=etiqueta;
        spanEtiqueta.addEventListener('click',borrarEtiquetas);
    }
    divClase.append(divEtiquetas);
    //Boton editar
    let botonEditar=document.createElement('button');
    botonEditar.type='button';
    botonEditar.className='gasto-editar';
    botonEditar.textContent='Editar';
    let editar=new EditarHandle(gasto);
    editar.gasto=gasto;
    botonEditar.addEventListener('click',editar);
    divClase.append(botonEditar);
    //Boton borrar
    let botonBorrar=document.createElement('button');
    botonBorrar.type='button';
    botonBorrar.className='gasto-borrar';
    botonBorrar.textContent='Borrar';
    let borrar=new BorrarHandle(gasto);
    borrar.gasto=gasto;
    botonBorrar.addEventListener('click',borrar);
    divClase.append(botonBorrar);
    //Boton editar form
    let botonEditarForm = document.createElement('button');
    botonEditarForm.type = 'button';
    botonEditarForm.className = 'gasto-editar-formulario';
    botonEditarForm.textContent = 'Editar(Formulario)';
    let editarFormulario = new EditarHandleFormulario(gasto);
    editarFormulario.gasto = gasto;
    botonEditarForm.addEventListener('click', editarFormulario);
    divClase.appendChild(botonEditarForm);
    //BOTON BORRAR API
    let botonBorrarAPI = document.createElement('button');
    botonBorrarAPI.className = 'gasto-borrar-api';
    botonBorrarAPI.type = 'button';
    botonBorrarAPI.textContent = 'Borrar (API)';
    let borrarAPI = new borrarGastosApi(gasto);
    borrarAPI.gasto = gasto;
    botonBorrarAPI.addEventListener('click', borrarAPI);
    divClase.append(botonBorrarAPI);
}
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    var divP = document.getElementById(idElemento);
    divP.innerHTML = "";
    let elem = document.getElementById(idElemento);
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = 'agrupacion';
    let titulo = document.createElement('h1');
    titulo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(titulo);
    for(let propiedad of Object.keys(agrup))
    {
        let divDato = document.createElement('div');
        divDato.className = 'agrupacion-dato';
        divAgrupacion.append(divDato);
        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent += `${propiedad}`;
        divDato.append(spanClave);
        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent += ` ${propiedad.valueOf()}`;
        divDato.append(spanValor);
    }
    elem.append(divAgrupacion);
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
function repintar(){
    document.getElementById('presupuesto');
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    document.getElementById('gastos-totales');
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());
    document.getElementById('balance-total');
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML='';
    for(let listaCompleta of gestionPresupuesto.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo',listaCompleta);
    }
    let dia = gestionPresupuesto.agruparGastos("dia");
    mostrarGastosAgrupadosWeb("agrupacion-dia",dia,"día");

    let mes = gestionPresupuesto.agruparGastos("mes");
    mostrarGastosAgrupadosWeb("agrupacion-mes",mes,"mes");

    let anyo = gestionPresupuesto.agruparGastos("anyo");
    mostrarGastosAgrupadosWeb("agrupacion-anyo",anyo,"año");
};
function actualizarPresupuestoWeb(){
    let presupuesto=parseInt(prompt('Introduce presupuesto: '));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}
//BOTON ACTUALIZAR
let botonActualizar=document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click',actualizarPresupuestoWeb);
function nuevoGastoWeb(){
    let descripcion=prompt('Introduce descripcion: ');
    let valor=parseFloat(prompt('Introduce valor: '));
    let fecha=Date.parse(prompt('Introduce fecha: '));
    let etiquetas=prompt('Introduce etiquetas separadas por coma').split(',');
    let nuevoGasto=new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}
//BOTON ANYADIR
let botonAnyadir=document.getElementById('anyadirgasto');
botonAnyadir.addEventListener('click',nuevoGastoWeb);
function EditarHandle(){
    this.handleEvent=function(event){
        let nDescripcion = prompt('Introduce nueva descripción: ');
        let nValor = parseFloat(prompt('Introduce nuevo valor: '));
        let nFecha = Date.parse(prompt('Introduce nueva fecha: '));
        let nEtiquetas = prompt('Introduce nuevas etiquetas separadas por comas: ').split(',');
        this.gasto.actualizarValor(nValor);
        this.gasto.actualizarDescripcion(nDescripcion);
        this.gasto.actualizarFecha(nFecha);
        this.gasto.anyadirEtiquetas(...nEtiquetas);
        
        repintar();
    
    }
}
function BorrarHandle(){
    this.handleEvent=function(event){
        let eliminarGasto=this.gasto.id;
        gestionPresupuesto.borrarGasto(eliminarGasto);
        
        repintar();
    }
}
function BorrarEtiquetasHandle(){
    this.handleEvent=function(event){
        this.gasto.borrarEtiquetas(this.etiquetas);
        
        repintar();
    }
}
function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector('form');
    let controles=document.getElementById('controlesprincipales');
    controles.append(formulario);
    document.getElementById('anyadirgasto-formulario').setAttribute('disabled',"");
    //BOTON CANCELAR
    let cancelar=new CancelarHandleFormulario();
    let botonCancelar=formulario.querySelector('button.cancelar');
    botonCancelar.addEventListener('click', cancelar);
    //BOTON ENVIAR
    let botonEnviar=new EnviarHandleFormulario();
    formulario.addEventListener('submit',botonEnviar);
    //BOTN ENVIAR API
    let enviarApi=formulario.querySelector("button.gasto-enviar-api");
    enviarApi.addEventListener('click',new enviarGastosApi());
}
//BOTON ANYADIR GASTO FORMULARIO
let botonAnyadirGastoFormulario=document.getElementById('anyadirgasto-formulario');
botonAnyadirGastoFormulario.addEventListener('click',nuevoGastoWebFormulario);

function EditarHandleFormulario(){
    this.handleEvent=function(event){
        event.preventDefault();
        let plantillaFormulario=document.getElementById("formulario-template").content.cloneNode(true);
        var formulario=plantillaFormulario.querySelector("form");
        let controlesPrincipales=document.getElementById("controlesprincipales");
        controlesPrincipales.append(formulario);

        let botonFormulario=event.currentTarget;
        botonFormulario.append(formulario);
        formulario.elements.descripcion.value=this.gasto.descripcion;
        formulario.elements.valor.value=this.gasto.valor;
        formulario.elements.fecha.value=new Date(this.gasto.fecha);
        formulario.elements.etiquetas.value=this.gasto.etiquetas;
        //BOTON CANCELAR
        let botoncancelar=new CancelarHandleFormulario();
        let botonCancelar=formulario.querySelector("button.cancelar");
        botonCancelar.addEventListener('click',botoncancelar);
        //BOTON ENVIAR
        let botonEnviar=new EnviarHandle();
        botonEnviar.gasto=this.gasto;
        formulario.addEventListener('submit',botonEnviar);
        botonFormulario.setAttribute('disabled',"");
        //BOTON EDITAR API
        let api=new editarGastosApi();
        let botonEnviarApi=formulario.querySelector('button.gasto-enviar-api');
        api.gasto=this.gasto;
        botonEnviarApi.addEventListener('click', api);
    }
}
function EnviarHandleFormulario(){
    this.handleEvent=function(event){
        event.preventDefault();
        let formulario=event.currentTarget;
        let descripcion=formulario.elements.descripcion.value;
        let valor=parseFloat(formulario.elements.valor.value);
        let fecha=formulario.elements.fecha.value;
        let etiquetas=formulario.elements.etiquetas.value;

        let nuevoGasto=new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
        gestionPresupuesto.anyadirGasto(nuevoGasto);

        repintar();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}
function EnviarHandle(){
    this.handleEvent=function(event){
        event.preventDefault();
        
        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);
        let valor = parseFloat(formulario.elements.valor.value);
        this.gasto.actualizarValor(valor);
        let fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);
        let etiquetas = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}
function CancelarHandleFormulario(){
    this.handleEvent=function(event){
        event.preventDefault();
        event.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        
        repintar();
    }
}
function filtrarGastosWeb(){
    this.handleEvent=function(event){
        event.preventDefault();

        let formulario=event.currentTarget;
        let descripcion=document.getElementById("formulario-filtrado-descripcion").value;
        let valorMaximo=parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let valorMinimo=parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let fechaDesde=document.getElementById("formulario-filtrado-fecha-desde").value;
        let fechaHasta=document.getElementById("formulario-filtrado-fecha-hasta").value;
        let etiquetas=document.getElementById("formulario-filtrado-etiquetas-tiene").value

        let datosFiltrados={};

        if(descripcion != ""){
            datosFiltrados.descripcionContiene=descripcion;
        }
        if(!isNaN(valorMaximo)){
            datosFiltrados.valorMaximo=valorMaximo;
        }
        if(!isNaN(valorMinimo)){
            datosFiltrados.valorMinimo=valorMinimo;
        }
        if(fechaDesde != ""){
            datosFiltrados.fechaDesde=fechaDesde;
        }
        if(fechaHasta != ""){
            datosFiltrados.fechaHasta=fechaHasta;
        }
        if(etiquetas.length>0){
            datosFiltrados.etiquetasTiene=gestionPresupuesto.transformarListadoEtiquetas(etiquetas);
        }

        document.getElementById("listado-gastos-completo").innerHTML="";
        let gastoFiltro = gestionPresupuesto.filtrarGastos(datosFiltrados);

        for(let gasto of gastoFiltro){
            mostrarGastoWeb("listado-gastos-completo",gasto);
        }
    }
}
//BOTON Submit
let botonSubmit=document.getElementById('formulario-filtrado');
botonSubmit.addEventListener('submit', new filtrarGastosWeb());

function guardarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();

        localStorage.setItem("GestorGastosDWEC",JSON.stringify(gestionPresupuesto.listarGastos()));
    }
}
//Boton Guardar
let botonGuardar=document.getElementById("guardar-gastos");
botonGuardar.addEventListener("click", new guardarGastosWeb());

function cargarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();

        if(localStorage.getItem("GestorGastosDWEC") != null){
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.getItem("GestorGastosDWEC")));
        }
        else{
            gestionPresupuesto.cargarGastos([]);
        }

        repintar();
    }
}
//Boton cargar
let botonCargar=document.getElementById("cargar-gastos");
botonCargar.addEventListener("click", new cargarGastosWeb());

function cargarGastosApi(){
    let nombreUsuario=document.getElementById("nombre_usuario").value;
    let url=`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

    if(nombreUsuario != '' || nombreUsuario == ""){
        alert("Introduce nombre usuario: ");
    }
    fetch(url, {method: 'GET'})
        .then(respuesta => respuesta.json())
        .then(gastos =>
            {
                gestionPresupuesto.cargarGastos(gastos);
                repintar();
            })
        .catch(error => console.log(error));
}
//Boton cargarApi
let botonCargarAPI = document.getElementById('cargar-gastos-api');
botonCargarAPI.addEventListener('click', cargarGastosApi);

function borrarGastosApi(){
    this.handleEvent = async function (event){
        event.preventDefault();
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        try{
            let respuestaActual = await fetch(url, {method: 'DELETE'});
            if(respuestaActual.ok){
                cargarGastosApi();
            }            
        }
        catch(error){
            console.log(error);
        }
    }
}
function enviarGastosApi(){
    this.handleEvent = function(event){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`
        let form = document.querySelector("#controlesprincipales form");
        let gasto = {
            "descripcion" : form.elements.descripcion.value,
            "valor" : parseFloat(form.elements.valor.value),
            "fecha" : form.elements.fecha.value,
            "etiquetas" : form.elements.etiquetas.value.split(",")
        }
        try{
            fetch(url, {method: 'POST', body: JSON.stringify(gasto), headers: {'Content-type': 'application/json; charset=utf-8'}})
                .then(respuesta => respuesta.json())
                .then(gastos =>{
                        cargarGastosApi(gastos);
                    })
                .catch(error => console.log(error));
        }
        catch(error){
            console.log(error);
        }  
    }
}
function editarGastosApi(){
    this.handleEvent = function(event){
        event.preventDefault();
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        let form = event.currentTarget.form;

        let gasto = {
            "descripcion" : form.elements.descripcion.value,
            "valor" : parseFloat(form.elements.valor.value),
            "fecha" : form.elements.fecha.value,
            "etiquetas" : form.elements.etiquetas.value.split(",")
        }
        
        try{
            fetch(url, {method: 'PUT', body: JSON.stringify(gasto), headers: {'Content-type': 'application/json; charset=utf-8'}})
                .then(respuesta => respuesta.json())
                .then(gastos =>{
                        cargarGastosApi(gastos);
                    })
                .catch(error => console.log(error))
        }
        catch(error){
            console.log(error);
        } 
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario, 
    filtrarGastosWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle, 
    EditarHandleFormulario,
    EnviarHandle,
    EnviarHandleFormulario,
    CancelarHandleFormulario,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi,
    borrarGastosApi,
    enviarGastosApi,
    editarGastosApi
}