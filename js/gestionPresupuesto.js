// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;


function actualizarPresupuesto(parametroAct) {
    // TODO

    if (parametroAct >= 0 && typeof parametroAct === "number")
    {
        presupuesto = parametroAct;
        return presupuesto;
    }
    else
    {
        console.log('Error: El valor introducido es negativo o no es válido');
        return -1;
    }
}

//revisar
function mostrarPresupuesto() {
    // TODO
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

// revisar
function CrearGasto(descripcion, valor) {
    // TODO
    this.descripcion = descripcion;

    if (valor >= 0 && !isNaN(valor))
    {
        this.valor = valor;
    }

    else{
        this.valor = 0;
    };

    this.mostrarGasto = function(){
        return 'Gasto correspondiente a '+ this.descripcion + ' con valor ' + this.valor + ' €';
    }

    this.actualizarDescripcion = function(descripcionAct){
        this.descripcion = descripcionAct;
    }

    this.actualizarValor = function(valorAct){

        if (valorAct >= 0)
        {
            this.valor = valorAct;
        }

        else
        {
            console.log('Error: El valor introducido es negativo o no es un valor apto');
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