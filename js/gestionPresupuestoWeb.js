/* import gestionPresupuesto */
import * as gestionPresupuesto from './gestionPresupuesto.js';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento
//idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
// valor - El valor a mostrar.

// 
// https://es.javascript.info/searching-elements-dom - getElementById y innerHTML
function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML = `<p>${valor}<\p>`;
}
function mostrarGastoWeb(){
    return null;
}
function mostrarGastosAgrupadosWeb(){
    return null;
}



// npx cypress open -- PARA HACER TEST GRÁFICO
// npm run test --> pasa todos los tests
// EXPORT
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
 }