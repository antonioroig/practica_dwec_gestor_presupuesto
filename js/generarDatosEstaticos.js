'use strict';

import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

gestionPresupuesto.actualizarPresupuesto(1500);
export let DEVpresupuesto = gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());

let gas1 = new gestionPresupuesto.CrearGasto ("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gas2 = new gestionPresupuesto.CrearGasto ("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gas3 = new gestionPresupuesto.CrearGasto ("Bonobús", 18.60, "2020-05-26", "transporte");
let gas4 = new gestionPresupuesto.CrearGasto ("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gas5 = new gestionPresupuesto.CrearGasto ("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gas6 = new gestionPresupuesto.CrearGasto ("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gas1);
gestionPresupuesto.anyadirGasto(gas2);
gestionPresupuesto.anyadirGasto(gas3);
gestionPresupuesto.anyadirGasto(gas4);
gestionPresupuesto.anyadirGasto(gas5);
gestionPresupuesto.anyadirGasto(gas6);

export let Devgastostotales = gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales',gestionPresupuesto.calcularTotalGastos());

export let Devbalancetotal = gestionPresupuestoWeb.mostrarDatoEnId('balance-total',gestionPresupuesto.calcularBalance());

export let DEVlistadegastos = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',gestionPresupuesto.listarGastos());

export let DEVfiltradogastos = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}));

export let DEVfiltradogastos2 = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',gestionPresupuesto.filtrarGastos({valorMinimo: 50}));

export let DEVfiltradogastos3 = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}));

export let DEVfiltradogastos4 = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4',gestionPresupuesto.filtrarGastos({valorMaximo: 50,etiquetasTiene: ["comida", "transporte"]}));

export let DEVagrupadogastosDIA = gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gestionPresupuesto.agruparGastos({periodo: "dia"}),"día");

export let DEVagrupadogastosMES = gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',gestionPresupuesto.agruparGastos({periodo: "mes"}),"mes");

export let DEVagrupadogastosANYO = gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',gestionPresupuesto.agruparGastos({periodo: "anyo"}), "año");




