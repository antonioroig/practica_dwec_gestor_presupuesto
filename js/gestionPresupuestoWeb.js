/* import gestionPresupuesto */
import * as gestionPresupuesto from './gestionPresupuesto.js';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento
//idElemento - Hará referencia al id del elemento HTML donde se insertará el resultado en formato texto.
// valor - El valor a mostrar.

// https://monsterlessons.com/project/series/rabota-s-dom-derevom-v-javascript -- GUIDE
// https://es.javascript.info/searching-elements-dom - getElementById y innerHTML
function mostrarDatoEnId(valor, idElemento){

    if(idElemento != undefined){
        document.getElementById(idElemento).innerHTML = ` ${valor}`;
    }    
}

function mostrarGastoWeb(idElemento, gasto){
    
    if(idElemento !== undefined){
        let elemento = document.getElementById(idElemento);
        // gasto
        let divGasto = document.createElement('div');
        divGasto.className = 'gasto';
        // - - - - - - - - - - -
        // gasto-descripcion
        let divDesc = document.createElement('div');
        divDesc.className = 'gasto-descripcion';
        divDesc.textContent = gasto.descripcion;
        divGasto.append(divDesc);
        // gasto-fecha
        let divFecha = document.createElement('div');
        divFecha.className = 'gasto-fecha';
        divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
        divGasto.append(divFecha);
        // gasto-valor
        let divValor = document.createElement('div');
        divValor.className = 'gasto-valor';
        divValor.textContent = gasto.valor;
        divGasto.append(divValor);
        // gasto-etiquetas
        let divEtiquetas = document.createElement('div');
        divEtiquetas.className = 'gasto-etiquetas';
        
        for(let i = 0; i < gasto.etiquetas.length; i++){
            // gasto-etiquetas-etiqueta
            let contenidoEtiqueta = gasto.etiquetas[i];
            let spanEtiqueta = document.createElement('span');
            spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
            spanEtiqueta.textContent = contenidoEtiqueta + ' ';
            
            // HANDLE BORRAR ETIQUETA - - - - - - - - - - - - - - - - - - -
            let borrarEtiquetas = new BorrarEtiquetasHandle();
            borrarEtiquetas.gasto = gasto;
            borrarEtiquetas.etiqueta = gasto.etiquetas[i];
            spanEtiqueta.addEventListener('click', borrarEtiquetas);
            divEtiquetas.append(spanEtiqueta);   
        }
        divGasto.append(divEtiquetas);
        // - - - - - - - - - - - - - -

        if (idElemento == 'listado-gastos-completo')
        {   
            // HANDLE - editar gasto  - - - - - - - - - - - - - - - - - - -
            let btnEditar = document.createElement('button');
            btnEditar.className = 'gasto-editar';
            btnEditar.type = 'button';
            btnEditar.textContent = 'Editar';
    
            let editarHandle = new EditarHandle();
            editarHandle.gasto = gasto;
            btnEditar.addEventListener('click', editarHandle); // addEventListener nos permite utilizar un objeto como manejador de eventos.
            divGasto.append(btnEditar);
            // HANDLE - borrar gasto - - - - - - - - - - - - - - - - - - - -
            let btnBorrar = document.createElement('button');
            btnBorrar.className = 'gasto-borrar';
            btnBorrar.type = 'button';
            btnBorrar.textContent = 'Borrar';

            let borrarHandle = new BorrarHandle();
            borrarHandle.gasto = gasto;
            btnBorrar.addEventListener('click', borrarHandle); // addEventListener nos permite utilizar un objeto como manejador de eventos.
            divGasto.append(btnBorrar);
        }
        
        elemento.append(divGasto);
    
    }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

        
    // id = elemento
    let elemento = document.getElementById(idElemento);

    // <div class="agrupacion">
    let divAgrup = document.createElement('div');
    divAgrup.className = 'agrupacion';
    // - - - - - - - - - - - - - - 
    // <h1>Gastos agrupados por mes</h1>
    let h1Agrup = document.createElement('h1');
    h1Agrup.textContent = `Gastos agrupados por ${periodo}`;
    divAgrup.append(h1Agrup);
    
    //for(let i = 0; i < agrup.length; i++){
    for(let prop of Object.keys(agrup)){

        // <div class="agrupacion-dato">
        let divDato = document.createElement('div');
        divDato.className = 'agrupacion-dato';

        //<span class="agrupacion-dato-clave">2021-09</span>
        let spanDatoClave = document.createElement('span');
        spanDatoClave.className = 'agrupacion-dato-clave';
        spanDatoClave.textContent = `${prop} `;
        
        // <span class="agrupacion-dato-valor">5</span>
        let spanDatoValor = document.createElement('span');
        spanDatoValor.className = 'agrupacion-dato-valor';
        spanDatoValor.textContent = `${prop.valueOf()}`;

        divDato.append(spanDatoClave);
        divDato.append(spanDatoValor);
        divAgrup.append(divDato);
    }

    elemento.append(divAgrup);   

    return elemento;   
}
        /* 
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">2021-09</span>
            <span class="agrupacion-dato-valor">5</span>
        </div>

        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">2021-10</span>
            <span class="agrupacion-dato-valor">39</span>
        </div>
        */
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// ACTIVIDAD 5

