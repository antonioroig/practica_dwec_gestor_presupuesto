"use strict";
import * as exGp from './gestionPresupuesto.js';
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
let filtrarGasWeb = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGasWeb);
let guardar = new guardarGastosWeb();
document.getElementById("guardar-gastos").addEventListener('click', guardar);
let cargarGastosW = new cargarGastoWeb();
document.getElementById("cargar-gastos").addEventListener('click', cargarGastosW);
document.getElementById("cargar-gastos-api").addEventListener('click', CargarGastosApi);

/*
let btnActualizarpres = document.getElementById("actualizarpresupuesto");
btnActualizarpres.onclick = actualizarPresupuestoWeb;
let btnAnyadirgast = document.getElementById("anyadirgasto");
btnAnyadirgast.onclick =  nuevoGastoWeb;*/
//document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
//document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
function mostrarDatoEnId(valor, idElemento)
{
    let elem = document.getElementById(idElemento);
    //elem.innerHTML += valor;
    let p = document.createElement("p");
    //let pTexto = document.createTextNode(valor);
    //p.appendChild(pTexto);
    p.textContent = valor;
    elem.appendChild(p);
}
function mostrarGastoWeb(gasto, idElemento)
{
        // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
    let elem = document.getElementById(idElemento);
    let padre = document.createElement("div");
    padre.className  = "gasto";
    
    let titulo = document.createElement("h2");
    titulo.className  = "gasto";
    titulo.textContent = "GASTO";
    padre.appendChild(titulo);
    let gastDes = document.createElement("div");
    gastDes. className = "gasto-descripcion";
    gastDes.textContent = "DESCRIPCION: "+ gasto.descripcion;
    padre.appendChild(gastDes);

    let gastFech = document.createElement("div");
    gastFech. className = "gasto-fecha";
    gastFech.textContent = " FECHA: " + new Date(gasto.fecha).toLocaleDateString();
    padre.appendChild(gastFech);

    let gastVal = document.createElement("div");
    gastVal. className = "gasto-valor";
    gastVal.textContent ="VALOR: " + gasto.valor;
    padre.appendChild(gastVal);

    let gastEtiq = document.createElement("div");
    gastEtiq. className = "gasto-etiquetas";
    /*gasto.etiquetas.forEach(etiqueta =>
        {
            let borrarEtiqueta = new BorrarEtiquetasHandle();
            borrarEtiqueta.gasto = gasto;
            borrarEtiqueta.etiqueta = etiqueta;
    
            let etiq = document.createElement('span');
            etiq.className = 'gasto-etiquetas-etiqueta';
            etiq.textContent = etiqueta +"";
            if(idElemento == "listado-gastos-completo"){
                etiq.addEventListener("click", borrarEtiqueta);
            }
            gastEtiq.appendChild(etiq);        
        });*/

   for(let i=0; i < gasto.etiquetas.length;i++)
    {
        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = gasto.etiquetas[i];

        let etiq = document.createElement('span');
        
        etiq.className = 'gasto-etiquetas-etiqueta';
        etiq.textContent = `ETIQUETA ${[i+1]}: ${gasto.etiquetas[i]}` +" ";
        etiq.addEventListener("click", borrarEtiqueta);
        gastEtiq.appendChild(etiq);
    }
    padre.appendChild(gastEtiq);
  
   /* gasto.etiquetas.forEach(etiqueta => {
        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;

        let etiq = document.createElement('span');
        etiq.className = 'gasto-etiquetas-etiqueta';
        etiq.textContent = etiqueta +"";
        if(idElemento == "listado-gastos-completo"){
            etiq.addEventListener("click", borrarEtiqueta);
        }
        gastEtiq.appendChild(etiq);

    });*/
    /*
    for (let i = 0; i < gasto.etiquetas.length; i++)
    {
        let etiq = document.createElement('span');
        etiq.className = 'gasto-etiquetas-etiqueta';
        etiq.textContent = etiqueta;
        gastEtiq.appendChild(etiq);
    }  */      

    let botonEditar = document.createElement('button');
    botonEditar.className = 'gasto-editar';
    botonEditar.type = 'button';
    botonEditar.textContent = 'Editar';
    padre.append(botonEditar);
    let editarEvento = new EditarHandle();
    editarEvento.gasto = gasto;
    botonEditar.addEventListener('click', editarEvento); 

    let botonBorrar = document.createElement('button');
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.type = 'button';
    botonBorrar.textContent = 'Borrar';

    let borrarEvento = new BorrarHandle();
    borrarEvento.gasto = gasto;
    botonBorrar.addEventListener('click', borrarEvento);
    padre.append(botonBorrar);
    let botonEditarForm=document.createElement("button");
    botonEditarForm.className="gasto-editar-formulario";
    botonEditarForm.type="button";
    botonEditarForm.textContent="Editar Form";

    let editarFormEvent = new EditarHandleFormulario();
    editarFormEvent.gasto=gasto;
    editarFormEvent.elements= padre;
    editarFormEvent.boton=botonEditarForm;
    botonEditarForm.addEventListener('click',editarFormEvent);

    let BorrarAPI = new BorrarGastoApiHandle();
    BorrarAPI.gasto = gasto;

    // boton borrar API
    let botonBorrarAPI = document.createElement("button");
    botonBorrarAPI.className = "gasto-borrar-api";
    botonBorrarAPI.type = "button";
    botonBorrarAPI.textContent = "Borrar (API)";
    botonBorrarAPI.addEventListener('click', BorrarAPI);
    padre.appendChild(botonBorrarAPI);
    padre.appendChild(botonEditarForm);
    elem.appendChild(padre);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{   
    // let elem = document.getElementById(idElemento);
    // let padre = document.createElement("div");
    // padre.className  = 'agrupacion';
    // let h1 = document.createElement("h1");
    // h1.textContent = `Gastos agrupados por  ${periodo}`;
    // padre.appendChild(h1);

    // for( let [nombre, valor] of Object.entries( agrup ))
    // {
    //     let aux = document.createElement('div');
    //     aux.className = 'agrupacion-dato';
    //     let span1 = document.createElement('span');
    //     span1.className= 'agrupacion-dato-clave';
    //     span1.textContent = nombre;
    //     let span2 = document.createElement('span');
    //     span2.className= 'agrupacion-dato-valor';
    //     span2.textContent = valor;
    //     aux.appendChild(span1);
    //     aux.appendChild(span2);
    //     padre.appendChild(aux);
    // }
    // elem.appendChild(padre);
    
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
function repintar()
{
    /*
    document.getElementById('presupuesto').innerHTML = exGp.mostrarPresupuesto;
    document.getElementById('presupuesto').innerHTML += mostrarDatoEnId;

    document.getElementById('gastos-totales').innerHTML = exGp.calcularTotalGastos;
    document.getElementById('gastos-totales').innerHTML += mostrarDatoEnId;

    document.getElementById('balance-total').innerHTML = exGp.calcularTotalGastos;
    document.getElementById('balance-total').innerHTML += mostrarDatoEnId;*/
    document.getElementById('presupuesto').innerHTML='';
    document.getElementById('gastos-totales').innerHTML='';
    document.getElementById('balance-total').innerHTML='';
    mostrarDatoEnId(exGp.mostrarPresupuesto(), 'presupuesto');  
    mostrarDatoEnId(exGp.calcularTotalGastos(), 'gastos-totales');
    mostrarDatoEnId(exGp.calcularBalance(), 'balance-total');
    let aux = document.getElementById('listado-gastos-completo');
    aux.innerHTML = "";
    exGp.listarGastos().forEach(gasto => {
        mostrarGastoWeb(gasto,"listado-gastos-completo");
    });
    let aux1 = document.getElementById("listado-gastos-filtrado-1");
    aux1.innerHTML="";
    exGp.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}).forEach(a => {
        mostrarGastoWeb(a,"listado-gastos-filtrado-1");
    });

    let aux2 = document.getElementById("listado-gastos-filtrado-2");
    aux2.innerHTML = "";
    exGp.filtrarGastos({valorMinimo: 50}).forEach(a => {
        mostrarGastoWeb(a,"listado-gastos-filtrado-2");
    });

    let aux3 = document.getElementById("listado-gastos-filtrado-3");
    aux3.innerHTML = "";
    exGp.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}).forEach(a => {
        mostrarGastoWeb(a,"listado-gastos-filtrado-3");
    });

    let aux4 = document.getElementById("listado-gastos-filtrado-4");
    aux4.innerHTML = "";
    exGp.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida" , "transporte"]}).forEach(a => {
        mostrarGastoWeb(a,"listado-gastos-filtrado-4");
    });

    document.getElementById("agrupacion-dia").innerHTML="";
    mostrarGastosAgrupadosWeb("agrupacion-dia", exGp.agruparGastos("dia"), "día");

    document.getElementById("agrupacion-mes").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-mes", exGp.agruparGastos("mes"), "mes");

    document.getElementById("agrupacion-anyo").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-anyo", exGp.agruparGastos("anyo"), "año");
}

