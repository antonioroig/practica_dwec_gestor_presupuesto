// TODO: Variable global
let presupuesto = 0;

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
function CrearGasto(descripcion,valor)
{
    if(valor < 0 || isNaN(valor))
    {
        this.valor = 0;
    }    
    else
    {
        this.valor = valor;
    }
    this.descripcion = descripcion;
    this.mostrarGasto = function () 
    {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
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
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   
{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}

