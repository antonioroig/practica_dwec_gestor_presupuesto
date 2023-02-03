import * as gestionPresupuesto from './gestionPresupuesto.js';





function mostrarDatoEnId(valor, idElemento){
    if(idElemento!=null){
        let elemento = document.getElementById(idElemento);
        elemento.innerHTML=valor;
    }
}

function mostrarGastoWeb(gasto, idElemento){
    if(idElemento!=null){
        var divGasto = document.createElement('div');
        divGasto.classList="gasto";

        var divDescripcion = document.createElement('div');
        divDescripcion.classList="gasto-descripcion";
        divDescripcion.innerHTML=gasto.descripcion;
        divGasto.appendChild(divDescripcion);

        var divFecha = document.createElement('div');
        divFecha.classList="gasto-fecha";
        divFecha.innerHTML=gasto.fecha;
        divGasto.appendChild(divFecha);

        var divValor = document.createElement('div');
        divValor.classList="gasto-valor";
        divValor.innerHTML=gasto.valor;
        divGasto.appendChild(divValor);

        var divEtiquetas = document.createElement('div');
        divEtiquetas.classList="gasto-etiquetas";
        
        gasto.etiquetas.forEach(etiqueta => {
            var divEtiqueta1 = document.createElement('span');
            divEtiqueta1.classList="gasto-etiquetas-etiqueta";
            divEtiqueta1.innerHTML=etiqueta;
            divEtiquetas.appendChild(divEtiqueta1);

            var objetoBorrarEtiqueta = new BorrarEtiquetasHandle();
            objetoBorrarEtiqueta.gasto=gasto;
            objetoBorrarEtiqueta.etiqueta=etiqueta;
            divEtiqueta1.addEventListener("click", objetoBorrarEtiqueta);
        });
        divGasto.appendChild(divEtiquetas);

        var elemento = document.getElementById(idElemento);
        elemento.appendChild(divGasto);

        var botonEditar = document.createElement('button');
        botonEditar.type="button";
        botonEditar.textContent="Editar";
        botonEditar.classList="gasto-editar";

        var objetoEditar = new EditarHandle();
        objetoEditar.gasto=gasto;

        botonEditar.addEventListener("click", objetoEditar);
        divGasto.appendChild(botonEditar);

        var botonBorrar = document.createElement('button');
        botonBorrar.type="button";
        botonBorrar.textContent="Borrar";
        botonBorrar.classList="gasto-borrar";

        var objetoBorrar = new BorrarHandle();
        objetoBorrar.gasto=gasto;

        botonBorrar.addEventListener("click", objetoBorrar);
        divGasto.appendChild(botonBorrar);

        var botonBorrarApi = document.createElement('button');
        botonBorrarApi.type="button";
        botonBorrarApi.textContent="Borrar (API)";
        botonBorrarApi.classList="gasto-borrar";

        var objetoBorrarApi = new BorrarApiHandle();
        objetoBorrarApi.gasto=gasto;

        botonBorrarApi.addEventListener("click", objetoBorrarApi);
        divGasto.appendChild(botonBorrarApi);

        var botonEditarForm = document.createElement('button');
        botonEditarForm.type="button";
        botonEditarForm.textContent="Editar (formulario)";
        botonEditarForm.classList="gasto-editar-formulario";

        var objetoEditarForm = new EditarHandleformulario();
        objetoEditarForm.gasto=gasto;
        objetoEditarForm.divGasto = divGasto;
        objetoEditarForm.botonEditar = botonEditarForm;

        botonEditarForm.addEventListener("click", objetoEditarForm);
        divGasto.appendChild(botonEditarForm);
    }
}



