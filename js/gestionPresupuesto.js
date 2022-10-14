// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGastos = 0;

function actualizarPresupuesto(num) {
    // TODO
    if(num >= 0 && typeof num === 'number')
    {
        presupuesto = num;
        return presupuesto;
    }
    else
    {
        console.log('ERROR, el numero introducido es negativo');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return 'Tu presupuesto actual es de '+presupuesto+' €';
}

function CrearGasto(descripcion,valor,fecha,...etiqs) 
{
    // TODO
    let now = new Date();

    this.descripcion = descripcion;

    if(valor > 0 && !isNaN(valor))
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    };

    if(fecha )
    
    this.mostrarGasto = function()
    {
        return "Gasto correspondiente a " +this.descripcion+" con valor "+this.valor+" €";
    };
    this.actualizarValor = function(nwvalor)
    {
        if(nwvalor >= 0)
        {
            this.valor = nwvalor
        }
        else
        {
            console.log('El valor introducido no es valido, no ha podido ser cambiado')
        };
    };
    this.actualizarDescripcion = function(nwdesc)
    {
        this.descripcion = nwdesc;
    };
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto()
{

}

function borrarGasto()
{

}

function calcularTotalGastos()
{

}

function calcularBalance()
{

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