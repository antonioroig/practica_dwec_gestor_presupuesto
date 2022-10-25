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

function CrearGasto(descripcion1, valor1, fecha1 = Date.now(), ...etiqueta1) {
    // TODO    
    this.descripcion = descripcion1;
    this.valor;
    this.fecha;
    this.etiquetas;


    if (typeof(valor1) === 'number' && valor1 >= 0) {
        this.valor = valor1;
    } else {
        this.valor = 0;
    };


    if (etiqueta1 === undefined) {
        this.etiquetas = new Array();
    } else {
        this.etiquetas = [...etiqueta1];
    };


    if (Date.parse(fecha1)) {
        this.fecha =  Date.parse(fecha1);
    } else {
        this.fecha = Date.now();
    };


    this.mostrarGasto = function () {
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €'
    };


    this.actualizarDescripcion = function (descripcion1) {
        this.descripcion = descripcion1;
    };


    this.actualizarValor =  function (valor1) {
        if (typeof(valor1) === 'number' && valor1 >= 0)
            this.valor = valor1;
    };    


    this.actualizarFecha =  function (fecha1) {
        if (Date.parse(fecha1)) 
            this.fecha = Date.parse(fecha1);
    }; 


    this.anyadirEtiquetas =  function (...newetiquetas) {
        this.etiquetas = [...this.etiquetas, ...newetiquetas]
        let seteado = new Set(this.etiquetas);
        this.etiquetas = Array.from(seteado);
    };


    this.borrarEtiquetas =  function (...newetiquetas) {
        for (let i = 0; i < this.etiquetas.length; i++) {
            for (let j = 0; j < newetiquetas.length; j++) {
                if (this.etiquetas[i] === newetiquetas[j]) {
                    this.etiquetas.splice(i, 1);
                    i--;
                }
            }
        }
    };

    this.mostrarGastoCompleto = function () {
        let fecha1 = new Date (this.fecha);
        let texto = 
        'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €.' + '\n' +
        'Fecha: ' + fecha1.toLocaleString() + '\n' + 
        'Etiquetas:' + '\n';
        for (let i = 0; i < this.etiquetas.length; i++) {
            texto += '- ' + this.etiquetas[i] + '\n';
        }
        return texto;
    };

    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fecha1 = new Date (this.fecha);
        let fechaMostrar = fecha1.getFullYear().toLocaleString();
        if (periodo === 'anyo') {
            return fechaMostrar;
        } else if (periodo === 'mes') {
            fechaMostrar += '-';
            if (fecha1.getMonth() + 1 < 10) {
                fechaMostrar += '0';
            }
            return fechaMostrar += fecha1.getMonth() + 1;
        } else if (periodo === 'dia') {
            fechaMostrar += '-';
            if (fecha1.getMonth() + 1 < 10) {
                fechaMostrar += '0';
            }
            fechaMostrar += fecha1.getMonth() + 1 + '-';
            if (fecha1.getDate() < 10) {
                fechaMostrar += '0';
            }
            return fechaMostrar += fecha1.getDate();
        }
    }
}


function listarGastos() {
    return gastos;
}


function anyadirGasto(ObjGasto) {
    ObjGasto.id = idGasto;
    idGasto++;
    gastos.push(ObjGasto);
}


function borrarGasto(idBorrar) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === idBorrar) {
            gastos.splice(i, 1);
        }
    }
}


function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    };
    return total;
}


function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos() {
    //toLowerCase convierte en minusculas EJ: 'Interfaz'.toLowerCase()

}

function agruparGastos() {

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
    filtrarGastos,
    agruparGastos
}
