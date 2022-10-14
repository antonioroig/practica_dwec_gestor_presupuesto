// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

"use strict"

var presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(numero) {
    if(numero > 0){
        presupuesto = numero;
        return numero;
    }else{
        console.log("error: el numero es menor que 0");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function listarGastos(){
    return gastos;
}
//
function anyadirGasto(gasto){

}
//
function borrarGasto(){

}
//
function calcularTotalGastos(){

}
//
function calcularBalance(){
    
}
function CrearGasto(descripcion,valor,fecha,...etiqueta) {

    if(valor < 0 || typeof(valor) !== `number`){
        valor = 0; 
    }
    if([...etiqueta] === `undefined`){
        this.etiquetas = [];
    }else{
        this.etiquetas = [...etiqueta]
    }
    if(fecha == undefined){
        this.fecha = Date.now();
    }else{
        if(isNaN(Date.parse(fecha))){
            this.fecha = Date.now();
        }else{
            this.fecha = Date.parse(fecha);
        }
    }

        this.descripcion= `${descripcion}`,
        this.valor = valor,

    //
    this.mostrarGastoCompleto = function(){

        var texto = ``;
        for(let eti of this.etiquetas) {
            texto += `- ${eti}\n`;
        }
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n${texto}`)
    },
    //
    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    }
    //
    this.anyadirEtiquetas = function(){
        
    }
    //
    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },
    //
    this.actualizarDescripcion  = function(descripcion){
        this.descripcion = descripcion;
    },
    //
    this.actualizarValor = function(valor){
        if(valor >= 0 && typeof(valor) === `number`){
            this.valor = valor;
        }
    }
    //
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
