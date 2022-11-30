<<<<<<< HEAD
import * as gestionPresupuesto from "./gestionPresupuesto";
function mostrarDatoEnId(idElemento,valor)
{
    gestionPresupuesto.actualizarPresupuesto(valor);
    document.getElementById(idElemento).innerHTML = gestionPresupuesto.mostrarPresupuesto();
=======
<<<<<<< Updated upstream
import * as gestionPresupuesto from "./gestionPresupuesto.js";
function mostrarDatoEnId(idElemento,valor)
{
    document.getElementById(idElemento).innerHTML = valor;
=======
'use strict';
import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento,valor)
{
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML = valor;
>>>>>>> Stashed changes
>>>>>>> parent of bbcab75 (Revert "25/11/2022")
}
function mostrarGastoWeb(idElemento, gasto)
{
    let elemento = document.getElementById(idElemento);
<<<<<<< HEAD
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
=======
    gastos.forEach(gasto => {
        let DIVgasto = document.createElement('div');
        DIVgasto.className = 'gasto';
        let DIVdescripcion = document.createElement('div');
        DIVdescripcion.className = 'gasto-descripcion';
        DIVdescripcion.innerHTML = gasto.descripcion;
        let DIVfecha = document.createElement('div');
        DIVfecha.className = 'gasto-fecha';
<<<<<<< Updated upstream
        let fechatostring = new Date(gasto.fecha);
        DIVfecha.innerHTML = fechatostring.toLocaleString();
        let DIVvalor = document.createElement('div');
        DIVvalor.className = 'gasto-valor';
        DIVvalor.innerHTML = gasto.valor + " €";
=======
        DIVfecha.innerHTML = gasto.fecha;
        let DIVvalor = document.createElement('div');
        DIVvalor.className = 'gasto-valor';
        DIVvalor.innerHTML = gasto.valor;
>>>>>>> Stashed changes
        let DIVetiquetas = document.createElement('div');
        DIVetiquetas.className = 'gasto-etiquetas';
        DIVgasto.appendChild(DIVdescripcion);
        DIVgasto.appendChild(DIVfecha);
        DIVgasto.appendChild(DIVvalor);
        gasto.etiquetas.forEach(etiqueta => {
            let SPANetiqueta = document.createElement('span');
            SPANetiqueta.className = 'gasto-etiquetas-etiqueta';
<<<<<<< Updated upstream
            SPANetiqueta.innerHTML = " " + etiqueta;
=======
            SPANetiqueta.innerHTML = etiqueta;
>>>>>>> Stashed changes
            DIVetiquetas.appendChild(SPANetiqueta);
        });
        DIVgasto.appendChild(DIVetiquetas);
        elemento.appendChild(DIVgasto);
>>>>>>> parent of bbcab75 (Revert "25/11/2022")
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
<<<<<<< HEAD
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
=======
<<<<<<< Updated upstream
    for(let propiedad of Object.keys(agrup))
=======
    for(let fecha of Object.keys(agrup))
>>>>>>> Stashed changes
    {
        let DIVdato = document.createElement('div');
        DIVdato.className = 'agrupacion-dato';
        let SPANclave = document.createElement('span');
        SPANclave.className = 'agrupacion-dato-clave';
<<<<<<< Updated upstream
        SPANclave.innerHTML += `${propiedad}`;
        let SPANvalor = document.createElement('span');
        SPANvalor.className = 'agrupacion-dato-valor';
        SPANvalor.innerHTML += " " + agrup[propiedad] + " €";
=======
        SPANclave.innerHTML = "Gastos agrupados por " + `${fecha}`;
        let SPANvalor = document.createElement('span');
        SPANvalor.className = 'agrupacion-dato-valor';
        SPANvalor.innerHTML = `${fecha.valueOf()}`;
>>>>>>> Stashed changes
        DIVdato.appendChild(SPANclave);
        DIVdato.appendChild(SPANvalor);
        DIVagrupacion.appendChild(DIVdato);
    }
    elemento.appendChild(DIVagrupacion);
<<<<<<< Updated upstream
=======
    return elemento;
>>>>>>> Stashed changes
>>>>>>> parent of bbcab75 (Revert "25/11/2022")
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}