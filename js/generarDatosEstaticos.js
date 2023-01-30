/* IMPORTAR LOS FICHEROS gestionPresupuesto y gestionPresupuesto  */
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gestionPresupuesto.actualizarPresupuesto(1500); // generamos el presupuesto
gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), 'presupuesto'); // mostrar presupuesto 1500€

// Crear los siguientes gastos (función crearGasto): --> Añadir los gastos creados (función anyadirGasto):
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gestionPresupuestoWeb.mostrarDatoEnId( gestionPresupuesto.calcularTotalGastos(), 'gastos-totales'); // mostramos gastos totales
gestionPresupuestoWeb.mostrarDatoEnId( gestionPresupuesto.calcularBalance(), 'balance-total'); // mostramos balance total

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
let gastosListados = gestionPresupuesto.listarGastos();
for(let i = 0; i < gastosListados.length; i++){
    //console.log(gastosListados);
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gastosListados[i]);
}
// Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let gastosFiltrados = gestionPresupuesto.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'});
for(let i = 0; i < gastosFiltrados.length; i++){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gastosFiltrados[i]);
}
// Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
for(let i = 0; i < gastosFiltrados.length; i++){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gastosFiltrados[i]);
}
// Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMaximo: 200, etiquetasTiene: ['seguros']});
for(let i = 0; i < gastosFiltrados.length; i++){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gastosFiltrados[i]);
}
// Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida','transporte']})
for(let i = 0; i < gastosFiltrados.length; i++){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gastosFiltrados[i]);
}

let agrupDia = gestionPresupuesto.agruparGastos('dia');
let agrupMes = gestionPresupuesto.agruparGastos('mes');
let agrupAnyo = gestionPresupuesto.agruparGastos('anyo');

// Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',agrupDia, 'día');
// Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',agrupMes, 'mes');
// Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',agrupAnyo, 'año');

