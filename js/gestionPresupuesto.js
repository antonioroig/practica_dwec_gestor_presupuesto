// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(valor) {
    if(valor >= 0  && typeof valor === `number`)
    {
        presupuesto = valor;
        return valor;
    }
    else
    {
        console.log(`error, El numero es menor que 0`);
        return -1;
    }
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(pdescripcion,pvalor) {

    if(pvalor < 0 || typeof(pvalor) !== `number` )
    {
        pvalor = 0; 
    }
        
        this.descripcion= `${pdescripcion}`,
        this.valor = pvalor,


    this.mostrarGasto = function()
    {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },
    
    this.actualizarDescripcion  = function(descripcion)
    {
        this.descripcion = descripcion;
    },

    this.actualizarValor = function(valor)
    {
        if(valor >= 0 && typeof(valor) === `number`)
        {
            this.valor = valor;
        }
    } 
        
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