function actualizarPresupuestoWeb()
{
    let presupuesto = prompt("Introduzca un presupuesto: ");
    presupuesto = parseFloat(presupuesto);
    exGp.actualizarPresupuesto(presupuesto);
    repintar();
} 
function nuevoGastoWeb ()
{
    let descripcion = prompt("Introduzca la descripcion: ");
    let valor = prompt("introduzca el valor: ");
    valor = parseFloat(valor);
    let fecha = prompt("Introduzca la fecha: ");
    let etiqueta = prompt("Introduzca las etiquetas separadas por comas ,: ");
    let etiquetas= etiqueta.split(',');
    let nuevoGasto = new exGp.CrearGasto(descripcion,valor,fecha,...etiquetas);
    exGp.anyadirGasto(nuevoGasto);
    repintar();
}
function EditarHandle()
{
    this.handleEvent = function (event)
    {
        let descripcion = prompt("Introduzca la descripcion: ");
        let valor = prompt("introduzca el valor: ");
        valor = parseFloat(valor);
        let fecha = prompt("Introduzca la fecha: ");
        let etiqueta = prompt("Introduzca las etiquetas separadas por comas ,: ");
        let etiquetas= etiqueta.split(',');

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    };
}
function BorrarHandle() 
{
    this.handleEvent = function()
    {
        exGp.borrarGasto(this.gasto.id);
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

function nuevoGastoWebFormulario()
{
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var form = plantillaFormulario.querySelector("form");
    let divContPrincipales = document.getElementById("controlesprincipales");
    divContPrincipales.appendChild(form);
    document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
   
    let enviar = new EnviarHandleFormulario();
    form.addEventListener('submit', enviar);

    let cancelar = new CancelarHandleFormulario();
    cancelar.form = form;
    let btnCancel = form.querySelector("button.cancelar");
    btnCancel.addEventListener("click", cancelar);

    let enviarApi = form.querySelector("button.gasto-enviar-api");
    enviarApi.addEventListener("click", new EnviarGastoApi);                                   
    
}

function EnviarHandleEditarFormulario()
{
    this.handleEvent = function(event)
    {
        
       event.preventDefault();

       let form = event.currentTarget;
       let descrip = form.elements.descripcion.value;
       this.gasto.actualizarDescripcion(descrip);
       let v1 = parseFloat(form.elements.valor.value);
       this.gasto.actualizarValor(v1);
       let fec = form.elements.fecha.value;
       this.gasto.actualizarFecha(fec);
       let etiq = form.elements.etiquetas.value;
       this.gasto.anyadirEtiquetas(etiq);

        repintar();
    };
}

function EnviarHandleFormulario()
{
    this.handleEvent = function(e)
    {
        e.preventDefault();
         let form = e.currentTarget;
         let descrip = form.elements.descripcion.value;
         let v1 = parseFloat(form.elements.valor.value);
         let fec = new Date(form.elements.fecha.value);
         let etiq = form.elements.etiquetas.value;
        let gNuevo = new exGp.CrearGasto(descrip, v1, fec, etiq);
        exGp.anyadirGasto(gNuevo);
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
}
function CancelarHandleFormulario() 
{
    this.handleEvent = function (event)
    {
        this.form.remove();
        document.getElementById('anyadirgasto-formulario').removeAttribute('disabled');
    };
}
function EditarHandleFormulario()
{
    this.handleEvent = function(event)
    {
        let form = event.currentTarget;
        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);;
        form = plantillaFormulario.querySelector('form');
    
        let divControlesPrincipales = document.getElementById("controlesprincipales")
        divControlesPrincipales.appendChild(form);
        //event.parent

        
        let btnEditarFormulario = event.currentTarget;
        btnEditarFormulario.appendChild(form);
        form.elements.descripcion.value  = this.gasto.descripcion;
        form.elements.valor.value = this.gasto.valor;
        form.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);
        form.elements.etiquetas.value = this.gasto.etiquetas;

        
        let EditarFormHandle1 = new EnviarHandleEditarFormulario();
        EditarFormHandle1.gasto = this.gasto;
        form.addEventListener('submit', EditarFormHandle1);
        
        let btnCancel = form.querySelector("button.cancelar");
        let cancelObj = new CancelarHandleEditarFormulario();
        btnCancel.addEventListener("click", cancelObj);

        btnEditarFormulario.setAttribute("disabled", "");  
        let editarFormularioApi = form.querySelector("button.gasto-enviar-api");
        let eventEditar = new EditarGastoApi();
        eventEditar.gasto = this.gasto;
        editarFormularioApi.addEventListener("click", eventEditar);                                                    
    };
}
function CancelarHandleEditarFormulario(){
    this.handleEvent = function(event)
    {
        event.currentTarget.parentNode.remove();
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    };
}
function filtrarGastosWeb(){
    this.handleEvent = function(event) 
    {
        event.preventDefault();
        let form = event.currentTarget;
        let descripcion = form.elements["formulario-filtrado-descripcion"].value;
        let minimo = parseFloat(form.elements["formulario-filtrado-valor-minimo"].value);
        let maximo = parseFloat(form.elements["formulario-filtrado-valor-maximo"].value);
        let desde = new Date(form.elements["formulario-filtrado-fecha-desde"].value);
        let hasta = new Date(form.elements["formulario-filtrado-fecha-hasta"].value);
        let etiquetas = (form.elements["formulario-filtrado-etiquetas-tiene"].value);
        if (etiquetas !== undefined) {
            etiquetas = exGp.transformarListadoEtiquetas(etiquetas);
        }
        let gestionFiltrado = exGp.filtrarGastos({fechaDesde : desde, fechaHasta : hasta, valorMinimo : minimo, valorMaximo : maximo, descripcionContiene : descripcion, etiquetasTiene : etiquetas});
        document.getElementById("listado-gastos-completo").innerHTML = " ";
        for (let aux of gestionFiltrado){
            mostrarGastoWeb(aux, "listado-gastos-completo");
        }
    };

}
function guardarGastosWeb(){
    this.handleEvent = function(event) 
    {
        let listarGastos = exGp.listarGastos();
        localStorage.GestorGastosDWEC = JSON.stringify(listarGastos);
    }; 
}
function cargarGastoWeb(){
    this.handleEvent = function(event) 
    {
        if (localStorage.GestorGastosDWEC == null) 
            exGp.cargarGastos([]);
        else 
            exGp.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
        repintar();    
    };
}
//practica 9//
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
            exGp.cargarGastos(gastosAPI);
            repintar();
        })
        .catch(err => alert(err));
    }else
    {
        alert('Introduzca un usuario');
    }
   
}

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

function EnviarGastoApi()
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
export   {  
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
//npm cypress open//para ejecutar el text de la practica 4//
//type module//