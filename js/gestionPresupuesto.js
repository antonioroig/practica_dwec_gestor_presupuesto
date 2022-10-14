// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
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

function CrearGasto(descripcion,valor,) {
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
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id){
    let aux = gastos.findIndex(gasto => gasto.id == id); //guardo la posicion en la que esta el objeto con dicho id//
    if(aux !== -1) //si devuelve -1 es que el objeto no existe entonces no se haria nada//
    {
        gastos.splice(aux, 1);//si el aux no es -1 entonces se borra el gasto desado de gastos//
    }
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
