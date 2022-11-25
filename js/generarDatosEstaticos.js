import * as gestionWeb from '../js/gestionPresupuestoWeb.js';
import * as gestion from '../js/gestionPresupuesto.js';
// Check
gestion.actualizarPresupuesto(1500);
gestionWeb.mostrarDatoEnId(gestion.mostrarPresupuesto(),"presupuesto");

gestion.anyadirGasto(new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestion.anyadirGasto(new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gestion.anyadirGasto(new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gestion.anyadirGasto(new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gestion.anyadirGasto(new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gestion.anyadirGasto(new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gestionWeb.mostrarDatoEnId(gestion.calcularTotalGastos(),"gastos-totales");
gestionWeb.mostrarDatoEnId(gestion.calcularBalance(),"balance-total");

// Mostrar gastos web
let gastos = gestion.listarGastos();
gastos.forEach((element)=> {
    gestionWeb.mostrarGastoWeb(element,"listado-gastos-completo");
})
let filtrado1 = gestion.filtrarGastos({fechaDesde:"2021-09-01",fechaHasta:"2021-09-30"});
filtrado1.forEach((element) => {
    gestionWeb.mostrarGastoWeb(element,"listado-gastos-filtrado-1");
})
let filtrado2 = gestion.filtrarGastos({valorMinimo: 50});
filtrado2.forEach((element) => {
    gestionWeb.mostrarGastoWeb(element,"listado-gastos-filtrado-2")
})
let filtrado3 = gestion.filtrarGastos({valorMinimo:200});
filtrado3.forEach((element) => {
    gestionWeb.mostrarGastoWeb(element,"listado-gastos-filtrado-3")
})
let filtrado4 = gestion.filtrarGastos({etiquetasTiene: ["comida", "transporte"],valorMaximo :50});
filtrado4.forEach((element) => {
    gestionWeb.mostrarGastoWeb(element,"listado-gastos-filtrado-4")
})

// Mostrar gasto web agrupado
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestion.agruparGastos("dia"), "dia");

gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestion.agruparGastos("mes"), "mes");

gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestion.agruparGastos("anyo"), "anyo");