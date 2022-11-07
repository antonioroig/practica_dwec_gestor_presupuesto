import * as ges from "./gestionPresupuesto.js";
import * as gesPW from "./gestionPresupuestoWeb.js";

ges.actualizarPresupuesto(1500);

gesPW.mostrarDatoEnId(ges.mostrarPresupuesto(),"presupuesto");

let gasto1 = new ges.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new ges.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new ges.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new ges.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new ges.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new ges.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

ges.anyadirGasto(gasto1);
ges.anyadirGasto(gasto2);
ges.anyadirGasto(gasto3);
ges.anyadirGasto(gasto4);
ges.anyadirGasto(gasto5);
ges.anyadirGasto(gasto6);

gesPW.mostrarDatoEnId(ges.calcularTotalGastos(),"gastos-totales");
gesPW.mostrarDatoEnId(ges.calcularBalance(),"balance-total");

for(let gasto of ges.listarGastos()){
    gesPW.mostrarGastoWeb("listado-gastos-completo", gasto);
}

for(let gasto of ges.filtrarGastos({fechaDesde: "2021-09-01" , fechaHasta: "2021-09-30"})){
    gesPW.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}




