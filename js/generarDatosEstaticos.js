import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "presupuesto");

gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gestionPresupuesto.anyadirGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gestionPresupuesto.anyadirGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gestionPresupuesto.anyadirGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gestionPresupuesto.anyadirGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gestionPresupuesto.anyadirGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");