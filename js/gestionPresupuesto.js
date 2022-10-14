// TODO Crear las funciones, objetos y variables indicadas en el enunciado

// TODO Variable global
let presupuesto = 0;


let gastos = new Array();
let idGasto = 0; /* un contador de los gastos */

function actualizarPresupuesto(valor) {
    // TODO
    if (!isNaN(valor)){
        if(valor >= 0){
            presupuesto = valor;
            return presupuesto;
        }
        else{
            return -1;
        }
    }
    else{
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor, fecha, ... etiquetas) {
    // TODO

    if (isNaN(valor) || valor < 0){
        valor = 0;
    }

    descripcion = descripcion + '';

    this.descripcion = descripcion,
    this.valor = valor;

    /* FECHA Y ETIQUETAS COMPROBACIÓN*/
    // FECHA
    if(isNaN(Date.parse(fecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(fecha);
    }
    // ETIQUETAS
    if([...etiquetas] === undefined){
        this.etiquetas = [];
    }else{
        this.etiquetas = [...etiquetas]
    };



    // METODOS 
    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    
    this.actualizarDescripcion = function(descripcion){
        descripcion = descripcion + '';
        this.descripcion = descripcion;
    }
    this.actualizarValor = function(valor){
        if(valor >= 0){
            this.valor = valor;
        }
    };
    // * * * * * * * * * * * * * * * *
    // Actividad 2 - Métodos
    // mostrarGastoCompleto
    this.mostrarGastoCompleto = function(){
        let resp = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        resp += `Fecha: ` + (new Date (this.fecha)).toLocaleString() + `\n`;
        resp += `Etiquetas:` + `\n`;
        for (var i = 0; i < etiquetas.length; i++) {
            resp += '- ' + etiquetas[i] + `\n`;
        }
          return resp;
    };
    // actualizarFecha
    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    }
    // anyadirEtiquetas
    this.anyadirEtiquetas = function(etiqueta){
        
        




        
        /*let etiquetasRepetidas = false;

        console.log(etiqueta.length + " " + etiqueta)

        for (var i = 0; i < etiqueta.length; i++) {
           
           for(var j = 0; j < etiquetas.length; j++){

            if(etiquetas[j] == etiqueta[i]){
                etiquetasRepetidas = true;
                break;
               }
           }
           if(!etiquetasRepetidas){
            this.etiquetas.push(etiqueta[i])
            etiquetasRepetidas = false;
           }*/
        }
        
    
    }    

    
   
    

/* - - - - - - - - - - - - - - - - */
//++++
function listarGastos(){
    return gastos;
}

function anyadirGasto(){

}
function borrarGasto(){

}
function calcularTotalGastos(){

}
function calcularBalance (){

}
/* NO MODIFICAR A PARTIR DE AQUÍ exportación de funciones y objetos creados para poder ejecutar los tests.
Las funciones y objetos deben tener los nombres que se indican en el enunciado
Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo */
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