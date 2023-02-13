import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

'use strict';

//Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)
gestionPresupuesto.actualizarPresupuesto(1500);
//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
let presupuesto=gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',presupuesto);

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

let totalGastos=gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales',totalGastos);

let totalBalance=gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total',totalBalance);

let listaGastos = gestionPresupuesto.listarGastos();
for(let gasto of listaGastos){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',gasto);
}

let gastoFiltrado1=gestionPresupuesto.filtrarGastos({fechaDesde:'2021-09-01',fechaHasta:'2021-09-30'});
for(let gasto of gastoFiltrado1){
    gestionPresupuestopresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gasto);
}

let gastoFiltrado2=gestionPresupuesto.filtrarGastos({valorMinimo:50});
for(let gasto of gastoFiltrado2){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',gasto);
}

let gastoFiltrado3=gestionPresupuesto.filtrarGastos({valorMinimo:200, etiquetasTiene:['seguros']});
for(let gasto of gastoFiltrado3){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3',gasto);
}

let gastoFiltrado4=gestionPresupuesto.filtrarGastos({valorMaximo:50, etiquetasTiene:['comida','transporte']});
for(let gasto of gastoFiltrado4){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4',gasto);
}

let agrupadosDia=gestionPresupuesto.agruparGastos('dia');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',agrupadosDia,'dia');

let agrupadosMes=gestionPresupuesto.agruparGastos('mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',agrupadosMes,'mes');

let agrupadosAnyo=gestionPresupuesto.agruparGastos('anyo');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', agrupadosAnyo,'anyo');