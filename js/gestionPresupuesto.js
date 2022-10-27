// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0){
        presupuesto = valor;
        return presupuesto;
    }
    else{
        console.log('El valor introducido es negativo');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;;
}

function CrearGasto(descripcionGasto, valorGasto, fecha = Date.now(), ...etiquetas) {
    // TODO
    this.descripcion = descripcionGasto;
    this.etiquetas = [...etiquetas];
    if(valorGasto >= 0){
        this.valor = valorGasto;
    }
    else{
        this.valor = 0;
    }
    if((!isNaN(Date.parse(fecha))) && typeof fecha === 'string'){   
        this.fecha = Date.parse(fecha);
    }
    else{
        this.fecha = Date.now();
    }

    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }
    this.actualizarDescripcion = function(nuevadesc){
        this.descripcion = nuevadesc;
    }
    this.actualizarValor = function(nuevovalor){
        if(nuevovalor >= 0){
            this.valor = nuevovalor;
        }
    }
    this.mostrarGastoCompleto = function(){
        let gasto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        gasto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        gasto += `Etiquetas:\n`;
        this.etiquetas.forEach(etiqueta => {
            gasto += `- ${etiqueta}\n`;
        })
        return gasto;
    }
    this.actualizarFecha = function(fecha){
        if((!isNaN(Date.parse(fecha))) && typeof fecha === 'string'){
            this.fecha = Date.parse(fecha);
        }
    }
    this.anyadirEtiquetas = function(...etiquetasNuevas){
        let repetido = 0;
        for(let i = 0; i < etiquetasNuevas.length; i++){
            for(let j = 0; j < this.etiquetas.length; j++){
                if(etiquetasNuevas[i] === this.etiquetas[j]){
                    repetido = 1;
                    break;
                }
            }
            if(repetido === 0){
                this.etiquetas.push(etiquetasNuevas[i]);
            }
            repetido = 0;
        }
    }
    this.borrarEtiquetas = function(...etiquetasAEliminar){
        for(let i = 0; i < etiquetasAEliminar.length; i++){
            for(let j = 0; j < this.etiquetas.length; j++){
                if(etiquetasAEliminar[i] === this.etiquetas[j]){
                    this.etiquetas.splice(j, 1); 
                    break;
                }
            }
        }
    }
    this.obtenerPeriodoAgrupacion = function(periodo){
        let agrupacion = "";
        let fecha = new Date(this.fecha);
        if(periodo === 'dia'){
            agrupacion += fecha.getFullYear() + "-";
            if((fecha.getMonth() + 1) < 10){
                agrupacion += "0" + (fecha.getMonth() + 1) + "-";
            }
            else{
                agrupacion += (fecha.getMonth() + 1) + "-";
            }
            if(fecha.getDate() < 10){
                agrupacion += "0" + fecha.getDate();
            }
            else{
                agrupacion += fecha.getDate();
            }
        }
        if(periodo === 'mes'){
            agrupacion += fecha.getFullYear() + "-";
            if((fecha.getMonth() + 1) < 10){
                agrupacion += "0" + (fecha.getMonth() + 1);
            }
            else{
                agrupacion += (fecha.getMonth() + 1);
            }
        }
        if(periodo === 'anyo'){
            agrupacion += fecha.getFullYear();
        }
        return agrupacion;
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
    for(let i = 0; i < gastos.length; i++){
        if(gastos[i].id == id){
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
function filtrarGastos({fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene,etiquetasTiene}){
    let aceptar = true;
    let arrayFilter= gastos.filter(function(gasto){
            if(fechaDesde && gasto.fecha < Date.parse(fechaDesde)){
                aceptar = false;
            }
            if(fechaHasta && gasto.fecha > Date.parse(fechaHasta)){
                aceptar = false;
            }
            if(valorMaximo && gasto.valor > valorMaximo){
                aceptar = false;
            }
            if(valorMinimo && gasto.valor < valorMinimo){
                aceptar = false;
            }
            if(descripcionContiene && !(gasto.descripcion.toLowerCase() === descripcionContiene.toLowerCase())){
                aceptar = false;
            }
            let coincide = false;
            if(etiquetasTiene){
                for(let i = 0; i < gastos.length; i++){ // Recorre el array Gastos
                    for(let j = 0; j < gastos[i].etiquetas.length; j++){ // Recorre las etiquetas de cada gasto
                        for(let k = 0; k < etiquetasTiene.length; k++){ // Recorre las etiquetas del objeto pasado como parámetro
                            if(gastos[i].etiquetas[j].toLowerCase() === etiquetasTiene[k].toLowerCase()){
                                encontrado=true;
                            }
                        }
                    }
                }
            }
            if(etiquetasTiene && encontrado == 0){
                aceptar=false;
            }
            return aceptar;
        });
    return arrayFilter;
}
function agruparGastos(periodo = new Date.getMonth(), fechaDesde, fechaHasta, ...etiquetas){
   

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
