// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0)
    {
        presupuesto = valor;
        return presupuesto;
    }
    else    
    {
        return `Error` , -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion,valor,fecha = Date.now(), ...etiquetas ) {
    // TODO
    if(valor < 0 || isNaN(valor))
    {
        this.valor = 0;
    }
    else
    {
        this.valor = valor;
    }

    this.fecha = fecha;

    if(typeof fecha === "string" && !isNaN(Date.parse(fecha)))
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now();
    }

    this.mostrarGasto = function()
    {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }

    this.etiquetas = etiquetas;

    this.anyadirEtiquetas = function()
    {

    }

    this.borrarEtiquetas = function(etiquetaIN)
    {
        etiquetas.forEach(etiqueta => {
            if(etiquetaIN === etiqueta)
            {

            }
        });
    }

    this.mostrarGastoCompleto = function()
    {
        var text= "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €." + "\n" + "Fecha: " + this.fecha.toLocaleString('en-GB') + "\n" + "Etiquetas:\n" ;
        etiquetas.forEach(etiqueta => {
            text = text + "- " + etiqueta + "\n";
        });
        return text;
    }

    this.descripcion = descripcion;

    this.actualizarDescripcion = function(newdescripcion)
    {
        this.descripcion = newdescripcion;
    }

    this.actualizarValor = function(newvalor)
    {
        if(newvalor >= 0)
        {
            this.valor = newvalor;
        }
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto[idGasto]
}

function borrarGasto(idGasto){
    array.forEach(gastos => {
        if(gasto[idGasto] == idGasto){
            
        }
    });
}

function calcularTotalGastos(){
    var total;
    array.forEach(gastos => {
        total = total + gastos.valor;
    });
}

function calcularBalance(){

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}

// Action funciona??
