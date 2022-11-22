function mostrarDatoEnId(idElemento, valor) {
    if(idElemento != null){
        let elementoHTML = document.getElementById(idElemento);
        elementoHTML.innerHTML += valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    if(idElemento != null){
        let gastoHTML = document.createElement("div");
        gastoHTML.className = "gasto";

        let elementoHTML = document.getElementById(idElemento);
        elementoHTML.appendChild(gastoHTML);

        let descripcionHTML = document.createElement("div");
        descripcionHTML.className = "gasto-descripcion";
        descripcionHTML.innerHTML += gasto.descripcion;
        gastoHTML.appendChild(descripcionHTML);
        
        let fechaHTML = document.createElement("div");
        fechaHTML.className = "gasto-fecha";
        fechaHTML.innerHTML += gasto.fecha;
        gastoHTML.appendChild(fechaHTML);
        
        let valorHTML = document.createElement("div");
        valorHTML.className = "gasto-valor";
        valorHTML.innerHTML += gasto.valor;
        gastoHTML.appendChild(valorHTML);

        let etiquetasHTML = document.createElement("div");
        etiquetasHTML.className = "gasto-etiquetas";
        gastoHTML.appendChild(etiquetasHTML);
        gasto.etiquetas.forEach(etiqueta => {
            let span = document.createElement("span");
            span.className = "gasto-etiquetas-etiqueta";
            span.innerHTML = etiqueta;
            etiquetasHTML.appendChild(span);
        });

        gastoHTML.appendChild(etiquetasHTML);
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    if(idElemento != null) {
        let i = 0;
        let elemento = document.getElementById(idElemento);

        let agrupHTML = document.createElement("div");
        agrupHTML.className = "agrupacion";
            
        let titleHTML = document.createElement('h1');
        titleHTML.innerHTML = "Gastos agrupados por " + periodo;
        agrupHTML.appendChild(titleHTML);
    
        let keys = Object.keys(agrup);
        for(let actualAgroup in agrup){
            let agrupInfoHTML = document.createElement('div');
            agrupInfoHTML.className = "agrupacion-dato";
                
            let keysHTML = document.createElement('span');
            keysHTML.className = "agrupacion-dato-clave";
            keysHTML.innerHTML = keys[i];
            agrupInfoHTML.appendChild(keysHTML);
    
            let valueHTML = document.createElement('span');
            valueHTML.className = "agrupacion-dato-valor";
            valueHTML.innerHTML = agrup[actualAgroup];
            
            agrupInfoHTML.appendChild(valueHTML);
    
            agrupHTML.appendChild(agrupInfoHTML);

            i++;
        }

        elemento.appendChild(agrupHTML);
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}