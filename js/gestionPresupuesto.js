let presupuesto=0;

function actualizarPresupuesto() {
    if (typeof PresAct === "number"){
        presupuesto = PresAct;
        return PresAct;
    }
    else{
        console.log(`Error, valor ${PresAct} inválido`);
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto() {
    this.descripcion = Descripcion;

    if(Valor > 0 && ! isNaN(Valor)){

        this.valor = Valor;
    }
    else{
        this.valor = 0;
    };

    this.mostrarGasto = function (){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(cadena){
        this.descripcion = cadena;
    };

    this.actualizarValor = function(valorActualizado){
        if(valorActualizado >= 0){
            this.valor = valorActualizado
        }
        else{
            console.log(`El valor introducido es negativo, no ha podido ser cambiado`)
        };
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
