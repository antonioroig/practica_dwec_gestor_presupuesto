// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) 
{
    // TODO
    if(valor >= 0)
    {
        presupuesto = valor;
        return presupuesto;
    }
    else
    {
        return "Error" , -1;
    }
}
//Revisar
function mostrarPresupuesto() 
{
    // TODO
    return "Tu presupuesto actual es de " + presupuesto + " €";
}
// revisar
function CrearGasto(descripcion,valor,fecha,...etiquetas)
{
    this.myEtiquetas = [];
    if(valor < 0 || isNaN(valor))
    {
        this.myValor = 0;
    }    
    else
    {
        this.myValor = valor;
    }
    if(Date.parse(fecha) == NaN)
    {
        this.myFecha = new Date();
    }
    else
    {
        this.myFecha = Date.parse(fecha);
    }
    this.myEtiquetas = [...etiquetas]
    this.myDescripcion = descripcion;
    this.mostrarGasto = function () 
    {
        return "Gasto correspondiente a " + this.myDescripcion + " con valor " + this.myValor + " €";
    }
    this.mostrarGastoCompleto = function () 
    {
        return "Gasto correspondiente a " + this.myDescripcion + " con valor " + this.myValor + " €\nFecha: " + this.myFecha + "\n" + "Etiquetas:\n" + this.myEtiquetas;
    }
    this.actualizarValor = function (nuevovalor) 
    {
        if(nuevovalor >= 0)
        {
            this.valor = nuevovalor;
        }
    }
    this.actualizarDescripcion = function (nuevadescripcion) 
    {
        this.descripcion = nuevadescripcion;
    }
    this.actualizarFecha = function (nuevafecha) 
    {
        if(Date.parse(fecha) == NaN)
        {
            this.myFecha = new Date();
        }
    else
        {
            this.myFecha = Date.parse(fecha);
        }
    }
    this.anyadirEtiquetas(...nuevasetiquetas)
    {
        this.myEtiquetas = this.myEtiquetas + [...nuevasetiquetas];
    }
    this.borrarEtiquetas ()
    {
        this.myEtiquetas = [];
    }
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
export   
{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto, 
    borrarGasto, 
    calcularTotalGastos,
    calcularBalance
}
//hola
