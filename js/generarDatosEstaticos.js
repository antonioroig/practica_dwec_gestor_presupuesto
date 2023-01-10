import * as gestionPresupuesto from '../js/gestionPresupuesto.js';
import * as gestionPresupuestoWeb from '../js/gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
let gasto1 =  new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 =  new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 =  new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 =  new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 =  new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 =  new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());
let listaGastos1 = gestionPresupuesto.listarGastos();

for (let i = 0; i < listaGastos1.length; i++) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", listaGastos1[i]);
}

let listaGastos2 = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for (let i = 0; i < listaGastos2.length; i++) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", listaGastos2[i]);
}

let listaGastos3 = gestionPresupuesto.filtrarGastos({valorMinimo: 50})
for (let i = 0; i < listaGastos3.length; i++) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", listaGastos3[i]);
}

let listaGastos4 = gestionPresupuesto.filtrarGastos({valorMinimo: 200});
for (let i = 0; i < listaGastos4.length; i++) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", listaGastos4[i]);
}

let listaGastos5 = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]})
for (let i = 0; i < listaGastos5.length; i++) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", listaGastos5[i]);
}


gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "día");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "año");

