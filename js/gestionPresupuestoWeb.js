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
}

function repintar(){
    mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('presupuesto',"");
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());
    mostrarDatoEnId('listado-gastos-completo',"");
    mostrarGastoWeb('listado-gastos-completo',gestionPresupuesto.listarGastos());
}

function actualizarPresupuestoWeb(){
    let alert = prompt("Introduce un nuevo presupuesto:",'');
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

        let descripcionContiene =  this.formulario.elements["formulario-filtrado-descripcion"].value;
        let valorMinimo = (this.formulario.elements["formulario-filtrado-valor-minimo"].value);
        let valorMaximo = (this.formulario.elements["formulario-filtrado-valor-maximo"].value);
        let fechaDesde = (this.formulario.elements["formulario-filtrado-fecha-desde"].value);
        let fechaHasta =(this.formulario.elements["formulario-filtrado-fecha-hasta"].value);
        let etiquetasTiene = this.formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

        if(etiquetasTiene){
            etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene);
        }

        document.getElementById("listado-gastos-completo").innerHTML = "";

        let filtrar = gestionPresupuesto.filtrarGastos({descripcionContiene, valorMinimo, valorMaximo, fechaDesde, fechaHasta, etiquetasTiene});

        filtrar.forEach(gastoFinal => {
            mostrarGastoWeb("listado-gastos-completo", gastoFinal);
        });
    }
}

let formulario = document.getElementById("formulario-filtrado");
let filtrarResultados = new filtrarGastosWeb();
filtrarResultados.formulario = formulario;
formulario.addEventListener('submit', filtrarResultados);

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}