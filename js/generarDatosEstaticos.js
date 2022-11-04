import * as gestion from "./gestionPresupuesto";
import * as gestionWeb from "./gestionPresupuestoWeb";

gestion.actualizarPresupuesto(1500);

gestionWeb.mostrarDatoEnId(gestion.mostrarPresupuesto(),"presupuesto");


gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");