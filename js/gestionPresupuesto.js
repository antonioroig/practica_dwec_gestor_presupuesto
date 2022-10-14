// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global


var presupuesto = 0;
let gastos = [];
var idGasto = 0;

function actualizarPresupuesto(num) {
    // TODO

    if(typeof num === 'number' && num >= 0)
    {
        presupuesto = num;
        return presupuesto;
    }
    else
    {
       
        let menor = -1;
        console.log("Has inatroducido un número menor a cero");
        return menor;
    }

    

}

function mostrarPresupuesto() {
    // TODO

    
    return(`Tu presupuesto actual es de ${presupuesto} €`);
  

}

function CrearGasto(descripcion, valor, fecha = Date.now() , ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    
   
   
   

    if(valor >= 0 && typeof valor === "number")
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    this.mostrarGasto = function(){
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(desc)
    {
        this.descripcion = desc;
    }

   this.actualizarValor = function(val)
    {
       if(typeof val == "number" && val >= 0)
       {
        this.valor = val;
       }
    }

    this.etiquetas = [...etiquetas];

    if(typeof fecha === 'string' && !isNaN(Date.Parse(fecha)))
    {
       this.fecha = fecha;
    }
  
}

function listarGastos(){
    return (gastos)
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
