// TODO: Crear las funciones, objetos y variables indicadas en el enunciado 

// TODO: Variable global

let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

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

function CrearGasto(descripcion1, valor1, fecha1, ...etiqueta1) {
    // TODO    
    this.descripcion = descripcion1;
    this.valor;
    this.fecha = fecha1;
    this.etiqueta = new Array();

    if (typeof(valor1) === 'number' && valor1 >= 0) {
        this.valor = valor1;
    } else {
        this.valor = 0;
    };

    if (etiqueta1 == undefined) {
        this.etiqueta = new Array();
    } else {
        this.etiqueta = etiqueta1;
    };

    if (Date.parse(fecha1)) {
        this.fecha =  Date.parse(fecha1).getTime();
    } else {
        this.fecha = Date.now().getTime();
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

    this.anyadirEtiqueta =  function (...newetiquetas) {
        this.etiqueta.concat(...newetiquetas);
        this.etiqueta = [this.etiqueta];
        /*
        this.etiqueta.concat(...etiquetas);
        for (let i = 0; i <= this.etiqueta.length - 1; i++) {
            for (let j = 1; j <= this.etiqueta.length; j++) {               
                if (this.etiqueta[i] == this.etiqueta[j]) {
                    this.etiqueta.splice(i, 1);
                }
            }
        }
        */
    };
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(ObjGasto) {
    ObjGasto.id = idGasto;
    idGasto++;
    gastos.push(ObjGasto.id);
}

function borrarGasto(id) {
    gastos.splice(id, 1);
}

function calcularTotalGastos() {
    for (let i = 0; i <= gastos.length() - 1; i++) {
        i++;
    }
    return i;
}

function calcularBalance() {

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
