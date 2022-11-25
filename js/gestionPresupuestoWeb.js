 'use strict';
function mostrarDatoEnId(valor,idElemento)
{
   let elemento = document.getElementById(idElemento);
    elemento.innerHTML += valor;
   
}

function mostrarGastoWeb(gasto,idElemento)
{

  let elemento =document.getElementById(idElemento);

  let gastoDiv = document.createElement('div');
  gastoDiv.className += 'gasto';

  let presupuestoDiv = document.createElement('div');
  presupuestoDiv.className = 'presupuesto';
  
  

  let gestorPresupuestoDiv = document.createElement('div');
  gestorPresupuestoDiv.className = 'presupuesto';
  

  
  let descripcionDiv  = document.createElement('div');
  descripcionDiv.className = 'gasto-descripcion'; 
  descripcionDiv.textContent = gasto.descripcion;

  let fechaDiv = document.createElement('div');
  fechaDiv.className = 'gasto-fecha'; 
  fechaDiv.textContent = new Date(gasto.fecha).toLocaleDateString();
  
  let valorDiv = document.createElement('div');
  valorDiv.className = 'gasto-valor'; 
  valorDiv.textContent = gasto.valor;
  
  let etiquetasDiv = document.createElement('div');
  etiquetasDiv.className = 'gasto-etiquetas'; 

  /*gasto.etiquetas.forEach(etiqueta => {

    let span = document.createElement('span');
    span.className = 'gasto-etiquetas-etiqueta';
    span.textContent = etiqueta;
    etiquetasDiv.append(span);

  });*/

  for(let etiqueta of gasto.etiquetas){

    let span = document.createElement('span');
    span.classList.add('gasto-etiquetas-etiqueta') 
    span.textContent += etiqueta
    etiquetasDiv.append(span)
  }
  
  
  gastoDiv.append(presupuestoDiv);
  gastoDiv.append(gestorPresupuestoDiv);
  gastoDiv.append(descripcionDiv);
  gastoDiv.append(fechaDiv);
  gastoDiv.append(valorDiv);
  gastoDiv.append(etiquetasDiv);
  elemento.append(gastoDiv);
}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo)
{
  let parrafo = document.getElementById(idElemento);
 
  let agrupados;

  for( let [nombre, valor] of Object.entries( agrup ) )
  {

  agrupados += ` <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${nombre}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                  </div>

                `;
  }

  parrafo.innerHTML = `<div class="agrupacion">
                       <h1>Gastos agrupados por ${periodo}</h1>
                            ${agrupados}
                        </div>
                        `;

  
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}

