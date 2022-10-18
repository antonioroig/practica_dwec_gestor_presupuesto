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



function CrearGasto(descripcion, valor ,fecha = Date.now(), ...etiquetas) {
    this.fecha = new Date();
    this.etiquetas = [...etiquetas];
    this.descripcion = descripcion;
   
    if (valor <= 0 || typeof valor !== 'number')
    {
        valor = 0;
    }

    this.valor = valor;

    
    if (typeof fecha === 'string' && !isNaN(Date.parse(fecha))){
    this.fecha = Date.parse(fecha)
    }
    else{
        this.fecha = Date.now();
    }

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

    this.actualizarFecha = function(nuevaFecha) {
        if (typeof nuevaFecha === 'string' && !isNaN(Date.parse(nuevaFecha)))
    {
    this.fecha = Date.parse(nuevaFecha)
    }
    }

    this.anyadirEtiquetas = function (...nuevasEtiquetas)
    {
        nuevasEtiquetas.forEach(element => {
            if (!this.etiquetas.includes(element))
            {
                this.etiquetas.push(element)
            }
            
        });
    }

    this.borrarEtiquetas = function (...etiquetasABorrar)
    {
        etiquetasABorrar.forEach(element => {
            if (this.etiquetas.includes(element))
            {
                this.etiquetas.splice(this.etiquetas.indexOf(element),1)
                }
        })
    }

    this.mostrarGastoCompleto = function()
    {
        let showScreen = `Gasto Correspondiente a ${this.descripcion} con valor ${this.valor}  €.\n Fecha: ${new Date(this.fecha).toLocaleString()}\n Etiquetas: \n`;
        
        for (let i = 0; i < this.etiquetas.length; i++){
            showScreen += "- " + this.etiquetas[i]+'\n';
        }
        return showScreen;
    }
    // TODO   
    //comentario para que se activen los test en github
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
};

function borrarGasto(id) {
    
}

function calcularBalance() {
    return (presupuesto-calcularTotalGastos())

}

function calcularTotalGastos() {
    let total = 0;
    gastos.forEach(gasto => {
        total += gasto.valor;
    });
    return total;
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
