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

for(let gasto of Gasto.listarGastos())
{

    GastoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);

}

for(let gasto of Gasto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
{

    GastoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);

}

for(let gasto of Gasto.filtrarGastos({valorMinimo: 50}))
{

    GastoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);

}

for(let gasto of Gasto.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]}))
{

    GastoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);

}

for(let gasto of Gasto.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida", "transporte"]}))
{

    GastoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);

}

GastoWeb.mostrarGastosAgrupadosWeb("")

