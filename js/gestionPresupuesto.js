// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGastos = 0;

console.log(Date.now());

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

    this.actualizarFecha = function(nwfecha)
    {
        if(typeof nwfecha === 'string' && !isNaN(Date.parse(nwfecha)))
        {
            this.fecha = Date.parse(nwfecha);    
        }
        else
        {
            console.log('La fecha introducida no es valida, no ha podido ser cambiada');
        }
    };

    this.anyadirEtiquetas = function()
    {

    };

    this.borrarEtiquetas = function()
    {
        etiquetas.splice(0,4);
    };

    this.mostrarGasto = function()
    {
        return "Gasto correspondiente a " +this.descripcion+" con valor "+this.valor+" €";
    };

    this.mostrarGastoCompleto = function()
    {
        let fechita = new Date(this.fecha);
        let ret = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\nFecha: " + fechita.toLocaleString() + "\nEtiquetas:\n";
        for(let i = 0; i < etiquetas.length; i++)
        {
            ret += '- ' + etiquetas[i]+'\n';
        };
        return ret;
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
        if(gID === gastos[i].id)
        {
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos()
{
    let total = 0;
    for(let i = 0; i < gastos.length; i++)
    {
        total = total + gastos[i].valor;
    };
    return total;
}

function calcularBalance()
{
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