// Estamos desarrollando una aplicación JavaScript controlada por datos. Cada vez que se añade, 
// modifica o borra un gasto, debemos mostrar el resultado en la página HTML. Recordemos que la aplicación debe mostrar:
    // - El presupuesto --> Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    // - El total de gastos --> Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    // - El balance actual --> Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    // Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    // - El listado con los gastos y sus datos --> Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    // - Otra información (agrupaciones de gastos, etc.)

function repintar(){
    
    document.getElementById('presupuesto').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';
    document.getElementById('balance-total').innerHTML = '';

    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), 'presupuesto');
    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), 'gastos-totales');
    mostrarDatoEnId(gestionPresupuesto.calcularBalance(), 'balance-total');

    document.getElementById('listado-gastos-completo').innerHTML = '';

    let gastosListados = gestionPresupuesto.listarGastos();
    for(let i = 0; i < gastosListados.length; i++){
        mostrarGastoWeb('listado-gastos-completo', gastosListados[i]);
    }
}

// actualizarPresupuestoWeb
function actualizarPresupuestoWeb(){
        let presupuestoNuevo = prompt('Introduce un presupuesto: ');
        gestionPresupuesto.actualizarPresupuesto(parseFloat(presupuestoNuevo));
        repintar();
}
// nuevoGastoWeb
function nuevoGastoWeb()
{
    let desc = prompt('Introduce la descripción: ');
    let valor = parseFloat(prompt('Introduce el valor: '));
    let fecha = prompt('Introduce fecha (aaaa-mm-dd): ');
    let etiquetasTiene = prompt('Introduce las etiquetas: ');
    let etiquetas = etiquetasTiene.split(', ');

    let gasto = new gestionPresupuesto.CrearGasto(desc, valor, fecha, etiquetas);

    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}



// Handle Functions
function EditarHandle()
{
    this.handleEvent = function()
    {
        let etiquetas = new Array();
        let desc = prompt('Introduce la descripción: ');
        let valor = parseFloat(prompt('Introduce el valor: '));
        let fecha = prompt('Introduce fecha (aaaa-mm-dd): ');
        let etiquetasTiene = prompt('Introduce las etiquetas: ');
        
        etiquetas = etiquetasTiene.split(',');
        
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        this.gasto.etiquetas = etiquetas;
        repintar();
    };
}

function BorrarHandle()
{    
    this.handleEvent = function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle()
{
    this.handleEvent = function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}

// BUTTONES
let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
btnActualizarPresupuesto.onclick = actualizarPresupuestoWeb;

let btnAnyadirGasto = document.getElementById('anyadirgasto');
btnAnyadirGasto.onclick = nuevoGastoWeb;
// npx cypress open -- PARA HACER TEST GRÁFICO
// npm run test --> pasa todos los tests
// EXPORT
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,

    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,

    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
}

/*
    https://www.w3schools.com/jsref/event_onclick.asp
 */