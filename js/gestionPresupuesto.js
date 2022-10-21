// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
let presupuesto = 0;
let idGasto = 0;
let gastos = [];

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
function mostrarPresupuesto(){
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) { 
    
    this.descripcion = descripcion;
    this.etiquetas =[ ... etiquetas];
    
    // Comprueba el valor
    if(valor >= 0 && typeof valor === 'number'){
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }
    if(typeof fecha === 'string'){
        if(!isNaN(Date.parse(fecha)) && typeof fecha === 'string'){
            this.fecha =  Date.parse(fecha);
        }else{
            this.fecha = Date.now();
        }
    }else{
        this.fecha = Date.now();
    }
    this.mostrarGasto = function (){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },
    this.mostrarGastoCompleto = function(){
        let fecAux = new Date(this.fecha);

        let aux = "";
        for(let etiqueta of this.etiquetas){
            aux = aux + `- ${etiqueta}\n`;
        }
        let res =  `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fecAux.toLocaleString())}\nEtiquetas:\n`
        return res + aux;
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
    this.anyadirEtiquetas = function (... etiquetas){
        const etiqueta = etiquetas.filter((element) => {

            for(let i = 0 ; i < etiquetas.length; i++){
                if(!this.etiquetas.includes(element)){
                    return element;
                };
            }
        });
        this.etiquetas.push( ... etiqueta);        
    },
    this.borrarEtiquetas = function (... etiquetas){
       etiquetas.forEach((element) => {
        for (let i = 0; i < this.etiquetas.length; i++) {
            if (this.etiquetas[i] === element) 
            {
                this.etiquetas.splice(i, 1);
            }
        }
       });
    },
    this.actualizarFecha= function(fechaIntroducida){
        if(typeof fechaIntroducida === 'string'){
            if(!isNaN(Date.parse(fechaIntroducida) )){
                this.fecha = Date.parse(fechaIntroducida);
            }
        }
    },

    // Revisar
    this.obtenerPeriodoAgrupacion = function (periodo){
        let fecha = new Date(this.fecha);
        let res = "";
        res = fecha.to
        if (periodo === "dia"){
            res = (fecha.toDateString());

        }else if(periodo === "mes"){
            res = `${fecha.getFullYear()}-${(fecha.getUTCMonth() + 1)}`;

        }else if (periodo === "anyo"){
            res = (fecha.getFullYear());
        };
        return res;
    }
};
function listarGastos(){
    return gastos;
};
function anyadirGasto(gasto){
    gasto[`id`] = idGasto;
    gastos.push(gasto);
    idGasto++;
};
function borrarGasto(id){
    for(let i = 0; i <= gastos.length; i++){
        if(gastos[i].id == id){
           gastos.splice(i,1)
           break;
        }
    }

};
function calcularTotalGastos(){
    let sum = 0;

    for(let gasto of gastos){
        sum += gasto.valor
    }
    return sum;
};
function calcularBalance(){
    return (presupuesto - calcularTotalGastos());
};
// Revisar
function filtrarGastos(){

};
function agruparGastos(){
    
};
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

