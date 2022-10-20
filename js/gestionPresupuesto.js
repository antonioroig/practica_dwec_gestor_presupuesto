// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

const opciones = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minutes: 'numeric', seconds: 'numeric' };
function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        return -1
    }
}

function mostrarPresupuesto() {
    // TODO
    return ('Tu presupuesto actual es de ' + presupuesto + ' €');
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    this.valor = 0;

    this.etiquetas = etiquetas;

    if (isNaN(Date.parse(fecha))) {
        this.fecha = Date.now();
    } else {
        this.fecha = Date.parse(fecha);
    }

    if (etiquetas != null) {
        this.etiquetas = etiquetas;
    }
    if (valor >= 0) {
        this.valor = valor;
    }

    this.mostrarGasto = function () {
        return ('Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €');
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
        return this.descripcion;
    }

    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
        return this.valor;
    }
    this.actualizarFecha = function (fecha) {
        if (!isNaN(Date.parse(fecha))) {
            this.fecha = Date.parse(fecha);
        }
    }
    this.mostrarGastoCompleto = function () {

        let gasto = 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €.\n';
        gasto += 'Fecha: ' + new Date(this.fecha).toLocaleString() + '\n' + 'Etiquetas:\n';
        this.etiquetas.forEach(element => {
            gasto += "- " + element + "\n";
        });
        return gasto;
    }
    this.anyadirEtiquetas = function (...arrayEtiq) {
       arrayEtiq.forEach(element => {
       if(!this.etiquetas.includes(element,0))
       {
        this.etiquetas.push(element);
       }
    });
    }

    this.borrarEtiquetas = function (...arrayEtiq) {
        let x, y;
        for (let i = 0; i < arrayEtiq.length; i++) {

            y = arrayEtiq[i];

            for (let j = this.etiquetas.length; j >= 0; j--) {

                x = this.etiquetas[j]

                if (x === y) {
                    this.etiquetas.splice(j, 1);
                }
            }
        }
    };
}
function listarGastos() {
    return gastos;
}
function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id == id) {
            gastos.splice(i, 1);
        }
    }
}
function calcularTotalGastos() {
    let gastoTotal = 0;
    gastos.forEach(element => {
        gastoTotal += element.valor;
    });
    return gastoTotal;
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
