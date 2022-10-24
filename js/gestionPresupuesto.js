// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (nuevoPresupuesto >= 0)
    {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    }else
    {
        console.log('el valor es inferior a 0');
        return -1;
    }
}

function mostrarPresupuesto() {
    return ('Tu presupuesto actual es de ' + presupuesto + ' €');
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion=descripcion;

    this.valor=0;

    if(isNaN(Date.parse(fecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(fecha);
    }
    
    this.etiquetas=etiquetas;

    if(valor >= 0){
        this.valor=valor;
    };

    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ` + this.descripcion + ` con valor ` + this.valor + ` €`);
    }

    this.mostrarGastoCompleto = function(){
        var texto =`Gasto correspondiente a ` + this.descripcion + ` con valor ` + this.valor + ` €.\n`
        texto += (`Fecha: `+ new Date(this.fecha).toLocaleString() + `\nEtiquetas:\n`)
        
        this.etiquetas.forEach(etiqueta => 
            texto += `- ` + etiqueta + `\n`
        );
        return texto;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        if (nuevoValor > 0)
        {
            this.valor = nuevoValor;
        }
    }

    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function(...arrEtiq){
        //this.etiquetas = [...this.etiquetas,...arrEtiq];
        this.etiquetas = this.etiquetas.concat(this.etiquetas,arrEtiq)
        this.etiquetas = Array.from(new Set(this.etiquetas));
    }   

    this.borrarEtiquetas = function(...arrEtiq){
        arrEtiq.forEach(etiqueta =>
            {
                if(this.etiquetas.includes(etiqueta,0)){
                    this.etiquetas.splice(this.etiquetas.indexOf(etiqueta,0),1)
                }
            })
    }

    this.obtenerPeriodoAgrupacion = function(periodo){

        let fecha = new Date(this.fecha)
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anyo = fecha.getFullYear();
        let result = "";
        if(periodo == 'anyo'){
            result += anyo.toString();
        }
        if(periodo == 'mes'){
            if(mes >= 10){
                result += anyo + "-" + mes
            }else{
                result += anyo + "-0" + mes
            }
        }
        if(periodo == 'dia'){
            if(mes >= 10 && dia >= 10){
                result += anyo + "-" + mes + "-" + dia
            }else if(mes < 10 && dia >= 10){
                result += anyo + "-0" + mes + "-" + dia
            }else if(mes >= 10 && dia < 10){
                result += anyo + "-" + mes + "-0" + dia
            }else if(mes < 10 && dia < 10){
                result += anyo + "-0" + mes + "-0" + dia
            }
        }
        return result;
    }
}


function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){

    for(let i =0; i<gastos.length; i++){
        if(gastos[i].id == id){
            gastos.splice(i,1);
        }
    }

}
function calcularTotalGastos(){
    let total = 0;

    gastos.forEach(gasto =>{
        total += gasto.valor;
    })

    return total;
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(objeto){
    //{fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene,...etiquetasTiene}
    if(Object.entries(objeto).length === 0){
        return gastos;
    }else{
        let fecDes = null;
        if(objeto.hasOwnProperty(`fechaDesde`)){
            if(!isNaN(Date.parse(objeto.fechaDesde))){
                fecDes=objeto.fechaDesde;
            }
        }
        let fecHas = null;
        if(objeto.hasOwnProperty(`fechaHasta`)){
            if(!isNaN(Date.parse(objeto.fechaHasta))){
                fecHas=objeto.fechaHasta;
            }
        }
        let valMin = null;
        let results = gastos.filter(function(item){
            if(new Date(fecDes) < new Date(item.fecha) && fecDes != null){
                return true;
            }
            if(new Date(fecHas) > new Date(item.fecha) && fecHas != null){
                return true;
            }
            if(objeto.valorMinimo < item.valor){
                return true;
            }
            if(objeto.hasOwnProperty(`valorMaximo`)){
                if(objeto.valorMaximo < item.valor){
                    return true;
                }
            }
            if(objeto.hasOwnProperty(`descripcionContiene`)){
                if(item.descripcion.includes(objeto.descripcionContiene)){
                    return true;
                }
            }
            if(objeto.hasOwnProperty(`etiquetasTiene`)){
                if(objeto.etiquetas.filter()){
                    return true;
                }
            }
        });
    
        return results;
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
