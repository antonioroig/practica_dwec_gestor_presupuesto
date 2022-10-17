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

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(idGasto){
    
    for(let i=0; i<gastos.length; i++){
        if(gastos[i].id == idGasto){
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos(){
    var total = 0;
    gastos.forEach(gasto => {
        total += gasto.valor;
    });
    return total;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
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
