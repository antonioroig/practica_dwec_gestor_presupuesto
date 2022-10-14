// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"; 
// TODO: Variable global
 let presupuesto = 0;
 let gastos =[];
 let idGasto = 0;
 
function actualizarPresupuesto(valor) {
    // TODO
    if (valor >= 0 && typeof valor === 'number') 
    {
        presupuesto = valor;
        return presupuesto;
    }
    else 
    {
        console.log("Error: valor negativo");
        return -1;
    }  
}

function mostrarPresupuesto() {
    // TODO
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion,valor, fecha = Date.now(), ...etiquetas) {
    // TODO
    this.fecha = new Date();
    this.etiquetas = [...etiquetas];
    this.descripcion = descripcion;

    if ((valor >= 0 && typeof valor === 'number')) 
    {
       this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }
    
    if (typeof fecha === 'string' && !isNaN(Date.parse(fecha)))
    {
        this.fecha = Date.parse(fecha);
    }  
    else 
    {
        this.fecha = Date.now();
    }  

    //Metodos
    this.mostrarGasto = function() {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },

    this.actualizarDescripcion = function(nuevaDescripcion) {
        if(typeof nuevaDescripcion === 'string')
        {
            this.descripcion = nuevaDescripcion;
        }      
    },

    this.actualizarValor = function(nuevoValor) {    
        if(nuevoValor >= 0 && typeof nuevoValor === 'number')
        {
            this.valor = nuevoValor;
        }     
    },

    this.mostrarGastoCompleto = function(){
       
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${this.fecha.toLocaleString()}\nEtiquetas:\n${etiquetas}`);
    
    },

    this.actualizarFecha = function(nuevaFecha){

        if (typeof nuevaFecha === 'string' && !isNaN(Date.parse(nuevaFecha)))
        {
            this.fecha = Date.parse(nuevaFecha);
        }
    },
    
    this.anyadirEtiquetas = function(nuevasEtiquetas){
        nuevasEtiquetas.forEach(element => {
            if(!this.etiquetas.includes(element))
            {
                this.etiquetas.push(element);
            }
        });
    },
    
    this.borrarEtiquetas = function(){
        //this.etiquetas = [...etiquetas];
        
    }

}
    //Funciones de gastos
    function listarGastos(){
        return gastos;
    };

    function anyadirGasto(gasto){
        gasto.id = idGasto;
        idGasto++;
        gastos.push(gasto);
    };

    function borrarGasto(id){
        let indice = gastos.findIndex(gasto => gasto.id === id);
        gastos.splice(indice,1); //Corta el array en el indice y elimina el elemento

    };

    function calcularTotalGastos(){
        let total = 0;
        gastos.forEach(gasto => {
            total += gasto.valor;
        });
        return total;
        
    };

    function calcularBalance(){
       return presupuesto - calcularTotalGastos();
        
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
    calcularBalance

}



