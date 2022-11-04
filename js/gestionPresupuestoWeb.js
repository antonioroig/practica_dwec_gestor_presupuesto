
function mostrarDatoEnId(valor, idElemento){
    let element = document.getElementById(idElemento);
    element.innerHTML += `<p>${valor}</p>`;
    /*let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    element.appendChild(parrafo);*/

    //  let p = document.createElement('p');
    // id.innerHTML += `<p>${valor}</p>`;

    /*let div = document.createElement('div');
    div.innerHTML = `<div id='${idElemento}'>${valor.toString()}</div>`;
    document.body.append(div);*/
    // document.write(`<div id='${idElemento}'>${valor}</div>`);
}
function mostrarGastoWeb(gasto, idElemento){
    let elemento = document.getElementById(idElemento);
    let div = document.createElement("div");
    let div1 = document.createElement("div")
    div.appendChild(div);
    `<div class="gasto">
    <div class="gasto-descripcion">${}</div>
    <div class="gasto-fecha">FECHA DEL GASTO</div> 
    <div class="gasto-valor">VALOR DEL GASTO</div> 
    <div class="gasto-etiquetas">
      <span class="gasto-etiquetas-etiqueta">
        ETIQUETA 1
      </span>
      <span class="gasto-etiquetas-etiqueta">
        ETIQUETA 2
      </span>
      <!-- Etcétera -->
    </div> 
  </div>`
    elemento.innerHTML 
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
}













export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}