function mostrarGastosAgrupadosWeb( agrup, periodo, idElemento){
    if(idElemento!=null){
        // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
        var divP = document.getElementById(idElemento);
        // Borrar el contenido de la capa para que no se duplique el contenido al repintar
        divP.innerHTML = "";

        var divAgrupacion = document.createElement("div");
        divAgrupacion.classList="agrupacion";
        
        var h1 =document.createElement('h1');
        h1.innerHTML="Gastos agrupados por "+periodo;
        divAgrupacion.appendChild(h1);

        var claves = Object.keys(agrup);
        let i=0;

        for(let agrupActual in agrup){
            var divAgr1 =document.createElement('div');
            divAgr1.classList="agrupacion-dato";
            
            var spanClave = document.createElement('span');
            spanClave.classList="agrupacion-dato-clave";
            spanClave.innerHTML=claves[i];
            i++;
            divAgr1.appendChild(spanClave);

            var spanValor = document.createElement('span');
            spanValor.classList="agrupacion-dato-valor";
            spanValor.innerHTML=agrup[agrupActual];
            divAgr1.appendChild(spanValor);

            divAgrupacion.appendChild(divAgr1);
        }

        var elemento = document.getElementById(idElemento);
        elemento.appendChild(divAgrupacion);

        // Estilos
        divP.style.width = "33%";
        divP.style.display = "inline-block";
        // Crear elemento <canvas> necesario para crear la gráfica
        // https://www.chartjs.org/docs/latest/getting-started/
        let chart = document.createElement("canvas");
        // Variable para indicar a la gráfica el período temporal del eje X
        // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
        let unit = "";
        switch (periodo) {
        case "anyo":
            unit = "year";
            break;
        case "mes":
            unit = "month";
            break;
        case "dia":
        default:
            unit = "day";
            break;
        }

        // Creación de la gráfica
        // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
        const myChart = new Chart(chart.getContext("2d"), {
            // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
            type: 'bar',
            data: {
                datasets: [
                    {
                        // Título de la gráfica
                        label: `Gastos por ${periodo}`,
                        // Color de fondo
                        backgroundColor: "#555555",
                        // Datos de la gráfica
                        // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                        data: agrup
                    }
                ],
            },
            options: {
                scales: {
                    x: {
                        // El eje X es de tipo temporal
                        type: 'time',
                        time: {
                            // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                            unit: unit
                        }
                    },
                    y: {
                        // Para que el eje Y empieza en 0
                        beginAtZero: true
                    }
                }
            }
        });
        // Añadimos la gráfica a la capa
        divP.append(chart);
    }
}

let actualizarPresupuestoWeb = function(){
    let presupuesto = prompt("Introduce un presupuesto", 1000);
    if(presupuesto != null){
        presupuesto = parseFloat(presupuesto);
        gestionPresupuesto.actualizarPresupuesto(presupuesto);
        repintar();
    }
}

function repintar(){
    mostrarDatoEnId(gestionPresupuesto.mostrarPresupuesto(), "presupuesto");

    mostrarDatoEnId(gestionPresupuesto.calcularTotalGastos(), "gastos-totales");

    mostrarDatoEnId(gestionPresupuesto.calcularBalance(), "balance-total");

    let elemento = document.getElementById("listado-gastos-completo");
    elemento.innerHTML="";

    gestionPresupuesto.listarGastos().forEach(gasto =>{
        mostrarGastoWeb(gasto, "listado-gastos-completo");
    });

    mostrarGastosAgrupadosWeb(gestionPresupuesto.agruparGastos("dia"), "día", "agrupacion-dia");

    mostrarGastosAgrupadosWeb(gestionPresupuesto.agruparGastos("mes"), "mes", "agrupacion-mes");

    mostrarGastosAgrupadosWeb(gestionPresupuesto.agruparGastos("anyo"), "año", "agrupacion-anyo");
}


var botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.onclick=actualizarPresupuestoWeb;

let nuevoGastoWeb = function(){
    let nuevaDescripcion = prompt("Escribe la descripcion del nuevo gasto: ", "Descripcion");
    let nuevoValor = parseFloat(prompt("Escribe el valor del nuevo gasto: ", 100));
    var nuevaFecha = prompt("Escribe la fecha del nuevo gasto: ", "2022-09-22");
    var nuevasEtiquetas = prompt("Escribe las etiquetas del nuevo gasto separadas por comas: ", "etiqueta1, etiqueta2, etiqueta3");
    /*
    var etiquetasArray= new Array();
    var i=0;
    for(let letra in nuevasEtiquetas){
        if(letra!==","){
            etiquetasArray[i]+=letra;
        }else{
            i++;
        }
    }*/
    var etiquetasArray = nuevasEtiquetas.split(",");
    
    var nuevoGasto = new gestionPresupuesto.CrearGasto(nuevaDescripcion, nuevoValor, nuevaFecha, etiquetasArray);

    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}


var botonNuevoGasto = document.getElementById("anyadirgasto");
botonNuevoGasto.onclick=nuevoGastoWeb;

let EditarHandle = function(){
    this.handleEvent = function() {
        let nuevaDescripcion = prompt("Escribe la nueva descripcion del gasto: ", this.gasto.descripcion);
        let nuevoValor = Number(prompt("Escribe el nuevo valor del gasto: ", this.gasto.valor));
        var nuevaFecha = prompt("Escribe la nueva fecha del gasto: ", this.gasto.fecha);
        var nuevasEtiquetas = prompt("Añade etiquetas al gasto separadas por comas: ", this.gasto.etiquetas.join(", "));

        var etiquetasArray = nuevasEtiquetas.split(",");

        
        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarFecha(new Date(nuevaFecha));
        this.gasto.anyadirEtiquetas(etiquetasArray);
        
        repintar();
    }
}

