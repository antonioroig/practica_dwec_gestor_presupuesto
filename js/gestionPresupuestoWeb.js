import * as gestionPresupuesto from './gestionPresupuesto.js';
function mostrarDatoEnId(valor,idElemento) {
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.append(parrafo);
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
    divGastoEtiquetas.className = 'gasto-etiquetas';
    divGasto.appendChild(divGastoEtiquetas);
    
    //Ahora necesitamos un bucle para recorrer los gastos
    for(let i = 0; i < gasto.etiquetas.length; i++)
    {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent =  `${gasto.etiquetas[i]}\n`;
        divGastoEtiquetas.appendChild(spanEtiqueta);
    }
    elemento2.appendChild(divGasto);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento3 = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = 'agrupacion';
    elemento3.append(divAgrupacion);

    let encabezado = document.createElement('h1');
    encabezado.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(encabezado);

    for( let [nombre, valor] of Object.entries( agrup ) ){
    {
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = 'agrupacion-dato';
        divAgrupacion.append(divAgrupacionDato);

        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent = nombre;
        divAgrupacionDato.append(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent = valor;
        divAgrupacionDato.append(spanValor);
    }
    }
}

// nueva práctica
function repintar(){
    //Limpia el contenido del div presupuesto, y lo muestra vacío.
    document.getElementById("presupuesto").innerHTML="";
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

    document.getElementById("gastos-totales").innerHTML="";
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

    document.getElementById("balance-total").innerHTML="";
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    //Limpiamos toda la estructura HTML para volver a mostrarla actualizada.
    document.getElementById("listado-gastos-completo").innerHTML = "";
    gestionPresupuesto.listarGastos().forEach(gastos => {
        mostrarGastoWeb("listado-gastos-completo", gastos);
    });

    document.getElementById("listado-gastos-filtrado-1").innerHTML="";
    gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}).forEach(gastoFiltrado => {
        mostrarGastoWeb("listado-gastos-filtrado-1",gastoFiltrado);
    });

    document.getElementById("listado-gastos-filtrado-2").innerHTML = "";
    gestionPresupuesto.filtrarGastos({valorMinimo: 50}).forEach(gastoFiltrado => {
        mostrarGastoWeb("listado-gastos-filtrado-2", gastoFiltrado);
    });

    document.getElementById("listado-gastos-filtrado-3").innerHTML = "";
    gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}).forEach(gastoFiltrado => {
        mostrarGastoWeb("listado-gastos-filtrado-3", gastoFiltrado);
    });

    document.getElementById("listado-gastos-filtrado-4").innerHTML = "";
    gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida" , "transporte"]}).forEach(gastoFiltrado => {
        mostrarGastoWeb("listado-gastos-filtrado-4", gastoFiltrado);
    });
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}