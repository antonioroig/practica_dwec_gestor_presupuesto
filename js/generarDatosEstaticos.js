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

for(let gasto of scriptsGestion.listarGastos()){
    scriptsGestionWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
};
for(let gasto of scriptsGestion.filtrarGastos({fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"})){
    scriptsGestionWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
};
for(let gasto of scriptsGestion.filtrarGastos({valorMinimo : 50})){
    scriptsGestionWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
};
for(let gasto of scriptsGestion.filtrarGastos({valorMinimo : 200, etiquetasTiene : ["seguros"]})){
    scriptsGestionWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
};
for(let gasto of scriptsGestion.filtrarGastos({valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]})){
    scriptsGestionWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
};


scriptsGestionWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', scriptsGestion.agruparGastos("dia"),"día");
scriptsGestionWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', scriptsGestion.agruparGastos("mes"),"mes");
scriptsGestionWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', scriptsGestion.agruparGastos("anyo"),"año");