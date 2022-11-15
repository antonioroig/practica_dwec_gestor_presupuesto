import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';
"use strict";
gestionPresupuesto.actualizarPresupuesto(1500);

let mostrar = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto",mostrar);

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastosTotales);

let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total",balanceTotal);

let listadoGastos = gestionPresupuesto.listarGastos();
listadoGastos.forEach(element => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo",element);
});

let gastosFiltrados = gestionPresupuesto.filtrarGastos({fechaDesde:"2021-09", fechaHasta:"2021-09"});
gastosFiltrados.forEach(element =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrados1",element);
})

let gastosFiltrados2 = gestionPresupuesto.filtrarGastos({valorMinimo:50});
gastosFiltrados2.forEach(element =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrados2",element);
})

let gastosFiltrados3 = gestionPresupuesto.filtrarGastos({etiquetasTiene: ["seguros"], valorMinimo:200});
gastosFiltrados3.forEach(element =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrados3",element);
})

let gastosFiltrados4 = gestionPresupuesto.filtrarGastos({etiquetasTiene: ["comida", "transporte"], valorMaximo:50});
gastosFiltrados4.forEach(element =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrados4",element);
})


let gastosAgrupados = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gastosAgrupados);

let gastosAgrupados2 = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gastosAgrupados2);

let gastosAgrupados3 = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gastosAgrupados3);