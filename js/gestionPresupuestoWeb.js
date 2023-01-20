import * as gestionPresupuesto from './gestionPresupuesto.js';

"use strict"; 

function mostrarDatoEnId(idElemento,valor) {
   let id = document.getElementById(idElemento);
    id.innerHTML += valor;
}

function mostrarGastoWeb(idElemento,gasto){
    
    let idWeb = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';
    idWeb.append(divGasto);

    let divDescripcion = document.createElement('div');
    divDescripcion.className += 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    let divFecha = document.createElement('div');
    divFecha.className += 'gasto-fecha';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divFecha);

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.append(divValor);

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';

    for(let etiqueta of gasto.etiquetas){
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = etiqueta;
        divEtiquetas.append(spanEtiqueta);

        let borrarEtiquetas = new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiquetas = etiqueta;
        spanEtiqueta.addEventListener('click',borrarEtiquetas);
    }
   

    divGasto.append(divEtiquetas); 

    //Botones para añadir en el formulario

    //Boton editar
    let botonEditar = document.createElement('button');
    botonEditar.type = 'button';
    botonEditar.className = 'gasto-editar';
    botonEditar.textContent = 'Editar';

    let editar = new EditarHandle(gasto);
    editar.gasto = gasto;
    botonEditar.addEventListener('click',editar);
    divGasto.append(botonEditar);
    
    //Boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.textContent = 'Borrar';

    let borrar = new BorrarHandle(gasto);
    borrar.gasto = gasto;
    botonBorrar.addEventListener('click', borrar);
    divGasto.append(botonBorrar);

    //Boton editar formulario
    let botonEditarForm = document.createElement('button');
    botonEditarForm.type = 'button';
    botonEditarForm.className = 'gasto-editar-formulario';
    botonEditarForm.textContent = 'Editar (formulario)';

    let editarForm = new EditarHandleFormulario(gasto);
    editarForm.gasto = gasto;
    botonEditarForm.addEventListener('click',editarForm);
    divGasto.append(botonEditarForm);

    //Boton borrar api
    let  botonBorrarApi = document.createElement('button');
    botonBorrarApi.type = 'button';
    botonBorrarApi.className = 'gasto-borrar-api';
    botonBorrarApi.textContent = 'Borrar (API)';

    let apiBorrar = new BorrarGastosApi(gasto);
    apiBorrar.gasto = gasto;
    botonBorrarApi.addEventListener('click',apiBorrar);
    divGasto.append( botonBorrarApi);
     
};

//Funciones
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";

   let divAgrup = `<div class="agrupacion"> <h1>Gastos agrupados por ${periodo}</h1>`;

   for(let agrupacion in agrup){
    divAgrup +=`<div class="agrupacion-dato"><span class="agrupacion-dato-clave">${agrupacion}</span>
    <span class="agrupacion-dato-valor">${agrup[agrupacion]}</span></div>`;
   }
   divAgrup += '</div>';
   divP.innerHTML = divAgrup;
   
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
    document.getElementById('presupuesto');
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto())

    document.getElementById('gastos-totales');
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos().toFixed(2));

    document.getElementById('balance-total');
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance().toFixed(2));
    
    document.getElementById('listado-gastos-completo').innerHTML = '';

    for(let completo of gestionPresupuesto.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo',completo);
    }

    //Libreria externa
    let dia = gestionPresupuesto.agruparGastos("dia");
    mostrarGastosAgrupadosWeb("agrupacion-dia",dia,"día");
    
    let mes = gestionPresupuesto.agruparGastos("mes");
    mostrarGastosAgrupadosWeb("agrupacion-mes",mes,"mes");
    
    let anyo = gestionPresupuesto.agruparGastos("anyo");
    mostrarGastosAgrupadosWeb("agrupacion-anyo",anyo,"año");
    

};

function actualizarPresupuestoWeb(){
    let presupuesto = parseFloat(prompt('Introduce el presupuesto'));
    gestionPresupuesto.actualizarPresupuesto(presupuesto);

    repintar();
    
};

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce la descripcion');
    let valor = parseFloat(prompt('Introduce el valor'));
    let fecha =  Date.parse(prompt('Introduce la fecha en formato yyyy/mm/dd'));
    let etiquetas = prompt('Introduce las etiquetas como una lista separadas por ,').split(',');

    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);

    repintar();

}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
   
        let controles = document.getElementById("controlesprincipales");
        controles.append(formulario);

        document.getElementById("anyadirgasto-formulario").setAttribute('disabled', "");

        //Boton cancelar
        let cancelar = new CancelarHandleFormulario();
        let botonCancelar = formulario.querySelector("button.cancelar")
        botonCancelar.addEventListener('click',cancelar);

        //Boton enviar formulario
        let enviar = new EnviarHandleFormulario();
        formulario.addEventListener('submit',enviar);

        //Boton enviar Api
        let enviarApi = formulario.querySelector("button.enviar-api");
        formulario.addEventListener('click', new enviarApi());

};

//Funciones constructoras y metodos
function EditarHandle(){
  this.handleEvent = function (event) {

    let nuevaDescripcion = prompt('Introduce la nueva descripcion');
    let nuevoValor =  parseFloat(prompt('Introduce el nuevo valor'));;
    let nuevaFecha = Date.parse(prompt('Introduce la fecha en formato yyyy/mm/dd'));
    let nuevasEtiquetas = prompt('Introduce las etiquetas como una lista separadas por ,');
    nuevasEtiquetas = nuevasEtiquetas.split(',');

    //Actualizar gasto
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

    repintar();
    }

};

function BorrarHandle(){
  this.handleEvent = function (event) {
    let borrarGasto = this.gasto.id;
    gestionPresupuesto.borrarGasto(borrarGasto);

    repintar();
    }
};

