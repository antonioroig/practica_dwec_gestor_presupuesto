// TODO: Variable global

var presupuesto = 0;

function actualizarPresupuesto(NumIntroducido) {
    // TODO
    if (NumIntroducido >= 0 && typeof NumIntroducido === "number")
    {
        presupuesto = NumIntroducido;
        return presupuesto;
    }
    else
    {
        console.log("Error el numero es negativo");
        return -1;
    }
}

//Revisar
function mostrarPresupuesto() {
    // TODO
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}
// revisar
function CrearGasto(descripcion,valor) {
    this.descripcion = descripcion;
    
    if ( valor >= 0 && typeof valor === "number")
    {
        this.valor = valor;
    }
    else 
    {
        this.valor = 0;
    }

    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(ActualizarDescripcion){
        this.descripcion = ActualizarDescripcion;
    }
    this.actualizarValor = function(ActualizarValor){
        if (ActualizarValor >= 0 && typeof ActualizarValor === "number")
        {
            this.valor = ActualizarValor;
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

