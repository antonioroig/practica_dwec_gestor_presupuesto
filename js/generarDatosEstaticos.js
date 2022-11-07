//generarDatosEstaticos.js
import * as gesP from "./gestionPresupuesto.js";
import * as gesPW from "./gestionPresupuestoWeb.js";

gesP.actualizarPresupuesto(1500);

gesPW.mostrarDatoEnId(gesP.mostrarPresupuesto(),'presupuesto');

let gasto1 = new gesP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gesP.anyadirGasto(gasto1);
gesP.anyadirGasto(gasto2);
gesP.anyadirGasto(gasto3);
gesP.anyadirGasto(gasto4);
gesP.anyadirGasto(gasto5);
gesP.anyadirGasto(gasto6);

gesPW.mostrarDatoEnId(gesP.calcularTotalGastos(), 'gastos-totales');
gesPW.mostrarDatoEnId(gesP.calcularBalance(),'balance-total');

for(let gasto of gesP.listarGastos()){
    gesPW.mostrarGastoWeb("listado-gastos-completo", gasto);
}
for(let gasto of gesP.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"})){
    gesPW.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}
for(let gasto of gesP.filtrarGastos({valorMinimo: 50})){
    gesPW.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}
for(let gasto of gesP.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]})){
    gesPW.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}
for(let gasto of gesP.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]})){
    gesPW.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}