function BorrarEtiquetasHandle(){
  this.handleEvent = function (event) {
    this.gasto.borrarEtiquetas(this.etiquetas);

    repintar();
    } 
};

function EditarHandleFormulario(){
    this.handleEvent = function(event){

        event.preventDefault()

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var formulario = plantillaFormulario.querySelector("form");

        let controles = document.getElementById("controlesprincipales");
        controles.append(formulario);
    
        let botonFormulario = event.currentTarget;
        botonFormulario.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        
        //Boton cancelar
        let cancelar = new CancelarHandleFormulario();
        let botonCancelar = formulario.querySelector("button.cancelar")
        botonCancelar.addEventListener('click',cancelar);

        //Boton enviar
        let enviar = new EnviarHandle();
        enviar.gasto = this.gasto;
        formulario.addEventListener('submit',enviar);

        //Desabilitar boton
        botonFormulario.setAttribute('disabled', "");

        //boton editar api
        let editarApi = new EditarHandleApi();
        editarApi.gasto = this.gasto;
        formulario.addEventListener('click',editarApi);


    }
}

function CancelarHandleFormulario(){
    this.handleEvent = function(event){

        event.preventDefault();

        event.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();

    }
}

function EnviarHandle(){
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
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
}

function EnviarHandleFormulario(){
    this.handleEvent = function(event){

        event.preventDefault();

        let formulario = event.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;

        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
        gestionPresupuesto.anyadirGasto(nuevoGasto);
        
        repintar();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");

    }
}

function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();

        let descripcion = document.getElementById("formulario-filtrado-descripcion").value;
        let valorMin = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let valorMax = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let fechaDesde =  document.getElementById("formulario-filtrado-fecha-desde").value;
        let fechaHasta =  document.getElementById("formulario-filtrado-fecha-hasta").value;
        let etiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        let filtrado ={};

        if(etiquetas.length > 0){
            filtrado.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetas);
        }
        
        filtrado.descripcionContiene = descripcion;
        filtrado.valorMinimo = valorMin;
        filtrado.valorMaximo = valorMax;
        filtrado.fechaDesde = fechaDesde;
        filtrado.fechaHasta = fechaHasta;
        filtrado.etiquetas = etiquetas;

        document.getElementById("listado-gastos-completo").innerHTML = "";
        let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtrado);

        for(let gasto of gastosFiltrados){
            mostrarGastoWeb("listado-gastos-completo",gasto);
        };

    }

};

function guardarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();

        localStorage.setItem('GestorGastosDWEC',JSON.stringify(gestionPresupuesto.listarGastos()));


    }

};

function cargarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();

        if(localStorage.getItem('GestorGastosDWEC') != null){
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.getItem('GestorGastosDWEC')));
        }
        else{
            gestionPresupuesto.cargarGastos([]);
        }

        repintar();
    }

};  

function cargarGastosApi(e){
    this.handleEvent = function(event){
    

        let nombreUsuario = document.getElementById("nombre_usuario").value;
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(function(gastos)
            {
                gestionPresupuesto.cargarGastos(gastos);
            repintar();
        })
        .catch(error => {
          console.log(error);
        });
    }
}

function BorrarGastosApi(){
    this.handleEvent =  async function(event){

        let nombreUsuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;

       try {
        await fetch(url, {method: 'DELETE'});
        cargarGastosApi();
       } catch(error){
        console.log(error);
       }
    }
};

function EnviarGastosApi(){
    this.handleEvent = function(event){

        let nombreUsuario = document.getElementById("nombre_usuario").value;
        console.log(nombreUsuario);
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;
        console.log(url);

        let formulario = document.getElementById("#controlesprincipales form");
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value.split(',');

        let gasto = {
            "descripcion": descripcion,
            "valor": valor,
            "fecha": fecha,
            "etiquetas": etiquetas,
        }

        try {
            fetch(url, {method: 'POST', body: JSON.stringify(gasto), headers: {'Content-type': 'application/json; charset=utf-8'}});
            cargarGastosApi();
        } catch(error){
            console.log(error);
        }
    }

};

function EditarHandleApi(){
    this.handleEvent = function(event){

        let nombreUsuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;

        let formulario = event.currentTarget.formulario;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value.split(',');

        let gasto = {
            "descripcion": descripcion,
            "valor": valor,
            "fecha": fecha,
            "etiquetas": etiquetas,
        }

        try {
             fetch(url, {method: 'PUT', body: JSON.stringify(gasto), headers: {'Content-type': 'application/json; charset=utf-8'}});
            cargarGastosApi();
        } catch(error){
            console.log(error);
        }

    }

};



//Botones para añadir al html
let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click',actualizarPresupuestoWeb);

let botonNuevoGasto = document.getElementById('anyadirgasto');
botonNuevoGasto.addEventListener('click',nuevoGastoWeb);

let botonAnyadirGasto = document.getElementById('anyadirgasto-formulario');
botonAnyadirGasto.addEventListener('click',nuevoGastoWebFormulario);

let botonSubmit = document.getElementById('formulario-filtrado');
botonSubmit.addEventListener('submit', new filtrarGastosWeb());

let botonGuardar = document.getElementById('guardar-gastos');
botonGuardar.addEventListener('click', new guardarGastosWeb());

let botonCargar = document.getElementById('cargar-gastos');
botonCargar.addEventListener('click', new cargarGastosWeb());

//Boton API
let botonCargarApi = document.getElementById('cargar-gastos-api');
botonCargarApi.addEventListener('click', new cargarGastosApi());



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    EditarHandleFormulario,
    CancelarHandleFormulario,
    EnviarHandleFormulario,
    EnviarHandle,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi,
    BorrarGastosApi,
    EnviarGastosApi,
    EditarHandleApi
}