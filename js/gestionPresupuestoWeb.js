
import * as pres from './gestionPresupuesto.js';

"use strict";
function mostrarDatoEnId(valor,idElemento)
{
    let id = document.getElementById(idElemento);
    id.innerHTML = valor;
};
function mostrarGastoWeb(idElemento,gasto)
{
 let id = document.getElementById(idElemento);
 let div = document.createElement('div');
 div.className ="gasto";
 id.append(div);
 let idGasto = document.getElementsByClassName("gasto");

 let desc_gasto = document.createElement('div');
 desc_gasto.className = "gasto-descripcion";
 desc_gasto.textContent = gasto.descripcion;
 div.append(desc_gasto);

 let fecha_gasto = document.createElement('div');
 fecha_gasto.className = "gasto-fecha";
 fecha_gasto.textContent = new Date(gasto.fecha).toLocaleDateString();
 div.append(fecha_gasto);

 let valor_gasto = document.createElement('div');
 valor_gasto.className = "gasto-valor";
 valor_gasto.textContent = gasto.valor;
 div.append(valor_gasto);

 let etiquetas_gasto = document.createElement('div');
 etiquetas_gasto.className = "gasto-etiquetas";
 for(let etiqueta of gasto.etiquetas)                    
 {
    let span = document.createElement('span');
    span.className = "gasto-etiquetas-etiqueta";
    span.textContent = " " + etiqueta;
    etiquetas_gasto.append(span);

    let etiquetas_borradas = new BorrarEtiquetasHandle();
    etiquetas_borradas.gasto = gasto;
    etiquetas_borradas.etiquetas = etiqueta;
    span.addEventListener('click',etiquetas_borradas);
 }
 div.append(etiquetas_gasto);

 let btnEditar = document.createElement('button');
 btnEditar.type ='button';
 btnEditar.className = 'gasto-editar';
 btnEditar.textContent = 'Editar';
 
 let gasto_editar = new EditarHandle(gasto);
 gasto_editar.gasto = gasto;

 btnEditar.addEventListener('click',gasto_editar)
 div.append(btnEditar);

 let btnBorrar = document.createElement('button');
 btnBorrar.type ='button';
 btnBorrar.className = 'gasto-borrar';
 btnBorrar.textContent = 'Borrar';
 
 let borrar_gasto = new BorrarHandle(gasto);
 borrar_gasto.gasto = gasto;

 btnBorrar.addEventListener('click',borrar_gasto)
 div.append(btnBorrar);

 let btnEditarForm = document.createElement('button');
 
 btnEditarForm.type = "button";
 btnEditarForm.className = 'gasto-editar-formulario';

 btnEditarForm.textContent = 'Editar(formulario)';

 let editarFormulario= new EditarHandleFormulario(gasto);
 editarFormulario.gasto = gasto;

 btnEditarForm.addEventListener('click',editarFormulario);
 div.append(btnEditarForm);

 let api_borrar = document.createElement('button');
 api_borrar.type='button';
 api_borrar.className ='gasto-borrar-api';
 api_borrar.textContent = 'Borrar(Api)';

 let borrarApi = new BorrarGastosApi ();
 borrarApi.gasto = gasto;
 borrarApi.btnEditarForm = btnEditarForm;
 api_borrar.addEventListener('click',borrarApi);
 div.append(api_borrar);

};
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{
    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
    let id = document.getElementById(idElemento);
    let agrupacion = '<div class="agrupacion"> <h1> Gastos agrupados por ' +  periodo + '</h1>';

    for(let agrupado in agrup)
    {
        agrupacion += `<div class="agrupacion-dato"> <span class="agrupacion-dato-clave"> ${agrupado} </span>
        <span class="agrupacion-dato-valor"> ${agrup[agrupado]} </span></div>`;
    }
    agrupacion += '</div>';
    id.innerHTML = agrupacion;

    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
    let unit = "";
    switch (periodo) 
    {
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

function repintar()
{
   
    mostrarDatoEnId(pres.mostrarPresupuesto(),'presupuesto');
    mostrarDatoEnId(pres.calcularTotalGastos(),'gastos-totales');
    mostrarDatoEnId(pres.calcularBalance(),'balance-total');

    document.getElementById('listado-gastos-completo').innerHTML = '';
    // for(let gasto_completo of pres.listarGastos())
    // {
    //     mostrarGastoWeb('listado-gastos-completo',gasto_completo);
    // }
     pres.listarGastos().forEach(gasto =>{
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });

    
    let dia = pres.agruparGastos('dia');
    mostrarGastosAgrupadosWeb('agrupacion-dia',dia,'día');

    let mes = pres.agruparGastos('mes');
    mostrarGastosAgrupadosWeb('agrupacion-mes',mes,'mes');

    let anyo = pres.agruparGastos('anyo');
    mostrarGastosAgrupadosWeb('agrupacion-anyo',anyo,'año');

}


function actualizarPresupuestoWeb()
{
    let presupuesto = parseInt(prompt('Introduce el presupuesto actualizado'));
    pres.actualizarPresupuesto(presupuesto);
    repintar();
};

let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener('click',actualizarPresupuestoWeb);


function nuevoGastoWeb()
{
    let descripcion = prompt('Introduce la descripcion:');
    let valor = parseFloat(prompt('Introduce el valor del gasto:'));
    let fecha = Date.parse(prompt('Introduce la fecha en formato yyyy/mm/dd'));
    let etiquetas = prompt('Introduce las estiquetas de este gasto separadas por,').split(',');

    let gasto_nuevo = new pres.CrearGasto(descripcion,valor,fecha,...etiquetas);

    pres.anyadirGasto(gasto_nuevo);

    repintar();
};

let botonAñadirGasto = document.getElementById('anyadirgasto');
botonAñadirGasto.addEventListener('click',nuevoGastoWeb);

function EditarHandle()
{
    this.handleEvent = function (event) 
    {

        let new_descripcion = prompt('Introduce la nueva descripcion:', this.gasto.descripcion);
        let new_valor = parseFloat(prompt('Introduce el nuevo valor del gasto:', this.gasto.valor));
        let new_fecha = Date.parse(prompt('Introduce la nueva fecha en formato yyyy/mm/dd', this.gasto.fecha));
        let new_etiqueta = prompt('Introduce las estiquetas nuevas de este gasto separadas por ,').split(',');
        


        this.gasto.actualizarDescripcion(new_descripcion);
        this.gasto.actualizarValor(new_valor);
        this.gasto.actualizarFecha(new_fecha);
        this.gasto.anyadirEtiquetas(new_etiqueta);

        repintar();

    }

};
function BorrarHandle()
{
    this.handleEvent = function (event) 
    {
        pres.borrarGasto(this.gasto.id);
        repintar();
    }
};
function BorrarEtiquetasHandle()
{
    this.handleEvent = function (event) 
    {
        
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    }
};
function nuevoGastoWebFormulario()
{
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let controles = document.getElementById('controlesprincipales');
    controles.append(formulario);

    document.getElementById('anyadirgasto-formulario').setAttribute('disabled',"");

    let cancelar = new CancelarHandleFormulario();
    let cancelar_boton = formulario.querySelector('button.cancelar');

    cancelar_boton.addEventListener('click',cancelar);

    let enviar = new EnviarHandleFormulario();
    formulario.addEventListener('submit', enviar);
    let Api_enviar = formulario.querySelector("button.gasto-enviar-api")
    Api_enviar.addEventListener('click', new EnviarHandleApi());
};

let botonFormulario = document.getElementById('anyadirgasto-formulario');
botonFormulario.addEventListener('click', nuevoGastoWebFormulario);

function EnviarHandleFormulario()
{
    this.handleEvent = function (event)
    {
        event.preventDefault();
        let formulario = event.currentTarget;

        let new_desc = formulario.elements.descripcion.value;
        let new_valor = parseFloat(formulario.elements.valor.value);
        let new_fecha = formulario.elements.fecha.value;
        let new_etiquetas = formulario.elements.etiquetas.value;

        let new_gasto = new pres.CrearGasto(new_desc,new_valor,new_fecha,...new_etiquetas);

        pres.anyadirGasto(new_gasto);

        repintar();

        document.getElementById('anyadirgasto-formulario').removeAttribute("disabled");
    } 
};
function CancelarHandleFormulario()
{
    this.handleEvent = function (event)
    {
        event.preventDefault();
        event.currentTarget.parentNode.remove();
        document.getElementById('anyadirgasto-formulario').removeAttribute("disabled");
        repintar();
    }
};

function EditarHandleFormulario()
{
    this.handleEvent = function (event)
    {
        event.preventDefault();
        
        let template = document.getElementById('formulario-template').content.cloneNode(true);

        let formulario = template.querySelector('form');

        let controles = document.getElementById('controlesprincipales');
        controles.append(formulario);

        let btnFormulario = event.currentTarget;
        btnFormulario.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toLocaleString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let cancelar = new CancelarHandleFormulario();
        let cancelar_boton = formulario.querySelector('button.cancelar');
        cancelar_boton.addEventListener('click',cancelar);
        
        let editApi = new EditarHandleApi();
        let botonApi = formulario.querySelector('button.gasto-enviar-api')
        editApi.gasto = this.gasto;
        botonApi.addEventListener('click',editApi)
        
        let enviar = new EnviarHandle();
        enviar.gasto = this.gasto;
        formulario.addEventListener('submit', enviar);

        btnFormulario.setAttribute('disabled', "");

  
    }
};
function EnviarHandle()
{
    this.handleEvent = function (event)
    {
        event.preventDefault();
        let formulario = event.currentTarget;

        let new_desc = formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(new_desc);

        let new_valor = parseFloat(formulario.elements.valor.value);
        this.gasto.actualizarValor(new_valor);

        let new_fecha = formulario.elements.fecha.value;
        this.gasto.actualizarFecha(new_fecha);

        let new_etiquetas = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(...new_etiquetas);

       repintar();
    }



}
function filtrarGastosWeb () 
{
    this.handleEvent = function(event){
        event.preventDefault();
        let formulario = event.currentTarget;
        let descripcion = formulario.elements["formulario-filtrado-descripcion"].value;
        let min_valor = parseFloat(formulario.elements["formulario-filtrado-valor-minimo"].value);
        let max_valor= parseFloat(formulario.elements["formulario-filtrado-valor-maximo"].value);
        let fechaDesde = formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetas = formulario.elements["formulario-filtrado-etiquetas-tiene"].value;
        let gasto_filtrado = {};

       
        if(descripcion != "")
        {
           gasto_filtrado.descripcionContiene = descripcion;  
        }
       if(!isNaN(min_valor))
       {
         gasto_filtrado.valorMinimo = min_valor;
       }
       if(!isNaN(max_valor))
       {
         gasto_filtrado.valorMaximo = max_valor;
       }
       if(fechaDesde != "")
       {
            gasto_filtrado.fechaDesde = fechaDesde;
       }
       if(fechaHasta != "")
       {
            gasto_filtrado.fechaHasta = fechaHasta;
       }
       if(etiquetas.lenght > 0 || etiquetas != "")
       {
           gasto_filtrado.etiquetasTiene = pres.transformarListadoEtiquetas(etiquetas)
       }
   

        document.getElementById("listado-gastos-completo").innerHTML="";

        let filtrados = pres.filtrarGastos(gasto_filtrado);

        for(let gasto of filtrados)
        {
            mostrarGastoWeb("listado-gastos-completo",gasto);
        };
    }
}

let btnEnviar = document.getElementById("formulario-filtrado");
btnEnviar.addEventListener('submit', new filtrarGastosWeb());

function guardarGastosWeb()
{
    localStorage.GestorGastosDWEC=JSON.stringify(pres.listarGastos());
}

function cargarGastosWeb()
{
    let cargar = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
    if(cargar != null)
    {
        pres.cargarGastos(JSON.parse(localStorage.getItem('GestorGastosDWEC')))
    }
    else
    {
        pres.cargarGastos([]);
    }
    repintar();
}

let btnGuardarGasto = document.getElementById("guardar-gastos");
btnGuardarGasto.onclick = guardarGastosWeb;

let btnCargarGasto = document.getElementById("cargar-gastos");
btnCargarGasto.onclick = cargarGastosWeb;

function cargarGastosApi()
{
    
        let usuario_nombre = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario_nombre}`;
        fetch(url,{method:'GET'})
        .then(response => response.json())
        .then(function(gastos) 
        {
            pres.cargarGastos(gastos);
            repintar();
        })
        .catch(error => console.log(error));         
    
       
}
let btnCargarApi = document.getElementById('cargar-gastos-api');
btnCargarApi.addEventListener('click', cargarGastosApi);
  
function EnviarHandleApi()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let formulario = document.querySelector("#controlesprincipales form");
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        let user = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}`;
        let gasto = {
            "descripcion": descripcion,
            "valor": valor,
            "fecha": fecha,
            "etiquetas": etiquetas
        }
        fetch(url, {method: 'POST', body:  JSON.stringify(gasto), headers: {
            'Content-Type': 'application/json; charset=utf-8'}})
      
            .then(response => response.json())
            .then(data => {
                cargarGastosApi(data);})
            .catch(error => console.log(error));
    }
}
function BorrarGastosApi()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let user = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/`+ user + "/"+ this.gasto.gastoId;

        fetch(url, {method: 'DELETE'})
        .then(data =>{
            pres.borrarGasto(this.gasto.gastoId);
            cargarGastosApi();
        })
        .catch(error => console.log(error));
    }
}
function EditarHandleApi()
{
    this.handleEvent = function(event)
    {
     
        let formulario = event.currentTarget.form;
        let descripcion = formulario.elements.descripcion.value;
        let valor = parseFloat(formulario.elements.valor.value);
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        let user = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${user}/${this.gasto.gastoId}`;
        let gasto = {
            "descripcion": descripcion,
            "valor": valor,
            "fecha": fecha,
            "etiquetas": etiquetas
        }
      
            fetch(url, {method: 'PUT', body:  JSON.stringify(gasto), headers: {
                'Content-Type': 'application/json; charset=utf-8'}})
               .then(response => response.json())
                .then(gasto => {
                cargarGastosApi();})
                .catch(error => console.log(error));
       
    }
}


export{mostrarDatoEnId,mostrarGastoWeb,mostrarGastosAgrupadosWeb,repintar,actualizarPresupuestoWeb,nuevoGastoWeb,EditarHandle,BorrarHandle,BorrarEtiquetasHandle,EnviarHandle,EditarHandleFormulario,EnviarHandleFormulario,CancelarHandleFormulario,nuevoGastoWebFormulario,filtrarGastosWeb,cargarGastosWeb,guardarGastosWeb, cargarGastosApi, EnviarHandleApi, BorrarGastosApi, EditarHandleApi}

