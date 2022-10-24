// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if(typeof nuevoPresupuesto==='number' && nuevoPresupuesto>=0){
        presupuesto=nuevoPresupuesto;
        return presupuesto;
    }else{
        console.log("ERROR: presupuesto erroneo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}


function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    
    this.etiquetas=etiquetas;
    
    this.fecha = Date.parse(fecha);
    
    if(typeof valor==='number' && valor>=0){
        this.valor=valor;
    }else{
        this.valor=0;
    }
  
    if(isNaN(this.fecha)){
      this.fecha = Date.now();
    }

    this.actualizarFecha = function(fecha){

        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
          }
    }
    
    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.mostrarGastoCompleto = function(){
        var texto = "Gasto correspondiente a "+this.descripcion+" con valor "+ this.valor;
        texto+= " €.\nFecha: "+ new Date(this.fecha).toLocaleString()+"\nEtiquetas:\n";
        this.etiquetas.forEach(etiqueta=>{
            texto+="- "+etiqueta+"\n";
        });

        return texto;
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor){
        if(typeof valor==='number' && valor>=0){
            this.valor = valor;
        }
    }

    this.anyadirEtiquetas = function(...etiquetas){
        etiquetas.forEach(etiqueta => {
            if(!this.etiquetas.includes(etiqueta)){
                this.etiquetas.push(etiqueta);
            }
        });
    }

    this.borrarEtiquetas = function(...etiquetas){
        etiquetas.forEach(etiqueta => {
            let index = this.etiquetas.indexOf(etiqueta);
            if(index !== -1){
                this.etiquetas.splice(index, 1);
            }
        });
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let devolver = new Date(this.fecha).getFullYear();
        if(periodo==="anyo"){
            return devolver;
        }
        devolver+="-";
        if(new Date(this.fecha).getMonth()+1<10){
            devolver+="0";
        }
        devolver+=new Date(this.fecha).getMonth()+1;
        if(periodo==="mes"){
            return devolver;
        }
        devolver+="-";
        if(new Date(this.fecha).getDate()<10){
            devolver+="0";
        }
        devolver+=new Date(this.fecha).getDate();
        if(periodo==="dia"){
            return devolver;
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

function borrarGasto(idGasto){
    for(let i=0; i<gastos.length; i++){
        if(gastos[i].id == idGasto){
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos(){
    var total = 0;
    gastos.forEach(gasto => {
        total += gasto.valor;
    });
    return total;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}


function filtrarGastos({fechaDesde, fechaHasta, valorMaximo, valorMinimo, descripcionContiene}){
    if(Object.entries(gastoNuevo).length===0){
        return gastos;
    }else{
        if(isNaN(Date.parse(fechaDesde))){
            fechaDesde=null;
        }
        if(isNaN(Date.parse(fechaHasta))){
            fechaHasta = null;
        }
        let gastosCorrectos = gastos.filter(function (gasto){
            let esCorrecto = true;
                    if(gasto.fecha < Date.parse(fechaDesde) || fechaDesde===null){
                        esCorrecto=false;
                    }
                    if(gasto.fecha > Date.parse(gastoNuevo.fechaHasta) || gastoNuevo.fechaDesde===null){
                        esCorrecto=false;
                    }
                    if(gasto.valor < gastoNuevo.valorMinimo){
                        esCorrecto=false;
                    }
                    if(gasto.valor > gastoNuevo.valorMaximo){
                        esCorrecto=false;
                    }
                    if(!gasto.descripcion.includes(gastoNuevo.descripcionContiene)){
                        esCorrecto=false;
                    }
        
                    return esCorrecto;
        });
        return gastosCorrectos;
    }
    
}



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
