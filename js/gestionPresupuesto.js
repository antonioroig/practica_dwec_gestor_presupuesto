// TODO: Crear las funciones, objetos y variables indicadas en el enunciado  

// TODO: Variable global

let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(parameter1) {
    // TODO
    if (typeof(parameter1) === 'number' && parameter1 >= 0) {
        return presupuesto = parameter1;
    } else {
        console.log( 'ERROR' );
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(descripcion1, valor1, fecha1 = Date.now(), ...etiqueta1) {
    // TODO    
    this.descripcion = descripcion1;
    this.valor;
    this.fecha;
    this.etiquetas;


    if (typeof(valor1) === 'number' && valor1 >= 0) {
        this.valor = valor1;
    } else {
        this.valor = 0;
    };


    if (etiqueta1 === undefined) {
        this.etiquetas = new Array();
    } else {
        this.etiquetas = [...etiqueta1];
    };


    if (Date.parse(fecha1)) {
        this.fecha =  Date.parse(fecha1);
    } else {
        this.fecha = Date.now();
    };


    this.mostrarGasto = function () {
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €'
    };


    this.actualizarDescripcion = function (descripcion1) {
        this.descripcion = descripcion1;
    };


    this.actualizarValor =  function (valor1) {
        if (typeof(valor1) === 'number' && valor1 >= 0)
            this.valor = valor1;
    };    


    this.actualizarFecha =  function (fecha1) {
        if (Date.parse(fecha1)) 
            this.fecha = Date.parse(fecha1);
    }; 


    this.anyadirEtiquetas =  function (...newetiquetas) {
        this.etiquetas = [...this.etiquetas, ...newetiquetas]
        let seteado = new Set(this.etiquetas);
        this.etiquetas = Array.from(seteado);
    };


    this.borrarEtiquetas =  function (...newetiquetas) {
        for (let i = 0; i < this.etiquetas.length; i++) {
            for (let j = 0; j < newetiquetas.length; j++) {
                if (this.etiquetas[i] === newetiquetas[j]) {
                    this.etiquetas.splice(i, 1);
                    i--;
                }
            }
        }
    };

    this.mostrarGastoCompleto = function () {
        let fecha1 = new Date (this.fecha);
        let texto = 
        'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €.' + '\n' +
        'Fecha: ' + fecha1.toLocaleString() + '\n' + 
        'Etiquetas:' + '\n';
        for (let i = 0; i < this.etiquetas.length; i++) {
            texto += '- ' + this.etiquetas[i] + '\n';
        }
        return texto;
    };
    /*
    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fecha1 = new Date (this.fecha);
        let fechaMostrar = fecha1.getFullYear().toLocaleString();
        if (periodo === 'anyo') {
            return fechaMostrar;
        } else if (periodo === 'mes') {
            fechaMostrar += '-';
            if (fecha1.getMonth() + 1 < 10) {
                fechaMostrar += '0';
            }
            return fechaMostrar += fecha1.getMonth() + 1;
        } else if (periodo === 'dia') {
            fechaMostrar += '-';
            if (fecha1.getMonth() + 1 < 10) {
                fechaMostrar += '0';
            }
            fechaMostrar += fecha1.getMonth() + 1 + '-';
            if (fecha1.getDate() < 10) {
                fechaMostrar += '0';
            }
            return fechaMostrar += fecha1.getDate();
        }
    }
    */
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


function listarGastos() {
    return gastos;
}


function anyadirGasto(ObjGasto) {
    ObjGasto.id = idGasto;
    idGasto++;
    gastos.push(ObjGasto);
}


function borrarGasto(idBorrar) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === idBorrar) {
            gastos.splice(i, 1);
        }
    }
}


function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    };
    total = total.toFixed(2);
    total = Number(total);
    return total;
}


function calcularBalance() {
    let res = presupuesto - calcularTotalGastos();
    res = res.toFixed(2);
    res = Number(res);
    return res;
}

function filtrarGastos({fechaDesde,
fechaHasta,
valorMinimo,
valorMaximo,
descripcionContiene,
etiquetasTiene}) {  

    let arrayFiltrado = gastos.filter(function(ObjGasto) {

        let anyadir = true;

        if (fechaDesde && fechaDesde != "") {         
            if (Date.parse(fechaDesde)) {
                let fechaPass = new Date (fechaDesde);
                let fechaVal = new Date (ObjGasto.fecha);
                if (fechaVal < fechaPass) {
                    anyadir = false;
                }
            } else {
                anyadir = false;
            }                 
        }
        
        if (fechaHasta && fechaHasta != "") {
            if (Date.parse(fechaHasta)) {
                let fechaPass = new Date (fechaHasta);
                let fechaVal = new Date (ObjGasto.fecha);
                if (fechaVal > fechaPass) {
                    anyadir = false;
                }
            } else {
                anyadir = false;
            }
        }

        if (valorMinimo && valorMinimo != "") {
            if (ObjGasto.valor < valorMinimo) {
                anyadir = false
            }
        }

        if (valorMaximo && valorMaximo != "") {
            if (ObjGasto.valor > valorMaximo) {
                anyadir = false
            }
        }

        if (descripcionContiene && descripcionContiene != "") {
            let Objdes = ObjGasto.descripcion.toLowerCase();
            let desCon = descripcionContiene.toLowerCase();
            if (!Objdes.includes(desCon)) {
                anyadir = false;
            } 
        }

        if (etiquetasTiene && etiquetasTiene != "") {
            let val = 0;
            for (let i = 0; i < ObjGasto.etiquetas.length; i++) {
                let etiObj = ObjGasto.etiquetas[i].toLowerCase();
                for (let j = 0; j < etiquetasTiene.length; j ++) {
                    let etisVal = etiquetasTiene[j].toLowerCase();
                    if (etisVal === etiObj) {
                        val++;
                    }
                }
            }
            if (val == 0) {
                anyadir = false;
            }

        }

        return anyadir;
    });

    return arrayFiltrado;
    
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let afiltrar = {
        fechaDesde:fechaDesde,
        fechaHasta:fechaHasta,
        etiquetasTiene:etiquetas,
    }

    let filtrado = filtrarGastos(afiltrar);

    return filtrado.reduce(function(acc, actual) {
        if (typeof acc[actual.obtenerPeriodoAgrupacion(periodo)] != 'number') {
            acc[actual.obtenerPeriodoAgrupacion(periodo)] = 0;
        }

        acc[actual.obtenerPeriodoAgrupacion(periodo)] += actual.valor;

        return acc;
    },{});
}

function transformarListadoEtiquetas(etiquetas) {
    let array = etiquetas.split(/\s*[~,.:;\s]+\s*/);
    return array;
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
