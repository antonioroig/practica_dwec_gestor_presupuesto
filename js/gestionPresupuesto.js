// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0){
        presupuesto = valor;
        return presupuesto;
    }else{
        console.log("El valor introducido no es un numero positivo")
        return (-1);
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    // TODO

    if((typeof(valor) == "number") && (valor >= 0)){
        this.valor = valor;
    }else(this.valor = 0)

    this.descripcion = descripcion;

    if(typeof(fecha) == "number"){
        this.fecha = fecha
    }
    else
    {
        fecha = new Date(fecha);
        this.fecha = Date.parse(fecha);
    }

    if(etiquetas == `undefined`){
        this.etiquetas = [];
    }else
    {
        this.etiquetas = etiquetas
    }
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }
    this.mostrarGastoCompleto  = function(){
        let listaEtiquetas = ``;
        let fecha = new Date(this.fecha);
        this.etiquetas.forEach(etiqueta => listaEtiquetas += `- ${etiqueta}\n`)
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fecha.toLocaleString()}\nEtiquetas:\n${listaEtiquetas}`
    }

    this.actualizarFecha = function(newFecha){

        if(isNaN(Date.parse(newFecha))){
            this.fecha = this.fecha;
        }else{this.fecha = Date.parse(newFecha)}
    }

    this.actualizarDescripcion = function(newDescripcion){
        this.descripcion = newDescripcion;
    }

    this.actualizarValor = function(newValor){
        if((typeof(newValor) == "number") && (newValor >= 0)){

            this.valor = newValor;
        }
    }
    this.anyadirEtiquetas  = function(...etiquetas){
        let aux = this.etiquetas;
        aux = aux.concat(etiquetas);
        const result = new Set(aux);
        this.etiquetas = [...result];
    }
    this.borrarEtiquetas = function(...etiquetas){
        for (let i = 0; i < etiquetas.length; i++){
            for (let j = 0; j < this.etiquetas.length; j++){
                if (this.etiquetas[j] == etiquetas[i]){
                    this.etiquetas.splice(j,1)
                }
            }
        }
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    gastos.push(gasto)
    idGasto ++;
}

function borrarGasto(){
    
}

function calcularTotalGastos (){
    
}

function calcularBalance (){
    
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
