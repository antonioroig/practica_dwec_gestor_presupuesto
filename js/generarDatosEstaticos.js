import * as gestionWeb from '../js/gestionPresupuestoWeb.js';
import * as gestion from '../js/gestionPresupuesto.js';
// Check
gestion.actualizarPresupuesto(1500);
gestionWeb.mostrarDatoEnId(gestion.mostrarPresupuesto(),"presupuesto");
/*let objeto1 = new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let objeto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let objeto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let objeto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let objeto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let objeto6 =  new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");*/

gestion.anyadirGasto(new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestion.anyadirGasto(new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gestion.anyadirGasto(new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gestion.anyadirGasto(new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gestion.anyadirGasto(new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gestion.anyadirGasto(new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gestionWeb.mostrarDatoEnId(gestion.calcularTotalGastos(),"gastos-totales");
gestionWeb.mostrarDatoEnId(gestion.calcularBalance(),"balance-total");

// Revisar
let gastos = gestion.listarGastos()
gastos.forEach((element)=> {
    gestionWeb.mostrarGastoWeb(element,"listado-gastos-completo");
})
gestionWeb.mostrarGastoWeb(gestion.filtrarGastos({fechaDesde:"2021-09-01"}),"listado-gastos-filtrado-1");
gestionWeb.mostrarGastoWeb(gestion.filtrarGastos({valorMinimo: 50}),"listado-gastos-filtrado-2");
gestionWeb.mostrarGastoWeb(gestion.filtrarGastos({valorMinimo:200}),"listado-gastos-filtrado-2");
gestionWeb.mostrarGastoWeb(gestion.filtrarGastos({etiquetasTiene: ["comida", "transporte"]}),"listado-gastos-filtrado-4");