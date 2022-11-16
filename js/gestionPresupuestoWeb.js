import{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos 
} from './gestionPresupuesto.js';

function mostrarDatoEnId(valor, idElemento){
    if(idElemento!=null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML+=valor;
    }
}

function mostrarGastoWeb(gasto, idElemento){
    if(idElemento!=null){
        var divGasto = document.createElement('div');
        divGasto.classList="gasto";

        var divDescripcion = document.createElement('div');
        divDescripcion.classList="gasto-descripcion";
        divDescripcion.innerHTML=gasto.descripcion;
        divGasto.appendChild(divDescripcion);

        var divFecha = document.createElement('div');
        divFecha.classList="gasto-fecha";
        divFecha.innerHTML=gasto.fecha;
        divGasto.appendChild(divFecha);

        var divValor = document.createElement('div');
        divValor.classList="gasto-valor";
        divValor.innerHTML=gasto.valor;
        divGasto.appendChild(divValor);

        var divEtiquetas = document.createElement('div');
        divEtiquetas.classList="gasto-etiquetas";
        
        gasto.etiquetas.forEach(etiqueta => {
            var divEtiqueta1 = document.createElement('span');
            divEtiqueta1.classList="gasto-etiquetas-etiqueta";
            divEtiqueta1.innerHTML=etiqueta;
            divEtiquetas.appendChild(divEtiqueta1);
        });
        divGasto.appendChild(divEtiquetas);

        var elemento = document.getElementById(idElemento);
        elemento.appendChild(divGasto);
    }
}

function mostrarGastosAgrupadosWeb( ){
    
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}