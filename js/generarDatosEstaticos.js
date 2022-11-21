import * as gestionPresu from '../js/gestionPresupuesto';
import * as gestionPresuWeb from '../js/gestionPresupuestoWeb';

gestionPresu.actualizarPresupuesto(1500);
gestionPresuWeb.mostrarDatosEnId(gestionPresu.mostrarPresupuesto());

gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gestionPresu.anyadirGasto(new gestionPresu.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gestionPresuWeb.mostrarDatosEnId(gestionPresu.calcularTotalGastos());
gestionPresuWeb.mostrarDatosEnId(gestionPresuWeb.calcularBalance());
gestionPresuWeb.mostrarGastoWEB(gestionPresu.listarGastos());

let filtrado1 = gestionPresu.filtrarGastos({fechaDesde:2021-09});
filtrado1.forEach(element => {
    gestionPresuWeb.mostrarGastoWEB("listado-gastos-filtrado-1",element);
});

let filtrado2 = gestionPresu.filtrarGastos({valorMinimo:50});
filtrado2.forEach(element => {
    gestionPresuWeb.mostrarGastoWEB("listado-gastos-filtrado-2",element);
});

let filtrado3 = gestionPresu.filtrarGastos({valorMinimo:200 , etiquetasTiene : ['seguros']});
filtrado3.forEach(element => {
    gestionPresuWeb.mostrarGastoWEB(gestionPresu.filtrarGastos({'listado-gastos-filtrado-3',element}));
});

let filtrado4 =gestionPresu.filtrarGastos({valorMinimo:50, etiquetasTiene : ['comida','transporte']});
filtrado4.forEach(element => {
    
});


gestionPresuWeb.mostrarGastoWEB(gestionPresu.filtrarGastos({valorMinimo:50, etiquetasTiene : ['comida','transporte']}));

gestionPresuWeb.mostrarGastosAgrupadosWeb(gestionPresu.agruparGastos("dia"));
gestionPresuWeb.mostrarGastosAgrupadosWeb(gestionPresu.agruparGastos("mes"));
gestionPresuWeb.mostrarGastosAgrupadosWeb(gestionPresu.agruparGastos("anyo"));