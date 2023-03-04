'use strict';
import * as gestionPresupuesto from  "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    if(idElemento != undefined)
    {
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += valor;
    }
}

function mostrarGastoWeb(idElemento, gasto){
    if(idElemento != undefined){
        let elemento = document.getElementById(idElemento);
        let divGasto = document.createElement("div");
        divGasto.className="gasto";

        if (gasto.descripcion){
            let divGastoDescripcion = document.createElement("div");
            divGastoDescripcion.className = "gasto-descripcion";
            divGastoDescripcion.innerHTML += gasto.descripcion;
            divGasto.append(divGastoDescripcion);
        }

        if(gasto.valor){
            let divGastoValor = document.createElement("div");
            divGastoValor.className = "gasto-valor";
            divGastoValor.innerHTML += gasto.valor;
            divGasto.append(divGastoValor);
        }

        if (gasto.fecha){
            let divGastoFecha = document.createElement("div");
            divGastoFecha.className = "gasto-fecha";
            divGastoFecha.innerHTML += gasto.fecha;
            divGasto.append(divGastoFecha);  
        }

        let divGastoEtiquetas = document.createElement("div");
        divGastoEtiquetas.className = "gasto-etiquetas";
        
        for(let i = 0; i < gasto.etiquetas.length; i++){
            let spanEtiquetas = document.createElement('span');
            spanEtiquetas.className= "gasto-etiquetas-etiqueta";
            spanEtiquetas.textContent = gasto.etiquetas[i] + " ";
            divGastoEtiquetas.append(spanEtiquetas)

            let etBorradas = new BorrarEtiquetasHandle(gasto);
            etBorradas.gasto = gasto;
            etBorradas.etiquetas = gasto.etiquetas[i];
            spanEtiquetas.addEventListener('click',etBorradas);
        }
        divGasto.append(gastoEtiqueta);
        
        let salto=document.createElement("br");
        divGasto.append(divGastoEtiquetas, salto);

        let btedit = document.createElement('button');
        btedit.type = 'button';
        btedit.className = 'gasto-editar';
        btedit.textContent = 'Editar';

        let objedit= new EditarHandle();
        objedit.gasto = gasto;
        btedit.addEventListener('click', objedit);
        divGasto.append(btedit);

        let btborrar = document.createElement('button');
        btborrar.type = 'button';
        btborrar.className = 'gasto-borrar';
        btborrar.textContent = 'Borrar';
        
        let objborrar = new BorrarHandle();
        objborrar.gasto = gasto;
        btborrar.addEventListener('click', objborrar);
        divGasto.append(btborrar);

        let btnGastosBorrarAPI = document.createElement("button");
        btnGastosBorrarAPI.className = "gasto-borrar-api";
        btnGastosBorrarAPI.elemento = "gasto-borrar-api";
        btnGastosBorrarAPI.type = "button";
        btnGastosBorrarAPI.textContent = "Borrar(API)";

        let handleBorrarApi = new borrarApiHandle();
        handleBorrarApi.gasto = gasto;

        btnGastosBorrarAPI.addEventListener("click", handleBorrarApi);
        divGasto.append(btnGastosBorrarAPI);

        let btnEditForm = document.createElement("button");
        btnEditForm.className = "gasto-editar-formulario";
        btnEditForm.elemento = "gasto-editar-formulario";
        btnEditForm.type = "button";
        btnEditForm.textContent = "Editar (formulario)";


        let handleEditForm = new EditarHandleFormulario();
        handleEditForm.gasto = gasto;
        btnEditForm.addEventListener('click', handleEditForm);
        divGasto.append(btnEditForm);

        let btnGastosEnviarAPI = document.createElement("button");
        btnGastosEnviarAPI.className = "gasto-enviar-api";
        btnGastosEnviarAPI.elemento = "gasto-enviar-api";
        btnGastosEnviarAPI.type = "button";
        btnGastosEnviarAPI.textContent = "Enviar(API)";

        divGasto.append(divGastoEtiquetas);
        elemento.append(divGasto);
    };
};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let agrupDIV = document.createElement('div');
    agrupDIV.className = 'agrupacion';

    let agrupTit = document.createElement('h1');
    agrupTit.innerHTML = 'Gastos agrupados por ' + periodo;
    agrupDIV.append(agrupTit);

    for(let valor of Object.keys(agrup))
    {
        let datoDIV = document.createElement('div');
        datoDIV.className = 'agrupacion-dato';

        let datoClaveSPAN = document.createElement('span');
        datoClaveSPAN.className = 'agrupacion-dato-clave';
        datoClaveSPAN.innerHTML += `${valor}`;

        let datoValorSPAN = document.createElement('span');
        datoValorSPAN.className = 'agrupacion-dato-valor';
        datoValorSPAN.innerHTML += " " + agrup[valor] + " €";
        
        datoDIV.append(datoClaveSPAN);
        datoDIV.append(datoValorSPAN);
        agrupDIV.append(datoDIV);
    }

    
    elemento.append(agrupDIV);
}

