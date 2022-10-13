// TODO Crear las funciones, objetos y variables indicadas en el enunciado

// TODO Variable global
let presupuesto = 0;


let gastos = new Array();
let idGasto = 0; /* un contador de los gastos */

function actualizarPresupuesto(valor) {
    // TODO
    if (!isNaN(valor)){
        if(valor >= 0){
            presupuesto = valor;
            return presupuesto;
        }
        else{
            return -1;
        }
    }
    else{
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

//CrearGasto - Función constructora que se encargará de crear un objeto gasto. 
//Esta función devolverá un objeto de tipo gasto. Deberá comprobar que el valor introducido sea un núḿero no negativo; 
//en caso contrario, asignará a la propiedad valor el valor 0.

function CrearGasto(descripcion, valor) {
    // TODO

    if (isNaN(valor) || valor < 0){
        valor = 0;
    }

    descripcion = descripcion + '';

    this.descripcion = descripcion,
    this.valor = valor,

    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    // !!!!!!!!!!!!!!!!!!!!!!
    this.actualizarDescripcion = function(descripcion){
        descripcion = descripcion + '';
        this.descripcion = descripcion;
    }
    this.actualizarValor = function(valor){
        if(valor >= 0){
            this.valor = valor;
        }
    
    };
    
}
/* - - - - - - - - - - - - - - - - */
//++++
function listarGastos(){
    return gastos;
}

function anyadirGasto(){

}
function borrarGasto(){

}
function calcularTotalGastos(){

}
function calcularBalance (){

}
/* NO MODIFICAR A PARTIR DE AQUÍ exportación de funciones y objetos creados para poder ejecutar los tests.
Las funciones y objetos deben tener los nombres que se indican en el enunciado
Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo */
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