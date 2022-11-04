import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

gestionPresupuesto.actualizarPresupuesto(1500);

let mostrar = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto",mostrar);

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionpresupuesto.anyadirGasto(gasto1, gasto2, gasto3, gasto4, gasto5, gasto6);

let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastosTotales);

let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total",balanceTotal);

let listadoGastos = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo",listadoGastos);