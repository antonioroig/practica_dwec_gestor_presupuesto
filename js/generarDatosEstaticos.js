import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);
console.log("tu puta madre");
gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "presupuesto");

