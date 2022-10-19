
// TODO: Variable global

var presupuesto = 0;

let gastos = [];

var idGasto = 0;

function actualizarPresupuesto(num) {
    // TODO

    if(num >= 0 && typeof num === "number")
    {

        presupuesto = num;
        return presupuesto;

    }
    else
    {

        console.log("Error, el numero introducido es negativo");
        return -1;
   }
}

//Revisar
function mostrarPresupuesto() {
    // TODO
    return(`Tu presupuesto actual es de ${presupuesto} €`);

}
// revisar
function CrearGasto(descripcion,valor, fecha = Date.now(), ...etiquetas) {

    this.descripcion = descripcion;

    this.etiquetas = [...etiquetas];

    if(valor >= 0 && typeof valor === "number")
    {

        this.valor = valor;

    }
    else
    {
        this.valor = 0;

    }
    
    if(typeof fecha === 'string' && !isNaN(Date.parse(fecha)))
    {

        this.fecha = Date.parse(fecha);

    }
    
    else
    {

        this.fecha = Date.now();

    }
    
    this.mostrarGasto = function()
    {

        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)

    };

    this.actualizarDescripcion = function(desc)
    {
        this.descripcion = desc;
    };

    this.actualizarValor = function(valorActualizado){

        if(valorActualizado >= 0 && typeof valorActualizado === "number")
        {

            this.valor = valorActualizado;

        }

    }


}

function listarGastos()
{

    return(gastos);

}

function anyadirGasto(gasto)
{

    gasto.id = idGasto; //añade la nueva clave al objeto llamado gasto que lo pasa como parámetro     
    idGasto++;
    gastos.push(gasto);

}

function borrarGasto(id)
{
        for(let i = 0; i < gastos.lenght; i++)
        {
            if(gastos[i].id === id)
            {
                gastos.splice(i,1)
            }
        }
}

function calcularTotalGastos()
{

    let totalGastos = 0;

    for(let i = 0; i < gastos.length; i++)
    {



    }

    return totalGastos;

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
calcularBalance,
}