import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";


gestionPresupuesto.actualizarPresupuesto(1500);

gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(),'presupuesto');

let gasto1 = new gestionPresupuesto.CrearGasto('Comprar carne', 23.44,'2021-10-06','casa','comida');
let gasto2 = new gestionPresupuesto.CrearGasto('Compra fruta y verdura', 14.25,'2021-09-06','supermercado','comida');
let gasto3 = new gestionPresupuesto.CrearGasto('Bonobús', 18.60,'2020-05-26','transporte');
let gasto4 = new gestionPresupuesto.CrearGasto('Gasolina', 60.42,'2021-10-08','transporte','gasolina');
let gasto5 = new gestionPresupuesto.CrearGasto('Seguro hogar', 206.45,'2021-09-26','casa','seguros');
let gasto6 = new gestionPresupuesto.CrearGasto('Seguro coche', 195.78,'2021-10-06','transporte','seguros');

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);


gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(),'gastos-totales');
gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularBalance(),'balance-total');


for (let gasto of gestionPresupuesto.listarGastos()) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
}

for (let gasto of gestionPresupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
}

for (let gasto of gestionPresupuesto.filtrarGastos({ valorMinimo: 50 })) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
}

for (let gasto of gestionPresupuesto.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] })) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
}

for (let gasto of gestionPresupuesto.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] })) {
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
}



gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gestionPresupuesto.agruparGastos("dia"),"día");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',gestionPresupuesto.agruparGastos("mes"),"mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',gestionPresupuesto.agruparGastos("anyo"),"año");