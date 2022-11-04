/* import gestionPresupuesto */
import * as gestionPresupuesto from './gestionPresupuesto.js';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento
//idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
// valor - El valor a mostrar.

// https://monsterlessons.com/project/series/rabota-s-dom-derevom-v-javascript -- GUIDE
// https://es.javascript.info/searching-elements-dom - getElementById y innerHTML
function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML = `<p>${valor}<\p>`;
}
function mostrarGastoWeb(idElemento, gasto){
    
    let elemento = getElementById(idElemento);
    // gasto
    let divGasto = document.createElement('div');
    divGasto.className = 'gasto';
    // gasto-descripcion
    let divDesc = document.createElement('div');
    divDesc.className = 'gasto-descripcion';
    divDesc.textContent = gasto.descripcion;
    divGasto.append(divDesc);
    // gasto-fecha
    let divFecha = document.createElement('div');
    divFecha.className = 'gasto-fecha';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divFecha);
    // gasto-valor
    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.append(divValor);
    // gasto-etiquetas
    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';

    for(let i = 0; i < gasto.etiquetas.length; i++){

        // gasto-etiquetas-etiqueta
        let contenidoEtiqueta = gasto.etiquetas[i];
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = contenidoEtiqueta + ' ';
        divGastoEtiquetas.append(spanEtiqueta);    
    }
    divGasto.append(divGastoEtiquetas);
    // - - - - - - - - - - - - - -
   
    elemento.append(divGasto);
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