import * as gestionP from './gestionPresupuesto.js';
import * as gestionPWeb from './gestionPresupuestoWeb.js';

gestionP.actualizarPresupuesto(1500);

gestionPWeb.mostrarDatoEnId(gestionP.mostrarPresupuesto(), 'presupuesto');

let gasto_1 = new gestionP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto_2 = new gestionP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto_3 = new gestionP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto_4 = new gestionP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto_5 = new gestionP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto_6 = new gestionP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionP.anyadirGasto(gasto_1);
gestionP.anyadirGasto(gasto_2);
gestionP.anyadirGasto(gasto_3);
gestionP.anyadirGasto(gasto_4);
gestionP.anyadirGasto(gasto_5);
gestionP.anyadirGasto(gasto_6);

gestionPWeb.mostrarDatoEnId(gestionP.calcularTotalGastos(), "gastos-totales");
gestionPWeb.mostrarDatoEnId(gestionP.calcularBalance(), "balance-total");

for (let gasto of gestionP.listarGastos())
{
    gestionPWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

for(let gasto of gestionP.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
{
    gestionPW.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}