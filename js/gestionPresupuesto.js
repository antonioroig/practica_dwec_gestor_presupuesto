// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (valor >= 0 && typeof valor === 'number')
    {
        presupuesto = valor;
        return presupuesto
    }
    else {
        console.log("El valor debe ser mayor o igual a 0");
        return -1;
    }
    // TODO
}

function listarGastos() {
    return gastos;
}



function mostrarPresupuesto() {
    return ("Tu presupuesto actual es de " + presupuesto + " €")
    // TODO
}



function CrearGasto(descripcion, valor ,fecha = Date.now(), ...etiquetas) {
    this.fecha = new Date();
    this.etiquetas = [...etiquetas];
    this.descripcion = descripcion;
   
    if (valor <= 0 || typeof valor !== 'number')
    {
        valor = 0;
    }

    this.valor = valor;

    
    if (typeof fecha === 'string' && !isNaN(Date.parse(fecha))){
    this.fecha = Date.parse(fecha)
    }
    else{
        this.fecha = Date.now();
    }

    this.mostrarGasto = function mostrarGasto () {
        return ("Gasto correspondiente a " + descripcion + " con valor " + this.valor + " €")
    }
    
    
    this.actualizarDescripcion = function actualizarDescripcion(nuevadescripcion)
    {
        if (typeof nuevadescripcion === 'string')
        {
            this.descripcion = nuevadescripcion;
        }
    }
    this.actualizarValor = function actualizarValor(valornuevo)
    {
        if (valornuevo >= 0 && typeof valornuevo === 'number')
        {
            this.valor = valornuevo;
        }
    }

    this.actualizarFecha = function(nuevaFecha) {
        if (typeof nuevaFecha === 'string' && !isNaN(Date.parse(nuevaFecha)))
    {
    this.fecha = Date.parse(nuevaFecha)
    }
    }

    this.anyadirEtiquetas = function (...nuevasEtiquetas)
    {
        nuevasEtiquetas.forEach(element => {
            if (!this.etiquetas.includes(element))
            {
                this.etiquetas.push(element)
            }
            
        });
    }

    this.borrarEtiquetas = function (...etiquetasABorrar)
    {
        etiquetasABorrar.forEach(element => {
            if (this.etiquetas.includes(element))
            {
                this.etiquetas.splice(this.etiquetas.indexOf(element),1)
                }
        })
    }

    this.mostrarGastoCompleto = function()
    {
        let showScreen = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n`;
        for(let i = 0; i < this.etiquetas.length; i++){
            showScreen += "- " + this.etiquetas[i]+'\n';
        }
        return showScreen;
    }

    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fecha = new Date(this.fecha);
        if (periodo == 'dia')
        { return fecha.toISOString().substring(0, 10) }
        if (periodo == 'mes')
        { return fecha.toISOString().substring(0, 7) }
        if (periodo == 'anyo')
        { return fecha.toISOString().substring(0, 4) }
    }
    // TODO   
    //comentario para que se activen los test en github
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
};

function borrarGasto(id) {
    let indice = gastos.findIndex(gasto => gasto.id === id);
    gastos.splice(indice, 1);
}

function calcularBalance() {
    return (presupuesto-calcularTotalGastos())

}

function calcularTotalGastos() {
    let total = 0;
    gastos.forEach(gasto => {
        total += gasto.valor;
    });
    return total;
}

function filtrarGastos(objeto)
{
    if (objeto != undefined && objeto != null)
    {
        let arrayfiltrado = gastos.filter(gasto => {
            if(objeto.hasOwnProperty("fechaDesde"))
            {
                if (gasto.fecha < Date.parse(objeto.fechaDesde)) {
                    return;
                }
            }
            if (objeto.hasOwnProperty('fechaHasta'))
            {
                if (gasto.fecha > Date.parse(objeto.fechaHasta))
                {
                    return;
                }
            }
            if (objeto.hasOwnProperty('valorMinimo'))
            {
                if (gasto.valor < objeto.valorMinimo)
                {
                    return;
                }            
            }
            if (objeto.hasOwnProperty('valorMaximo'))
            {
                if (gasto.valor > objeto.valorMaximo)
                {
                        return;
                }
            }
            if (objeto.hasOwnProperty('descripcionContiene'))
            { 
                if (!gasto.descripcion.includes(objeto.descripcionContiene))
                { 
                    return;
                }
            }
            if (objeto.hasOwnProperty("etiquetasTiene")) {
                if (objeto.etiquetasTiene.length != 0) {
                    let devuelve = false;
                    for (let etiqueta of objeto.etiquetasTiene) {
                        if (gasto.etiquetas.includes(etiqueta)) {
                            devuelve = true;
                        }
                    }
                    if (!devuelve) {
                        return;
                    }
                }
            }
            
            return gasto;
        })
        if (arrayfiltrado == 0)
            {arrayfiltrado = gastos}
        return arrayfiltrado;
    }
    
}

function agruparGastos(periodo = 'mes', etiquetas = [], fechaDesde, fechaHasta = Date.now()){  
    let Filtros = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta });
    let Agrupados = Filtros.reduce((acumulador, gasto)=>{
        let periodos = gasto.obtenerPeriodoAgrupacion(periodo);
        if(acumulador[periodos] == null){
            acumulador[periodos] = gasto.valor;
        }else{
             acumulador[periodos] += gasto.valor;
            }
            return acumulador
     },{}); return Agrupados;   
    }

    function transformarListadoEtiquetas(etiquetaTiene){
        let etiquetasnuevas = etiquetaTiene.match(/[a-z0-9]+/gi);
        return etiquetasnuevas;
    };

    function cargarGastos(gastosAlmacenamiento) {
        // gastosAlmacenamiento es un array de objetos "planos"
        // No tienen acceso a los métodos creados con "CrearGasto":
        // "anyadirEtiquetas", "actualizarValor",...
        // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
      
        // Reseteamos la variable global "gastos"
        gastos = [];
        // Procesamos cada gasto del listado pasado a la función
        for (let g of gastosAlmacenamiento) {
            // Creamos un nuevo objeto mediante el constructor
            // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
            // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
            let gastoRehidratado = new CrearGasto();
            // Copiamos los datos del objeto guardado en el almacenamiento
            // al gasto rehidratado
            // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
            Object.assign(gastoRehidratado, g);
            // Ahora "gastoRehidratado" tiene las propiedades del gasto
            // almacenado y además tiene acceso a los métodos de "CrearGasto"
              
            // Añadimos el gasto rehidratado a "gastos"
            gastos.push(gastoRehidratado)
        }
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
    transformarListadoEtiquetas,
    cargarGastos
}
//actualizando
//actualizando