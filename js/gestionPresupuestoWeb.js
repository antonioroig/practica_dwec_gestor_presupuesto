


import * as gp from './gestionPresupuesto.js';



function mostrarDatoEnId(idElemento, valor)
{

    if(idElemento)
    {
        let ele = document.getElementById(idElemento);
        ele.innerHTML += "" + valor;
    }


}

function mostrarGastoWeb(idElemento, gasto) //mostrargpWeb
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

            

        let borEtiq = new BorrarEtiquetasHandle();
        borEtiq.gasto = gasto;
        borEtiq.etiquetas = val;
        spanEtiquetas.addEventListener('click', borEtiq);
        

            
        }


        

        divGas.append(divEtiq);
        
        let editarBoton = document.createElement('button');
        editarBoton.type = 'button';
        editarBoton.className = 'gasto-editar';
        editarBoton.innerHTML = 'Editar';

        let edit = new EditarHandle(gasto);
        edit.gasto = gasto;
        editarBoton.addEventListener('click', edit);
        divGas.append(editarBoton);
    
        let borrarBoton = document.createElement('button');
        borrarBoton.type = 'button';
        borrarBoton.className = 'gasto-borrar';
        borrarBoton.innerHTML = 'Borrar';

        let bor = new BorrarHandle(gasto);
        bor.gasto = gasto;
        borrarBoton.addEventListener('click', bor);
        divGas.append(borrarBoton);

        

        



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
    this.handleEvent = function(edit){

       

        let descrip = prompt("Escriba una descripción");
        this.gasto.actualizarDescripcion(descrip);

        let val = prompt("Escriba un nuevo valor");
        let valFloat = parseFloat(val)
        this.gasto.actualizarValor(valFloat);

        let fec = Date.parse(prompt("Escriba la fecha"));
        this.gasto.actualizarFecha(fec);

        let etiq = prompt("Escriba las etiquetas").split(',');
        this.gasto.anyadirEtiquetas(...etiq);

        repintar();
    }
}

function BorrarHandle()
{

    this.handleEvent = function(deleate)
    {
        let borrar = this.gasto.id;
        gp.borrarGasto(borrar);
        repintar();

    }

}



function BorrarEtiquetasHandle()
{

    this.handleEvent = function(deleteEtiquetas)
    {
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    }

}


function EditarHandleformulario()
{
    this.handleEvent = function(editForm)
    {
        editForm.preventDefault();

        let pF = document.getElementById("formulario-template").content.cloneNode(true);

        let formu = pF.querySelector("form");
        let controls = document.getElementById("controlesprincipales");
        controls.append(formu);

        let bF = editForm.currentTarget;
        bF.append(formu);

        formu.elements.descripcion.value = this.gasto.descripcion;
        formu.elements.valor.value = this.gasto.valor;
        formu.elements.fecha.value = newDate(this.gasto.fecha).toString();
        formu.elements.etiquetas.value = this.gasto.etiquetas;

        let cancelar = new CancelarFormularioHandle();
        let buttonCancel = formu.querySelector("button.cancelar");
        buttonCancel.addEventListener('click', cancelar);

        let submit = new SubmitHandleForm();
        submit.gasto = this.gasto;
        formu.addEventListener('submit', submit);

        bF.setAttribute('disabled', "");

        
    }
}

function CancelarFormularioHandle()
{
    this.handleEvent = function(cancelar)
    {
        cancelar.preventDefault();

        cancelar.currentTarget.parentNode.remove();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disable");
    }
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    

    let formulario = plantillaFormulario.querySelector("form");

    let controles = document.getElementById("controlesprincipales");
    controles.appendChild(formulario);

    let botonAnyGasto = document.getElementById("anyadirgasto-formulario");
   
    botonAnyGasto.disabled = true; 
   

    

    let botonCancelar = formulario.querySelector("button.cancelar");
    let cancelar = new CancelarFormularioHandle();
    cancelar.btnAnyadir = botonAnyGasto;
    botonCancelar.addEventListener('click', cancelar);

    let enviar = new SubmitHandleForm();
    formulario.addEventListener('submit', enviar);
}

let gasForm = document.getElementById('anyadirgasto-formulario');
gasForm.addEventListener('click', nuevoGastoWebFormulario);

function SubmitHandleForm(){

    this.handleEvent = function(enviarForm){
        enviarForm.preventDefault();
        let data = enviarForm.currentTarget;
        let val = parseFloat(data.elements.valor.value);
        let etiq = data.elements.etiquetas.value;
        let desc = data.elements.descripcion.value;
        let fec = data.elements.fecha.value;

        let id = document.getElementById('anyadirgasto-formulario').removeAttribute("disabled");
        
        let gas = new gp.CrearGasto(desc,val,fec,...etiq);
        gp.anyadirGasto(gas);

        repintar();
        
    }

}

function SubmitHandle()
{
    this.handleEvent = function(enviar){

        enviar.preventDefault();

        let formu = enviar.currentTarget;

        let val = parseFloat(formu.elements.valor.value);

        let etiq = formu.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(...etiq);

        let desc = formu.elements.descripcion.value;

        this.gasto.actualizarValor(desc);
        this.gasto.actualizarValor(val);

        repintar();

    }
}










export   {
mostrarDatoEnId,
mostrarGastoWeb,
mostrarGastosAgrupadosWeb,
repintar,
actualizarPresupuestoWeb,
nuevoGastoWeb,
EditarHandle,
BorrarHandle,
CancelarFormularioHandle,
BorrarEtiquetasHandle,
EditarHandleformulario,
SubmitHandleForm,
SubmitHandle
}