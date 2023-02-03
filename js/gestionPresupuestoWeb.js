import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento){
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += valor;
    }
}

function mostrarGastoWeb(gasto, idElemento){
   if(idElemento != null){
        let divGasto = document.createElement("div");
        divGasto.className = "gasto";

        let elemento = document.getElementById(idElemento);
        elemento.appendChild(divGasto);

        let divDescripcion = document.createElement("div");
        divDescripcion.className = "gasto-descripcion";
        divDescripcion.innerHTML += gasto.descripcion;
        divGasto.appendChild(divDescripcion);
        
        let divFecha = document.createElement("div");
        divFecha.className = "gasto-fecha";
        divFecha.innerHTML += gasto.fecha;
        divGasto.appendChild(divFecha);
        
        let divValor = document.createElement("div");
        divValor.className = "gasto-valor";
        divValor.innerHTML += gasto.valor;
        divGasto.appendChild(divValor);

        let divEtiquetas = document.createElement("div");
        divEtiquetas.className = "gasto-etiquetas";
        divGasto.appendChild(divEtiquetas);
        gasto.etiquetas.forEach(etiqueta => {
            let span = document.createElement("span");
            span.className = "gasto-etiquetas-etiqueta";
            span.innerHTML = etiqueta;
            divEtiquetas.appendChild(span);

            let objetoBorrarEtiqueta = new BorrarEtiquetasHandle();
            objetoBorrarEtiqueta.gasto = gasto;
            objetoBorrarEtiqueta.etiqueta = etiqueta;
            span.addEventListener("click", objetoBorrarEtiqueta);
        });
        divGasto.appendChild(divEtiquetas);

        let btnEditar = document.createElement('button');
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.className = "gasto-editar";

        let objetoEditar = new EditarHandle();
        objetoEditar.gasto = gasto;

        btnEditar.addEventListener("click", objetoEditar);
        divGasto.appendChild(btnEditar);

        let btnBorrar = document.createElement('button');
        btnBorrar.type = "button";
        btnBorrar.textContent = "Borrar";
        btnBorrar.className = "gasto-borrar";

        let objetoBorrar = new BorrarHandle();
        objetoBorrar.gasto = gasto;

        btnBorrar.addEventListener("click", objetoBorrar);
        divGasto.appendChild(btnBorrar);

        let botonBorrarGastoApi = document.createElement('button');
        botonBorrarGastoApi.type = "button";
        botonBorrarGastoApi.textContent="Borrar (API)";
        botonBorrarGastoApi.classList = "gasto-borrar-api";

        let ApiBorrar = new borrarApi();
        ApiBorrar.gasto = gasto;

        botonBorrarGastoApi.addEventListener("click", ApiBorrar);
        divGasto.appendChild(botonBorrarGastoApi);

        let botonEditarFormulario = document.createElement('button');
        botonEditarFormulario.type="button";
        botonEditarFormulario.textContent="Editar (formulario)";
        botonEditarFormulario.classList="gasto-editar-formulario";

        let objetoEditarFormulario = new EditarHandleFormulario();
        objetoEditarFormulario.gasto=gasto;
        objetoEditarFormulario.divGasto = divGasto;
        objetoEditarFormulario.botonEditar = botonEditarFormulario;

        botonEditarFormulario.addEventListener("click", objetoEditarFormulario);
        divGasto.appendChild(botonEditarFormulario);
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);

        let divAgrup = document.createElement("div");
        divAgrup.className = "agrupacion";
            
        let tituloH1 = document.createElement('h1');
        tituloH1.innerHTML = "Gastos agrupados por " + periodo;
        divAgrup.appendChild(tituloH1);
    
        let contador = 0;
        let claves = Object.keys(agrup);
        for(let agrupCurrent in agrup){
            let divAgrupDato = document.createElement('div');
            divAgrupDato.className = "agrupacion-dato";
                
            let spanClave = document.createElement('span');
            spanClave.className = "agrupacion-dato-clave";
            spanClave.innerHTML = claves[contador];
            contador++;
            divAgrupDato.appendChild(spanClave);
    
            let spanValor = document.createElement('span');
            spanValor.className = "agrupacion-dato-valor";
            spanValor.innerHTML = agrup[agrupCurrent];
            
            divAgrupDato.appendChild(spanValor);
    
            divAgrup.appendChild(divAgrupDato);
        }
        elemento.appendChild(divAgrup);
    }
}

