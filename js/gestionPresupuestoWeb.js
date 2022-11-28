import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento){
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += valor;
    }
}

function mostrarGastoWeb(gasto, idElemento){
   if(idElemento != null){
        let divGasto = document.createElement("div");
        divGasto.className = "gasto";

        let elemento = document.getElementById(idElemento);
        elemento.appendChild(divGasto);

        let divDescripcion = document.createElement("div");
        divDescripcion.className = "gasto-descripcion";
        divDescripcion.innerHTML += gasto.descripcion;
        divGasto.appendChild(divDescripcion);
        
        let divFecha = document.createElement("div");
        divFecha.className = "gasto-fecha";
        divFecha.innerHTML += gasto.fecha;
        divGasto.appendChild(divFecha);
        
        let divValor = document.createElement("div");
        divValor.className = "gasto-valor";
        divValor.innerHTML += gasto.valor;
        divGasto.appendChild(divValor);

        let divEtiquetas = document.createElement("div");
        divEtiquetas.className = "gasto-etiquetas";
        divGasto.appendChild(divEtiquetas);
        gasto.etiquetas.forEach(etiqueta => {
            let span = document.createElement("span");
            span.className = "gasto-etiquetas-etiqueta";
            span.innerHTML = etiqueta;
            divEtiquetas.appendChild(span);

            let objetoBorrarEtiqueta = new BorrarEtiquetasHandle();
            objetoBorrarEtiqueta.gasto = gasto;
            objetoBorrarEtiqueta.etiqueta = etiqueta;
            divEtiqueta1.addEventListener("click", objetoBorrarEtiqueta);
        });
        divGasto.appendChild(divEtiquetas);

        let btnEditar = document.createElement('button');
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.classList = "gasto-editar";

        let objetoEditar = new EditarHandle();
        objetoEditar.gasto = gasto;

        btnEditar.addEventListener("click", objetoEditar);
        divGasto.appendChild(btnEditar);

        let btnBorrar = document.createElement('button');
        btnBorrar.type = "button";
        btnBorrar.textContent = "Borrar";
        btnBorrar.classList = "gasto-borrar";

        let objetoBorrar = new BorrarHandle();
        objetoBorrar.gasto = gasto;

        btnBorrar.addEventListener("click", objetoBorrar);
        divGasto.appendChild(btnBorrar);
    }
}

function mostrarGastosAgrupadosWeb(agrup, periodo, idElemento){
    if(idElemento != null){
        let elemento = document.getElementById(idElemento);

        let divAgrup = document.createElement("div");
        divAgrup.className = "agrupacion";
            
        let tituloH1 = document.createElement('h1');
        tituloH1.innerHTML = "Gastos agrupados por " + periodo;
        divAgrup.appendChild(tituloH1);
    
        let contador = 0;
        let claves = Object.keys(agrup);
        for(let agrupCurrent in agrup){
            let divAgrupDato = document.createElement('div');
            divAgrupDato.className = "agrupacion-dato";
                
            let spanClave = document.createElement('span');
            spanClave.className = "agrupacion-dato-clave";
            spanClave.innerHTML = claves[contador];
            contador++;
            divAgrupDato.appendChild(spanClave);
    
            let spanValor = document.createElement('span');
            spanValor.className = "agrupacion-dato-valor";
            spanValor.innerHTML = agrup[agrupCurrent];
            
            divAgrupDato.appendChild(spanValor);
    
            divAgrup.appendChild(divAgrupDato);
        }
        elemento.appendChild(divAgrup);
    }
}

function repintarWeb(){
    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "presupuesto");
    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), "gastos-totales");
    mostrarDatoEnId(gestionPresupuesto.calcularBalance(), "balance-total");
    mostrarDatoEnId("", "listado-gastos-completo");

    gestionPresupuesto.listarGastos().forEach(gasto =>{
        mostrarGastoWeb(gasto, "listado-gastos-completo");
    });
}

let actualizarPresupuestoWeb = function(){
    let presupuesto = prompt("Introduce un presupuesto");
    if(presupuesto != null){
        presupuesto = parseFloat(presupuesto);
        gestionPresupuesto.actualizarPresupuesto(presupuesto);
        repintarWeb();
    }
    else{
        alert(`No es númerico`);
    }
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.onclick = actualizarPresupuestoWeb;

let nuevoGastoWeb = function(){
    let nuevaDescripcion = prompt("Escribe la descripcion del nuevo gasto: ");
    let nuevoValor = parseFloat(prompt("Escribe el valor del nuevo gasto: "));
    let nuevaFecha = prompt("Escribe la fecha del nuevo gasto: ");

    let etiquetasArray =[]
    
    let nuevoGasto = new gestionPresupuesto.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, etiquetasArray);

    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintarWeb();
}

let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.onclick = nuevoGastoWeb;

let EditarHandle = function(){
    this.handleEvent = function() {
        let nuevaDescripcion = prompt("Escribe la nueva descripcion del gasto: ", this.gasto.descripcion);
        let nuevoValor = Number(prompt("Escribe el nuevo valor del gasto: ", this.gasto.valor));
        let nuevaFecha = prompt("Escribe la nueva fecha del gasto: ", this.gasto.fecha);
        let nuevasEtiquetas = prompt("Añade etiquetas al gasto separadas por comas: ", this.gasto.etiquetas.join(", "));

        let etiquetasArray = nuevasEtiquetas.split(",");

        
        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarFecha(new Date(nuevaFecha));
        this.gasto.anyadirEtiquetas(etiquetasArray);
        
        repintar();
    }
}

let BorrarHandle = function(){
    this.handleEvent = function() {
        gestionPresupuesto.borrarGasto(this.gasto.id)
        repintarWeb();
    }
}

let BorrarEtiquetasHandle = function(){
    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintarWeb();
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintarWeb,
    nuevoGastoWeb
}