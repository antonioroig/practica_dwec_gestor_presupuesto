import * as gestionPre from "./gestionPresupuesto.js";
import * as gestionPreWeb from "./gestionPresupuestoWeb.js";

gestionPre.actualizarPresupuesto(1500);
gestionPreWeb.mostrarDatoEnId(gestionPre.mostrarPresupuesto(),"presupuesto");

let gasto1 =new gestionPre.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPre.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPre.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPre.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPre.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPre.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPre.anyadirGasto(gasto1);
gestionPre.anyadirGasto(gasto2);
gestionPre.anyadirGasto(gasto3);
gestionPre.anyadirGasto(gasto4);
gestionPre.anyadirGasto(gasto5);
gestionPre.anyadirGasto(gasto6);

gestionPreWeb.mostrarDatoEnId(gestionPre.calcularTotalGastos(),"gastos-totales");
gestionPreWeb.mostrarDatoEnId(gestionPre.calcularBalance(),"balance-total");

gestionPre.listarGastos();

for (let gasto of gestionPre.listarGastos()) {
    gestionPreWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
}

for (let gasto of gestionPre.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })) {
    gestionPreWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
}

for (let gasto of gestionPre.filtrarGastos({ valorMinimo: 50 })) {
    gestionPreWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
}

for (let gasto of gestionPre.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] })) {
    gestionPreWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
}

for (let gasto of gestionPre.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] })) {
    gestionPreWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
}


gestionPreWeb.mostrarGastosAgrupadosWeb(gestionPre.agruparGastos("dia"), "día", "agrupacion-dia");
gestionPreWeb.mostrarGastosAgrupadosWeb(gestionPre.agruparGastos("mes"), "mes", "agrupacion-mes");
gestionPreWeb.mostrarGastosAgrupadosWeb(gestionPre.agruparGastos("anyo"), "año", "agrupacion-anyo");
