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

function CrearGasto(descripcion, valor, fecha= Date.now(), ...etiquetas) { 
    
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.etiquetas = new Array();
    
    // Comprueba el valor
    if(valor >= 0 && typeof valor === 'number'){
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }

    // Comprueba etiquetas
    if(this.etiquetas.size != 0){
        this.etiquetas.add(etiquetas);
    }else{
        this.etiquetas = new Array();
    }
    
    // Métodos:
    this.mostrarGastoCompleto = function(){
        let res =  `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`
        res += `Fecha: ${this.Fecha}.\n`
        res +=`Etiquetas:\n`
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
    },
    // Revisar
    this.anyadirEtiquetas = function (... etiquetas){
        this.etiquetas.add(etiquetas);
    },
    this.borrarEtiquetas = function (... etiquetas){

    }
}
// Check 
function listarGastos(){
    return gastos;
}
// Check
function anyadirGasto(gasto){
    gasto[`id`] = idGasto;
    gastos.push(gasto);
    idGasto++;
}
// Check
function borrarGasto(id){
    for(let i = 0; i <= gastos.length; i++){
        if(gastos[i].id == id){
           gastos.splice(i,1)
           break;
        }
    }

}
// Check
function calcularTotalGastos(){
    let sum = 0;

    for(let gasto of gastos){
        sum += gasto.valor
    }
    return sum;
}
// Check
function calcularBalance(){
     return (presupuesto - calcularTotalGastos());
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

