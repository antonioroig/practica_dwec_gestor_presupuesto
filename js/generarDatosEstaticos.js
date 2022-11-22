import * as gestionPresupuestoweb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

//Actualizar presupuesto a 1500
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar presupuesto
let pres = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", pres);

//Crear los gastos
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadimos los gastos creados
gestionPresupuesto.anyadirGasto(gasto1, gasto2, gasto3, gasto4, gasto5, gasto6);

//Mostrar gastos totales
let cTotalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gatos-totales", cTotalGastos);

//Mostrar balance total
let balTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balTotal);

//Mostrar el listado completo de gastos
let listGastos = gestionPresupuesto.listarGastos();
for(let element of listGastos){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gasto-completo", element);
}  

//Mostrar listado gastos Septiembre 2021
let gastosSeptiembre = gestionPresupuesto.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"});
for(let gasto of gastosSeptiembre){
    gestionPresupuestoweb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto)
}

//Mostrar el listado de gastos de más de 50€
let listadoGastosMayoresCincuenta = gestionPresupuesto.filtrarGastos({valorMinimo:50});
for(let gasto of listadoGastosMayoresCincuenta){
    gestionPresupuestoweb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

//Mostrar el listado de gastos de más de 200€
let listadoGastosMayoresDoscientos = gestionPresupuesto.filtrarGastos({valorMinimo:200, etiquetastiene:["seguros"]});
for(let gasto of listadoGastosMayoresDoscientos){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€
let listadoComidaTransporte = gestionPresupuesto.filtrarGastos({etiquetastiene:["comida", "transporte"], valorMaximo:50});
for(let gasto of listadoComidaTransporte){
    gestionPresupuestoweb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

//Mostrar el total de gastos agrupados por día
let gastosPorDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoweb.mostrarGastosAgrupadosWeb("agrupacion-dia",gastosPorDia,"día");

//Mostrar el total de gastos agrupados por mes
let gastosPorMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoweb.mostrarGastosAgrupadosWeb("agrupacion-mes",gastosPorMes,"mes");

//Mostrar el total de gastos agrupados por año
let gastosPorAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoweb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gastosPorAnyo,"año");