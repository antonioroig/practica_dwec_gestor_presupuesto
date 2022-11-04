import * as gestionPresupuestoweb from './gestionPresupuestoWeb';
import * as gestionPresupuesto from './gestionPresupuesto';

//Actualizar presupuesto a 1500
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar presupuesto
let pres = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", pres);

//Crear los gastos
let gasto1= new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadimos los gastos creados
gestionPresupuesto.anyadirGasto(gasto1, gasto2, gasto3, gasto4, gasto5, gasto6);

//Mostrar gastos totales
let cTotalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuesto.mostrarDatoEnId("gatos-totales", cTotalGastos);

//Mostrar balance total
let balTotal = gestionPresupuesto.calcularBalance();
gestionPresupuesto.mostrarDatoEnId("balance-total", balTotal);

//Mostrar listado gastos Septiembre 2021