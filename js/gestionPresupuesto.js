// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0)
    {
        presupuesto = valor;
        return presupuesto;
    }
    else    
    {
        return `Error` , -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion,valor,fecha,...etiquetas ) {
    // TODO
    if(valor < 0 || isNaN(valor))
    {
        this.valor = 0;
    }
    else
    {
        this.valor = valor;
    }

    this.etiquetas = etiquetas;

    if(Date.parse(fecha) == NaN)
    {
        this.fecha = new Date();
    }
    this.fecha = fecha;

    this.descripcion = descripcion;

    this.mostrarGasto = function()
    {
        return "Gasto correspondiente a " + descripcion + " con valor " + valor + " €";
    }

    this.mostrarGastoCompleto = function()
    {
        return "Gasto correspondiente a " + descripcion + " con valor " + valor + " €." + "\n" + "Fecha: " + fecha + "\n" + "Etiquetas:" + etiquetas;
    }

    this.actualizarDescripcion = function(newdescripcion)
    {
        this.descripcion = newdescripcion;
    }

    this.actualizarValor = function(newvalor)
    {
        if(newvalor >= 0)
        {
            this.valor = newvalor;
        }
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    add
}

function borrarGasto(){

}

function calcularTotalGastos(){

}

function calcularBalance(){

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}

// Action funciona??
