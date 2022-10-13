// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0){
        presupuesto = valor;
        return presupuesto;
    }else{
        alert("El valor introducido no es un numero positivo");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO
    let gasto = 
    { 
        descripcion: "",
        valor: 0,

        mostrarGasto: function(){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor}`
        },

        actualizarDescripcion: function(newDescripcion){
            this.descripcion = newDescripcion;
        },

        actualizarValor: function(newValor){
            this.valor = newValor;
        }
    }

    if((typeof(valor) == "number") && (valor >= 0)){
        
        gasto.actualizarValor(valor);
    }
    gasto.actualizarDescripcion(descripcion);

    return gasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
