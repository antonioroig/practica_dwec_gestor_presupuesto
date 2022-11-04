import * as gestionWeb from '../js/gestionPresupuestoWeb.js';
import * as gestion from '../js/gestionPresupuesto.js';
// Check
gestion.actualizarPresupuesto(1500);
gestionWeb.mostrarDatoEnId(gestion.mostrarPresupuesto(),"presupuesto");
let objeto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let objeto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let objeto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let objeto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let objeto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let objeto6 =  new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestion.anyadirGasto(objeto1);
gestion.anyadirGasto(objeto2);
gestion.anyadirGasto(objeto3);
gestion.anyadirGasto(objeto4);
gestion.anyadirGasto(objeto5);
gestion.anyadirGasto(objeto6);

gestionWeb.mostrarDatoEnId(gestion.calcularTotalGastos(),"gastos-totales");
gestionWeb.mostrarDatoEnId(gestion.calcularBalance(),"balance-total");

// Revisar
