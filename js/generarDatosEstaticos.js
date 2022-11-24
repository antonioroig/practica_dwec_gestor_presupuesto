'use strict';

import * as gestionPresu from './gestionPresupuesto.js';
import * as gestionPresuWeb from './gestionPresupuestoWeb.js';

 let valorPresupuesto =gestionPresu.actualizarPresupuesto(1500);
 
gestionPresuWeb.mostrarDatoEnId(valorPresupuesto,"presupuesto")
gestionPresuWeb.mostrarDatoEnId()



gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gestionPresuWeb.mostrarDatoEnId(gestionPresu.calcularTotalGastos(),"presupuesto");
gestionPresuWeb.mostrarDatoEnId(gestionPresu.calcularBalance(),"presupuesto");

let gastos=gestionPresu.listarGastos();
gastos.forEach(gasto => {
    gestionPresuWeb.mostrarGastoWeb(gasto,"gastos-totales");
});

let filtrado1 = gestionPresu.filtrarGastos({fechaDesde:"2021-09-01",fechaHasta:"2021-09-30"});
filtrado1.forEach(element => {
    gestionPresuWeb.mostrarGastoWeb(element,"listado-gastos-filtrado-1");
});

let filtrado2 = gestionPresu.filtrarGastos({valorMinimo:50});
filtrado2.forEach(element => {
    gestionPresuWeb.mostrarGastoWeb(element,"listado-gastos-filtrado-2");
});

let filtrado3 = gestionPresu.filtrarGastos({valorMinimo:200 , etiquetasTiene : 'seguros'});
filtrado3.forEach(element => {
    gestionPresuWeb.mostrarGastoWeb(gestionPresu.filtrarGastos(element,'listado-gastos-filtrado-3'));
});

let filtrado4 =gestionPresu.filtrarGastos({valorMinimo:50, etiquetasTiene : 'comida,transporte'});
filtrado4.forEach(element => {
    
gestionPresuWeb.mostrarGastoWeb(gestionPresu.filtrarGastos(element,"listado-gastos-filtrado-4"));


});


gestionPresuWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresu.agruparGastos("dia"), "dia");
gestionPresuWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresu.agruparGastos("mes"), "mes");
gestionPresuWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresu.agruparGastos("anyo"), "año");