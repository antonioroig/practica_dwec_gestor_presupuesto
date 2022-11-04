import * as gestion from './gestionPresupuesto';
import * as gestionWeb from `./gestionPresupuestoWeb`;

gestion.actualizarPresupuesto(1500);

gestionWeb.mostrarDatoEnId(gestion.mostrarPresupuesto(),'presupuesto');