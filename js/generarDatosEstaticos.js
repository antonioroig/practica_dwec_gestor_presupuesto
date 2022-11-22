import * as Gasto from "./gestionPresupuesto.js";
import * as GastoWeb from "./gestionPresupuestoWeb.js";

Gasto.actualizarPresupuesto(1500);

GastoWeb.mostrarDatoEnId(Gasto.mostrarPresupuesto(),'presupuesto');

let gasto1 = new Gasto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new Gasto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new Gasto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new Gasto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new Gasto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new Gasto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

Gasto.anyadirGasto(gasto1);
Gasto.anyadirGasto(gasto2);
Gasto.anyadirGasto(gasto3);
Gasto.anyadirGasto(gasto4);
Gasto.anyadirGasto(gasto5);
Gasto.anyadirGasto(gasto6);

GastoWeb.mostrarDatoEnId(Gasto.calcularTotalGastos(), 'gastos-totales');
GastoWeb.mostrarDatoEnId(Gasto.calcularBalance(),'balance-total');