function repintarWeb(){
    let divPresupuesto = document.getElementById("presupuesto");
    divPresupuesto.innerHTML="";

    let divGastosTotales = document.getElementById("gastos-totales");
    divGastosTotales.innerHTML="";

    let divBalance = document.getElementById("balance-total");
    divBalance.innerHTML="";

    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId("Gasto total: " + gestionPresupuesto.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId("Balance total: " + gestionPresupuesto.calcularBalance(), "balance-total");
    
    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML="";

    gestionPresupuesto.listarGastos().forEach(gasto =>{
        mostrarGastoWeb(gasto, "listado-gastos-completo");
    });
}

let actualizarPresupuestoWeb = function(){
    let presupuesto = prompt("Introduce un presupuesto");
    if(presupuesto != null){
        presupuesto = parseFloat(presupuesto);
        gestionPresupuesto.actualizarPresupuesto(presupuesto);
        repintarWeb();
    }
    else{
        alert(`No es númerico`);
    }
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.onclick = actualizarPresupuestoWeb;

let nuevoGastoWeb = function(){
    let descripcion = prompt("Introduzca la descripción:");
    let valor = parseFloat(prompt("Introduzca el valor: "));
    let fecha = Date.parse(prompt("Introduzca la fecha: "));

    let etiquetasArray = prompt("Introduce las etiquetas: ").split(',');
    
    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetasArray);

    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintarWeb();
}

let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.onclick = nuevoGastoWeb;

let EditarHandle = function(){
    this.handleEvent = function() {
        let descripcion = prompt("Introduzca la descripción:");
        let valor = parseFloat(prompt("Introduzca el valor: "));
        let fecha = Date.parse(prompt("Introduzca la fecha: "));
        let etiquetasArray = prompt("Introduce las etiquetas: ").split(',');
        
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(new Date(fecha));
        this.gasto.anyadirEtiquetas(etiquetasArray);
        
        repintarWeb();
    }
}

let BorrarHandle = function(){
    this.handleEvent = function() {
        gestionPresupuesto.borrarGasto(this.gasto.id)
        repintarWeb();
    }
}

let BorrarEtiquetasHandle = function(){
    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintarWeb();
    }
}

let nuevoGastoWebFormulario = function(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let divControles = document.getElementById("controlesprincipales");
    divControles.appendChild(formulario);

    let anyadirForm = new AnyadirGastoFormulario();
    formulario.addEventListener('submit', anyadirForm);
    
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.setAttribute('disabled', "");
    
    let cancelarForm = new CancelarGastoFormulario();
    cancelarForm.formulario = formulario;

    let btnCancelarForm = formulario.querySelector("button.cancelar");
    btnCancelarForm.addEventListener('click', cancelarForm);

    let btnEnviarApi = formulario.querySelector("button.gasto-enviar-api");
    let api = new AnyadirApi();
    api.formulario = formulario;
    api.boton = btnEnviarApi;
    btnEnviarApi.addEventListener('click', api);
}

document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario)

function AnyadirGastoFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();

        let formulario = document.forms[0];
        let descripcion = formulario.elements.descripcion.value;
        let valor = Number(formulario.elements.valor.value);
        let fecha = new Date (formulario.elements.fecha.value);
        let etiquetas = formulario.elements.etiquetas.value;
        
        gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas));
        repintarWeb();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}
    
let CancelarGastoFormulario = function(){
    this.handleEvent = function(event){
        this.formulario.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}

let EditarGastoFormulario = function(){
    this.handleEvent = function(event){
        
        let forms = document.forms[0];

        let descripcion = forms.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);
        let valor = Number(forms.elements.valor.value);
        this.gasto.actualizarValor(valor);
        let fecha = new Date (forms.elements.fecha.value);
        this.gasto.actualizarFecha(fecha);
        let etiquetas = forms.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiquetas);

        repintarWeb();
    }
}

let CancelarCrearGastoFormulario = function(boton){
    this.handleEvent= function(event){
        document.forms[0].remove();

        boton.removeAttribute("disabled");
    }
}

