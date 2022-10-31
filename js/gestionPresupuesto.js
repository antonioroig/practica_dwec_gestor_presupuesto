// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
// TODO: Variable global
let presupuesto = 0;
actualizarPresupuesto(-5);
console.log(presupuesto);
function actualizarPresupuesto(number) {
    // TODO
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

var gastos = [];
var idGasto = 0;
function CrearGasto(pdescripcion, pvalor, pfecha = Date.now(), ... petiquetas) {
    // TODO
    if(pvalor < 0 || typeof(pvalor) !== `number`){
        pvalor = 0;
    }
    if([...petiquetas] === `undefined`){
        this.etiquetas = [];
    }
    else{
        this.etiquetas = [...petiquetas];
    }
    if(isNaN(Date.parse(pfecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(pfecha);
    }
    
        this.valor = pvalor,
        this.descripcion = `${pdescripcion}`,

        this.mostrarGastoCompleto = function(){
            let etiquetas = ``;
            for(let etiq of this.etiquetas){
                etiquetas += `- ${etiq}\n`
            }
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n${etiquetas}`)
        }
        this.actualizarFecha = function(pfecha){
            if(!isNaN(Date.parse(pfecha))){
                this.fecha = Date.parse(pfecha);
            }
        }
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
        this.anyadirEtiquetas = function(... petiquetas){
            if(petiquetas !== `undefinded`){
                for(let i = 0; i < petiquetas.length; i++){
                    if(!this.etiquetas.includes(petiquetas[i])){
                    this.etiquetas.push(petiquetas[i]);}
                }
            }
        }
        this.borrarEtiquetas = function(... petiquetas){
            for(let i = 0; i < petiquetas.length; i++){
               for(let x = 0; x < this.etiquetas.length;x++){
                 if(petiquetas[i] === this.etiquetas[x]){
                    this.etiquetas.splice(x,1);
                 }
               }
            }
        }
        this.obtenerPeriodoAgrupacion = function(periodo){
            let dia = new Date(this.fecha).getDate();
            let mes = new Date(this.fecha).getMonth()+1;
            let anyo = new Date(this.fecha).getFullYear();
            if(dia <10){
                dia = `0${dia}`
            }
            if(periodo === `dia`){
                if(mes < 10){
                    return (`${anyo}-0${mes}-${dia}`);
                }
                else{
                    return (`${anyo}-${mes}-${dia}`);
                }
                
            }
            if(periodo === `mes`){
                if(mes < 10){
                    return (`${anyo}-0${mes}`);
                }
                else{
                    return (`${anyo}-${mes}`);
                }
            }
            if(periodo === `anyo`){
                return (`${anyo}`);
            }
        }
    }
function listarGastos(){
            return gastos;
        }
function anyadirGasto(gasto){
            gasto.id = idGasto;
            idGasto++;
            gastos.push(gasto);
        }
function borrarGasto(id){
            for(let i = 0; i< gastos.length;i++){
                if(gastos[i].id === id){
                    gastos.splice(i,1);
                }
            }
        }
function calcularTotalGastos(){
            let res = 0;
            for(let i = 0 ; i < gastos.length;i++){
                res += gastos[i].valor;
            }
            return res;
        }
function calcularBalance(){
            let balance = 0
            balance = presupuesto - calcularTotalGastos();
            return balance
        }
function filtrarGastos({fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene,etiquetasTiene}){

    let arrayDevuelto = gastos.filter(function(gasto){{
        let anyadir = true;
            
            if(fechaDesde){
                if(gasto.fecha < Date.parse(fechaDesde)){
                    anyadir = false;
                }
            }
            if(fechaHasta){
                if(gasto.fecha > Date.parse(fechaHasta)){
                    anyadir = false;
                }
            }
            if(valorMinimo){
                if(gasto.valor < valorMinimo){
                    anyadir = false;
                }
            }
            if(valorMaximo){
                if(gasto.valor > valorMaximo){
                    anyadir = false;
                }
            }
            if(descripcionContiene){
                if(!gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())){
                    anyadir = false;
                }
            }
            if(etiquetasTiene){
                let comprobar = false;
                for(let i = 0; i < etiquetasTiene.length; i++){
                    if(gasto.etiquetas.includes(etiquetasTiene[i])){
                        comprobar = true;
                    }
                }
                if(!comprobar){
                    anyadir = false;
                }
            }
            return anyadir;
            
        }
        
    });
    return arrayDevuelto;
}
function agruparGastos(periodo = `mes`,etiquetas,fechaDesde2,fechaHasta2 = Date.now()){
    let gastosFilt = filtrarGastos({fechaDesde:fechaDesde2,fechaHasta:fechaHasta2,etiquetasTiene:etiquetas});

    let resultado = gastosFilt.reduce(function(sum,gasto){
        if(isNaN(sum[gasto.obtenerPeriodoAgrupacion(periodo)])){
            sum[gasto.obtenerPeriodoAgrupacion(periodo)] = 0;
        }
        sum[gasto.obtenerPeriodoAgrupacion(periodo)] += gasto.valor;
        return sum;
    })
    return resultado;
    
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
    agruparGastos,
}
