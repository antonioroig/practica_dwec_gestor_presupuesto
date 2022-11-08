import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
gestionPresupuesto.actualizarPresupuesto(1500); //Actualizar presupuesto a 1500 euros.
gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(),"presupuesto");
// Llamo a la función mostrarDatoEnId, donde el id del div es presupuesto, y el valor es la función de gestionPresupuesto.

//Creamos los gastos
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadimos los gastos
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

//Mostramos los gastos totales en el div con id "gastos-totales"
gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), "gastos-totales");

//Mostramos el balance en el div con id "balance-total"
gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.calcularBalance(), "balance-total");

//Mostramos el listado completo de los gastos en el div con id "listado-gastos-completo"
let gastos = gestionPresupuesto.listarGastos();
gastos.forEach(elemento =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", elemento);
});

gestionPresupuestoWeb.mostrarDatoEnId(gestionPresupuesto.filtrarGastos)