function repintar()
{
   document.getElementById("presupuesto").innerHTML="";
   mostrarDatoEnId("presupuesto" , gestionPresupuesto.mostrarPresupuesto());

   document.getElementById("gastos-totales").innerHTML="";
   mostrarDatoEnId("gastos-totales" , gestionPresupuesto.calcularTotalGastos());

   document.getElementById("balance-total").innerHTML="";
   mostrarDatoEnId("balance-total" , gestionPresupuesto.calcularBalance());

   document.getElementById("listado-gastos-completo").innerHTML="";

   gestionPresupuesto.listarGastos.array.forEach(element => mostrarGastoWeb("listado-gastos-completo", element));

   mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.obtenerPeriodoAgrupacion("dia"));
   mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.obtenerPeriodoAgrupacion("mes"));
   mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.obtenerPeriodoAgrupacion("anyo"));
}

function actualizarPresupuestoWeb()
{
    let presup = prompt ("introducir presupuesto:", '');
    let res= parseFloat(presup);
    gestionPresupuesto.actualizarPresupuesto(res);
    repintar();

    let actPres = document.getElementById('actualizarPresupuesto');
    actPres.addEventListener('click', actualizarPresupuestoWeb);
}



function nuevoGastoWeb()
{
    let descripcion = prompt("introducir descripcion:");
    let valor = prompt("introducir valor:");
    let fecha = Date.parse(prompt("introducir fecha:"));
    let etiquetas = prompt("introducir etiquetas:").split(',');

    let res= parseFloat(valor);

    let gastonuevo = new gestionPresupuesto.CrearGasto(descripcion,res,fecha,etiquetas);
    gestionPresupuesto.anyadirGasto(gastonuevo);
    repintar();

    let gastonew = document.getElementById('anyadirgasto');
    gastonew.addEventListener('click',nuevoGastoWeb);
};

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let form = plantillaFormulario.querySelector("form");

    let formControl = document.getElementById("controlesprincipales");
    formControl.appendChild(form);

    let btnAnyadir = document.getElementById("anyadirgasto-formulario");
    btnAnyadir.disabled = true;

    let btnEnviar = new EnviarFormHandle();
    form.addEventListener("submit", btnEnviar);

    let btnCancelar = formControl.querySelector("button.cancelar");
    let cancelar = new CancelarHandleBut();
    cancelar.btnAnyadir = btnAnyadir;
    btnCancelar.addEventListener("click", cancelar);
};

function guardarGastosWeb(){
    let guardarGasto = gestionPresupuesto.listarGastos();
    localStorage.GestorGastosDWEC = JSON.stringify(guardarGasto);
};
let guardarListado = document.getElementById("guardar-gastos");
guardarListado.addEventListener("click", guardarGastosWeb);

function cargarGastosWeb(){
    if (localStorage.GestorGastosDWEC == null){
        gestionPresupuesto.cargarGastos([]);
    }else{
        gestionPresupuesto.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
    }
    repintar();
};
let cargarFormulario = document.getElementById("cargar-gastos");
cargarFormulario.addEventListener("click", cargarGastosWeb);

function cargarGastosApi(){
    let nombreUsu = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsu}`;

    fetch (url, {method: 'GET'})

    .then (response => response.json())
    .then (data =>
        {
            console.log(data);
            gestionPresupuesto.cargarGastos(data);
            repintar();   
        })
    
    .catch (error => console.log(error));
};
let btncargarGastoApi = document.getElementById("cargar-gastos-api");
btncargarGastoApi.addEventListener('click',new cargarGastosApiHandle());

function EditarHandle()
{
    this.handleEvent = function (event)
    {
        let edFecha = Date.parse(promt("introducir fecha en formato internacional: ", this.gasto.fecha));
        let edvalor = prompt ("Introducir valor: ", this.gasto.valor);
        let edDesc = prompt ("Introducir descripción: ", this.gasto.descripcion);
        let edetiquetas = prompt ("Introducir etiquetas separadas por ','", this.gasto.etiquetas).split(',');
        let res = parseFloat(edvalor);

        this.gasto.actualizarDescripcion(edDesc);
        this.gasto.actualizarFecha(edFecha);
        this.gasto.actualizarValor(res);
        this.gasto.anyadirEtiquetas(...edetiquetas);  
        repintar();
    };
};

function BorrarHandle()
{
    this.handleEvent = function (event)
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
};

function BorrarEtiquetasHandle()
{
    this.handleEvent = function (event)
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
};


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}