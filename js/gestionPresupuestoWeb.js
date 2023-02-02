import * as gestionPresupuesto from './gestionPresupuesto.js';

"use strict"; 

function mostrarDatoEnId(idElemento,valor){
    let id = document.getElementById(idElemento);
    id.innerHTML += "" + valor; 
};

function mostrarGastoWeb(idElemento,gasto){
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';
    id.append(divGasto);

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

    for(let etiq of gasto.etiquetas){
        let spanEtiqueta  = document.createElement('span');
        spanEtiqueta .className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta .textContent = " " + etiq;
        divEtiquetas.append(spanEtiqueta);

        let borrar_Etiquetas = new BorrarEtiquetasHandle();
        borrar_Etiquetas.gasto = gasto;
        borrar_Etiquetas.etiquetas = etiq;
        spanEtiqueta.addEventListener('click',borrar_Etiquetas);
    }
    divGasto.append(divEtiquetas);

    //boton editar gasto
    let btnEditarGasto = document.createElement('button');
    btnEditarGasto.type = 'button';
    btnEditarGasto.className = 'gasto-editar';
    btnEditarGasto.textContent = 'Editar';

    let EditarGasto = new EditarHandle(gasto);
    EditarGasto.gasto = gasto;

    btnEditarGasto.addEventListener('click',EditarGasto);
    divGasto.append(btnEditarGasto);

    //boton borrar gasto
    let btnBorrarGasto = document.createElement('button');
    btnBorrarGasto.type = 'button';
    btnBorrarGasto.className = 'gasto-borrar';
    btnBorrarGasto.textContent = 'Borrar';

    let BorrarGasto = new BorrarHandle(gasto);
    BorrarGasto.gasto = gasto;

    btnBorrarGasto.addEventListener('click',BorrarGasto);
    divGasto.append(btnBorrarGasto);

    //boton form   
    let btnEditarForm = document.createElement('button');
    btnEditarForm.type = 'button';
    btnEditarForm.className = 'gasto-editar-formulario';
    btnEditarForm.textContent = 'Editar (formulario)';

    let EditarForm = new EditarHandleFormulario(gasto);
    EditarForm.gasto = gasto;

    btnEditarForm.addEventListener('click',EditarForm);
    divGasto.append(btnEditarForm);

    //boton borrar API
    let  btnBorrarApi = document.createElement('button');
    btnBorrarApi.type = 'button';
    btnBorrarApi.className = 'gasto-borrar-api';
    btnBorrarApi.textContent = 'Borrar (API)';

    let apiBorrar = new borrarGastosApi(gasto);
    apiBorrar.gasto = gasto;
    btnBorrarApi.addEventListener('click',apiBorrar);
    divGasto.append(btnBorrarApi);
};

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let idAll = document.getElementById(idElemento);
    idAll.innerHTML = '';
    let divAgrupado = `<div class="agrupacion"><h1>Gastos agrupados por ${periodo}</h1>`;

    for(let agrupacion in agrup){
        divAgrupado += `<div class="agrupacion-dato"><span class="agrupacion-dato-clave"> ${agrupacion}:</span><span class="agrupacion-dato-valor"> ${agrup[agrupacion]}€</span></div>`;
    }

    divAgrupado += '</div>';
    idAll.innerHTML = divAgrupado;
};

