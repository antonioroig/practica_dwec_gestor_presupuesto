import{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
} from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento){
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML = valor;
    }
}
function mostrarGastoWeb(idElemento, gasto){
    const h2 = document.createElement("h2");
    const text = document.createTextNode("GASTO " );
    h2.appendChild(text);
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        elemento.appendChild(h2)
        let divGasto = document.createElement("div");
            divGasto.className = "gasto";
            elemento.appendChild(divGasto);

        if(gasto.descripcion){
            let divGastoDescripcion = document.createElement("div");
                divGastoDescripcion.className = "gasto-descripcion";
                divGastoDescripcion.innerHTML += "Descripcion: " + gasto.descripcion;
                divGasto.appendChild(divGastoDescripcion);
        }
        if(gasto.valor){
            let divGastoFecha = document.createElement("div");
                divGastoFecha.className = "gasto-fecha";
                divGastoFecha.innerHTML += "Fecha: " + gasto.fecha;
                divGasto.appendChild(divGastoFecha);
        }
        if(gasto.fecha){
            let divGastoValor = document.createElement("div");
                divGastoValor.className = "gasto-valor";
                divGastoValor.innerHTML += "Valor: " + gasto.valor;
                divGasto.appendChild(divGastoValor);
        }
        let divGastoEtiquetas = document.createElement("div");
            divGastoEtiquetas.className = "gasto-etiquetas";
            
            gasto.etiquetas.forEach(etiqueta => {
                let numEti = 1;
                var spanEtiqueta = document.createElement('span');
                spanEtiqueta.className="gasto-etiquetas-etiqueta";
                spanEtiqueta.innerHTML ="Etiqueta " + numEti + ":" + etiqueta +" ";

                let gastoBorrarEtiqueta = new BorrarEtiquetasHandle();
                gastoBorrarEtiqueta.gasto = gasto;
                gastoBorrarEtiqueta.etiqueta = etiqueta;
                spanEtiqueta.addEventListener('click', gastoBorrarEtiqueta);
                
                divGastoEtiquetas.appendChild(spanEtiqueta);
            });
            divGasto.appendChild(divGastoEtiquetas);

        
        let btnEditar = document.createElement('button');
            btnEditar.type = 'button';
            btnEditar.className = 'gasto-editar';
            btnEditar.textContent = 'Editar';
            
        let gastoEditar = new EditarHandle();
            gastoEditar.gasto = gasto;
            btnEditar.addEventListener('click', gastoEditar);
            divGasto.appendChild(btnEditar);

        let btnBorrar = document.createElement('button');
            btnBorrar.type = 'button';
            btnBorrar.className = 'gasto-borrar'
            btnBorrar.textContent = 'Borrrar';

        let gastoBorrar = new BorrarHandle();
            gastoBorrar.gasto = gasto;
            btnBorrar.addEventListener('click', gastoBorrar);
            divGasto.appendChild(btnBorrar);
        
        //Creamos el nuevo botno de editar con formulario
        let btnEditarForm = document.createElement('button');
            btnEditarForm.type = 'button';
            btnEditarForm.className = 'gasto-editar-formulario';
            btnEditarForm.textContent = 'Editar (formulario)';

        //Le añadimos al boton el evento creado con handle    
        let gastoEditarForm = new EditarHandleformulario();
            gastoEditarForm.gasto = gasto;
            gastoEditarForm.divGasto = divGasto;
            gastoEditarForm.btnEditarForm = btnEditarForm;
            btnEditarForm.addEventListener('click', gastoEditarForm);
            divGasto.appendChild(btnEditarForm);
        
        //Creamos el nuevo botno de borrar con api
        let btnborrarApi = document.createElement('button');
            btnborrarApi.type = 'button';
            btnborrarApi.className = 'gasto-borrar-api';
            btnborrarApi.textContent = 'Borrar (API)';

        //Le añadimos al boton el evento creado con handle    
        let gastoborrarapi = new BorrarHandleApi();
            gastoborrarapi.gasto = gasto;
            gastoborrarapi.btnEditarForm = btnborrarApi;
            btnborrarApi.addEventListener('click', gastoborrarapi);
            divGasto.appendChild(btnborrarApi);
                    
        let btnEditarApi = document.createElement('button');
        btnEditarApi.type = 'button';
        btnEditarApi.className = 'gasto-editar-api';
        btnEditarApi.textContent = 'Editar(API)';
        
        let gastoEditarApi = new EditarApiHandleformulario();
        gastoEditarApi.gasto = gasto;
        gastoEditarApi.divGasto = divGasto;
        gastoEditarApi.btnEditarApi = btnEditarApi;
        btnEditarApi.addEventListener('click', gastoEditarApi);
        divGasto.appendChild(btnEditarApi);

    }
}
function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    
    if(idElemento != null){
        // Obtener la capa donde se muestran los datos agrupados por el período indicado.
        // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
        // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
        var divP = document.getElementById(idElemento);
        // Borrar el contenido de la capa para que no se duplique el contenido al repintar
        divP.innerHTML = "";
        let elemento = document.getElementById(idElemento);
    
        let divAgrupacion = document.createElement("div");
            divAgrupacion.className = "agrupacion";

        if(periodo){
            let titPeriodo = document.createElement("h1");
                titPeriodo.innerHTML += "Gastos agrupados por " + periodo;
                divAgrupacion.appendChild(titPeriodo);
        }

        if(agrup){
            for(let property in agrup){
                var divAgrup = document.createElement('div');
                divAgrup.className = "agrupacion-dato";
                
                var spanAgrupClave = document.createElement('span');
                spanAgrupClave.className = "agrupacion-dato-clave";
                spanAgrupClave.innerHTML += property;
                divAgrup.appendChild(spanAgrupClave);
    
                var spanAgrupValor = document.createElement('span');
                spanAgrupValor.className = "agrupacion-dato-valor";
                spanAgrupValor.innerHTML += agrup[property];
                divAgrup.appendChild(spanAgrupValor);

                divAgrupacion.appendChild(divAgrup);
            }
        }
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
        elemento.appendChild(divAgrupacion);
    }

}
function repintar(){
    mostrarDatoEnId(mostrarPresupuesto(),"presupuesto");
    mostrarDatoEnId(calcularTotalGastos(),"gastos-totales");
    mostrarDatoEnId(calcularBalance(),"balance-total");
    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML = "valor";

    listarGastos().forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo",gasto); 
    });
        
    mostrarGastosAgrupadosWeb(agruparGastos("dia"), "día", "agrupacion-dia");

    mostrarGastosAgrupadosWeb(agruparGastos("mes"), "mes", "agrupacion-mes");

    mostrarGastosAgrupadosWeb(agruparGastos("anyo"), "año", "agrupacion-anyo");
}
let actualizarPresupuestoWeb = function(){
    let presupuesto = Number(prompt("Introduzca un nuevo presupuesto", 100));
    actualizarPresupuesto(presupuesto);
    repintar()
}
let btnPresupuesto = document.getElementById("actualizarpresupuesto");
btnPresupuesto.onclick = actualizarPresupuestoWeb

