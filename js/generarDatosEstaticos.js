import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId(gestionP.mostrarPresupuesto(), 'presupuesto');

let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida" );
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida" );
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte" );
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros" );
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros" );

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), "gastos-totales");
gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularBalance(), "balance-total");

for (let gasto of gestionPresupuesto.listarGastos())
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
} 

for (let gasto of gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

for (let gasto of gestionPresupuesto.filtrarGastos({valorMinimo: 50}))
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

for (let gasto of gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}))
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

for (let gasto of gestionPresupuesto.filtrarGastos({etiquetasTiene: ["comida", "transporte"], valorMaximo: 50}))
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(gestionPresupuesto.agruparGastos("dia"),"día" ,"agrupacion-dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(gestionPresupuesto.agruparGastos("mes"),"mes" , "agrupacion-mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(gestionPresupuesto.agruparGastos("anyo"),"año" ,"agrupacion-anyo");