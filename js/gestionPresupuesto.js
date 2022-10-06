// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
//Commit maker

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
function CrearGasto(Descripcion,Valor)
{

    this.descripcion = String(Descripcion);

    if(Valor >= 0 && (typeof Valor === "number"))
    {
        this.valor = Valor;
    }
    else
    {
        this.valor = 0;
        console.log(`El valor ${Valor} no es válido.`);
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

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {

    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}

