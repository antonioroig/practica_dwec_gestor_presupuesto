function mostrarDatoEnId(valor, idElemento){
    let element = document.getElementById(idElemento);
    element.innerHTML += `<p>${valor}</p>`;
    
}
function mostrarGastoWeb(gasto, idElemento){
    let elemento = document.getElementById(idElemento);

    /*for (const [key, value] of Object.entries(gasto)) {
      if(!Array.isArray(value) &&  !key.includes('function')){

        let div = document.createElement('div');
        div.classList.add(`gasto-${key}`);
        div.textContent = value;
        elemento.appendChild(div);

        // elemento.innerHTML = `<div class="gasto-${key}">${value}</div>`;
      }else{

        let etiquetas = document.createElement('div');
        etiquetas.classList.add("gasto-etiquetas-etiqueta");

        for(let j of value){
          let span = document.createElement('span')
          span.textContent += j
          etiquetas.appendChild(span)
        }

        elemento.appendChild(etiquetas);
      }
    }*/
      
    for(let i in gasto){
      if(!Array.isArray(i) && !i.includes('function')){

        let div = document.createElement('div');
        div.classList.add(`gasto-${i}`);
        div.textContent = gasto[i];
        elemento.appendChild(div);

        // elemento.innerHTML = `<div class="gasto-${key}">${value}</div>`;
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

      /*if(!Array.isArray(gasto[i]))
      {
        elemento.innerHTML = `<div class="gasto-${i}">${gasto[i]}</div>`;
      }else{
        for(let j in gasto[i]){
          let span= document.createElement('span');
          span.contains = j;
        }
        elemento.innerHTML(span);
      }*/
    }
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
}













export  {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}

