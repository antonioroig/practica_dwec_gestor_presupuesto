import * as gestionPresupuesto from './gestionPresupuesto.js';
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);
}
function mostrarGastoWeb(idElemento, gasto) {
    let elemento2 = document.getElementById(idElemento);

    //Creamos un div con class="gasto".
    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';                                                                       

    let divDescripcion  = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion'; 
    divDescripcion.textContent = gasto.descripcion;
    //Para decir que está dentro del div divGasto:
    divGasto.appendChild(divDescripcion);

    let divFecha  = document.createElement('div');
    divFecha.className = 'gasto-fecha'; 
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiqueta';
    divGasto.appendChild(divGastoEtiquetas);
    
    //Ahora necesitamos un bucle para recorrer los gastos
    for(let i = 0; i < gasto.etiquetas.length; i++)
    {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent =  `${gasto.etiquetas[i]}`;
        divGastoEtiquetas.appendChild(spanEtiqueta);
    }
    elemento2.appendChild(divGasto);
}
function mostrarGastosAgrupados(idElemento, agrup, preiodo){

}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupados
}