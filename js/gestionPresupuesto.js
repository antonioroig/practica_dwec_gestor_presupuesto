// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (nuevoPresupuesto >= 0)
    {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    }else
    {
        console.log('el valor es inferior a 0');
        return -1;
    }
}

function mostrarPresupuesto() {
    return ('Tu presupuesto actual es de ' + presupuesto + ' €');
}

function CrearGasto(descripcion,valor,fecha,...etiquetas) {
    this.descripcion=descripcion;

    this.valor=0;

    if(isNaN(Date.parse(fecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(fecha);
    }
    this.etiquetas = [];

    if(etiquetas != null){
        this.etiquetas=etiquetas;
    }

    if(valor >= 0){
        this.valor=valor;
    };

    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ` + this.descripcion + ` con valor ` + this.valor + ` €.`);
    }

    this.mostrarGastoCompleto = function(){
        var texto =`Gasto correspondiente a ` + this.descripcion + ` con valor ` + this.valor + ` €.\n`
        this.fecha = Date
        texto += (`Fecha: ` + `\nEtiquetas:\n`)
        
        this.etiquetas.forEach(etiqueta => 
            texto += `- ` + etiqueta + `\n`
        );
        return texto;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        if (nuevoValor > 0)
        {
            this.valor = nuevoValor;
        }
    }

    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    }
/*
    this.anyadirEtiquetas(...arrEtiq) = function(){
        let nuevasEtiq = new Set(arrEtiq);
        etiquetas.concat(nuevasEtiq);
    }    */
}


function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){

    for(let i =0; i<gastos.length; i++){
        if(gastos[i].id == id){
            gastos.splice(i,1);
        }
    }

}
function calcularTotalGastos(){
    let total = 0;

    gastos.forEach(gasto =>{
        total += gasto.valor;
    })

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