let nuevoGastoWeb = function() {
    let nuevaDescripcion = prompt('Introduce la descripcion de la nueva etiqueta');
    let nuevoValor = parseFloat(prompt('Introduce el valor del nuevo gasto'));
    let nuevaFecha = prompt('Introduce la fecha del nuevo gasto');
    let nuevasEtiquetas = prompt('Introduce las etiquetas separadas por una ,').split(',');

    anyadirGasto(new CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, ...nuevasEtiquetas))

    repintar();
}
let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.onclick = nuevoGastoWeb

function EditarHandle(){
    this.handleEvent = function(){
        let descripcion = prompt("Introduzca una descripcion", this.gasto.descripcion);
        this.gasto.actualizarDescripcion(descripcion);

        let valor = Number(prompt("Introduzca un valor", this.gasto.valor));
        this.gasto.actualizarValor(valor);

        let fecha = new Date(prompt("Introduzca una fecha", this.gasto.fecha));
        this.gasto.actualizarFecha(fecha);

        let etiquetas = prompt("Introduzca las etiquetas", this.gasto.etiquetas).split(',');
        this.gasto.etiquetas = etiquetas

        repintar();
    }
}
function BorrarHandle(){ 
    this.handleEvent = function(){
        borrarGasto(this.gasto.id)
        repintar();
    }
}
function BorrarEtiquetasHandle(){ 
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar();
    }
}
let nuevoGastoWebFormulario = function() {

    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let divControles = document.getElementById("controlesprincipales");
    divControles.appendChild(formulario);

    let form = new AnyadirHandleFormulario();
    formulario.addEventListener('submit', form);

    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.setAttribute('disabled', "");

    let btnCancelar = formulario.querySelector("button.cancelar");
    let cancelarForm = new CancelarGastoHandle();
    cancelarForm.formulario = formulario;
    cancelarForm.boton = btnAnyadirGastoForm;
    btnCancelar.addEventListener('click', cancelarForm);

    let btnEnviar = formulario.querySelector("button.gasto-enviar-api");
    let enviarApi = new EnviarApiHandle();
    enviarApi.formulario = formulario;
    enviarApi.boton = btnEnviar;
    btnEnviar.addEventListener('click', enviarApi);
}
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario)

function AnyadirHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();

        let formulario = document.forms[0];

        let descripcion = formulario.elements.descripcion.value;

        let valor = Number(formulario.elements.valor.value);
    
        let fecha = new Date (formulario.elements.fecha.value);

        let etiquetas = formulario.elements.etiquetas.value;
        
        anyadirGasto(new CrearGasto(descripcion,valor,fecha,...etiquetas));
        repintar()

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled")
    }
};
function EditarHandleformulario(){
    this.handleEvent = function(event){
        //Cargamos la plantilla del formulario vacio
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        //Añadimos la plantilla vacia del formulario
        this.divGasto.appendChild(formulario);

        //Deshabilitamos el boton de editar
        this.btnEditarForm.setAttribute('disabled', "");

        //Añadimos datos anteriores al formulario
        formulario.elements.descripcion.value=this.gasto.descripcion;
        formulario.elements.valor.value=this.gasto.valor;
        formulario.elements.fecha.value=this.gasto.fecha;
        formulario.elements.etiquetas.value=this.gasto.etiquetas;

        //Accion enviar del formulario
        let enviarForm = new EditarGastoHandleFormulario();
        enviarForm.gasto = this.gasto;
        enviarForm.formulario = formulario;
        formulario.addEventListener("submit", enviarForm);

        //Accion cancelar del btnCancelar
        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarForm = new CancelarGastoHandle();
        cancelarForm.formulario = formulario;
        cancelarForm.boton = this.btnEditarForm
        btnCancelar.addEventListener('click', cancelarForm);
            
        let btnEnviar = formulario.querySelector("button.gasto-enviar-api");
        let enviarApi = new EnviarApiHandle();
        enviarApi.formulario = formulario;
        enviarApi.boton = btnEnviar;
        btnEnviar.addEventListener('click', enviarApi);
    }
} 
function EditarApiHandleformulario(){
    this.handleEvent = function(event){
        //Cargamos la plantilla del formulario vacio
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        //Añadimos la plantilla vacia del formulario
        this.divGasto.appendChild(formulario);

        //Deshabilitamos el boton de editar
        this.btnEditarApi.setAttribute('disabled', "");
        formulario.querySelector("button.gasto-enviar").setAttribute('disabled',"")
        //Añadimos datos anteriores al formulario
        formulario.elements.descripcion.value=this.gasto.descripcion;
        formulario.elements.valor.value=this.gasto.valor;
        formulario.elements.fecha.value=this.gasto.fecha;
        formulario.elements.etiquetas.value=this.gasto.etiquetas;

        //Accion cancelar del btnCancelar
        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarForm = new CancelarGastoHandle();
        cancelarForm.formulario = formulario;
        cancelarForm.boton = this.btnEditarForm
        btnCancelar.addEventListener('click', cancelarForm);
            
        let btnEnviar = formulario.querySelector("button.gasto-enviar-api");
        let enviarApi = new EditarApiHandle();
        enviarApi.gasto = this.gasto;
        enviarApi.formulario = formulario;
        enviarApi.boton = btnEnviar;
        btnEnviar.addEventListener('click', enviarApi);
    }
} 
function EditarGastoHandleFormulario(){
    this.handleEvent = function(event){

        event.preventDefault();

        //Sustituimos los datos antiguos por los nuevos datos
        this.gasto.descripcion = this.formulario.elements.descripcion.value;

        this.gasto.valor = Number(this.formulario.elements.valor.value);

        this.gasto.fecha = new Date(this.formulario.elements.fecha.value);

        this.gasto.etiquetas = this.formulario.elements.etiquetas.value.split(",");

        repintar();
    }
}
function CancelarGastoHandle(){
    this.handleEvent= function(event){
        //Borramos el elemento formulario y habilitamos de nuevo el boton
        this.formulario.remove();
        this.boton.removeAttribute("disabled");
    }
}
function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let etiquetas = this.formulario.elements["formulario-filtrado-etiquetas-tiene"].value

        if(etiquetas){
            etiquetas = transformarListadoEtiquetas(etiquetas)
        }
        
        let objFilt = {
            descripcionContiene:this.formulario.elements["formulario-filtrado-descripcion"].value,
            valorMinimo:Number(this.formulario.elements["formulario-filtrado-valor-minimo"].value),
            valorMaximo:Number(this.formulario.elements["formulario-filtrado-valor-maximo"].value),
            fechaDesde:new Date(this.formulario.elements["formulario-filtrado-fecha-desde"].value),
            fechaHasta:new Date(this.formulario.elements["formulario-filtrado-fecha-hasta"].value),
            etiquetasTiene:etiquetas
        }
        document.getElementById("listado-gastos-completo").innerHTML = "";
        this.formulario.appendChild()
        filtrarGastos(objFilt).forEach(gasto => {
            mostrarGastoWeb("listado-gastos-completo",gasto);
        })
    }
}
let divFormulario = document.getElementById("filtrar-gastos")
let formulario = divFormulario.querySelector("form");

