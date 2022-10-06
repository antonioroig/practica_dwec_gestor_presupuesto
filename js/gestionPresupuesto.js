// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
function actualizarPresupuesto(parametro) {
    if(parametro >= 0)
    {
        presupuesto = parametro;
        return parametro;
    }else{
        console.log( "Error" );
        return -1;
    }
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(pdescripcion, pvalor) {
    // TODO
    if(typeof pvalor === "number" && pvalor >= 0)
        if(pvalor < 0)
        {
            pvalor = 0;
        }
        
            this.valor = pvalor,
            this.descripcion = pdescripcion,

            this.mostrarGasto = function() {
                console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)
            };
    
    
        
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
