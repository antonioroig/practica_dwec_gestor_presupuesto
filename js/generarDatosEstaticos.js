import * as PresupuestoWeb from "./gestionPresupuestoWeb";
import * as Presupuesto from "./gestionPresupuesto";

Presupuesto.actualizarPresupuesto(1500);

function mostrarPrespuestoHTML(){
    PresupuestoWeb.mostrarDatoEnId('presupuesto', 1500);
}
let gasto1 = new Presupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new Presupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new Presupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new Presupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new Presupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new Presupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

Presupuesto.anyadirGasto(gasto1);
Presupuesto.anyadirGasto(gasto2);
Presupuesto.anyadirGasto(gasto3);
Presupuesto.anyadirGasto(gasto4);
Presupuesto.anyadirGasto(gasto5);
Presupuesto.anyadirGasto(gasto6);

let DIVtotalgastos = PresupuestoWeb.mostrarDatoEnId('gastos-totales', Presupuesto.calcularTotalGastos());

let DIVbalancetotal = PresupuestoWeb.mostrarDatoEnId('balance-total', Presupuesto.calcularBalance());

let DIVlistadogastoscompleto = PresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', Presupuesto.listarGastos());

let DIVlistadogastosfiltrado1 = PresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', Presupuesto.filtrarGastos("09-2021"));

let DIVlistadogastosfiltrado2 = PresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', Presupuesto.filtrarGastos({valorMinimo: 50}));

let DIVlistadogastosfiltrado3 = PresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', Presupuesto.filtrarGastos({valorMinimo: 200,etiquetasTiene: ["seguros"]}));

let DIVlistadogastosfiltrado4 = PresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', Presupuesto.filtrarGastos({valorMaximo: 50,etiquetasTiene: ["comida","transporte"]}));

let DIVagrupadosdia = PresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',Presupuesto.agruparGastos({periodo: "dia"}));

let DIVagrupadosmes = PresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',Presupuesto.agruparGastos({periodo: "mes"}));

let DIVagrupadosanyo = PresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',Presupuesto.agruparGastos({periodo: "anyo"}));

export{
    mostrarPrespuestoHTML
}