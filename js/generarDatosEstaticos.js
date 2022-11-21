import{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
} from './gestionPresupuestoWeb.js';
import{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos 
} from './gestionPresupuesto.js';

actualizarPresupuesto(1500);

mostrarDatoEnId(mostrarPresupuesto(), "presupuesto");

let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

mostrarDatoEnId(calcularTotalGastos(), "gastos-totales");
mostrarDatoEnId(calcularBalance(), "balance-total");

listarGastos().forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-completo");
});

filtrarGastos({fechaDesde:"2021-09-1", fechaHasta:"2021-09-30"}).forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-filtrado-1");
});

filtrarGastos({valorMinimo:50}).forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-filtrado-2");
});

filtrarGastos({valorMinimo:200, etiquetasTiene:["seguros"]}).forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-filtrado-3");
});

filtrarGastos({valorMaximo:50, etiquetasTiene:["comida", "transporte"]}).forEach(gasto => {
    mostrarGastoWeb(gasto, "listado-gastos-filtrado-4");
});

mostrarGastosAgrupadosWeb(agruparGastos("dia"), "día", "agrupacion-dia");
mostrarGastosAgrupadosWeb(agruparGastos("mes"), "mes", "agrupacion-mes");
mostrarGastosAgrupadosWeb(agruparGastos("anyo"), "año", "agrupacion-anyo");