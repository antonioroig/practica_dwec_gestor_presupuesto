// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let gastos = new Array();
let presupuesto = 0;
let idGasto = 0;


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
function CrearGasto(descripcion, valor, fecha=Date.now(), ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    this.valor = valor;
    this.etiquetas = new Array();


    if (etiquetas === undefined){
        this.etiquetas = [...etiquetas];
    }

    if (fecha === undefined){
        this.fecha = Date.now(); 
    }

    if (typeof fecha !== 'string' && fecha === isNaN(Date.parse(fecha))){
        this.fecha = fecha;
    }
    else {
        this.fecha = Date.now();
    }

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

    this.anyadirEtiquetas = function(){

    }

    this.mostrarGastoCompleto = function(){
        const event = new Date(Date.UTC(fecha));

        let ret = 'Gasto correspondiente a ' + this.descripcion +' con valor ' + this.valor + '€. Fecha: ' + this.fecha  + 'Etiquetas:' + this.etiquetas;
        return ret;
    }
}

function listarGastos(){

    return gastos;
}

function anyadirGasto(...gasto1){
    let gastos;

    gasto1[idGasto]; /* otra manera de añadir seria gasto1[id] */
    idGasto++;
    gastos = gasto1.push();
}

/* 
this.etiquetas = etiquetas;
this. etiquetas = [...etiquetas];
*/

function borrarGasto(id){

    gastos.splice(id,1);

}

function calcularTotalGastos(){

    let total = gastos.reduce((a, b) => a + b, 0);

    return total;
}

function calcularBalance(){
    
    let total = calcularTotalGastos();


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