// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if(typeof nuevoPresupuesto==='number' && nuevoPresupuesto>=0){
        presupuesto=nuevoPresupuesto;
        return presupuesto;
    }else{
        console.log("ERROR: presupuesto erroneo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}


function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    

    this.fecha = Date.parse(fecha);
    
    if(typeof valor==='number' && valor>=0){
        this.valor=valor;
    }else{
        this.valor=0;
    }
  
    if(isNaN(this.fecha)){
      this.fecha = Date.now();
      console.log('entra');
    }

    
    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor){
        if(typeof valor==='number' && valor>=0){
            this.valor = valor;
        }
    }

    this.anyadirEtiquetas = function(etiquetas){
        this.etiquetas= etiquetas;
    }

    this.anyadirEtiquetas(etiquetas);

}

function listarGastos(){
    return gastos;
}

function anyadirGasto(){

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
    CrearGasto,
    listarGastos,
    anyadirGasto, 
    borrarGasto, 
    calcularTotalGastos, 
    calcularBalance
}
