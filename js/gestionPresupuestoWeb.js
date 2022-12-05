import * as gestionPresupuesto from "./gestionPresupuesto.js";
function mostrarDatoEnId(idElemento,valor)
{
    document.getElementById(idElemento).innerHTML = valor;
}
function mostrarGastoWeb(idElemento, gastos)
{
    let elemento = document.getElementById(idElemento);
    gastos.forEach(gasto => {
        let DIVgasto = document.createElement('div');
        DIVgasto.className = 'gasto';
        let DIVdescripcion = document.createElement('div');
        DIVdescripcion.className = 'gasto-descripcion';
        DIVdescripcion.innerHTML = gasto.descripcion;
        let DIVfecha = document.createElement('div');
        DIVfecha.className = 'gasto-fecha';
        let fechatostring = new Date(gasto.fecha);
        DIVfecha.innerHTML = fechatostring.toLocaleString();
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
            SPANetiqueta.innerHTML = " " + etiqueta;
            DIVetiquetas.appendChild(SPANetiqueta);

            let borraretiqueta = new BorrarEtiquetasHandle();
            borraretiqueta.gasto = gasto;
            borraretiqueta.etiquetas = etiqueta;
            SPANetiqueta.addEventListener('click',borraretiqueta);
        });
        DIVgasto.appendChild(DIVetiquetas);

        let BUTTONeditar = document.createElement('button');
        BUTTONeditar.type = 'button';
        BUTTONeditar.className = 'gasto-editar';
        BUTTONeditar.innerHTML = "Editar";
        let editargasto = new EditarHandle();
        editargasto.gasto = gasto;
        BUTTONeditar.addEventListener('click',editargasto);
        
        let BUTTONborrar = document.createElement('button');
        BUTTONborrar.className = 'gasto-borrar';
        BUTTONborrar.innerHTML = "Borrar";
        BUTTONborrar.type = 'button';
        let borrargasto = new BorrarHandle();
        borrargasto.gasto = gasto;
        BUTTONborrar.addEventListener('click',borrargasto);
        
        DIVgasto.appendChild(BUTTONeditar);
        DIVgasto.appendChild(BUTTONborrar);

        elemento.appendChild(DIVgasto);
    });
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    let DIVagrupacion = document.createElement('div');
    DIVagrupacion.className = 'agrupacion';
    let H1titulo = document.createElement('h1');
    H1titulo.innerHTML = 'Gastos agrupados por ' + periodo;
    DIVagrupacion.appendChild(H1titulo);
    for(let propiedad of Object.keys(agrup))
    {
        let DIVdato = document.createElement('div');
        DIVdato.className = 'agrupacion-dato';
        let SPANclave = document.createElement('span');
        SPANclave.className = 'agrupacion-dato-clave';
        SPANclave.innerHTML += `${propiedad}`;
        let SPANvalor = document.createElement('span');
        SPANvalor.className = 'agrupacion-dato-valor';
        SPANvalor.innerHTML += " " + agrup[propiedad] + " €";
        DIVdato.appendChild(SPANclave);
        DIVdato.appendChild(SPANvalor);
        DIVagrupacion.appendChild(DIVdato);
    }
    elemento.appendChild(DIVagrupacion);
}
function actualizarPresupuestoWeb(){
    let mensaje = prompt("Introduce el presupuesto deseado:",0);
    gestionPresupuesto.actualizarPresupuesto(parseInt(`${mensaje}`,10));
    repintar();
}

let actualizarpresupuesto = document.getElementById('actualizarpresupuesto');
actualizarpresupuesto.addEventListener('click',actualizarPresupuestoWeb);

function repintar(){
    mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());
    mostrarDatoEnId('listado-gastos-completo', "");
    mostrarGastoWeb('listado-gastos-completo', gestionPresupuesto.listarGastos());
}
function nuevoGastoWeb(){
    let descripcion = prompt("Introduce la descripción del gasto:","");
    let aux = prompt("Introduce el valor del gasto:","");
    let valor = parseFloat(aux, 10);
    let fecha = prompt("Introduce la fecha del gasto:\n(Introducirla en el formato indicado)","yyyy/mm/dd");
    let cadena = prompt("Introduce las etiquetas del gasto:\n(Introduzca las etiquetas como en el ejemplo)","etiqueta1,etiqueta2,etiqueta3...");
    let etiquetas = cadena.split(',');
    let nuevogasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,etiquetas);
    gestionPresupuesto.anyadirGasto(nuevogasto);
    repintar();
}

let annyadirgasto = document.getElementById('anyadirgasto');
annyadirgasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function (event) {
        let descripcion = prompt("Introduce la descripción del gasto:","");
        let aux = prompt("Introduce el valor del gasto:","");
        let valor = parseFloat(aux, 10);
        let fecha = prompt("Introduce la fecha del gasto:\n(Introducirla en el formato indicado)","yyyy/mm/dd");
        let cadena = prompt("Introduce las etiquetas del gasto:\n(Introduzca las etiquetas como en el ejemplo)","etiqueta1,etiqueta2,etiqueta3...");
        let etiquetas = cadena.split(',');
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar();
    };
}

function BorrarHandle(){
    this.handleEvent = function(event){
        let id = this.gasto.id;
        gestionPresupuesto.borrarGasto(id);
        repintar();
    };
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function (event){
        this.gasto.borrarEtiquetas(this.etiquetas);
        repintar();
    };
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    repintar,
    nuevoGastoWeb
}