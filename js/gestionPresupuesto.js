// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos;
let idGasto;
function actualizarPresupuesto(valorIntroducido) {
    // TODO
    let aux = "";
    if(valorIntroducido >= 0)
    {
        presupuesto = valorIntroducido;
        return presupuesto;

    }else 
    {
        console.log("Error, se ha introducido un valor negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
        let mostrarP ="Tu presupuesto actual es de " + presupuesto + " €";
        return mostrarP;
    }

function CrearGasto(descripcion,valor) {
    // TODO
    this.descripcion=descripcion;
    if (valor <0 || typeof valor!=='number') {
        this.valor = 0;
    }else 
    {
        this.valor = valor;
    }
    this.mostrarGasto = function()
    {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion =function (descrip)
    {
        this.descripcion=descrip;
    }
    this.actualizarValor = function(valoact) 
    {
        if (valoact >= 0) 
        {
            this.valor = valoact;
        }
    }
} 
 
function listarGastos(){

}
function anyadirGasto(){
    
}
function borrarGasto(){
    
}
function calcularTotalGastos(){
    
}
function calcularBalance(){
    
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos, 
    anyadirGasto, 
    borrarGasto, 
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
