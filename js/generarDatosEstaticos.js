import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";



gp.actualizarPresupuesto(1500);

gpw.mostrarDatoEnId(gp.mostrarPresupuesto(), "presupuesto");

let gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

gpw.mostrarDatoEnId(gp.calcularTotalGastos(), "gastos-totales");
gpw.mostrarDatoEnId(gp.calcularBalance(), "balance-total");

gp.listarGastos().forEach(gasto => {
    gpw.mostrarGastoWeb(gasto, "listado-gastos-completo");
});

gp.filtrarGastos({fechaDesde:"2021-09-1", fechaHasta:"2021-09-30"}).forEach(gasto => {
    gpw.mostrarGastoWeb(gasto, "listado-gastos-filtrado-1");
});

gp.filtrarGastos({valorMinimo:50}).forEach(gasto => {
    gpw.mostrarGastoWeb(gasto, "listado-gastos-filtrado-2");
});

gp.filtrarGastos({valorMinimo:200, etiquetasTiene:["seguros"]}).forEach(gasto => {
    gpw.mostrarGastoWeb(gasto, "listado-gastos-filtrado-3");
});

gp.filtrarGastos({valorMaximo:50, etiquetasTiene:["comida", "transporte"]}).forEach(gasto => {
    gpw.mostrarGastoWeb(gasto, "listado-gastos-filtrado-4");
});

gpw.mostrarGastosAgrupadosWeb(gp.agruparGastos("dia"), "día", "agrupacion-dia");
gpw.mostrarGastosAgrupadosWeb(gp.agruparGastos("mes"), "mes", "agrupacion-mes");
gpw.mostrarGastosAgrupadosWeb(gp.agruparGastos("anyo"), "año", "agrupacion-anyo");