// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
actualizarPresupuesto(-5);
console.log(presupuesto);
function actualizarPresupuesto(number) {

    if(number >= 0 && typeof number === "number"){
    presupuesto = number;
    return number;
    }   
    else{
    console.log("Error");
    return -1;
    }

}


function mostrarPresupuesto() {
    // TODO
   return (`Tu presupuesto actual es de ${presupuesto} €`);
}


function CrearGasto(pdescripcion,pvalor) {
    // TODO
    if(pvalor < 0 || typeof(pvalor) !== `number`){
        pvalor = 0;
    }
    
        this.valor = pvalor,
        this.descripcion = `${pdescripcion}`,

        this.mostrarGasto = function(){
           return (`Gasto correspondiente a ${pdescripcion} con valor ${pvalor} €`)
        },
        this.actualizarDescripcion = function(descripcion){
            this.descripcion = descripcion;
        },
        this.actualizarValor = function(pvalor){
            if(pvalor >= 0 && typeof pvalor === `number`){
                this.valor = pvalor;
            }
        
    }
    

    
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
