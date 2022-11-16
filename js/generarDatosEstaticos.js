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
anyadirGasto(gasto1);
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
anyadirGasto(gasto2);
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
anyadirGasto(gasto3);
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
anyadirGasto(gasto4);
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
anyadirGasto(gasto5);
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
anyadirGasto(gasto6);
