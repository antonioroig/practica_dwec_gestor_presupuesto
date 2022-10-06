// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(parameter1) {
    // TODO
    if (typeof(parameter1) === 'number' && parameter1 >= 0) {
        return presupuesto = parameter1;
    } else {
        console.log( 'ERROR' );
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(descripcion1, valor1) {
    // TODO    
    this.descripcion = descripcion1;
    this.valor;

    if (typeof(valor1) === 'number' && valor1 >= 0) {
        this.valor = valor1;
    } else {
        this.valor = 0;
    };

    this.mostrarGasto = function () {
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €'
    };

    this.actualizarDescripcion = function (descripcion1) {
        this.descripcion = descripcion1;
    };

    this.actualizarValor =  function (valor1) {
        if (typeof(valor1) === 'number' && valor1 >= 0) {
            this.valor = valor1;
        } else {
            this.valor = this.valor;
        }
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
