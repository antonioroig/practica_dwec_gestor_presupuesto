import * as presupuesto from './gestionPresupuesto.js';
import * as web from './gestionPresupuestoWeb.js';
"use strict";
presupuesto.actualizarPresupuesto(1500);

let valor = presupuesto.mostrarPresupuesto();
web.mostrarDatoEnId(valor,'presupuesto');

let gasto1=presupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2=presupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3=presupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4=presupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5=presupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6=presupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

presupuesto.anyadirGasto(gasto1);
presupuesto.anyadirGasto(gasto2);
presupuesto.anyadirGasto(gasto3);
presupuesto.anyadirGasto(gasto4);
presupuesto.anyadirGasto(gasto5);
presupuesto.anyadirGasto(gasto6);

let gastos_totales = presupuesto.calcularTotalGastos();
web.mostrarDatoEnId(gastos_totales,'gastos-totales');

let balance_total = presupuesto.calcularBalance();
web.mostrarDatoEnId(balance_total,'balance-total');

let listado_gastos = presupuesto.listarGastos();
for(let gasto of listado_gastos)
{
    web.mostrarGastoWeb('listado-gastos-completo',gasto);
}

let gastos_septiembre = presupuesto.filtrarGastos({fechaHasta:"2021-09-30",fechaDesde:"2021-09-01"});
for(let gasto of gastos_septiembre)
{
    web.mostrarGastoWeb('listado-gastos-filtrado-1',gasto);
}

let gasto_filtrado2 = presupuesto.filtrarGastos({valorMinimo: 50})
for(let gasto of gasto_filtrado2)
{
    web.mostrarGastoWeb('listado-gastos-filtrado-2',gasto);
}
let gasto_filtrado3 = presupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ['seguros']})
for(let gasto of gasto_filtrado3)
{
    web.mostrarGastoWeb('listado-gastos-filtrado-3',gasto);
}
let gasto_filtrado4 = presupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida','transporte']})
for(let gasto of gasto_filtrado4)
{
    web.mostrarGastoWeb('listado-gastos-filtrado-4',gasto);
}