  'use strict';

  import * as presupuesto from './gestionPresupuesto.js';

  function mostrarDatoEnId (idElemento, valor)
  {
        let ID = document.getElementById(idElemento);
        ID.innerHTML += " " + valor;
  }
  function mostrarGastoWeb (idElemento, gasto)
  {
        let ElementoID = document.getElementById(idElemento);
        
        let divGasto = document.createElement("div");
        divGasto.className = "gasto";
        ElementoID.append(divGasto);

        let divDes = document.createElement("div");
        divDes.className = "gasto-descripcion";
        divDes.innerHTML += gasto.descripcion;
        divGasto.append(divDes);

        let divfecha = document.createElement("div");
        divfecha.className = "gasto-fecha";
        divfecha.innerHTML += gasto.fecha;
        divGasto.append(divfecha);

        let divValor = document.createElement("div");
        divValor.className = "gasto-valor";
        divValor.innerHTML += gasto.valor;
        divGasto.append(divValor);

        let divEtiquetas = document.createElement('div');
        divEtiquetas.className = 'gasto-etiquetas';
        
        for (let etiquetas of gasto.etiquetas)
        {
          let divEtiqEtiq = document.createElement('span');
          divEtiqEtiq.className = 'gasto-etiquetas-etiqueta'
          divEtiqEtiq.innerHTML = etiquetas;
          
          divEtiquetas.append(divEtiqEtiq);

          let borrarEtiquetas = new BorrarEtiquetasHandle();
          borrarEtiquetas.gasto = gasto;
          borrarEtiquetas.etiquetas = etiquetas;
          divEtiqEtiq.addEventListener('click',borrarEtiquetas);
        }
        divGasto.append(divEtiquetas);
        
        // Boton Editar 
        let botonEditar = document.createElement('button');
        botonEditar.type = 'button';
        botonEditar.className = 'gasto-editar';
        botonEditar.innerHTML += 'Editar';

        let objetoeditar = new EditarHandle(gasto);
        objetoeditar.gasto = gasto;
        botonEditar.addEventListener('click',objetoeditar);
        divGasto.append(botonEditar);
        
        //Boton Borrar
        let botonBorrar = document.createElement('button');
        botonBorrar.type = 'button';
        botonBorrar.className = 'gasto-borrar';
        botonBorrar.innerHTML += 'Borrar';

        let objetoborrar = new BorrarHandle(gasto);
        objetoborrar.gasto = gasto;
        botonBorrar.addEventListener('click', objetoborrar);
        divGasto.append(botonBorrar);
        

        //Boton Borrar (API) 
        let botonBorrarApi = document.createElement('button');
        botonBorrarApi.type = 'button';
        botonBorrarApi.className = 'gasto-borrar-api';
        botonBorrarApi.innerHTML += 'Borrar (Api)';
    
        let BorrarApi = new BorrarGastosApi();
        BorrarApi.gasto = gasto;
        /*console.log("id = " + gasto.id);
        console.log("BorrarApiId = " + BorrarApi.gasto.id);*/
        botonBorrarApi.addEventListener('click', BorrarApi);
        divGasto.append( botonBorrarApi);

        // forma de formulario
        let botonEditarForm = document.createElement('button');
        botonEditarForm.type = 'button';
        botonEditarForm.className = 'gasto-editar-formulario';
        botonEditarForm.textContent = 'Editar (formulario)';

        let editarForm = new EditarHandleFormulario(gasto);
        editarForm.gasto = gasto;
        botonEditarForm.addEventListener('click',editarForm);
        divGasto.append(botonEditarForm);

  }
  function mostrarGastosAgrupadosWeb (idElemento,agrup,periodo)
  {
      let idGrupo = document.getElementById(idElemento);
      let divAgrupacion = document.createElement('div');
      divAgrupacion.className = 'agrupacion';

      let h1 = document.createElement('h1');
      h1.innerHTML = `Gastos agrupados por ${periodo}`;
      divAgrupacion.append(h1);
      
      for(let clave of Object.keys(agrup))
      {
        let divDatos = document.createElement('div');
        divDatos.className = 'agrupacion-dato';
        
        let spandatoclave = document.createElement('span');
        spandatoclave.className = 'agrupacion-dato-clave';
        spandatoclave.innerHTML += `${clave}`;
        divDatos.append(spandatoclave);

        let spandatovalor = document.createElement('span');
        spandatovalor.className = 'agrupacion-dato-valor';
        spandatovalor.innerHTML += " " + `${clave.valueOf()}`;
        divDatos.append(spandatovalor);

        divAgrupacion.append(divDatos);
      }

      idGrupo.append(divAgrupacion);
  }

  function repintar()
  {
    document.getElementById('presupuesto');
    mostrarDatoEnId('presupuesto', presupuesto.mostrarPresupuesto());

    document.getElementById('gastos-totales');
    mostrarDatoEnId('gastos-totales', presupuesto.calcularTotalGastos());

    document.getElementById('balance-total');
    mostrarDatoEnId('balance-total', presupuesto.calcularBalance());

    document.getElementById('listado-gastos-completo').innerHTML = '';
    
    for (let gasto of presupuesto.listarGastos())
    {
      mostrarGastoWeb('listado-gastos-completo',gasto);
    }
  }

  function actualizarPresupuestoWeb()
  {
    let  presupuestoWeb = prompt('Presupuesto:')
    let presupuestostring = parseFloat(presupuestoWeb);
    presupuesto.actualizarPresupuesto(presupuestostring);

    repintar();
  }

  let botonactpresupuesto = document.getElementById('actualizarpresupuesto');
  botonactpresupuesto.addEventListener('click',actualizarPresupuestoWeb);

  function nuevoGastoWeb(){
    let descripcion = prompt('Descripcion: ');
    let valorstring = prompt('Valor: ');
    let valor = parseFloat(valorstring);
    let fechatemp = prompt('Fecha: ');
    let fecha = Date.parse(fechatemp);
    let etiquetas = prompt('Etiquetas: Separador " , "').split(',');

    let nuevoGastoWeb = new presupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
    presupuesto.anyadirGasto(nuevoGastoWeb);

    repintar();
  }

  let botonanyadirgasto = document.getElementById('anyadirgasto');
  botonanyadirgasto.addEventListener('click',nuevoGastoWeb);

  function EditarHandle(){
    this.handleEvent = function (event){
      let Editardescripcion = prompt('Descripcion: ');
      let valorstring = prompt('Valor: ');
      let Editarvalor = parseFloat(valorstring);
      let fechatemp = prompt('Fecha: ');
      let Editarfecha = Date.parse(fechatemp);
      let Editaretiquetas = prompt('Etiquetas: Separador " , "').split(',');

      this.gasto.actualizarDescripcion(Editardescripcion);
      this.gasto.actualizarValor(Editarvalor);
      this.gasto.actualizarFecha(Editarfecha);
      this.gasto.anyadirEtiquetas(...Editaretiquetas);

      repintar();
      
    }
  }
  function BorrarHandle()
  {
    
      this.handleEvent = function (event)
      {
          let borrar = this.gasto.id;
          presupuesto.borrarGasto(borrar);

          repintar();
      }
  }

  function BorrarEtiquetasHandle()
  {
    this.handleEvent = function (event) 
      {
        this.gasto.borrarEtiquetas(this.etiquetas);
  
        repintar();
      } 
  }

  function nuevoGastoWebFormulario()
  {
      let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
      var formulario = plantillaFormulario.querySelector("form");

      let evento = document.getElementById('controlesprincipales');
      evento.append(formulario);

      document.getElementById("anyadirgasto-formulario").setAttribute('disabled', "");
      
      let cancelar = new CancelarHandle();
      let botonCancelar = formulario.querySelector("button.cancelar")
        botonCancelar.addEventListener('click',cancelar);

      let botonenviar = new EnviarHandleFormulario();
      formulario.addEventListener('submit', botonenviar);
  }

      //boton añadir-gato-fromulario
      let botonAnyadirGasto = document.getElementById('anyadirgasto-formulario');
      botonAnyadirGasto.addEventListener('click',nuevoGastoWebFormulario);
  

      function CancelarHandle()
      {
        this.handleEvent = function(event)
        {
            event.preventDefault();
    
            event.currentTarget.parentNode.remove();
            document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
            
            repintar();
        }
      }


      function EnviarHandle()
      {
        this.handleEvent = function(event)
        {
          event.preventDefault();
          
          let formulario = event.currentTarget;
  
          let descripcion = formulario.elements.descripcion.value;
          this.gasto.actualizarDescripcion(descripcion);
  
          let valor = parseFloat(formulario.elements.valor.value);
          this.gasto.actualizarValor(valor);
  
          let fecha = formulario.elements.fecha.value;
          this.gasto.actualizarFecha(fecha);
  
          let etiquetas = formulario.elements.etiquetas.value;
          this.gasto.anyadirEtiquetas(...etiquetas);
  
          repintar();
        }
      }
    function EnviarHandleFormulario()
    {
          this.handleEvent = function(event)
          {
            event.preventDefault();

            let formulario = event.currentTarget;

            let descripcion = formulario.elements.descripcion.value;

            let valor = parseFloat(formulario.elements.valor.value);

            let fecha = formulario.elements.fecha.value;

            let etiquetas = formulario.elements.etiquetas.value;

            let gasto = new presupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);
            presupuesto.anyadirGasto(gasto);
            
            repintar();

            document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        }
    }


  function EditarHandleFormulario()
  {
    this.handleEvent = function(event)
    {
        event.preventDefault()

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        let controles = document.getElementById("controlesprincipales");
        controles.append(formulario);
    
        let botonFormulario = event.currentTarget;
        botonFormulario.append(formulario);

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substring(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        
        let cancelar = new CancelarHandle();
        let botonCancelar = formulario.querySelector("button.cancelar")
        botonCancelar.addEventListener('click',cancelar);

        let enviar = new EnviarHandle();
        enviar.gasto = this.gasto;
        formulario.addEventListener('submit',enviar);

        botonFormulario.setAttribute('disabled', "");
    }
}

function filtrarGastosWeb(){
  
  this.handleEvent = function(event)
    {
        event.preventDefault() 
        let descripcion = document.getElementById("formulario-filtrado-descripcion").value;
        let minimo = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let maximo = parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let fechaDesde =  document.getElementById("formulario-filtrado-fecha-desde").value;
        let fechaHasta =  document.getElementById("formulario-filtrado-fecha-hasta").value;
        let etiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        let filtrado ={};

        if(etiquetas.length > 0){
            filtrado.etiquetasTiene = presupuesto.transformarListadoEtiquetas(etiquetas);
        }
        
        filtrado.descripcionContiene = descripcion;
        filtrado.valorMinimo = minimo;
        filtrado.valorMaximo = maximo;
        filtrado.fechaDesde = fechaDesde;
        filtrado.fechaHasta = fechaHasta;
        filtrado.etiquetas = etiquetas;

        document.getElementById("listado-gastos-completo").innerHTML = "";
        let gastosFiltrados = presupuesto.filtrarGastos(filtrado);

        for(let gasto of gastosFiltrados){
            mostrarGastoWeb("listado-gastos-completo",gasto);
        };
    }
}

let botonSubmit = document.getElementById('formulario-filtrado');
botonSubmit.addEventListener('submit', new filtrarGastosWeb());


function guardarGastosWeb(){
  
    this.handleEvent = function(event)
    {
        localStorage.setItem('GestorGastosDWEC',JSON.stringify(presupuesto.listarGastos()));
    }
}

let botonGuardar = document.getElementById('guardar-gastos');
botonGuardar.addEventListener('click', new guardarGastosWeb());

  function cargarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();

        if(localStorage.getItem('GestorGastosDWEC')){
            presupuesto.cargarGastos(JSON.parse(localStorage.getItem('GestorGastosDWEC')));
        }
        else{
            presupuesto.cargarGastos([]);
        }

        repintar();
    }

  }; 

