import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';
"use strict";

gestionPresupuesto.actualizarPresupuesto(1500);

let mostrar = gestionPresupuesto.mostrarPresupuesto();

gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',mostrar);

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

let totalGasto = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",totalGasto);

let balance = gestionPresupuesto.calcularBalance()
gestionPresupuestoWeb.mostrarDatoEnId("balance-total",balance);

let listaGastos = gestionPresupuesto.listarGastos();
for (let gastos of listaGastos)
{
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',gastos);
}

let filtrado1 = gestionPresupuesto.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'});
for (let gastos of filtrado1)
{
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gastos);
}

let filtrado2 = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
for (let gastos of filtrado2)
{
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',gastos);
}

let filtrado3 = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for (let gastos of filtrado3)
{
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3',gastos);
}

let filtrado4 = gestionPresupuesto.filtrarGastos({valorMaximo:50, etiquetasTiene: ["comida","transporte"]});
for (let gastos of filtrado4)
{
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4',gastos);
}

let agrupGastos = gestionPresupuesto.agruparGastos('dia');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', agrupGastos, 'día');
