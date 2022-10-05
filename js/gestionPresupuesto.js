// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"; 
// TODO: Variable global
 let presupuesto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if (valor >= 0 && typeof valor === 'number') 
    {
        presupuesto = valor;
        return presupuesto;
    }
    else 
    {
        console.log("Error: valor negativo");
        return -1;
    }  
}

function mostrarPresupuesto() {
    // TODO
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion,valor) {
    // TODO
    this.descripcion = descripcion;
    
    if ((valor >= 0 && typeof valor === 'number')) 
    {
       this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }
    
    //Metodos

    this.mostrarGasto = function() {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },

    this.actualizarDescripcion = function(nuevaDescripcion) {
        if(typeof nuevaDescripcion === 'string')
        {
            this.descripcion = nuevaDescripcion;
        }      
    },

    this.actualizarValor = function(nuevoValor) {    
        if(nuevoValor >= 0 && typeof nuevoValor === 'number')
        {
            this.valor = nuevoValor;
        }     
    }
} 
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
}



