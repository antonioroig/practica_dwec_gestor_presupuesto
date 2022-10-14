// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
// TODO: Variable global
let presupuesto = 0;
actualizarPresupuesto(-5);
console.log(presupuesto);
function actualizarPresupuesto(number) {
    // TODO
    if(number >= 0 && typeof number === "number"){
    presupuesto = number;
    return number;
    }   
    else{
    console.log("Error");
    return -1;
    }

}


function mostrarPresupuesto() {
    // TODO
   return (`Tu presupuesto actual es de ${presupuesto} €`);
}

let gastos = new Array();
let idGasto = 0;
function CrearGasto(pdescripcion, pvalor, pfecha = Date.now(), ... petiquetas) {
    // TODO
    if(pvalor < 0 || typeof(pvalor) !== `number`){
        pvalor = 0;
    }
    if([...petiquetas] === `undefined`){
        this.etiquetas = [];
    }
    else{
        this.etiquetas = [...petiquetas];
    }
    if(isNaN(Date.parse(pfecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(pfecha);
    }
    
        this.valor = pvalor,
        this.descripcion = `${pdescripcion}`,

        this.mostrarGastoCompleto = function(){
            let etiquetas = ``;
            for(let etiq of this.etiquetas){
                etiquetas += `- ${etiq}\n`
            }
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n${etiquetas}`)
        }
        this.actualizarFecha = function(pfecha){
            if(!isNaN(Date.parse(pfecha))){
                this.fecha = Date.parse(pfecha);
            }
        }
        this.mostrarGasto = function(){
           return (`Gasto correspondiente a ${pdescripcion} con valor ${pvalor} €`)
        },
        this.actualizarDescripcion = function(descripcion){
            this.descripcion = descripcion;
        },
        this.actualizarValor = function(pvalor){
            if(pvalor >= 0 && typeof pvalor === `number`){
                this.valor = pvalor;
            }
        }
        this.anyadirEtiquetas = function(... petiquetas){
            for(let etiq of this.etiquetas){
                for(let petiq of [...petiquetas]){
                    if(etiq !== petiq){
                        
                    }
                }
            }
           
        }
    }
function listarGastos(){
            return gastos;
        }
function anyadirGasto(pid){
            pid = idGasto;
            this.idGasto++;
        }
function borrarGasto(pid){

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
