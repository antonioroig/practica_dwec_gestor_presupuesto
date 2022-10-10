// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
let presupuesto = 0;
let idGasto = 0;
let gastos = new Array();

function actualizarPresupuesto(valor) {
    if(valor >= 0 && typeof valor === 'number')
    {
        presupuesto = valor;
        return presupuesto;
    }
    else{
        console.log("Error! Es un valor negativo");
        return -1;
    }

}
function mostrarPresupuesto(){
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
function CrearGasto(descripcion, valor, fecha, etiquetas) { //Función constructora, tiene que empezar por mayus
    
    this.descripcion = descripcion;
    this.fecha = new Date();

    if(valor >= 0 && typeof valor === 'number'){
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }
    // Revisar
    if(etiquetas != null){
        this.etiquetas = etiquetas;
    }else{
        this.etiquetas = new Array();
    }
    
    // Revisar
    if(fecha != null && Date.parse(fecha)){
        this.fecha = fecha;
    }else{
        this.fecha = now.getDate();
    }

    //Métodos:
    this.mostrarGasto = function(){
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },
    this.actualizarDescripcion = function(descripcionActualizada){
        if(typeof descripcionActualizada === 'string'){
            this.descripcion = descripcionActualizada;
        }
    },
    this.actualizarValor = function(valorActualizado){
        if( valorActualizado >= 0 && typeof  valorActualizado === 'number'){
            this.valor = valorActualizado;
        }
    }
}
// Revisar
function listarGastos(){
    return gastos;
}
//Revisar
function anyadirGasto(id){
    id = idGasto;
    idGasto++;
}
// Revisar
function borrarGasto(id){

    gastos.forEach((id ) => {
        delete gastos[id]
    })

}
// check 
function calcularTotalGastos(){

    let valorTotal = 0 ;
    for (let i = 0;i < gastos.length; i++) {
        valorTotal += gastos.valor;
    }
    return valorTotal;
};
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

