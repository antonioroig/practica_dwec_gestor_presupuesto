// TODO Crear las funciones, objetos y variables indicadas en el enunciado

// TODO Variable global
let presupuesto = 0;


let gastos = new Array();
let idGasto = 0; /* un contador de los gastos */

function actualizarPresupuesto(valor) {
    // TODO
    if (!isNaN(valor)){
        if(valor >= 0){
            presupuesto = valor;
            return presupuesto;
        }
        else{
            return -1;
        }
    }
    else{
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor, fecha, ... etiquetas) {
    // TODO

    if (isNaN(valor) || valor < 0){
        valor = 0;
    }

    descripcion = descripcion + '';

    this.descripcion = descripcion,
    this.valor = valor;

    /* FECHA Y ETIQUETAS COMPROBACIÓN*/
    // FECHA
    if(isNaN(Date.parse(fecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(fecha);
    }
    // ETIQUETAS
    if([...etiquetas] === undefined){
        this.etiquetas = [];
    }else{
        this.etiquetas = [...etiquetas]
    };



    // METODOS 
    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    
    this.actualizarDescripcion = function(descripcion){
        descripcion = descripcion + '';
        this.descripcion = descripcion;
    }
    this.actualizarValor = function(valor){
        if(valor >= 0){
            this.valor = valor;
        }
    };
    // * * * * * * * * * * * * * * * *
    // Actividad 2 - Métodos
    // Método 'mostrarGastoCompleto' del objeto gasto
    this.mostrarGastoCompleto = function(){
        let resp = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        resp += `Fecha: ` + (new Date (this.fecha)).toLocaleString() + `\n`;
        resp += `Etiquetas:` + `\n`;
        for (var i = 0; i < etiquetas.length; i++) {
            resp += '- ' + etiquetas[i] + `\n`;
        }
          return resp;
    };
    // Método 'actualizarFecha' del objeto gasto
    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    }
    // Método 'anyadirEtiquetas' del objeto gasto
    this.anyadirEtiquetas = function(... etiqueta){
        
        // Para comprobar valores Repetidas / Duplicadas
        let etiquetasRepetidas = false;       

        for(let i = 0; i < etiqueta.length; i++){

            for(let j = 0; j < this.etiquetas.length; j++){
                // comprobar si es repetida
                if(etiqueta[i] == this.etiquetas[j]){
                    etiquetasRepetidas = true;
                }
            }
            // Añadir si no es repetida
            if(!etiquetasRepetidas){
                this.etiquetas.push(etiqueta[i]);
            }
            etiquetasRepetidas = false;       
        }
    }
    // Método 'borrarEtiquetas' del objeto gasto
    this.borrarEtiquetas = function(... etiqueta){

        for(let i = 0; i < etiqueta.length; i++){
           for(let j = 0; j < this.etiquetas.length; j++){
               // comprobar si existe
               if(etiqueta[i] == this.etiquetas[j]){
                   this.etiquetas.splice(j,1);
                   break;
               }
           }
        }
    }
    // * * * * * * * * * * * * * * * *
    // Actividad 3 - Métodos

    // Método 'obtenerPeriodoAgrupacion' del objeto gasto --> dia (aaaa-mm-dd) /mes (aaaa-mm) /anyo (aaaa)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString - Para mi
    // toISOString --> devuelve formato ISO de la fecha
    // substring --> devuelve la cadena de chars 

    /*
    const today = new Date('05 October 2011 14:48 UTC');
    console.log(today.toISOString()); // Returns 2011-10-05T14:48:00.000Z
    */
    this.obtenerPeriodoAgrupacion = function(periodo){
        
        if (periodo != undefined)
        {
            if (periodo === 'dia')
            {
                return new Date(this.fecha).toISOString().substring(0, 10);
            }
            else if (periodo === 'mes'){
                return new Date(this.fecha).toISOString().substring(0, 7);
            }
            else if(periodo === 'anyo'){
                return new Date(this.fecha).toISOString().substring(0, 4);
            }
        }        
    }
}
    
/* - - - - - - - - - - - - - - - - */
//++++
function listarGastos(){
    return gastos;
}
//Añade el gasto que se pasa como parámetro a la variable global 'gastos'
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto += 1;
    gastos.push(gasto);
}
// Elimina de la variable global 'gastos' el gasto cuyo id se pasa como parámetro
function borrarGasto(idToDelete){

    for(let i = 0; i < gastos.length;i++){
        if(gastos[i].id == idToDelete){
            gastos.splice(i,1);
            break;
        }
    }
}
// Calcula la suma de todos los gastos presentes en la variable global 'gastos'
function calcularTotalGastos(){

    let result = 0;
    for(let i = 0; i < gastos.length; i++){
        result += gastos[i].valor;
    }
    return result;
}
// Calcula el balance (presupuesto - gastos totales) a partir de los gastos almacenados en la variable global 'gastos':
function calcularBalance (){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//Actividad 3 - Ejercicios

//function filtrarGastos
// Función de un parámetro que devolverá un subconjunto de los gastos existentes (variable global gastos). Se deberá utilizar la función filter. 
function filtrarGastos({fechaDesde, fechaHasta,valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    
    // result Gastos Filtrados
    let gastosFiltrados = gastos.filter(function(valorGasto){

            let result = true;  // salida de filter
            let EtiquetaComprobada = false; // para comprobar etiqueta
    
            fechaDesde && valorGasto.fecha < Date.parse(fechaDesde) ? result = false : valorGasto; // FECHA DESDE           
            fechaHasta && valorGasto.fecha > Date.parse(fechaHasta) ? result = false : valorGasto; // FECHA HASTA                      
            valorMinimo && valorGasto.valor < valorMinimo ? result = false : valorGasto; // VALOR MINIMO                         
            valorMaximo && valorGasto.valor > valorMaximo ? result = false : valorGasto; // VALOR MAXIMO              
            // DESCRIPCION
            (descripcionContiene && !valorGasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())) ? result = false : valorGasto;                         
            // ETIQUETAS TIENE
            if(etiquetasTiene){ 
                etiquetasTiene.forEach(et1 => {
                    valorGasto.etiquetas.forEach( et2 => { 
                        if(et2.toLowerCase() === et1.toLowerCase())
                            EtiquetaComprobada = true; 
                    })
                });
            }
            // Comprobar etiquetas 
            if(etiquetasTiene){
                if(!EtiquetaComprobada)
                    result = false;
            }

            return result; // salida
    });
                
    return gastosFiltrados;     
}
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
// Función agruparGastos de cuatro parámetros que devolverá un objeto con los resultados de realizar una agrupación por período temporal.
function agruparGastos(periodo = 'mes', etiquetas, fechaDesde, fechaHasta = Date.now()){
    
    // filtramos gastos 
    let gastosFiltrados = filtrarGastos({etiquetasTiene:etiquetas, fechaDesde:fechaDesde, fechaHasta:fechaHasta});
    
    let result = gastosFiltrados.reduce(function (prev, itemGasto){
        // Comprobar que no es un number
        if(isNaN(prev[itemGasto.obtenerPeriodoAgrupacion(periodo)]))
            prev[itemGasto.obtenerPeriodoAgrupacion(periodo)] = 0;
        // Sumar totales por mes
        prev[itemGasto.obtenerPeriodoAgrupacion(periodo)] += parseFloat(itemGasto.valor); 
        return prev;
    },{});

    return result;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/* NO MODIFICAR A PARTIR DE AQUÍ exportación de funciones y objetos creados para poder ejecutar los tests.
Las funciones y objetos deben tener los nombres que se indican en el enunciado
Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo */
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


// MIS COSAS

        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // INFORMACIÓN PARA MI - INFORMACIÓN PARA MI - INFORMACIÓN PARA MI - INFORMACIÓN PARA MI - INFORMACIÓN PARA MI 
        // filter()
        // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        //let result = условие ? значение1 : значение2;
        /* Сначала вычисляется условие: если оно истинно, тогда возвращается значение1, в противном случае – значение2. */

        // hasOwnProperty:  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty

        // Includes() - Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false.
        // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        // INFORMACIÓN PARA MI // - INFORMACIÓN PARA MI // - INFORMACIÓN PARA MI // - INFORMACIÓN PARA MI // - INFORMACIÓN PARA MI //
        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#:~:text=undefined%20.-,%D0%9E%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5,%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B5%20%D0%B8%20%D0%B8%D0%BC%D0%B5%D1%8E%D1%82%20%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20undefined%20.            
        // Метод forEach() выполняет указанную функцию один раз для каждого элемента в массиве. valor => operacion