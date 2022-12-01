


import * as gp from './gestionPresupuesto.js';



function mostrarDatoEnId(idElemento, valor)
{

    if(idElemento)
    {
        let ele = document.getElementById(idElemento);
        ele.innerHTML += "" + valor;
    }


}

function mostrarGastoWeb(idElemento, gp) //mostrargpWeb
{
    if(idElemento)
    {
        let ele = document.getElementById(idElemento);
        let divGas = document.createElement('div');
        divGas.className = "gasto";
        ele.append(divGas);

        let divDes = document.createElement('div');
        divDes.className = "gasto-descripcion";
        divDes.innerHTML += gp.descripcion;
        divGas.append(divDes);

        let divFec = document.createElement('div');
        divFec.className = "gasto-fecha";
        divFec.innerHTML += gp.fecha;
        divGas.append(divFec);

        let divVal = document.createElement('div');
        divVal.className = "gasto-valor";
        divVal.innerHTML += gp.valor;
        divGas.append(divVal);

        let divEtiq = document.createElement('div');
        divEtiq.className = "gasto-etiquetas";
        
        
        for(let i = 0; i < gp.etiquetas.length; i++)
        {
            let spanEtiquetas = document.createElement('span');
            spanEtiquetas.className = "gasto-etiquetas-etiqueta";
            let val = gp.etiquetas[i];
            spanEtiquetas.innerHTML += " " + val + "\n";
            divEtiq.append(spanEtiquetas);
            
        }


        

        divGas.append(divEtiq);
        
       



    }
}



function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) //mostrargastosAgrupadosWeb
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
    mostrarDatoEnId("presupuesto",gp.mostrarPresupuesto());
    document.getElementById("gastos-totales");
    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());
    document.getElementById("balance-total");
    mostrarDatoEnId("balance-total", gp.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = " ";
   
    for(let gas of gp.listarGastos())
    {
        
        mostrarGastoWeb("listado-gastos-completo", gas);
    }
    

}

function actualizarPresupuestoWeb() 
{
    let pres = prompt('Escriba un presupuesto');
    let tot = parseFloat(pres);
    gp.actualizarPresupuesto(tot);
    repintar();
}

let actualizarPresButton = document.getElementById('actualizarpresupuesto');
actualizarPresButton.addEventListener('click', actualizarPresupuestoWeb);


function nuevoGastoWeb ()
{
    let desc = prompt('Introduzca una descripción');
    let val = prompt('Introduzca el valor del gasto');
    let valFloat = parseFloat(val);
    let fec = Date.parse(prompt('Introduzca la fecha del gasto'));
    let etiq = prompt('Introduzca las etiquetas del gasto').split(',');
    let gas = new gp.CrearGasto(desc, valFloat, fec,...etiq);
    gp.anyadirGasto(gas);

    repintar()


}

let nuevoGastoButton = document.getElementById('anyadirgasto');
nuevoGastoButton.addEventListener('click', nuevoGastoWeb);



function EditarHandle()
{
    this.handleEvent = function(){
        let descrip = prom("Escriba una descripción");
        this.gp.actualizarDescripcion(descrip);
    }
}






export   {
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb,
repintar,
actualizarPresupuestoWeb,
nuevoGastoWeb
}