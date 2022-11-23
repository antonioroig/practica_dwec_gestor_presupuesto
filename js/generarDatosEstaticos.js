import * as gestionP from './gestionPresupuesto.js';
import * as gestionPWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), 'presupuesto');

let gasto_1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto_2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto_3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto_4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto_5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto_6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto_1);
gestionPresupuesto.anyadirGasto(gasto_2);
gestionPresupuesto.anyadirGasto(gasto_3);
gestionPresupuesto.anyadirGasto(gasto_4);
gestionPresupuesto.anyadirGasto(gasto_5);
gestionPresupuesto.anyadirGasto(gasto_6);

gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), "gastos-totales");
gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularBalance(), "balance-total");


