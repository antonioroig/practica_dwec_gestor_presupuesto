import * as gestionPresupuesto from './gestionPresupuesto.js';





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

function mostrarGastosAgrupadosWeb( agrup, periodo, idElemento){
    if(idElemento!=null){
        var divAgrupacion = document.createElement("div");
        divAgrupacion.classList="agrupacion";
        
        var h1 =document.createElement('h1');
        h1.innerHTML="Gastos agrupados por "+periodo;
        divAgrupacion.appendChild(h1);

        var claves = Object.keys(agrup);
        let i=0;

        for(let agrupActual in agrup){
            var divAgr1 =document.createElement('div');
            divAgr1.classList="agrupacion-dato";
            
            var spanClave = document.createElement('span');
            spanClave.classList="agrupacion-dato-clave";
            spanClave.innerHTML=claves[i];
            i++;
            divAgr1.appendChild(spanClave);

            var spanValor = document.createElement('span');
            spanValor.classList="agrupacion-dato-valor";
            spanValor.innerHTML=agrup[agrupActual];
            divAgr1.appendChild(spanValor);

            divAgrupacion.appendChild(divAgr1);
        }

        var elemento = document.getElementById(idElemento);
        elemento.appendChild(divAgrupacion);
    }
}

let actualizarPresupuestoWeb = function(){
    let presupuesto = prompt("Introduce un presupuesto", 1000);
    if(presupuesto != null){
        presupuesto = parseFloat(presupuesto);
        gestionPresupuesto.actualizarPresupuesto(presupuesto);
        repintar();
    }
}

function repintar(){
    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "presupuesto");

    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), "gastos-totales");

    mostrarDatoEnId(gestionPresupuesto.calcularBalance(), "balance-total");

    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML="";

    gestionPresupuesto.listarGastos().forEach(gasto =>{
        mostrarGastoWeb(gasto, "listado-gastos-completo");
    });
}


var botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.onclick=actualizarPresupuestoWeb;

let nuevoGastoWeb = function(){
    let nuevaDescripcion = prompt("Escribe la descripcion del nuevo gasto: ", "Descripcion");
    let nuevoValor = parseFloat(prompt("Escribe el valor del nuevo gasto: ", 100));
    var nuevaFecha = prompt("Escribe la fecha del nuevo gasto: ", "2022-09-22");
    var nuevasEtiquetas = prompt("Escribe las etiquetas del nuevo gasto separadas por comas: ", "etiqueta1, etiqueta2, etiqueta3");
    /*
    var etiquetasArray= new Array();
    var i=0;
    for(let letra in nuevasEtiquetas){
        if(letra!==","){
            etiquetasArray[i]+=letra;
        }else{
            i++;
        }
    }*/
    var etiquetasArray = nuevasEtiquetas.split(",");
    
    var nuevoGasto = new gestionPresupuesto.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, etiquetasArray);

    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}


var botonNuevoGasto = document.getElementById("anyadirgasto");
botonNuevoGasto.onclick=nuevoGastoWeb;

let EditarHandle = function(){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle
}