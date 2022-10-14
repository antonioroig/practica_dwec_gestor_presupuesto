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

function CrearGasto(descripcion,valor,fecha = Date.now(), ...etiquetas) 
{
    // TODO
    this.descripcion = descripcion;
    this.etiquetas = [...etiquetas];

    if(valor > 0 && !isNaN(valor))
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    };

    if(typeof fecha === 'string' && !isNaN(Date.parse(fecha)))
    {
        this.fecha = Date.parse(fecha);    
    }
    else
    {
        this.fecha = Date.now();
    };

    
    this.mostrarGasto = function()
    {
        return "Gasto correspondiente a " +this.descripcion+" con valor "+this.valor+" €";
    };

    this.mostrarGastoCompleto = function()
    {
        let texto = "";
        return texto;
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

    this.actualizarFecha = function()
    {

    };

    this.anyadirEtiquetas = function()
    {

    };

    this.borrarEtiquetas = function()
    {

    };
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gast)
{
    gast.id = idGastos;
    idGastos++;
    gastos.push(gast);
}

function borrarGasto(gID)
{
    for(let i = 0; i < gastos.length; i++)
    {
        if(gID = gastos[i].id)
        {
            gastos.splice(gastos[i],1);
        }
    }
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