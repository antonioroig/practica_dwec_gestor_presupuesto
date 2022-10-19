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
function CrearGasto(descripcion, valor, fecha=Date.now().getTime(), ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    let gasto1 = new crearGasto ();
    let fecha = new Date(0);
    this.fecha = fecha;
    this.etiquetas = new Array();


    if (etiquetas === null){
        this.etiquetas = etiquetas;
    }

    if (Date.parse(fecha)){
        this.fecha = fecha.getTime();
    }
    
    else{
        this.fecha = Date.now().getTime();
    }

    if (typeof fecha === ' string' && fecha !== NaN(Date.parse(fecha))){
        this.fecha = Date.parse(fecha);
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
}

function listarGastos(){

    return gastos;
}

function anyadirGasto(gasto1){

    gasto1.id = idGasto; /* otra manera de añadir seria gasto1[id] */
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

    let ret = gastos.reduce((a, b) => a + b, 0);
    console.log(ret);

    return ret;
}

function calcularBalance(){
    
    let Tgastos = calcularTotalGastos();


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