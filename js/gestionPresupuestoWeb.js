// Muestra en un div el valor que se le pasa por parámetro

function mostrarDatoEnId(valor, idElemento){
    let element = document.getElementById(idElemento);
    element.innerHTML += `<p>${valor}</p>`;
    
}
function mostrarGastoWeb(gasto, idElemento){

    let elemento = document.getElementById(idElemento);

    for(let i in gasto){
      if(!Array.isArray(i)){

        let div = document.createElement('div');
        div.classList.add(`gasto-${i}`);
        div.textContent = i;

      }else{

        let etiquetas = document.createElement('div');
        etiquetas.classList.add("gasto-etiquetas-etiqueta");

        for(let j of gasto[i]){
          let span = document.createElement('span')
          span.textContent += j
          etiquetas.appendChild(span)
        }

        elemento.appendChild(etiquetas);
      }
    }

}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
   
}


export    {

  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb

}

