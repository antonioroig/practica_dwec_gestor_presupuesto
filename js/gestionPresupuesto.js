// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto = 0;
var gastos = '';
var idGasto = 0;

function actualizarPresupuesto(valor) {
    if(valor >= 0)
    {
        presupuesto = valor;
        return presupuesto;
    }
    else
    {
        console.log("ERROR: El valor introducido es negativo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;;
}

function CrearGasto(descGasto, valor) {

    if(valor >= 0){
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    this.descripcion = descGasto;

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;;
    }

    this.actualizarDescripcion = function(newDescripcion){
        this.descripcion = newDescripcion;
    }

    this.actualizarValor = function(newValor){
        if(newValor >= 0){
            this.valor = newValor;
        }
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto() {

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

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
