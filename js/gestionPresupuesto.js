// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if(valor >= 0)
    {
        presupuesto = valor;
        return presupuesto;
    }
    else
    {
        console.log("ERROR: El valor introducido es negativo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;;
}

function CrearGasto(descGasto, valor, fec = Date.now(), ...etiquetas) {

    
    if((typeof fec === 'string') && (!isNaN(Date.parse(fec)))){
        this.fecha = Date.parse(fec);
    }
    else{
        this.fecha = Date.now();
    }

    if(valor >= 0){
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    


    this.descripcion = descGasto;
    this.etiquetas = [...etiquetas];

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;;
    }

    this.actualizarDescripcion = function(newDescripcion){
        this.descripcion = newDescripcion;
    }

    this.actualizarValor = function(newValor){
        if(newValor >= 0){
            this.valor = newValor;
        }
    }

    this.mostrarGastoCompleto = function(){
        let etiquetasText = '';

        this.etiquetas.forEach(etiqueta => {
            etiquetasText += '- ' + etiqueta + '\n'
        });

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n${etiquetasText}`;
    }

    this.actualizarFecha = function(newFecha){
        if((typeof newFecha === 'string') && (!isNaN(Date.parse(newFecha)))){
            this.fecha = Date.parse(newFecha);
        }
    }

    this.anyadirEtiquetas = function(...etiquetasAAnyadir){
        let contador = 0;

        for(let i = 0; i < etiquetasAAnyadir.length; i++){
            for(let j = 0; j < this.etiquetas.length; j++){
                if(etiquetasAAnyadir[i] === this.etiquetas[j]){
                    contador = 1;
                    break;
                }
            }

            if(contador === 0){
                this.etiquetas.push(etiquetasAAnyadir[i]);
            }

            contador = 0;
        }
    }
    
    this.borrarEtiquetas = function(...etiquetasABorrar){
        let posBorar = 0;

        for(let i = 0; i < etiquetasABorrar.length; i++){
            for(let j = 0; j < this.etiquetas.length; j++){
                if(etiquetasABorrar[i] === this.etiquetas[j]){
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

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for(let i = 0; i < gastos.length; i++){
        if(gastos[i].id == id){
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos() {
    let total = 0;

    gastos.forEach(gasto => {
        total += gasto.valor;
    });

    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    let arr = gastos.filter(function(gasto){
        let check = true;
        let checkEtiqueta = false;

        if(fechaDesde && gasto.fecha < Date.parse(fechaDesde)){
            check = false;
        }

        if(fechaHasta && gasto.fecha > Date.parse(fechaHasta)){
            check = false;
        }

        if(valorMinimo && gasto.valor < valorMinimo){
            check = false;
        }

        if(valorMaximo && gasto.valor > valorMaximo){
            check = false;
        }

        if(descripcionContiene && !(gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase()))){
            check = false;
        }

        if(etiquetasTiene){
            gasto.etiquetas.forEach(etiqueta => {
                etiquetasTiene.forEach(newEtiquetas => {
                    if(etiqueta.toLowerCase() === newEtiquetas.toLowerCase()){
                        checkEtiqueta = true;
                    } 
                });
            });
        }

        if(etiquetasTiene && !checkEtiqueta){
            check = false;
        }

        return check;
    });

    return arr;
}

function agruparGastos(periodo = "mes", etiquetas ,fechaDesde, fechaHasta){
    let gastosFiltrados = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta});
    
    let gastosAgrupados = gastosFiltrados.reduce(function(acumulador, gastoActual){

        if(typeof acumulador[gastoActual.obtenerPeriodoAgrupacion(periodo)] != 'number'){
            acumulador[gastoActual.obtenerPeriodoAgrupacion(periodo)] = 0;
        }

        acumulador[gastoActual.obtenerPeriodoAgrupacion(periodo)] += gastoActual.valor;

        return acumulador
    },{})

    return gastosAgrupados;
}

function transformarListadoEtiquetas(etiquetasTiene){
    let filtro = /\s*[,\s.:;]+\s*/;
    let arraySinSeparado = etiquetasTiene.replace(filtro, ',');
    let arraySeparado = arraySinSeparado.split(',');
    return arraySeparado;
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
    transformarListadoEtiquetas
}
