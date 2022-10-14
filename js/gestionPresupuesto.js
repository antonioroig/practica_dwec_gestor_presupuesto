// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0){
        presupuesto = valor;
        return presupuesto;
    }
    else{
        console.log('El valor introducido es negativo');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;;
}

function CrearGasto(descripcionGasto, valorGasto, fecha = Date.now(), ...etiquetas) {
    // TODO
    this.descripcion = descripcionGasto;
    this.etiquetas = [...etiquetas];
    if(valorGasto >= 0){
        this.valor = valorGasto;
    }
    else{
        this.valor = 0;
    }

    if((!isNaN(Date.parse(fecha))) && typeof fecha === 'string'){
        this.fecha = Date.parse(fecha);
    }
    else{
        this.fecha = Date.now();
    }

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }
    this.actualizarDescripcion = function(nuevadesc){
        this.descripcion = nuevadesc;
    }
    this.actualizarValor = function(nuevovalor){
        if(nuevovalor >= 0){
            this.valor = nuevovalor;
        }
    }
    this.mostrarGastoCompleto = function(){
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`);
        console.log(`Fecha: ${this.fecha}`);
        console.log(`Etiquetas:`);
    }
}

function listarGastos(){
    return gastos;
}
function anyadirGasto(id){
    var gastoNuevo = CrearGasto();
    gastos.push(gastos(gastoNuevo));
    idGasto++;
}
function borrarGasto(id){
    gastos.splice(id, 1);
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
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
