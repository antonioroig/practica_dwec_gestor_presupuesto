// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (valor >= 0 && typeof valor === 'number')
    {
        presupuesto = valor;
        return presupuesto
    }
    else {
        console.log("El valor debe ser mayor o igual a 0");
        return -1;
    }
    // TODO
}

function listarGastos() {
    return gastos;
}



function mostrarPresupuesto() {
    return ("Tu presupuesto actual es de " + presupuesto + " €")
    // TODO
}



function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion
    if (valor <= 0 || typeof valor !== 'number')
    {
        valor = 0;
    }

    this.valor = valor
    this.descripcion = descripcion
    this.mostrarGasto = function mostrarGasto () {
        return ("Gasto correspondiente a " + descripcion + " con valor " + this.valor + " €")
    }
    
    
    this.actualizarDescripcion = function actualizarDescripcion(nuevadescripcion)
    {
        if (typeof nuevadescripcion === 'string')
        {
            this.descripcion = nuevadescripcion;
        }
    }
    this.actualizarValor = function actualizarValor(valornuevo)
    {
        if (valornuevo >= 0 && typeof valornuevo === 'number')
        {
            this.valor = valornuevo;
        }
    }

    // TODO   
    //comentario para que se activen los test en github
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
