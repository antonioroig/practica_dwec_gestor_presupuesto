


// TODO: Variable global
"use strict"
let presupuesto = 0 ;
 let gastos=[];
 let idgastos;
function actualizarPresupuesto(dinero)
{
   if (typeof dinero ==="number" && dinero > 0 ){
 
        return presupuesto = dinero;
 
    }else
    {
       console.log("-1");
       return -1;
    }
    // TODO
}
 
function mostrarPresupuesto()
{
    return `Tu presupuesto actual es de ${presupuesto} €`;
    // TODO
}


function CrearGasto(descripcion,valor,fecha= Date.now(), ...etiquetas )
 { 

    if (typeof fecha ==="string" )
    {
        this.fecha =fecha;
    }
        this.descripcion = descripcion;

        if (typeof valor ==="number" && valor > 0)
        {
            this.valor =valor;
        }else{
            this.valor=0;
        }
        
        this.mostrarGasto = function() 
        {
            return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)
        }

        this.actualizarDescripcion =function(nuevaDescripcion)
        {
            this.descripcion = nuevaDescripcion
        }

        this.actualizarValor =function(nuevoValor)
        {
            if (typeof nuevoValor ==="number" && nuevoValor >= 0){
                this.valor=nuevoValor
            }
        }
    // TODO
}

function listarGastos(){

        
    return gastos; 

}
function anyadirGasto(gasto){

    gasto=[
        id = idgastos
    ];
    
    idgastos++;
    gastos.push(gasto);
    
}
function borrarGasto(id){
for (let i =0 ; i< gastos.length ; i++){

    if (gastos[i].id== id)
    {
       delete gastos[i];
    }
}
    
}
function calcularTotalGastos(){
    let totalGasto ;
    for (let i =0 ; i< gastos.length ; i++){
        
        totalGasto += gastos[i]
    }
    return totalGasto;
}
function calcularBalance(){
    let totalGasto= calcularTotalGastos();
    let balance = presupuesto - totalGasto;
    return balance;
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
    calcularTotalGastos ,
     calcularBalance 
   
}
 
 
