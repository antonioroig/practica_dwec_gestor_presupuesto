<<<<<<< HEAD
import * as PresupuestoWeb from "./gestionPresupuestoWeb";
import * as Presupuesto from "./gestionPresupuesto";
=======
<<<<<<< Updated upstream
import * as PresupuestoWeb from "./gestionPresupuestoWeb.js";
import * as Presupuesto from "./gestionPresupuesto.js";
=======
'use strict';
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";
import * as gestionPresupuesto from "./gestionPresupuesto.js";
>>>>>>> Stashed changes
>>>>>>> parent of bbcab75 (Revert "25/11/2022")

gestionPresupuesto.actualizarPresupuesto(1500);
export let DIVpresupuesto = gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());

<<<<<<< HEAD
function mostrarPrespuestoHTML(){
    PresupuestoWeb.mostrarDatoEnId('presupuesto', 1500);
}
=======
<<<<<<< Updated upstream
export let DIVpresupuesto = PresupuestoWeb.mostrarDatoEnId('presupuesto', Presupuesto.mostrarPresupuesto());

>>>>>>> parent of bbcab75 (Revert "25/11/2022")
let gasto1 = new Presupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new Presupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new Presupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new Presupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new Presupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new Presupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
=======
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
>>>>>>> Stashed changes

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

<<<<<<< HEAD
let DIVtotalgastos = PresupuestoWeb.mostrarDatoEnId('gastos-totales', Presupuesto.calcularTotalGastos());
=======
<<<<<<< Updated upstream
export let DIVtotalgastos = PresupuestoWeb.mostrarDatoEnId('gastos-totales', Presupuesto.calcularTotalGastos());
>>>>>>> parent of bbcab75 (Revert "25/11/2022")

let DIVbalancetotal = PresupuestoWeb.mostrarDatoEnId('balance-total', Presupuesto.calcularBalance());

let DIVlistadogastoscompleto = PresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', Presupuesto.listarGastos());

let DIVlistadogastosfiltrado1 = PresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', Presupuesto.filtrarGastos("09-2021"));

let DIVlistadogastosfiltrado2 = PresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', Presupuesto.filtrarGastos({valorMinimo: 50}));

let DIVlistadogastosfiltrado3 = PresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', Presupuesto.filtrarGastos({valorMinimo: 200,etiquetasTiene: ["seguros"]}));

let DIVlistadogastosfiltrado4 = PresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', Presupuesto.filtrarGastos({valorMaximo: 50,etiquetasTiene: ["comida","transporte"]}));

let DIVagrupadosdia = PresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',Presupuesto.agruparGastos({periodo: "dia"}));

let DIVagrupadosmes = PresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',Presupuesto.agruparGastos({periodo: "mes"}));

<<<<<<< HEAD
let DIVagrupadosanyo = PresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',Presupuesto.agruparGastos({periodo: "anyo"}));

export{
    mostrarPrespuestoHTML
}
=======
export let DIVagrupadosanyo = PresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',Presupuesto.agruparGastos("anyo"),"año");
=======
export let DIVtotalgastos = gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());

export let DIVbalancetotal = gestionPresupuestoWeb.mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

export let DIVlistadogastoscompleto = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gestionPresupuesto.listarGastos());

export let DIVlistadogastosfiltrado1 = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta: "2021-09-30"}));

export let DIVlistadogastosfiltrado2 = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gestionPresupuesto.filtrarGastos({valorMinimo: 50}));

export let DIVlistadogastosfiltrado3 = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gestionPresupuesto.filtrarGastos({valorMinimo: 200,etiquetasTiene: ["seguros"]}));

export let DIVlistadogastosfiltrado4 = gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gestionPresupuesto.filtrarGastos({valorMaximo: 50,etiquetasTiene: ["comida","transporte"]}));

export let DIVagrupadosdia = gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gestionPresupuesto.agruparGastos({periodo: "dia"}),"día");

export let DIVagrupadosmes = gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',gestionPresupuesto.agruparGastos({periodo: "mes"}), "mes");

export let DIVagrupadosanyo = gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',gestionPresupuesto.agruparGastos({periodo: "anyo"}), "año");
>>>>>>> Stashed changes
>>>>>>> parent of bbcab75 (Revert "25/11/2022")
