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
            if(objeto.hasOwnProperty("fechaDesde") && typeof objeto.fechaDesde !== "undefined")
            {
                if (gasto.fecha < Date.parse(objeto.fechaDesde)) {
                    return;
                }
            }
            if (objeto.hasOwnProperty('fechaHasta') && typeof objeto.fechaHasta !== 'undefined')
            {
                if (gasto.fecha > Date.parse(objeto.fechaHasta))
                {
                    return;
                }
            }
            if (objeto.hasOwnProperty('valorMinimo') && typeof objeto.valorMinimo !== 'undefined')
            {
                if (gasto.valor < objeto.valorMinimo)
                {
                    return;
                }            
            }
            if (objeto.hasOwnProperty('valorMaximo') && typeof objeto.valorMaximo !== 'undefined')
            {
                if (gasto.valor > objeto.valorMaximo)
                {
                        return;
                }
            }
            if (objeto.hasOwnProperty('descripcionContiene') && typeof objeto.descripcionContiene !== 'undefined')
            { 
                if (!gasto.descripcion.includes(objeto.descripcionContiene))
                { 
                    return;
                }
            }
            
            return gasto;
        })
        if (arrayfiltrado == 0)
            {arrayfiltrado = gastos}
        return arrayfiltrado;
    }
    
}

function agruparGastos()
{}

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
//actualizando