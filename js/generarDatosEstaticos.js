
import * as gesPres from './gestionPresupuesto';
import * as gesWeb from './gestionPresupuestoWeb';



gesPres.actualizarPresupuesto(1500);
gesWeb.mostrarDatosEnId(gesPres.mostrarPresupuesto(), 'presupuesto');

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

let result = gesPres.calcularTotalGastos();
gesWeb.mostrarDatoEnId('gastos-totales',result);

let result2 = gesPres.calcularBalance();
gesWeb.mostrarDatoEnId('balance-total',result2);

let gasCompleto = gesPres.listarGastos();
gesWeb.mostrarGastoWeb('listado-gastos-completa', gasCompleto);

let filtrado = gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta:"2021-09-30"});
gesWeb.mostrarGastoWeb('istado-gastos-filtrado-1', filtrado)

let filtrado2 = gesPres.filtrarGastos({valorMinimo: 50});
gesWeb.mostrarGastoWeb('listado-gastos-filtrado-2', filtrado2);



let filtrado3 = gesPres.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]});
gesWeb.mostrarGastoWeb('listado-gastos-filtrado-3', filtrado3);

let filtrado4 = gesPres.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida", "transporte"]});
gesWeb.mostrarGastoWeb('listado-gastos-filtrado-4', filtrado4);

let filtrado5 = gesPres.agruparGastos("dia");
gesWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', filtrado5);

let filtrado6 = gesPres.agruparGastos("mes");
gesWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', filtrado6);

let filtrado7 = gesPres.agruparGastos("anyo");
gesWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', filtrado7);









