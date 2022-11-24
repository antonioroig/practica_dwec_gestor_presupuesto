'use strict';
import * as gesPresupuesto from "./gestionPresupuesto.js";
import * as gesPresupuestoWeb from "./gestionPresupuestoWeb.js";

gesPresupuesto.actualizarPresupuesto(1500);

gesPresupuestoWeb.mostrarDatoEnId(gesPresupuesto.mostrarPresupuesto(),"presupuesto");

let gasto1 = new gesPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gesPresupuesto.anyadirGasto(gasto1);
gesPresupuesto.anyadirGasto(gasto2);
gesPresupuesto.anyadirGasto(gasto3);
gesPresupuesto.anyadirGasto(gasto4);
gesPresupuesto.anyadirGasto(gasto5);
gesPresupuesto.anyadirGasto(gasto6);

gesPresupuestoWeb.mostrarDatoEnId(gesPresupuesto.calcularTotalGastos(), 'gastos-totales');
gesPresupuestoWeb.mostrarDatoEnId(gesPresupuesto.calcularBalance(),'balance-total');

for(let gasto of gesPresupuesto.listarGastos())
{

    gesPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto);

}

let filter1 = gesPresupuesto.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta: '2021-09-31'});

for(let gasto of filter1)
{

    gesPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado1', gasto);

}

let filter2 = gesPresupuesto.filtrarGastos({valorMinimo:50});

for(let gasto of filter2)
{

    gesPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado2', gasto);

}

let filter3 = gesPresupuesto.filtrarGastos({valorMinimo:200, etiquetasTiene:["seguros"]});

for(let gasto of filter3)
{

    gesPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado3', gasto);

}

let filter4 = gesPresupuesto.filtrarGastos({valorMaximo:50, etiquetasTiene:["comida","transporte"]});

for(let gasto of filter4)
{

    gesPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado4', gasto);

}

gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gesPresupuesto.agruparGastos("dia"), "día");

gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gesPresupuesto.agruparGastos("mes"), "mes");

gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPresupuesto.agruparGastos("anyo"), "año");