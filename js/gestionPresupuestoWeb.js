// Muestra en un div el valor que se le pasa por parámetro

function mostrarDatoEnId(valor, idElemento){
    let element = document.getElementById(idElemento);
    element.innerHTML += `<p>${valor}</p>`;
    
}
function mostrarGastoWeb(gasto, idElemento){

    let elemento = document.getElementById(idElemento);

    // div con descripcion
    let div = document.createElement('div');
    div.classList.add(`gasto-descripcion`);
    div.textContent = gasto.descripcion;;
    elemento.append(div);

    // div gasto-fecha
    let fechaAux = new Date(gasto.fecha)

    div = document.createElement('div');
    div.classList.add(`gasto-fecha`);
    div.textContent = (fechaAux.toLocaleString());
    elemento.append(div);

    // div gasto-valor
    div = document.createElement('div');
    div.classList.add(`gasto-valor`);
    div.textContent = gasto.valor;;
    elemento.append(div);

    // div gasto-etiquetas
    div = document.createElement('div');
    div.classList.add(`gasto-etiquetas`);

    for(let j of gasto.etiquetas){
      let span = document.createElement('span')
      span.classList.add("gasto-etiquetas-etiqueta")
      span.textContent += j
      div.append(span)
    }
    elemento.append(div);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
   
}


export    {

  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb

}

