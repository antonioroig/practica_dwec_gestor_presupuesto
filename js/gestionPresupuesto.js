// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(valor)
{
    if (valor >= 0 && typeof valor === "number")
    {
        presupuesto = valor;
        return valor;
    }
    else
    {
        console.log(`El valor ${valor} no es correcto`);
        return -1;
    }
}

//Revisar
function mostrarPresupuesto()
{
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
// revisar
function CrearGasto(descripcion,valor,fecha=Date.now(), ...etiquetas)
{

    this.descripcion = String(descripcion);
    this.etiquetas = [...etiquetas];

    if((typeof fecha === "string") && (!isNaN(Date.parse(fecha))))
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now();
    }

    if(valor >= 0 && (typeof valor === "number"))
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
        console.log(`El valor ${valor} no es válido.`);
    }

    this.mostrarGasto = function()
    {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(cambioDesc)
    {
        this.descripcion = cambioDesc;
    }

    this.actualizarValor = function(cambioVal)
    {
        if(cambioVal >= 0 && typeof cambioVal === "number")
        {
            this.valor = cambioVal;
        }
        else
        {
            console.log(`El valor ${cambioVal} no es válido, no se ha alterado el valor actual.`);
        }
    }
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id)
{
    for (let i = 0; i < gastos.length; i++) 
    {
        if(id === gastos[i].id)
        {
            gastos.splice(i, 1);
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