let botonCargar = document.getElementById('cargar-gastos');
botonCargar.addEventListener('click', new cargarGastosWeb());


function CargarGastosApi(){
    this.handleEvent = function(event){
      event.preventDefault();
      let usuario = document.getElementById("nombre_usuario").value;

      let promise = fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`)

      .then (response => response.json())

      .then (response => {
        if( response !="")
        {
          presupuesto.cargarGastos(response);
          repintar();
        }
        else console.log("Gastos Vacios")
      });
    }
}
    
    let bntCargarApi = document.getElementById('cargar-gastos-api');
    bntCargarApi.addEventListener('click', new CargarGastosApi());
    
    
    function BorrarGastosApi(){
      this.handleEvent = function(event){
        event.preventDefault();
        let usuario = document.getElementById("nombre_usuario").value;
    console.log("dentro de la funcion" + this.gasto.id);
        let promise = fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`, {method: 'DELETE'} )
        
        .then (response => {
          if (response.ok)
          {
            console.log(`se ha borrado el gasto ${this.gasto.gastoId}`);
            CargarGastosApi();
          }
          else 
          {
            console.log('No se ha borrado el gasto');
          }
        })
    
      }
    }   

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    CancelarHandle,
    EnviarHandle,
    EnviarHandleFormulario,
    EditarHandleFormulario,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    CargarGastosApi,
    BorrarGastosApi
  }