let BorrarHandle = function(){
    this.handleEvent = function() {
        
        gestionPresupuesto.borrarGasto(this.gasto.id)
        
        repintar();
    }
}

let BorrarApiHandle = function(){
    this.handleEvent= function(event){
        event.preventDefault();
        var nombreUsuario = document.getElementById("nombre_usuario").value;
        fetch('https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'+nombreUsuario+"/"+this.gasto.gastoId, {method: 'Delete'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                gestionPresupuesto.borrarGasto(this.gasto.gastoId);
                cargarGastosApi();
            })
            .catch(err => console.log(err));

            
    }
}

let BorrarEtiquetasHandle = function(){
    this.handleEvent = function() {
        
        this.gasto.borrarEtiquetas(this.etiqueta);
        
        repintar();
    }
}

var CrearGastoHandle = function(){
    this.handleEvent= function(event){
        event.preventDefault();
        let form = document.forms[0];

        var nuevoGasto = new gestionPresupuesto.CrearGasto(form.elements.descripcion.value, Number(form.elements.valor.value), new Date(form.elements.fecha.value), form.elements.etiquetas.value.split(","));
        gestionPresupuesto.anyadirGasto(nuevoGasto);

        repintar();

        var botonAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
        botonAnyadirGastoForm.removeAttribute("disabled");
    }
}

var CancelarCrearGastoHandle = function(boton){
    this.handleEvent= function(event){
        document.forms[0].remove();

        boton.removeAttribute("disabled");
    }
}





let nuevoGastoWebFormulario = function(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let divControles = document.getElementById("controlesprincipales");
    divControles.appendChild(formulario);

    let form = new CrearGastoHandle();
    formulario.addEventListener('submit', form);

    
    //btnNuevoGastoApi.addEventListener('click', new nuevoGastoApiHandle());

    
    let btnNuevoGastoApi = document.createElement("button");
    btnNuevoGastoApi.id="gasto-enviar-api";
    formulario.appendChild(btnNuevoGastoApi);
    btnNuevoGastoApi.innerHTML="Enviar (API)"
    var objetoNuevoApi = new nuevoGastoApiHandle();

    btnNuevoGastoApi.addEventListener("click", objetoNuevoApi);

    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario");
    btnAnyadirGastoForm.setAttribute('disabled', "");

    let btnCancelar = formulario.querySelector("button.cancelar");
    let cancelarForm = new CancelarCrearGastoHandle(btnAnyadirGastoForm);
    btnCancelar.addEventListener('click', cancelarForm);
}

function nuevoGastoApiHandle(){
    this.handleEvent= function(event){
        event.preventDefault();
        var nombreUsuario = document.getElementById("nombre_usuario").value;

        let form = document.forms[0];

        var nuevoGasto = {
            descripcion :form.elements.descripcion.value, 
            valor:form.elements.valor.value, 
            fecha:form.elements.fecha.value, 
            etiquetas: form.elements.etiquetas.value.split(","),
            usuario:nombreUsuario
        }
        
        fetch('https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'+nombreUsuario, {method: 'Post',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nuevoGasto)})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //gestionPresupuesto.anyadirGasto(nuevoGasto);
                cargarGastosApi();
            })
            .catch(err => console.log(err));

        
    }
}

document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

let EditarGastoHandle=function(){
    this.handleEvent = function(event) {
        event.preventDefault();
        let form = document.forms[1];
        this.gasto.descripcion = form.elements.descripcion.value;
        this.gasto.valor = Number(form.elements.valor.value);
        this.gasto.fecha = new Date(form.elements.fecha.value);
        this.gasto.etiquetas = form.elements.etiquetas.value.split(",");

        repintar();
    }
}

function editarGastoApiHandle(){
    this.handleEvent= function(event){
        event.preventDefault();
        var nombreUsuario = document.getElementById("nombre_usuario").value;

        let form = document.forms[1];

        var nuevoGasto = new gestionPresupuesto.CrearGasto(form.elements.descripcion.value, Number(form.elements.valor.value), new Date(form.elements.fecha.value), form.elements.etiquetas.value.split(","));
        
        fetch('https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'+nombreUsuario+"/"+this.gasto.gastoId, {method: 'Put',headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nuevoGasto)})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                cargarGastosApi();
            })
            .catch(err => console.log(err));

        
    }
}

