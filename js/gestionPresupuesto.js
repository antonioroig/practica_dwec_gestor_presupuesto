// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0){
        presupuesto = valor;
        return presupuesto;
    }
    else{
        console.log('El valor introducido es negativo');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;;
}

function CrearGasto(descripcionGasto, valorGasto, fecha = Date.now(), ...etiquetas) {
    // TODO
    this.descripcion = descripcionGasto;
    this.etiquetas = [...etiquetas];
    if(valorGasto >= 0){
        this.valor = valorGasto;
    }
    else{
        this.valor = 0;
    }

    if((!isNaN(Date.parse(fecha))) && typeof fecha === 'string'){
        this.fecha = Date.parse(fecha);
    }
    else{
        this.fecha = Date.now();
    }

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }
    this.actualizarDescripcion = function(nuevadesc){
        this.descripcion = nuevadesc;
    }
    this.actualizarValor = function(nuevovalor){
        if(nuevovalor >= 0){
            this.valor = nuevovalor;
        }
    }
    this.mostrarGastoCompleto = function(){
        let gasto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        gasto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        gasto += `Etiquetas:\n`;
        this.etiquetas.forEach(etiqueta => {
            gasto += `- ${etiqueta}\n`;
        })
        return gasto;
    }
    this.actualizarFecha = function(fecha){
        if((!isNaN(Date.parse(fecha))) && typeof fecha === 'string'){
            this.fecha = Date.parse(fecha);
        }
    }
    this.anyadirEtiquetas = function(...etiquetasNuevas){
        let repetido = 0;
        for(let i = 0; i < etiquetasNuevas.length; i++){
            for(let j = 0; j < this.etiquetas.length; j++){
                if(etiquetasNuevas[i] === this.etiquetas[j]){
                    repetido = 1;
                    break;
                }
            }
            if(repetido === 0){
                this.etiquetas.push(etiquetasNuevas[i]);
            }
            repetido = 0;
        }
    }
    this.borrarEtiquetas = function(){

    }
}

function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++){
        if(gastos[i].id == id){
            gastos.splice(i, 1);
        }
    }
}
function calcularTotalGastos(){
    var total = 0;
    gastos.forEach(gasto => {
        total += gasto.valor;
    });
    return total;
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
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
