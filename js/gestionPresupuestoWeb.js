import * as gestionPresupuesto from '../js/gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    if(idElemento != undefined) {
        let div = document.getElementById(idElemento);
        div.innerHTML += "" + valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    if(idElemento != undefined){
        let div = document.getElementById(idElemento);

        let divgasto = document.createElement('div');
        divgasto.className = "gasto";

        let gastodes = document.createElement('div');
        gastodes.className = "gasto-descripcion";
        gastodes.innerHTML = gasto.descripcion;
        divgasto.append(gastodes);

        let gastofecha = document.createElement('div');
        gastofecha.className = "gasto-fecha";
        let fecha1 = new Date(gasto.fecha);
        let txtfecha = fecha1.toLocaleString();
        gastofecha.innerHTML = txtfecha;
        divgasto.append(gastofecha);

        let gastovalor = document.createElement('div');
        gastovalor.className = "gasto-valor";
        gastovalor.innerHTML = gasto.valor;
        divgasto.append(gastovalor);

        let gastoeti = document.createElement('div');
        gastoeti.className = "gasto-etiquetas";
        
        //if (gasto.etiquetas.length != undefined) {
        for (let i = 0; i < gasto.etiquetas.length; i++) {
            let eti = document.createElement('span');
            eti.className = "gasto-etiquetas-etiqueta";
            eti.innerHTML = gasto.etiquetas[i];
            gastoeti.append(eti);
        }                       
        //}

        divgasto.append(gastoeti);
        div.append(divgasto);       
    }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let div = document.getElementById(idElemento);

    let agrupacion = document.createElement('div');
    agrupacion.className = "agrupacion";

    let encabezado = document.createElement('h1');
    encabezado.innerHTML = "Gasto agrupados por " + periodo;
    agrupacion.append(encabezado);

    for (let i = 0; i < agrup.length; i++) {
        let agrupaciondato = document.createElement('div');
        agrupaciondato.className = "agrupacion-dato";

        let dataclave = document.createElement('span');
        dataclave.className = "agrupacion-dato-clave";
        let Arrclaves =  Object.keys(agrup[i]);
        let claves;
        for (let i = 0; i < Arrclaves.length; i++) {
            claves += Arrclaves[i] + "\n";
        }
        dataclave.innerHTML(claves);

        let datavalor = document.createElement('span');
        datavalor.className = "agrupacion-dato-valor";
        let ArrValores = Object.values(agrup[i]);
        let valores;
        for (let i = 0; i < ArrValores.length; i++) {
            valores += ArrValores[i] + "\n";
        }
        datavalor.innerHTML(valores);

        agrupaciondato.append(dataclave);
        agrupaciondato.append(datavalor);  
    }

    agrupacion.append(agrupaciondato);
    div.append(agrupacion);
}

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}