let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(a) {

    if(a >= 0 && typeof a === "number"){
        presupuesto = a;
        return a;
    }
    else
    {
        
        console.log(`el número ${a} no es valido `);
        return -1;
    }
    return presupuesto;
}

//Revisar

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
// revisar
function CrearGasto(Descripcion,Valor) {
    this.descripcion = Descripcion;

    if(Valor > 0 && ! isNaN(Valor)){

        this.valor = Valor;

    }else{
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