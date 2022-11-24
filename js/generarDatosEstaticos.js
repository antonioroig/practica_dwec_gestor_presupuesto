import * as gestion from "./gestionPresupuesto.js";
import * as gestionWeb from "./gestionPresupuestoWeb.js";

gestion.actualizarPresupuesto(1500);

gestionWeb.mostrarDatoEnId(gestion.mostrarPresupuesto(),"presupuesto");


let gasto1 =new gestion.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestion.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestion.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestion.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestion.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestion.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestion.anyadirGasto(gasto1);
gestion.anyadirGasto(gasto2);
gestion.anyadirGasto(gasto3);
gestion.anyadirGasto(gasto4);
gestion.anyadirGasto(gasto5);
gestion.anyadirGasto(gasto6);

gestionWeb.mostrarDatoEnId(gestion.calcularTotalGastos(),"gastos-totales");

gestionWeb.mostrarDatoEnId(gestion.calcularBalance(),"balance-total");


for(let gasto of gestion.listarGastos()){
    gestionWeb.mostrarGastoWeb("listado-gastos-completo",gasto);
};

for(let gasto of gestion.filtrarGastos({fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"})){
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
};

for(let gasto of gestion.filtrarGastos({valorMinimo : 50})){
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
};

for(let gasto of gestion.filtrarGastos({valorMinimo : 200, etiquetasTiene : ["seguros"]})){
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
};

for(let gasto of gestion.filtrarGastos({valorMaximo : 50, etiquetasTiene : ["comida","transporte"]})){
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
};

gestionWeb.mostrarGastosAgrupadosWeb( "agrupacion-dia",gestion.agruparGastos("dia"),"día");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gestion.agruparGastos("mes"),"mes");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gestion.agruparGastos("anyo"),"año");
