
var presupuesto = 0;
function actualizarPresupuesto(num_int) 
{
    
    if(num_int >= 0 && typeof num_int === 'number'){
        presupuesto = num_int;
        return presupuesto;
    }
    else
    {
        console.log('el número' +num_int + ' no es válido ');
        return -1;
    }    
 
}


function mostrarPresupuesto() 
{
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion,valor_actual) 
{
    this.descripcion = descripcion;

    if(valor_actual > 0 && typeof valor_actual ==='number')
    {

        this.valor = valor_actual;

    }
    else
    {
        this.valor = 0;
    };
    
    this.mostrarGasto = function ()
    {
        return 'Gasto correspondiente a '+this.descripcion+ ' con valor ' +this.valor +' €';
    };
    
    this.actualizarDescripcion = function(cadena_act)
    {
        this.descripcion = cadena_act;
    };

    this.actualizarValor = function(val_actualizado)
    {
        if(val_actualizado >= 0)
        {
            this.valor = val_actualizado;
        }
        else
        {
            console.log(`El valor introducido es negativo, no se ha podido actualizar`);
        };
    };
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}

