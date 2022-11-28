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
            span.addEventListener("click", objetoBorrarEtiqueta);
        });
        divGasto.appendChild(divEtiquetas);

        let btnEditar = document.createElement('button');
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.className = "gasto-editar";

        let objetoEditar = new EditarHandle();
        objetoEditar.gasto = gasto;

        btnEditar.addEventListener("click", objetoEditar);
        divGasto.appendChild(btnEditar);

        let btnBorrar = document.createElement('button');
        btnBorrar.type = "button";
        btnBorrar.textContent = "Borrar";
        btnBorrar.className = "gasto-borrar";

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
    
    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML="";

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
    let descripcion = prompt("Introduzca la descripción:");
    let valor = parseFloat(prompt("Introduzca el valor: "));
    let fecha = prompt("Introduzca la fecha: ");

    let etiquetasArray = prompt("Introduce las etiquetas: ").split(',');
    
    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetasArray);

    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintarWeb();
}

let botonAnyadirGasto = document.getElementById('anyadirgasto');
botonAnyadirGasto.onclick = nuevoGastoWeb;

let EditarHandle = function(){
    this.handleEvent = function() {
        let descripcion = prompt("Introduzca la descripción:");
        let valor = parseFloat(prompt("Introduzca el valor: "));
        let fecha = prompt("Introduzca la fecha: ");
        let etiquetasArray = prompt("Introduce las etiquetas: ").split(',');
        
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(new Date(fecha));
        this.gasto.anyadirEtiquetas(etiquetasArray);
        
        repintarWeb();
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