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
        elemento.innerHTML += valor;
    }
}
function mostrarGastoWeb(idElemento, gasto){

    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        
        let divGasto = document.createElement("div");
            divGasto.className = "gasto";
            elemento.appendChild(divGasto);

        if(gasto.descripcion){
            let divGastoDescripcion = document.createElement("div");
                divGastoDescripcion.className = "gasto-descripcion";
                divGastoDescripcion.innerHTML += gasto.descripcion;
                divGasto.appendChild(divGastoDescripcion);
        }
        if(gasto.valor){
            let divGastoFecha = document.createElement("div");
                divGastoFecha.className = "gasto-fecha";
                divGastoFecha.innerHTML += gasto.fecha;
                divGasto.appendChild(divGastoFecha);
        }
        if(gasto.fecha){
            let divGastoValor = document.createElement("div");
                divGastoValor.className = "gasto-valor";
                divGastoValor.innerHTML += gasto.valor;
                divGasto.appendChild(divGastoValor);
        }
        let divGastoEtiquetas = document.createElement("div");
            divGastoEtiquetas.className = "gasto-etiquetas";
            
            gasto.etiquetas.forEach(etiqueta => {
                var spanEtiqueta = document.createElement('span');
                spanEtiqueta.className="gasto-etiquetas-etiqueta";
                spanEtiqueta.innerHTML = etiqueta;

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
        
        let gastoEditarApi = new EditarHandle();
        gastoEditarApi.gasto = gasto;
        btnEditarApi.addEventListener('click', gastoEditarApi);
        divGasto.appendChild(btnEditarApi);

    }
}
function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    
    if(idElemento != null){
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

function EnviarApiHandle(){
    this.handleEvent = function(event){

        let user = document.getElementById('nombre_usuario').value;
        let descripcion = this.formulario.elements.descripcion.value;
        let valor = Number(this.formulario.elements.valor.value);
        let fecha = new Date (this.formulario.elements.fecha.value);
        let etiquetas = this.formulario.elements.etiquetas.value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/sergiocobos`;
    
        console.log(JSON.stringify(new CrearGasto(descripcion,valor,fecha,...etiquetas)))

        fetch(url, {method: 'POST', body: JSON.stringify(new CrearGasto(descripcion,valor,fecha,...etiquetas))})
        .then(response => response.json())
        .then(data => {
            cargarGastosApi(data);
        })
        .catch(error => console.log(error));
    }
}
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

function BorrarHandleApi(){
    this.handleEvent = async function (event){
        event.preventDefault();
        //let nombreUsuario = document.getElementById("nombre-usuario");
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/sergiocobos/`  + this.gasto.id;

        fetch(url, {method: 'DELETE'})
            .then(cargarGastosApi())
            .catch(error => console.log(error));
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
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/sergiocobos`;

    fetch(url, {method: 'GET'})
    .then(response => response.json())
    .then(data =>{
        cargarGastos(data);
        console.log(data);
        repintar();
    })
    .catch(error => console.log(error));
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb
}