import * as ges from "./gestionPresupuesto.js";


function mostrarDatoEnId(valor,idElemento){
    if(idElemento !== undefined){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML += " " + valor;
    }
}

function mostrarGastoWeb(idElemento,gasto){
    
    let id = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divGD = document.createElement("div");
    divGD.className = "gasto-descripcion";
    divGD.innerHTML += gasto.descripcion;
    divGasto.append(divGD);

    let divF = document.createElement("div");
    divF.className = "gasto-fecha";
    divF.innerHTML += gasto.fecha
    divGasto.append(divF);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.innerHTML += gasto.valor;
    divGasto.append(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    for(let i = 0; i < gasto.etiquetas.length;i++){
        let spanE = document.createElement("span");
        spanE.className = "gasto-etiquetas-etiqueta";
        spanE.innerHTML = gasto.etiquetas[i];
        divEtiquetas.append(spanE);
    }
    divGasto.append(divEtiquetas);
        
    let btnEditar = document.createElement("button");
    btnEditar.className = "gasto-editar";
    btnEditar.type = "button";
    btnEditar.innerHTML = "Editar";

    let editarHandlebtn = new EditarHandle();
    editarHandlebtn.gasto = gasto;
    btnEditar.addEventListener("click",editarHandlebtn);
    divGasto.append(btnEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.type = "button";
    btnBorrar.innerHTML = "Borrar";

    let borrarHandlebtn = new BorrarHandle();
    borrarHandlebtn.gasto = gasto;
    btnBorrar.addEventListener("click",borrarHandlebtn);
    divGasto.append(btnBorrar);
    
    id.append(divGasto);
    
    return id;
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let id = document.getElementById(idElemento);

    let divAgrupado = document.createElement("div");
    divAgrupado.className = "agrupacion";

    let divAgrupadoH1 = document.createElement("h1");
    divAgrupadoH1.innerHTML += `Gastos agrupados por ${periodo}`;
    divAgrupado.append(divAgrupadoH1);

    for(let key of Object.keys(agrup)){
        let divAgrupacionDato = document.createElement("div");
        divAgrupacionDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.innerHTML = `${key}`;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.innerHTML = `${key.valueOf()}`;

        divAgrupado.append(divAgrupacionDato);
        divAgrupacionDato.append(spanClave);
        divAgrupacionDato.append(spanValor);

    }
    id.append(divAgrupado);
    return id;

}

function repintar(){
    document.getElementById('presupuesto').innerHTML = "";
    document.getElementById('gastos-totales').innerHTML = "";
    document.getElementById('balance-total').innerHTML = "";
    document.getElementById('listado-gastos-completo').innerHTML = "";

    mostrarDatoEnId(ges.mostrarPresupuesto(),"presupuesto");
    mostrarDatoEnId(ges.calcularTotalGastos(),"gastos-totales");
    mostrarDatoEnId(ges.calcularBalance(),"balance-total");
    for(let gasto of ges.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo",gasto);
    }
}

function actualizarPresupuestoWeb(){
    let interaccion = prompt("Introduce un presupuesto");
    let presupuesto = parseFloat(interaccion);
    ges.actualizarPresupuesto(presupuesto);
    repintar();
}


function nuevoGastoWeb(){
    let descripcion = prompt("Introduce una descripcion");
    let valorStr = prompt("Introduce un valor");
    let valorFloat = parseFloat(valorStr);
    let fecha = prompt("Introduce una fecha");
    let etiquetas = prompt("Introduce las etiquetas");
    
    let arrayEtiquetas = etiquetas.split(',');

    let gasto = new ges.CrearGasto(descripcion,valorFloat,fecha,arrayEtiquetas);
    ges.anyadirGasto(gasto);
    repintar();
}

actualizarpresupuesto.addEventListener('click',actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click',nuevoGastoWeb);

function EditarHandle(){
        this.handleEvent = function(){
        let descripcion = prompt("Introduce una descripcion");
        let valorStr = prompt("Introduce un valor");
        let valorFloat = parseFloat(valorStr);
        let fecha = prompt("Introduce una fecha");
        let etiquetas = prompt("Introduce las etiquetas");
    
        let arrayEtiquetas = etiquetas.split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.etiquetas = arrayEtiquetas;
        this.gasto.actualizarValor(valorFloat);

        repintar();
    }   
}
function BorrarHandle(){
    this.handleEvent = function(){
    ges.borrarGasto(this.gasto.id);
    repintar();
}  
}



//NO MODIFICAR.
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
}