function repintar(){
    document.getElementById('presupuesto').innerHTML = '';
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    document.getElementById('gastos-totales');
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    document.getElementById('balance-total');
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    gestionPresupuesto.listarGastos().forEach(gasto =>{
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });
};

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduce un presupuesto',1500);
    if(presupuesto != undefined){
        presupuesto = parseFloat(presupuesto);
        gestionPresupuesto.actualizarPresupuesto(presupuesto);
        repintar();
    };
};
//boton actualizar presupuesto
let btnActualizarPresupestoWeb = document.getElementById('actualizarpresupuesto');
btnActualizarPresupestoWeb.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let newDesc = prompt('Introduce una nueva descripcion: ', 'descripcion');
    let newValor = parseFloat(prompt('Escribe un nuevo valor: ', 420));
    let newFecha = prompt('Escribe una nueva fecha: ', '29-11-2022');
    let newEtiquetas = prompt('Escribe una o varias etiquetas nuevas: ', 'etiqueta1,etiqueta2,etiqueta3');
    let arrayNEtiquetas = newEtiquetas.split(',');
    let newGasto = new gestionPresupuesto.CrearGasto(newDesc,newValor,newFecha,arrayNEtiquetas);
    gestionPresupuesto.anyadirGasto(newGasto);
    repintar();
};
//boton anyadir gasto
let btnNuevoGasto = document.getElementById('anyadirgasto');
btnNuevoGasto.addEventListener('click', nuevoGastoWeb);

function nuevoGastoWebFormulario(){
    let plantilla = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantilla.querySelector("form");

    let botones = document.getElementById("controlesprincipales");
    botones.append(formulario);

    document.getElementById("anyadirgasto-formulario").setAttribute('disabled', "");

    let cancel = new CancelarHandleFormulario();
    let btnCancel = formulario.querySelector("button.cancelar")
    btnCancel.addEventListener('click',cancel);

    let enviar = new EnviarHandleFormulario();
    formulario.addEventListener('submit',enviar);

    let enviarApi = formulario.querySelector("button.gasto-enviar-api");
    enviarApi.addEventListener('click', new enviarGastosApi());
};
//boton anyadir formulario
let btnAnyadirGasto = document.getElementById('anyadirgasto-formulario');
btnAnyadirGasto.addEventListener('click',nuevoGastoWebFormulario);

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
//boton filtrar gastos
let botonSubmit = document.getElementById('formulario-filtrado');
botonSubmit.addEventListener('submit', new filtrarGastosWeb());

function EditarHandle(){
    this.handleEvent = function(event){
        let newDesc = prompt('Introduce una nueva descripcion: ', this.gasto.descripcion);
        let newValor = parseFloat(prompt('Escribe un nuevo valor: ', this.gasto.valor));
        let newFecha = prompt('Escribe una nueva fecha: ', this.gasto.fecha);
        let newEtiquetas = prompt('Escribe una o varias etiquetas nuevas: ', this.gasto.etiquetas.join(', '));
        let arrayNEtiquetas = newEtiquetas.split(',');

        this.gasto.actualizarDescripcion(newDesc);
        this.gasto.actualizarValor(newValor);
        this.gasto.actualizarFecha(new Date(newFecha));
        this.gasto.anyadirEtiquetas(arrayNEtiquetas);

        repintar();
    };
};

function BorrarHandle(){
    this.handleEvent = function(event) {
        let idGasto = this.gasto.id;
        gestionPresupuesto.borrarGasto(idGasto); 
        repintar();
    }
};

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event) {
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    }
};

function EditarHandleFormulario(){
    this.handleEvent = function(event){
        event.preventDefault();

        let plantilla = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantilla.querySelector("form");

        let botones = document.getElementById("controlesprincipales");
        botones.append(formulario);

        let btnFormulario = event.currentTarget;
        btnFormulario.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toLocaleString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let cancel = new CancelarHandleFormulario();
        let btnCancel = formulario.querySelector("button.cancelar")
        btnCancel.addEventListener('click',cancel);

        let enviar = new EnviarHandle();
        enviar.gasto = this.gasto;
        formulario.addEventListener('submit',enviar);

        btnFormulario.setAttribute('disabled', "");

        let editarApi = new EditarHandleApi();
        editarApi.gasto = this.gasto;
        formulario.querySelector("button.gasto-enviar-api").addEventListener('click',editarApi);
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

        let fecha = formulario.elements.fecha.value;
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
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;

        let NuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
        gestionPresupuesto.anyadirGasto(NuevoGasto);
        
        repintar();

        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
};

function guardarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        
        localStorage.setItem('GestorGastosDWEC',JSON.stringify(gestionPresupuesto.listarGastos()));
    }
};
//Boton Guardar Gasto
let botonGuardar = document.getElementById('guardar-gastos');
botonGuardar.addEventListener('click', new guardarGastosWeb());

function cargarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();

        if(localStorage.getItem('GestorGastosDWEC') != null)
        {
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.getItem('GestorGastosDWEC')));
        }
        else
        {
            gestionPresupuesto.cargarGastos([]);
        }

        repintar();
    }
};
//Boton Cargar Gasto
let botonCargar = document.getElementById('cargar-gastos');
botonCargar.addEventListener('click', new cargarGastosWeb());

async function cargarGastosApi(){
    this.handleEvent = function(event){
        let username = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${username}`;
        if (username != ''){
            fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(function(gastos)
            {
                gestionPresupuesto.cargarGastos(gastos);
                repintar();
            })
            .catch(error => {
                console.error(error);
            });
        }
        else{
            console.log('Introduzca nombre de usuario');
        }
    }
};
//Boton Cargar API
let botonCargarApi = document.getElementById('cargar-gastos-api');
botonCargarApi.addEventListener('click', cargarGastosApi);

function borrarGastosApi(){
    this.handleEvent = async function(event){
        let username = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${username}/${this.gasto.gastoId}`;
        try {
            if (username != ''){
                let resp = await fetch(url, {method: 'DELETE'});
                if(resp.ok)
                {
                    cargarGastosApi();
                    console.log('Se ha borrado el gasto');
                }
                else{
                    console.log('error');
                }
            }
            else{
                console.log('Introduzca nombre de usuario');
            }
        } 
        catch (error) {
            console.log(error);
        };
    }
};

function enviarGastosApi(){
    this.handleEvent = function(event){
        let username = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${username}/${this.gasto.gastoId}`;

        if (username != ''){
            let formulario = document.querySelector('#controlesprincipales form');
            let desc = formulario.elements.descripcion.value;
            let valor = parseFloat(formulario.elements.valor.value);
            let fecha = formulario.elements.fecha.value;
            let etiquetas = formulario.elements.etiquetas.value.split(',');
    
            let gasto = {
                descripcion: desc,
                valor: valor,
                fecha: fecha,
                etiquetas: etiquetas,
            }
    
            fetch(url, {method: 'POST', body: JSON.stringify(gasto), headers: {'Content-type': 'application/json; charset=utf-8'}})
                .then(function(resp){
                    if(resp.ok){
                        console.log('se ha creado el gasto')  
                        cargarGastosApi();
                    }
                    else{
                        console.log('error');
                    }   
                })
                .catch(err => alert(err));
        }
        else{
            console.log('Introduzca nombre de usuario');
        }
    }
};

function EditarHandleApi(){
    this.handleEvent =   function(event){
        let username = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${username}/${this.gasto.gastoId}`;
        
        if (username != ''){
            let form = event.currentTarget.form;
            let descripcion = form.elements.descripcion.value;
            let valor = parseFloat(form.elements.valor.value);
            let fecha = form.elements.fecha.value;
            let etiquetas = form.elements.etiquetas.value.split(',');

            let gasto = {
                descripcion: descripcion,
                valor: valor,
                fecha: fecha,
                etiquetas: etiquetas
            };
      
             fetch(url, {method: 'PUT', body: JSON.stringify(gasto), headers: {'Content-type': 'application/json; charset=utf-8'}})
             .then(function(resp){
                if(resp.ok){
                    console.log('Se ha editado el gasto');
                     cargarGastosApi();
                }
                else{
                    console.log('error');
                }   
            })
            .catch(errors => alert(errors));
        }
        else{
            console.log('Introduzca nombre de usuario');
        }
    }
}

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
    EditarHandleFormulario,
    CancelarHandleFormulario,
    EnviarHandleFormulario,
    EnviarHandle,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi,
    borrarGastosApi,
    enviarGastosApi,
    EditarHandleApi
}