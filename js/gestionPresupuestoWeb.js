


import * as gasto from './gestionPresupuesto.js';



function mostrarDatoEnId(idElemento, valor)
{

    if(idElemento)
    {
        let ele = document.getElementById(idElemento);
        ele.innerHTML += "" + valor;
    }


}

function mostrarGastoWeb(idElemento, gasto)
{
    if(idElemento)
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
        let divGrup = document.createElement('div');
        divGrup.className = "grupos";
        let tit = document.createElement('h1');
        tit.innerHTML = `Gastos agrupados por ${periodo}`;
        divGrup.append(tit);
     
        for(let value of Object.keys(agrup))
        {
     
             let divDat = document.createElement('div');
             divDat.className = "datos";
     
             let datosClav = document.createElement('span');
             datosClav.className = 'datosClaves';
             datosClav.innerHTML += `${value}`;
             divDat.append(datosClav);
     
             let valor = document.createElement('span');
             valor.className = 'valor';
             divDat.append(valor);
     
             divGrup.append(divDat);
     
     
     
        }
     
        ele.append(divGrup);
         
    }


}







export   {
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb
}