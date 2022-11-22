import * as gestionPresupuesto from './gestionPresupuesto';
function mostrarDatoEnId(idElemento,valor)
{
    gestionPresupuesto.actualizarPresupuesto(valor);
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = gestionPresupuesto.mostrarPresupuesto();
    return elemento;
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
function mostrarGastosAgrupadosWeb()
{
    
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}