let EditarGastoHandle=function(){
    this.handleEvent = function(event) {
        event.preventDefault();
        let form = document.forms[1];
        this.gasto.descripcion = form.elements.descripcion.value;
        this.gasto.valor = Number(form.elements.valor.value);
        this.gasto.fecha = new Date(form.elements.fecha.value);
        this.gasto.etiquetas = form.elements.etiquetas.value.split(",");

        repintarWeb();
    }
}
let EditarHandleFormulario = function(){
    this.handleEvent = function() {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        this.divGasto.appendChild(formulario);
        this.botonEditar.setAttribute('disabled', "");

        formulario.elements.descripcion.value=this.gasto.descripcion;
        formulario.elements.valor.value=this.gasto.valor;
        formulario.elements.fecha.value=this.gasto.fecha;
        formulario.elements.etiquetas.value=this.gasto.etiquetas;

        let form = new EditarGastoHandle();
        form.gasto = this.gasto;
        formulario.addEventListener("submit", form);

        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarForm = new CancelarCrearGastoFormulario(this.botonEditar);
        btnCancelar.addEventListener('click', cancelarForm);

        let btnEnviarApi = formulario.querySelector("button.gasto-enviar-api");
        let api = new EditarApi();
        api.formulario = formulario;
        api.boton = btnEnviarApi;
        btnEnviarApi.addEventListener('click', api);
    }
}
let filtrarGastoWeb = function(){
    this.handleEvent = function(evento) {
        evento.preventDefault();

        let obj = {
            descripcionContiene: this.formulario.elements["formulario-filtrado-descripcion"].value,
            valorMinimo: this.formulario.elements["formulario-filtrado-valor-minimo"].value,
            valorMaximo: this.formulario.elements["formulario-filtrado-valor-maximo"].value,
            fechaDesde: this.formulario.elements["formulario-filtrado-fecha-desde"].value,
            fechaHasta: this.formulario.elements["formulario-filtrado-fecha-hasta"].value,
            etiquetasTiene: this.formulario.elements["formulario-filtrado-etiquetas-tiene"].value
        }

        if(obj.etiquetasTiene){
            obj.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(obj.etiquetasTiene);
        }

        document.getElementById("listado-gastos-completo").innerHTML="";
        
        let filtrado = gestionPresupuesto.filtrarGastos(obj).forEach(gasto=>{
            mostrarGastoWeb(gasto, "listado-gastos-completo");
        });
    }
}

let formulario = document.getElementById("formulario-filtrado");

let filtrarResultados = new filtrarGastoWeb();
filtrarResultados.formulario = formulario;
formulario.addEventListener('submit', filtrarResultados);

function guardarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        localStorage.setItem("GestorGastosDWEC", JSON.stringify(gestionPresupuesto.listarGastos()));
    }
}

let botonGuardarGasto = document.getElementById("guardar-gastos");
botonGuardarGasto.addEventListener("click", new guardarGastosWeb());

function cargarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        if(localStorage.getItem("GestorGastosDWEC")){
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.getItem("GestorGastosDWEC")));
        }else{
            gestionPresupuesto.cargarGastos([]);
        }
        repintarWeb();
    }
}

let botonCargarGasto = document.getElementById('cargar-gastos');
botonCargarGasto.addEventListener("click", new cargarGastosWeb());

let cargarGastoApi = function(){
    this.handleEvent = async function(evento){
        evento.preventDefault();
        cargarGastosFunc()
    }
}
async function cargarGastosFunc()
{
    let nombre = document.getElementById("nombre_usuario").value;
    let gastoApi = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombre}`);

    let json = await gastoApi.json();
    console.log(json)
    gestionPresupuesto.cargarGastos(json);
    
    console.log(json);
    repintarWeb();
}

let botonCargarGastoApi = document.getElementById('cargar-gastos-api');
botonCargarGastoApi.addEventListener("click", new cargarGastoApi());

let borrarApi = function(){
    this.handleEvent = async function(evento){
        evento.preventDefault();
        let nombre = document.getElementById("nombre_usuario").value;
        let idApi = this.gasto.gastoId;
        console.log(idApi)
        fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombre}/${idApi}`, {method:'DELETE'})
        .then(res => res.json())
            .then(get => {
                console.log(get);
                cargarGastosFunc();
            })
    }
}

function AnyadirApi(){
    this.handleEvent = function(event){

        let descripcion = this.formulario.elements.descripcion.value;
        let valor = Number(this.formulario.elements.valor.value);
        let fecha = new Date (this.formulario.elements.fecha.value);
        let etiquetas = this.formulario.elements.etiquetas.value;
        let jsonGasto = JSON.stringify(new  gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas))
        let user = document.getElementById('nombre_usuario').value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/` + user;
    
        console.log(jsonGasto)

        fetch(url, {method: 'POST', body: jsonGasto, headers: {
            'Content-Type': 'application/json'
          }})
            .then(response => response.json())
            .then(data => {
                cargarGastosFunc(data);
        })
    }
}

function EditarApi(){
    this.handleEvent= function(evento){
        evento.preventDefault();
        var nombreUsuario = document.getElementById("nombre_usuario").value;
        let descripcion = this.formulario.elements.descripcion.value;
        let valor = Number(this.formulario.elements.valor.value);
        let fecha = new Date (this.formulario.elements.fecha.value);
        let etiquetas = this.formulario.elements.etiquetas.value;
        let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas)
        let jsonGasto = JSON.stringify(gasto)
        
        fetch('https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'+ nombreUsuario, {method: 'Post', body: jsonGasto, headers: { 'Content-Type': 'application/json' }})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                cargarGastosFunc();
            })
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastoApi,
    borrarApi,
    AnyadirApi,
    EditarApi
}