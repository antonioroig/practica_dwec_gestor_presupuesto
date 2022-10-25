// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
/////
function actualizarPresupuesto(valor) {
    if(valor >= 0 && typeof valor === 'number')
    {
        presupuesto = valor;
        return presupuesto;
    }
    else{
        console.log("Error! Es un valor negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor, fecha=Date.now() , ...etiquetas) { //Función constructora, tiene que empezar por mayus
    this.descripcion = descripcion;
    this.fecha = new Date();
    this.etiquetas = [...etiquetas];
    if(valor >= 0 && typeof valor === 'number'){
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }
    if(typeof fecha === 'string' && !isNaN(Date.parse(fecha))){
        this.fecha = Date.parse(fecha);
    }
    else{
        this.fecha = Date.now();
    }
    //Métodos:
    this.mostrarGasto = function(){
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },
    this.actualizarDescripcion = function(descripcionActualizada){
        if(typeof descripcionActualizada === 'string'){
            this.descripcion = descripcionActualizada;
        }
    },
    this.actualizarValor = function(valorActualizado){
        if( valorActualizado >= 0 && typeof  valorActualizado === 'number'){
            this.valor = valorActualizado;
        }
    },

    this.mostrarGastoCompleto = function(){
        let res = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n`;
        for(let i = 0; i < this.etiquetas.length; i++){
            res += "- " + this.etiquetas[i]+`\n`;
        }
        return res;
    },
    this.actualizarFecha = function(nueva_fecha){
        if(typeof nueva_fecha === 'string' && !isNaN(Date.parse(nueva_fecha))){
            this.fecha = Date.parse(nueva_fecha);
        }
    },
    this.anyadirEtiquetas = function(...nueva_etiqueta){
        nueva_etiqueta.forEach(element => {
            if(!this.etiquetas.includes(element)){
                this.etiquetas.push(element);
            }
        });
    },
    this.borrarEtiquetas = function( ...etiqueta_borrada){
        etiqueta_borrada.forEach(element =>{
            if(this.etiquetas.includes(element)){
                this.etiquetas.splice(this.etiquetas.indexOf(element), 1)
            }
        });
    },
    this.obtenerPeriodoAgrupacion = function(periodo){
        let fecha = new Date(this.fecha);
        if(periodo == 'Dia' || periodo == 'dia' || periodo == 'DIA'){
           return fecha.toISOString().substring(0, 10);
        }
        if(periodo == 'Mes' || periodo == 'mes' || periodo == 'MES'){
            return fecha.toISOString().substring(0, 7);
        }
        if(periodo == 'AÑO' || periodo == 'Año' || periodo == 'ANYO' || periodo == 'anyo'){
            return fecha.toISOString().substring(0, 4);
        }
    }
}

function listarGastos(){
    return gastos;
};
function anyadirGasto(gasto){
    gasto.id = idGasto; //También puedes hacer gasto[id] = idGasto
    idGasto++;
    gastos.push(gasto);
};
function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++){
        if(gastos[i].id === id){
            gastos.splice(i, 1);
        }
    }
};
function calcularTotalGastos(){
    let total_gasto = 0;
    gastos.forEach(gasto => {
        total_gasto = total_gasto + gasto.valor;
    });
    return total_gasto;
};
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
};
function filtrarGastos({}){

};
function agruparGastos(){

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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
