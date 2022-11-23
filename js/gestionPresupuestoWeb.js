


import * as gasto from './gestionPresupuesto.js';



function mostrarDatoEnId(idElemento, valor)
{

    if(id)
    {
        let ele = document.getElementById(idElemento);
        ele.innerHTML += "" + valor;
    }


}

function mostrarGastoWeb(gasto, idElemento)
{
    if(id)
    {
        let ele = document.getElementById(idElemento);
        let divGas = document.createElement('div');
        divGas.className = "gasto";

        let divDes = document.createElement('div');
        divDes.className = "descripcion";
        divDes.innerHTML += gasto.descripcion;
        divGas.append(divDes);

        let divFec = document.createElement('div');
        divFec.className = "fecha";
        divFec.innerHTML += gasto.fecha;
        divGas.append(divFec);

        let divVal = document.createElement('div');
        divVal.className = "valor";
        divVal.innerHTML += gasto.valor;
        divGas.append(divVal);

        let divEtiq = document.createElement('div');
        divEtiq.className = "etiqueta";
        

        for(let i = 0; i < gasto.etiquetas.length; i++)
        {
            let divEtiquetas = document.createElement('span');
            divEtiquetas.className = "etiquetas";
            divEtiquetas.innerHTML += gasto.etiquetas;
            divGas.append(divEtiquetas);
        }

        divGas.append(divEtiq);
        
        ele.append(divGas);



    }
}



function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{

    if(idElemento)
    {
        let ele = document.getElementById(idElemento);
        let divgrup = document.createElement('div');
        divgrup = "grupo";

        
        let divTit = document.createElement('h1');
        divTit.innerHTML = "titulos";
        divgrup.append(divTit);

        for(let k of Object.keys(agrup))
        {
            let divDatos = document.createElement('div');
            divDatos.className = 'datos';
            let datoClave = document.createElement('span');
            datoClave.className = 'datos-calve';
            datoClave.innerHTML += `${clave.valueOf()}`;
            datoClave.append(datoClave);
            let valor = document.createElement('span');
            valor.className = 'valor';
            valor.innerHTML = gasto.valor;
            datoClave.append(valor);
        }


    }

}




export   {
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb
}