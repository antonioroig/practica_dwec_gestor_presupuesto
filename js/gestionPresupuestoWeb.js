import * as gestionPresupuesto from "./gestionPresupuesto.js";
function mostrarDatoEnId(idElemento,valor)
{
    document.getElementById(idElemento).innerHTML = valor;
}
function mostrarGastoWeb(idElemento, gastos)
{
    let elemento = document.getElementById(idElemento);
    gastos.forEach(gasto => {
        let DIVgasto = document.createElement('div');
        DIVgasto.className = 'gasto';
        let DIVdescripcion = document.createElement('div');
        DIVdescripcion.className = 'gasto-descripcion';
        DIVdescripcion.innerHTML = gasto.descripcion;
        let DIVfecha = document.createElement('div');
        DIVfecha.className = 'gasto-fecha';
        let fechatostring = new Date(gasto.fecha);
        DIVfecha.innerHTML = fechatostring.toLocaleString();
        let DIVvalor = document.createElement('div');
        DIVvalor.className = 'gasto-valor';
        DIVvalor.innerHTML = gasto.valor + " €";
        let DIVetiquetas = document.createElement('div');
        DIVetiquetas.className = 'gasto-etiquetas';
        DIVgasto.appendChild(DIVdescripcion);
        DIVgasto.appendChild(DIVfecha);
        DIVgasto.appendChild(DIVvalor);
        gasto.etiquetas.forEach(etiqueta => {
            let SPANetiqueta = document.createElement('span');
            SPANetiqueta.className = 'gasto-etiquetas-etiqueta';
            SPANetiqueta.innerHTML = " " + etiqueta;
            DIVetiquetas.appendChild(SPANetiqueta);
        });
        DIVgasto.appendChild(DIVetiquetas);
        elemento.appendChild(DIVgasto);
    });
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let DIVagrupacion = document.createElement('div');
    DIVagrupacion.className = 'agrupacion';
    let H1titulo = document.createElement('h1');
    H1titulo.innerHTML = 'Gastos agrupados por ' + periodo;
    DIVagrupacion.appendChild(H1titulo);
    for(let propiedad of Object.keys(agrup))
    {
        let DIVdato = document.createElement('div');
        DIVdato.className = 'agrupacion-dato';
        let SPANclave = document.createElement('span');
        SPANclave.className = 'agrupacion-dato-clave';
        SPANclave.innerHTML += `${propiedad}`;
        let SPANvalor = document.createElement('span');
        SPANvalor.className = 'agrupacion-dato-valor';
        SPANvalor.innerHTML += " " + agrup[propiedad] + " €";
        DIVdato.appendChild(SPANclave);
        DIVdato.appendChild(SPANvalor);
        DIVagrupacion.appendChild(DIVdato);
    }
    elemento.appendChild(DIVagrupacion);
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}