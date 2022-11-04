import * as scriptsGestion from './gestionPresupuesto';
import * as scriptsGestionWeb from './gestionPresupuestoWeb';

//Prueba 1
scriptsGestion.actualizarPresupuesto(1500);
let presupuesto = scriptsGestion.mostrarPresupuesto();
scriptsGestionWeb.mostrarDatoEnId(presupuesto, "presupuesto");

//Prueba 2