let EditarHandleformulario = function(){
    this.handleEvent = function() {
        
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        
        this.divGasto.appendChild(formulario);

        this.botonEditar.setAttribute('disabled', "");

        let btnEditarGastoApi = document.createElement("button");
        btnEditarGastoApi.id="gasto-editar-api";
        btnEditarGastoApi.innerHTML="Editar (API)"
        formulario.appendChild(btnEditarGastoApi)
        var objetoEditarApi = new editarGastoApiHandle();
        objetoEditarApi.gasto = this.gasto;

        btnEditarGastoApi.addEventListener("click", objetoEditarApi);


        formulario.elements.descripcion.value=this.gasto.descripcion;
        formulario.elements.valor.value=this.gasto.valor;
        formulario.elements.fecha.value=this.gasto.fecha;
        formulario.elements.etiquetas.value=this.gasto.etiquetas;

        let form = new EditarGastoHandle();
        form.gasto = this.gasto;
        formulario.addEventListener("submit", form);

        let btnCancelar = formulario.querySelector("button.cancelar");
        let cancelarForm = new CancelarCrearGastoHandle(this.botonEditar);
        btnCancelar.addEventListener('click', cancelarForm);
        
    }
}
let filtros=0;
let filtrarGastoWeb = function(){
    this.handleEvent = function(event) {
        event.preventDefault();
        
        let descripcionContiene = this.formulario.elements["formulario-filtrado-descripcion"].value;
        let valorMinimo = Number(this.formulario.elements["formulario-filtrado-valor-minimo"].value);
        let valorMaximo = this.formulario.elements["formulario-filtrado-valor-maximo"].value;
        let fechaDesde = this.formulario.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHasta = this.formulario.elements["formulario-filtrado-fecha-hasta"].value;
        let etiquetasTiene = this.formulario.elements["formulario-filtrado-etiquetas-tiene"].value;

        if(etiquetasTiene){
            etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etiquetasTiene);
        }
        //document.getElementById("listado-gastos-completo").innerHTML="";
        
        var filtrados = gestionPresupuesto.filtrarGastos({fechaDesde, fechaHasta, valorMaximo, valorMinimo, descripcionContiene, etiquetasTiene})
        filtros++;
        let h3NFiltros = document.createElement("h2");
        h3NFiltros.innerHTML="Filtro "+filtros;
        document.getElementById("listado-gastos-completo").appendChild(h3NFiltros);
        filtrados.forEach(gasto=>{
            mostrarGastoWeb(gasto, "listado-gastos-completo");
        });
        let brNFiltros = document.createElement("hr");
        document.getElementById("listado-gastos-completo").appendChild(brNFiltros);
    }
}

    let formulario = document.getElementById("formulario-filtrado");

    let filtrarResultados = new filtrarGastoWeb();
    filtrarResultados.formulario = formulario;
    formulario.addEventListener('submit', filtrarResultados);

function guardarGastosWeb(){
    this.handleEvent= function(event){
        
        localStorage.setItem("GestorGastosDWEC", JSON.stringify(gestionPresupuesto.listarGastos()));
    }
}

let btnGuardarGastos = document.getElementById("guardar-gastos");
btnGuardarGastos.addEventListener('click', new guardarGastosWeb());

function cargarGastosWeb(){
    this.handleEvent= function(event){
        event.preventDefault();
        if(localStorage.getItem("GestorGastosDWEC")){
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.getItem("GestorGastosDWEC")));
        }else{
            gestionPresupuesto.cargarGastos([]);
        }
        

        repintar();
    }
}

let btnCargarGastos = document.getElementById("cargar-gastos");
btnCargarGastos.addEventListener('click', new cargarGastosWeb());

function cargarGastosApiHandle(){
    this.handleEvent= function(event){
        event.preventDefault();
        cargarGastosApi()

        
    }
}

function cargarGastosApi(){
    var nombreUsuario = document.getElementById("nombre_usuario").value;
        fetch('https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/'+nombreUsuario, {method: 'Get'})
            .then(response => response.json())
            .then(data => {
                console.log(gestionPresupuesto.listarGastos());
                console.log(data);
                gestionPresupuesto.LimpiarGastos();
                console.log(gestionPresupuesto.listarGastos());
                gestionPresupuesto.cargarGastos(data);
                let elemento = document.getElementById("listado-gastos-filtrado-1");
                elemento.innerHTML="";
                elemento = document.getElementById("listado-gastos-filtrado-2");
                elemento.innerHTML="";
                elemento = document.getElementById("listado-gastos-filtrado-3");
                elemento.innerHTML="";
                elemento = document.getElementById("listado-gastos-filtrado-4");
                elemento.innerHTML="";

                repintar();
            })
            .catch(err => console.log(err));
}

let btnCargarGastosApi = document.getElementById("cargar-gastos-api");
btnCargarGastosApi.addEventListener('click', new cargarGastosApiHandle());


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}