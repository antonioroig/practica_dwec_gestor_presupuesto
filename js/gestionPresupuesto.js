// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

"use strict";

var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    if(valor >= 0 && typeof valor === `number`){
         presupuesto = valor;
         return valor;
    }else
    {
        console.log("error: el numero es menor a 0");
        return -1;
    }
}


function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`); 
}

   function CrearGasto(pdescripcion,pValor,pfecha,...petiqueta)
   {

    if([...petiqueta] === `undefined`)
    {
        this.etiquetas = [];
    }else
    {
        this.etiquetas = [...petiqueta];
    }

    if(isNaN(Date.parse(pfecha)))
    {
        this.fecha = Date.now();   
    }else{
        
        this.fecha = Date.parse(pfecha);
    }

    
    if(pValor < 0 || typeof(pValor) !== `number`){
        pValor = 0;
    }


    this.valor = pValor,
    this.descripcion= pdescripcion,

    this.mostrarGastoCompleto = function(){
        let etiquetas = ``;
        for(let eti of this.etiquetas){
            etiquetas += `- ${eti}\n`;
        }
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n${etiquetas}`)
    },

    this.actualizarFecha = function(pfecha){

            if(!isNaN(Date.parse(pfecha)))
        {
            this.fecha = Date.parse(pfecha);   
        }
    },

    this.anyadirEtiquetas = function(...petiqueta){
        if(petiqueta !== `undefined`){
            for(let i = 0; i < petiqueta.length; i++){
                if(!this.etiquetas.includes(petiqueta[i])){
                    this.etiquetas.push(petiqueta[i]);
                }
            }
        }
    },

    this.borrarEtiquetas = function(...petiqueta){
        for(let j = 0; j < petiqueta.length; j++){
            for(let i = 0; i < this.etiquetas.length; i++){
                if(petiqueta[j] === this.etiquetas[i]){
                    this.etiquetas.splice(i, 1)
                }
            }
        }    
    },
    
    this.mostrarGasto = function(){
       return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    },

    this.actualizarValor = function(valor){
        if(valor >= 0 && typeof(valor) === `number`)
        {
            this.valor = valor;
        }
    },

    this.obtenerPeriodoAgrupacion = function(periodo){
        let res;
        let f = new Date(this.fecha);
        let mes = parseInt(f.getMonth())+ 1;
        let day;

        if(parseInt(f.getDate()) < 10){
            day =  `0${parseInt(f.getDate())}`
        }else{
            day = parseInt(f.getDate());
        }
        if(periodo === "dia"){
            if(mes < 10){
                    res = f.getFullYear() + `-0` + mes + `-` + day;
                
            }else{
                res = f.getFullYear() + `-` + mes + `-` + day;
            }
        }

        if(periodo === "mes"){
            if(mes < 10){
                res = f.getFullYear() + `-0` + mes;
            }else{
                res = f.getFullYear() + `-` + mes;
            }
        }

        if(periodo === "anyo"){
            res = f.getFullYear();
        }
        return res;
    }
   }

   function listarGastos()
{
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){
        for(let i= 0; i < gastos.length; i++){
            if(gastos[i].id === id){
                gastos.splice(i, 1)
            }
        }
}

function calcularTotalGastos(){
    let suma = 0;
    for(let i = 0; i < gastos.length; i++){
        suma += gastos[i].valor;
    }
    return suma;
}

function calcularBalance(){
    let gastoTotal = calcularTotalGastos();
    return presupuesto - gastoTotal;
}

function filtrarGastos({fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene,etiquetasTiene}){
    
            let results = gastos.filter(function(gasto){
                let anydir = true;
                if(fechaDesde){
                    if(gasto.fecha < Date.parse(fechaDesde)){
                        anydir = false;
                    }
                }       
                if(fechaHasta){
                    if(gasto.fecha > Date.parse(fechaHasta)){
                        anydir = false;
                    }
                }
                if(valorMinimo){
                    if(gasto.valor < valorMinimo){
                        anydir = false;
                    }
                }
                if(valorMaximo){
                    if( gasto.valor > valorMaximo){
                        anydir = false;
                    }
                }
                if(descripcionContiene){
                    if(!gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())){
                        anydir = false;
                    }
                }
                if(etiquetasTiene){
                    let comprobar = false;
                    for(let i = 0; i < etiquetasTiene.length; i++){
                        for(let j = 0; j < gasto.etiquetas.length;j++){
                            if(etiquetasTiene[i] === gasto.etiquetas[j]){
                                comprobar = true;
                            }
                        }
                    }
                    if(!comprobar){
                        anydir = false;
                    }
                }
                return anydir;
        });
        return results;                
        
}

function agruparGastos(periodo = "mes",etiquetas,fechadesde,fechahasta = Date.now()){


        let array = filtrarGastos({fechaDesde : fechadesde,fechaHasta : fechahasta,etiquetasTiene : etiquetas})
        let res = array.reduce(function(acumulador,gasto){
            let periodo2 = gasto.obtenerPeriodoAgrupacion(periodo);
            
            if(!acumulador.hasOwnProperty(periodo2)){
                acumulador[periodo2] = 0;
            }
            acumulador[periodo2] += gasto.valor;
            return acumulador;
        }, {});

        return res;

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

