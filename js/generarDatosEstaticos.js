import * as scriptsGestion from "./gestionPresupuesto.js";
import * as scriptsGestionWeb from "./gestionPresupuestoWeb.js";

//Prueba 1
scriptsGestion.actualizarPresupuesto(1500);

scriptsGestionWeb.mostrarDatoEnId(scriptsGestion.mostrarPresupuesto(),"presupuesto");


let gasto1 = new scriptsGestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new scriptsGestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new scriptsGestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new scriptsGestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new scriptsGestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new scriptsGestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

scriptsGestion.anyadirGasto(gasto1);
scriptsGestion.anyadirGasto(gasto2);
scriptsGestion.anyadirGasto(gasto3);
scriptsGestion.anyadirGasto(gasto4);
scriptsGestion.anyadirGasto(gasto5);
scriptsGestion.anyadirGasto(gasto6);

scriptsGestionWeb.mostrarDatoEnId(scriptsGestion.calcularTotalGastos(),"gastos-totales");

scriptsGestionWeb.mostrarDatoEnId(scriptsGestion.calcularBalance(),"balance-total");


//Prueba 2