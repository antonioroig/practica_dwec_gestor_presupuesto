


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
        ele.append(divGas);

        let divDes = document.createElement('div');
        divDes.className = "gasto-descripcion";
        divDes.innerHTML += gasto.descripcion;
        divGas.append(divDes);

        let divFec = document.createElement('div');
        divFec.className = "gasto-fecha";
        divFec.innerHTML += gasto.fecha;
        divGas.append(divFec);

        let divVal = document.createElement('div');
        divVal.className = "gasto-valor";
        divVal.innerHTML += gasto.valor;
        divGas.append(divVal);

        let divEtiq = document.createElement('div');
        divEtiq.className = "gasto-etiquetas";
        
        
        for(let i = 0; i < gasto.etiquetas.length; i++)
        {
            let spanEtiquetas = document.createElement('span');
            spanEtiquetas.className = "gasto-etiquetas-etiqueta";
            let val = gasto.etiquetas[i];
            spanEtiquetas.innerHTML += " " + val + "\n";
            divEtiq.append(spanEtiquetas);
            
        }


        

        divGas.append(divEtiq);
        
       



    }
}



function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{

    if(idElemento)
    {
        let ele = document.getElementById(idElemento);
        let divGrup = document.createElement('div');
        divGrup.className = "agrupacion";
        let tit = document.createElement('h1');
        tit.innerHTML = `Gastos agrupados por ${periodo}`;
        divGrup.append(tit);
     
        for(let value of Object.keys(agrup))
        {
     
             let divDat = document.createElement('div');
             divDat.className = "agrupacion-dato";
     
             let datosClav = document.createElement('span');
             datosClav.className = 'agrupacion-dato-clave';
             datosClav.innerHTML += `${value}`;
             divDat.append(datosClav);
     
             let valor = document.createElement('span');
             valor.className = 'agrupacion-dato-valor';
             valor.innerHTML +=  `${value.valueOf()}`;
             divDat.append(valor);
     
             divGrup.append(divDat);
     
     
     
        }
     
        ele.append(divGrup);
         
    }


}


function repintar()
{
    document.getElementById("presupuesto");
    mostrarDatoEnId("presupuesto",gasto.mostrarPresupuesto());
    document.getElementById("gastos-totales");
    mostrarDatoEnId("gastos-totales", gasto.calcularTotalGastos());
    document.getElementById("balance-total");
    mostrarDatoEnId("balance-total", gasto.calcularBalance());

   
    for(let i = 0; i < gasto.listarGastos(); i++)
    {
        let gas = gasto.listarGastos[i];

        mostrarGastoWeb("listado-gastos-completo", gas);
    }
    document.getElementById("listado-gasto-completo").innerHTML = " ";

}









export   {
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb
}