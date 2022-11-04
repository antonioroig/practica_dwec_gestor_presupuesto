import * as exGp from './gestionPresupuesto.js';
import * as exGpweb from './gestionPresupuestoWeb.js';
exGp.actualizarPresupuesto(1500);
exGpweb.mostrarDatoEnId(exGp.mostrarPresupuesto(),"presupuesto");
