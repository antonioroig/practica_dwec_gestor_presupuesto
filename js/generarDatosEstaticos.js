import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as mostrarEnWeb from './gestionPresupuestoWeb.js';

'use strict';

gestionPresupuesto.actualizarPresupuesto(1500);

let presupuesto = gestionPresupuesto.mostrarPresupuesto();
mostrarEnWeb.mostrarDatoEnId('presupuesto', presupuesto);


let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");


gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

let totalGastos = gestionPresupuesto.calcularTotalGastos();
mostrarEnWeb.mostrarDatoEnId('gastos-totales', totalGastos);

let totalBalance = gestionPresupuesto.calcularBalance();
mostrarEnWeb.mostrarDatoEnId('balance-total', totalBalance);

let listadoGastos = gestionPresupuesto.listarGastos();
for(let gasto of listadoGastos)
{
    mostrarEnWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
}

let gastoPorMes = gestionPresupuesto.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'});
for(let gasto of gastoPorMes)
{
    mostrarEnWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
}

let filtro1 = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
for(let gasto of filtro1)
{
    mostrarEnWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
}

let filtro2 = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ['seguros']});
for(let gasto of filtro2)
{
    mostrarEnWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
}

let filtro3 = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida','transporte']});
for(let gasto of filtro3)
{
    mostrarEnWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
}

let agrupGastos = gestionPresupuesto.agruparGastos('dia');
mostrarEnWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', agrupGastos, 'día');

let agrupGastos1 = gestionPresupuesto.agruparGastos('mes');
mostrarEnWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', agrupGastos1, 'mes');

let agrupGastos2 = gestionPresupuesto.agruparGastos('anyo');
mostrarEnWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', agrupGastos2, 'año');