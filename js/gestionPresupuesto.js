// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

const opciones = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minutes: 'numeric', seconds: 'numeric' };
function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        return -1
    }
}

function mostrarPresupuesto() {
    // TODO
    return ('Tu presupuesto actual es de ' + presupuesto + ' €');
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    this.valor = 0;

    this.etiquetas = etiquetas;

    if (isNaN(Date.parse(fecha))) {
        this.fecha = Date.now();
    } else {
        this.fecha = Date.parse(fecha);
    }

    if (etiquetas != null) {
        this.etiquetas = etiquetas;
    }
    if (valor >= 0) {
        this.valor = valor;
    }

    this.mostrarGasto = function () {
        return ('Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €');
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
        return this.descripcion;
    }

    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
        return this.valor;
    }
    this.actualizarFecha = function (fecha) {
        if (!isNaN(Date.parse(fecha))) {
            this.fecha = Date.parse(fecha);
        }
    }
    this.mostrarGastoCompleto = function () {

        let gasto = 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €.\n';
        gasto += 'Fecha: ' + new Date(this.fecha).toLocaleString() + '\n' + 'Etiquetas:\n';
        this.etiquetas.forEach(element => {
            gasto += "- " + element + "\n";
        });
        return gasto;
    }
    this.anyadirEtiquetas = function (...arrayEtiq) {
       arrayEtiq.forEach(element => {
       if(!this.etiquetas.includes(element,0))
       {
        this.etiquetas.push(element);
       }
    });
    }

    this.borrarEtiquetas = function (...arrayEtiq) {
        let x, y;
        for (let i = 0; i < arrayEtiq.length; i++) {

            y = arrayEtiq[i];

            for (let j = this.etiquetas.length; j >= 0; j--) {

                x = this.etiquetas[j]

                if (x === y) {
                    this.etiquetas.splice(j, 1);
                }
            }
        }
    };
    this.obtenerPeriodoAgrupacion = function (periodo) {
            let texto="";
            let nuevaFecha = new Date(this.fecha);
            let mes= (nuevaFecha.getMonth()+1);
            let dia= nuevaFecha.getDate();
            if(dia<10 )
            {
                dia = "0"+nuevaFecha.getDate().toString();
            }
            if(mes<10)
            {
                mes = "0"+(nuevaFecha.getMonth()+1);
            }
            if(periodo === "anyo")
        {
            texto =nuevaFecha.getFullYear().toString();
        }else if(periodo === "mes")
        {
            texto =nuevaFecha.getFullYear().toString()+ "-"+ mes;
        }else if(periodo === "dia")
        {
            texto =nuevaFecha.getFullYear().toString()+ "-"+ mes + "-"+ dia;
        }
        return texto;
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
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id == id) {
            gastos.splice(i, 1);
        }
    }
}
function calcularTotalGastos() {
    let gastoTotal = 0;
    gastos.forEach(element => {
        gastoTotal += element.valor;
    });
    return gastoTotal;
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos({fechaDesde, fechaHasta, valorMaximo, valorMinimo, descripcionContiene, etiquetasTiene}){
    let filtrados = gastos.filter(function (gasto){
            let ok = true;
            if(fechaDesde && Date.parse(fechaDesde) > gasto.fecha){
                ok=false;
            }
            if(fechaHasta && Date.parse(fechaHasta)< gasto.fecha){
                ok=false;
            }
            if(valorMaximo &&valorMaximo < gasto.valor){
                ok=false;
            }
            if(valorMinimo && valorMinimo > gasto.valor){
                ok=false;
            }
            if(descripcionContiene && !gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())){
                ok=false;
            }
            if(etiquetasTiene){
                let etiquitasIdenticas = false;
                etiquetasTiene.forEach(etiqueta1 => {
                    gasto.etiquetas.forEach(etiqueta2 => {
                        if( etiqueta1.toLowerCase()===etiqueta2.toLowerCase())
                        {
                            etiquitasIdenticas = true;
                        }
                    })
                })
                if(!etiquitasIdenticas && etiquetasTiene)
                {
                    ok=false;
                }
            }

            return ok;
    });
    if(filtrados.length == 0)
    {
        filtrados = gastos;
    }
   return filtrados;
}
function agruparGastos(periodo = `mes`, etiquetas, fechaDesde, fechaHasta){
    let obj = {
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        etiquetasTiene: etiquetas
    }
let filtro = filtrarGastos(obj)

let reducido = filtro.reduce(function(acomulador, item){
    if(typeof acomulador[item.obtenerPeriodoAgrupacion(periodo)]!= "number"){
        acomulador[item.obtenerPeriodoAgrupacion(periodo)] = 0;
    }
    acomulador[item.obtenerPeriodoAgrupacion(periodo)] += item.valor;
    return acomulador;
},{})
return reducido;
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    
    CrearGasto,
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
