import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());

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

let gastostotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales',gastostotales);

let balancetotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total',balancetotal);

let listadegastos = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',listadegastos);

let filtradogastos = gestionPresupuesto.filtrarGastos('09-2021');
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',filtradogastos);

let filtradogastos2 = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',filtradogastos2);

let filtradogastos3 = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ['comida']});
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3',filtradogastos3);

let filtradogastos4 = gestionPresupuesto.filtrarGastos({valorMaximo: 50,etiquetasTiene: ['comida', 'transporte']});
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',filtradogastos4);





