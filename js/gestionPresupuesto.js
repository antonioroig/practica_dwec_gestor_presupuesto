let presupuesto=0;
let gastos = new Array();
idGasto=0;


function actualizarPresupuesto(PresAct) {
    if (typeof PresAct === "number" && PresAct>=0){
        presupuesto = PresAct;        
        return presupuesto;
    }
    else{
        console.log('Error, valor inválido');
        return -1;
    }
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de '+ presupuesto + ' €'
}

function CrearGasto(Descripcion, valor, Fecha=Date.now(), ...etiquetas) {
    this.descripcion = Descripcion;
    this.fecha=Fecha;
    this.etiquetas= new Array();

    if(valor >=0 && !isNaN(valor)){

        this.valor = valor;
    }
    else{
        this.valor = 0;
    };

    this.mostrarGasto = function (){
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor +' €';
    };

    this.actualizarDescripcion = function(cadena){
        this.descripcion = cadena;
    };

    this.actualizarValor = function(valorActualizado){
        if(valorActualizado >= 0){
            this.valor = valorActualizado;
        }
        else{
            console.log('Error: El valor introducido es negativo o valor invalido');
        };
    };

    this.fecha = string (Date.parse(fecha))

};

function listarGastos() {
    return gastos;
};
function anyadirGasto () {

};

function borrarGasto() {

};

function calcularTotalGastos() {
    let sum = 0;
    i=0;
    while (i<gastos.length)
    {
        sum+=gastos[i];
        i++;
    }
    return sum;
};

function calcularBalance() {
    let saldo=presupuesto-sum;
    return saldo;
};

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



