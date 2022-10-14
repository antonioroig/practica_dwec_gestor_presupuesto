// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

"use strict";

var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    if(valor >= 0 && typeof valor === `number`){
         presupuesto = valor;
         return valor;
    }else
    {
        console.log("error: el numero es menor a 0");
        return -1;
    }
}


function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`); 
}

   function CrearGasto(pdescripcion,pValor,pfecha,...petiqueta)
   {

    if([...petiqueta] === `undefined`)
    {
        this.etiquetas = [];
    }else
    {
        this.etiquetas = [...petiqueta];
    }

    if(isNaN(Date.parse(pfecha)))
    {
        this.fecha = Date.now();   
    }else{
        
        this.fecha = Date.parse(pfecha);
    }

    
    if(pValor < 0 || typeof(pValor) !== `number`){
        pValor = 0;
    }


    this.valor = pValor,
    this.descripcion= pdescripcion,

    this.mostrarGastoCompleto = function(){
        let etiquetas = ``;
        for(let eti of this.etiquetas){
            etiquetas += `- ${eti}\n`;
        }
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n${etiquetas}`)
    },

    this.actualizarFecha = function(pfecha){
            if(!isNaN(Date.parse(pfecha)))
        {
            this.fecha = Date.parse(pfecha);   
        }
    }

    this.mostrarGasto = function(){
       return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    },

    this.actualizarValor = function(valor){
        if(valor >= 0 && typeof(valor) === `number`)
        {
        this.valor = valor;
        }
    }
   }

   function listarGastos()
{
    return gastos;
}
function anyadirGasto(pid){}

function borrarGasto(){}

function calcularTotalGastos(){}

function calcularBalance(){}
           
  

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
