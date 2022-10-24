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
    // Método 'mostrarGastoCompleto' del objeto gasto
    this.mostrarGastoCompleto = function(){
        let resp = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        resp += `Fecha: ` + (new Date (this.fecha)).toLocaleString() + `\n`;
        resp += `Etiquetas:` + `\n`;
        for (var i = 0; i < etiquetas.length; i++) {
            resp += '- ' + etiquetas[i] + `\n`;
        }
          return resp;
    };
    // Método 'actualizarFecha' del objeto gasto
    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    }
    // Método 'anyadirEtiquetas' del objeto gasto
    this.anyadirEtiquetas = function(... etiqueta){
        
        // Para comprobar valores Repetidas / Duplicadas
        let etiquetasRepetidas = false;       

        for(let i = 0; i < etiqueta.length; i++){

            for(let j = 0; j < this.etiquetas.length; j++){
                // comprobar si es repetida
                if(etiqueta[i] == this.etiquetas[j]){
                    etiquetasRepetidas = true;
                }
            }
            // Añadir si no es repetida
            if(!etiquetasRepetidas){
                this.etiquetas.push(etiqueta[i]);
            }
            etiquetasRepetidas = false;       
        }
    }
    // Método 'borrarEtiquetas' del objeto gasto
    this.borrarEtiquetas = function(... etiqueta){

        for(let i = 0; i < etiqueta.length; i++){
           for(let j = 0; j < this.etiquetas.length; j++){
               // comprobar si existe
               if(etiqueta[i] == this.etiquetas[j]){
                   this.etiquetas.splice(j,1);
                   break;
               }
           }
        }
    }
    // * * * * * * * * * * * * * * * *
    // Actividad 3 - Métodos

    // Método 'obtenerPeriodoAgrupacion' del objeto gasto --> dia (aaaa-mm-dd) /mes (aaaa-mm) /anyo (aaaa)
    this.obtenerPeriodoAgrupacion = function(valor){

        let resp = "";
        let d = new Date(this.fecha);
           
        if(valor === "anyo"){

            let resp1 = d.getFullYear();
            
            resp = resp1;
        }
        else if(valor === "mes"){
            let resp1 = d.getFullYear();
            let resp2 = d.getMonth();
            
            resp = resp1 + "-" + resp2;
        }
        else if(valor === "dia"){
            let resp1 = d.getFullYear();
            let resp2 = d.getMonth();
            let resp3 = d.getDate();

            resp = resp1 + "-" + resp2 + "-" + resp3;
        }
        return resp;         
    }
}
    
/* - - - - - - - - - - - - - - - - */
//++++
function listarGastos(){
    return gastos;
}
//Añade el gasto que se pasa como parámetro a la variable global 'gastos'
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto += 1;
    gastos.push(gasto);
}
// Elimina de la variable global 'gastos' el gasto cuyo id se pasa como parámetro
function borrarGasto(idToDelete){

    for(let i = 0; i < gastos.length;i++){
        if(gastos[i].id == idToDelete){
            gastos.splice(i,1);
            break;
        }
    }
}
// Calcula la suma de todos los gastos presentes en la variable global 'gastos'
function calcularTotalGastos(){

    let result = 0;
    for(let i = 0; i < gastos.length; i++){
        result += gastos[i].valor;
    }
    return result;
}
// Calcula el balance (presupuesto - gastos totales) a partir de los gastos almacenados en la variable global 'gastos':
function calcularBalance (){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//Actividad 3 - Ejercicios

function filtrarGastos(){

}


function agruparGastos(){

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
   calcularBalance,
   filtrarGastos,
   agruparGastos,

}