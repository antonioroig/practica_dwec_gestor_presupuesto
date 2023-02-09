'use strict';
import * as presupuesto from './gestionPresupuesto.js';
import * as presupuestoWeb from './gestionPresupuestoWeb.js';

let nuevopresupuesto = 1500;
presupuesto.actualizarPresupuesto(nuevopresupuesto);

let mostrarpresupuesto = presupuesto.mostrarPresupuesto();
presupuestoWeb.mostrarDatoEnId('presupuesto',mostrarpresupuesto);

let gasto1 = new presupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new presupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new presupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new presupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new presupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new presupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

presupuesto.anyadirGasto(gasto1);
presupuesto.anyadirGasto(gasto2);
presupuesto.anyadirGasto(gasto3);
presupuesto.anyadirGasto(gasto4);
presupuesto.anyadirGasto(gasto5);
presupuesto.anyadirGasto(gasto6);

let totalGasto = presupuesto.calcularTotalGastos();
presupuestoWeb.mostrarDatoEnId("gastos-totales",totalGasto);

let balance = presupuesto.calcularBalance()
presupuestoWeb.mostrarDatoEnId("balance-total",balance);

let listaGastos = presupuesto.listarGastos();
    for (let gastos of listaGastos)
    {
        presupuestoWeb.mostrarGastoWeb('listado-gastos-completo',gastos);
    }

let filtrado1 = presupuesto.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'});
    for (let gastos of filtrado1)
    {
        presupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gastos);
    }

let filtrado2 = presupuesto.filtrarGastos({valorMinimo: 50});
    for (let gastos of filtrado2)
    {
        presupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',gastos);
    }

let filtrado3 = presupuesto.filtrarGastos({valorMinimo: 200,etiquetasTiene: ["seguros"]});
    for (let gastos of filtrado3)
    {
        presupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3',gastos);
    }


let filtrado4 = presupuesto.filtrarGastos({valorMaximo:50, etiquetasTiene: ["comida","transporte"]});
    for (let gastos of filtrado4)
    {
        presupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4',gastos);
    }    

let agrupacionDia = presupuesto.agruparGastos("dia");
presupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",agrupacionDia,"día");

let agrupacionMes = presupuesto.agruparGastos("mes");
presupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",agrupacionMes,"mes");

let agrupacionAnyo = presupuesto.agruparGastos("anyo");
presupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",agrupacionAnyo,"año");