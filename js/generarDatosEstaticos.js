
import * as gesPres from './gestionPresupuesto.js';
import * as gesWeb from './gestionPresupuestoWeb.js';



gesPres.actualizarPresupuesto(1500);
gesWeb.mostrarDatoEnId('presupuesto', gesPres.mostrarPresupuesto());

let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gesPres.anyadirGasto(g1);
gesPres.anyadirGasto(g2);
gesPres.anyadirGasto(g3);
gesPres.anyadirGasto(g4);
gesPres.anyadirGasto(g5);
gesPres.anyadirGasto(g6);


//Mostrar los datos dependiendo de la ID
let result = gesPres.calcularTotalGastos();
gesWeb.mostrarDatoEnId('gastos-totales',result);

let result2 = gesPres.calcularBalance();
gesWeb.mostrarDatoEnId('balance-total',result2);


//Mostrar los gastos Web



for(let recorrido of gesPres.listarGastos())
{
 gesWeb.mostrarGastoWeb('listado-gastos-completo', recorrido);
}

let filter = gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta:"2021-09-30"});
for(let recorrido of filter)
{
gesWeb.mostrarGastoWeb('listado-gastos-filtrado-1', recorrido)
}

let filter2 = gesPres.filtrarGastos({valorMinimo: 50});
for(let recorrido of filter2)
{
 gesWeb.mostrarGastoWeb('listado-gastos-filtrado-2', recorrido);
}

let filter3 = gesPres.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for(let recorrido of filter3)
{
gesWeb.mostrarGastoWeb('listado-gastos-filtrado-3', recorrido);
}

let filter4 = gesPres.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida", "transporte"]});
for(let recorrido of filter4)
{
gesWeb.mostrarGastoWeb('listado-gastos-filtrado-4', recorrido);
}

//Agrupación por fechas
let filtrado5 = gesPres.agruparGastos("dia");
gesWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', filtrado5, "día");

let filtrado6 = gesPres.agruparGastos("mes");
gesWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', filtrado6, "mes");

let filtrado7 = gesPres.agruparGastos("anyo");
gesWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', filtrado7, "año");









