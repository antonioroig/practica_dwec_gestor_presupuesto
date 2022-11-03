

// Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento
//idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
// valor - El valor a mostrar.

// 
// https://es.javascript.info/searching-elements-dom - getElementById y innerHTML
function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento).innerHTML;
    valor = `<p>${elemento}</p>`;
    return valor;
}
function mostrarGastoWeb(){

}
function mostrarGastosAgrupadosWeb(){

}



// npx cypress open -- PARA HACER TEST GRÁFICO
// npm run test --> pasa todos los tests
// EXPORT - EXPORT - EXPORT - EXPORT - EXPORT - EXPORT - EXPORT - EXPORT - EXPORT - EXPORT - EXPORT - EXPORT
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
 }