let form = new filtrarGastosWeb();
form.formulario = formulario;
formulario.addEventListener('submit', form);

function guardarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        localStorage.setItem("GestorGastosDWEC", JSON.stringify(listarGastos()));
    }
}
let btnGuardarGasto = document.getElementById("guardar-gastos");
btnGuardarGasto.addEventListener('click',new guardarGastosWeb());
  
function cargarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        if(localStorage.getItem("GestorGastosDWEC")){
            cargarGastos(JSON.parse(localStorage.getItem("GestorGastosDWEC")))
        }else{
            cargarGastos([]);
        }
        repintar();
    }
}
let btncargarGasto = document.getElementById("cargar-gastos");
btncargarGasto.addEventListener('click',new cargarGastosWeb());

let btncargarGastoApi = document.getElementById("cargar-gastos-api");
btncargarGastoApi.addEventListener('click',new cargarGastosApiHandle());

function cargarGastosApiHandle(){
    this.handleEvent = async function(event){
        event.preventDefault();
        cargarGastosApi();
    }
}
function cargarGastosApi(){
    let user = document.getElementById('nombre_usuario').value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/` + user;
    const myElement = document.getElementById("listado-gastos-completo");
    while (myElement.firstChild) {
        myElement.removeChild(myElement.firstChild);
    }

    fetch(url, {method: 'GET'})
    .then(response => response.json())
    .then(data =>{
        data.sort((a, b) => a.valor.toString().localeCompare(b.valor.toString()));
        cargarGastos(data);
        repintar();
    })
    .catch(error => console.log(error));
}
function EnviarApiHandle(){
    this.handleEvent = function(event){

        let descripcion = this.formulario.elements.descripcion.value;
        let valor = Number(this.formulario.elements.valor.value);
        let fecha = new Date (this.formulario.elements.fecha.value);
        let etiquetas = this.formulario.elements.etiquetas.value;
        let jsonGasto = JSON.stringify(new CrearGasto(descripcion,valor,fecha,...etiquetas))
        let user = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/` + user;
    
        console.log(jsonGasto)

        fetch(url, {method: 'POST', body: jsonGasto, headers: {
            'Content-Type': 'application/json'
          }})
            .then(response => response.json())
            .then(data => {
                cargarGastosApi();
        })
        .catch(error => console.log(error));
    }
}
function BorrarHandleApi(){
    this.handleEvent = function (event){
        event.preventDefault();
        let user = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/` + user + "/" + this.gasto.gastoId;

        fetch(url, {method: 'DELETE'})
            .then(data =>{
                borrarGasto(this.gasto.gastoId);
                cargarGastosApi();
            })
            .catch(error => console.log(error));
    }
}
function EditarApiHandle(){
    this.handleEvent = function(event){

        let descripcion = this.formulario.elements.descripcion.value;
        let valor = Number(this.formulario.elements.valor.value);
        let fecha = new Date (this.formulario.elements.fecha.value);
        let etiquetas = this.formulario.elements.etiquetas.value;
        let gasto = new CrearGasto(descripcion,valor,fecha,...etiquetas)
        let jsonGasto = JSON.stringify(gasto)
        let user = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/` + user + "/" + this.gasto.gastoId;
    
        console.log(jsonGasto)

        fetch(url, {method: 'PUT', body: jsonGasto, headers: {
            'Content-Type': 'application/json'
          }})
            .then(response => response.json())
            .then(data => {
                cargarGastosApi(data);
        })
        .catch(error => error);
    }
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb
}