import * as gestionPresupuesto from "./gestionPresupuesto";
function mostrarDatoEnId(idElemento,valor)
{
    gestionPresupuesto.actualizarPresupuesto(valor);
    document.getElementById(idElemento).innerHTML = gestionPresupuesto.mostrarPresupuesto();
}
function mostrarGastoWeb(idElemento, gasto)
{
    let elemento = document.getElementById(idElemento);
    let DIVgasto = document.createElement('div');
    DIVgasto.className = 'gasto';
    let DIVdescripcion = document.createElement('div');
    DIVdescripcion.className = 'gasto-descripcion';
    DIVdescripcion.innerHTML = gasto.descripcion;
    let DIVfecha = document.createElement('div');
    DIVfecha.className = 'gasto-fecha';
    DIVfecha.innerHTML = gasto.fecha
    let DIVvalor = document.createElement('div');
    DIVvalor.className = 'gasto-valor';
    DIVvalor.innerHTML = gasto.valor;
    let DIVetiquetas = document.createElement('div');
    DIVetiquetas.className = 'gasto-etiquetas';
    DIVgasto.appendChild(DIVdescripcion);
    DIVgasto.appendChild(DIVfecha);
    DIVgasto.appendChild(DIVvalor);
    gasto.etiquetas.forEach(etiqueta => {
        let SPANetiqueta = document.createElement('span');
        SPANetiqueta.className = 'gasto-etiquetas-etiqueta';
        SPANetiqueta.innerHTML = etiqueta;
        DIVetiquetas.appendChild(SPANetiqueta);
    });
    DIVgasto.appendChild(DIVetiquetas);
    elemento.appendChild(DIVgasto);
    return elemento;
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let DIVagrupacion = document.createElement('div');
    DIVagrupacion.className = 'agrupacion';
    let H1titulo = document.createElement('h1');
    H1titulo.innerHTML = 'Gastos agrupados por' + periodo;
    DIVagrupacion.appendChild(H1titulo);
    Object.getOwnPropertyNames(agrup).forEach(function(fecha)
        {
            let DIVdato = document.createElement('div');
            DIVdato.className = 'agrupacion-dato';
            let SPANclave = document.createElement('span');
            SPANclave.className = 'agrupacion-dato-clave';
            SPANclave.innerHTML = fecha;
            let SPANvalor = document.createElement('span');
            SPANvalor.className = 'agrupacion-dato-valor';
            SPANvalor.innerHTML = agrup[fecha];
            DIVdato.appendChild(SPANclave);
            DIVdato.appendChild(SPANvalor);
            DIVagrupacion.appendChild(DIVdato);
        });
    elemento.appendChild(DIVagrupacion);
    return elemento;   
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}