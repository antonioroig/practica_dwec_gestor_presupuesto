import * as gestionPresupuesto from './gestionPresupuesto.js';
'use strict';
function mostrarDatoEnId(idElemento,valor){
    let elemento=document.getElementById(idElemento);
    elemento.innerHTML += valor;
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
}
function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    let grupo = document.getElementById(idElemento);
    grupo.innerHTML='';
    let divAgrupado=`<div class="agrupacion"> 
                    <h1>Gastos agrupados por ${periodo}</h1>`;
    for(let agrupacion in agrup){
        divAgrupado+=`<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${agrupacion}</span>
                        <span class="agrupacion-dato-valor>${agrup[agrupacion]}</span>
                        </div>`;
    }
    divAgrupado+='/<div>';
    grupo.innerHTML=divAgrupado;
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
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    let controles=document.getElementById('controlesprincipales');
    controles.append(formulario);
    document.getElementById('anyadirgasto-formulario').setAttribute('disabled',"");
    //BOTON CANCELAR
    let botoncancelar=new CancelarHandleFormulario();
    let botonCancelar=formulario.querySelector('button.cancelar');
    botonCancelar.addEventListener('click', botoncancelar);
    //BOTON ENVIAR
    let botonEnviar=new EnviarFormulario();
    formulario.addEventListener('submit',botonEnviar);
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
    }
}
function EnviarFormulario(){
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
    EnviarFormulario,
    CancelarHandleFormulario,
    guardarGastosWeb,
    cargarGastosWeb
}