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

function CrearGasto(descripcion, valor, fecha,...etiquetas) { //Función constructora, tiene que empezar por mayus
    
    this.descripcion = descripcion;
    this.fecha = new Date();
    this.etiquetas = etiquetas;

    if(valor >= 0 && typeof valor === 'number'){
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }

    ///Métodos:
    this.mostrarGastoCompleto = function(){
        let res =  `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`
        res += `Fecha : ${this.Fecha}.`
        res+=`Etiquetas :`
        for (let etiquetas of etiquetas){
            res += `-${this.etiquetas} \n`
        }        
        return res ;
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
// check 
function listarGastos(){
    return gastos;
}
//Revisar
function anyadirGasto(gasto){
    id = idGasto;
    gastos.push(gasto);
    idGasto++;
}
// Revisar
function borrarGasto(id){
    

}
// Revisar
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

