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

        let botonEditar = document.createElement('button');
        botonEditar.type = 'button';
        botonEditar.className = 'gasto-editar';
        botonEditar.innerHTML += 'Editar';

        let objetoeditar = new EditarHandle(gasto);
        objetoeditar.gasto = gasto;
        botonEditar.addEventListener('click',objetoeditar);
        divGasto.append(botonEditar);

        let botonBorrar = document.createElement('button');
        botonBorrar.type = 'button';
        botonBorrar.className = 'gasto-borrar';
        botonBorrar.innerHTML += 'Borrar';

        let objetoborrar = new BorrarHandle(gasto);
        objetoborrar.gasto = gasto;
        botonBorrar.addEventListener('click', objetoborrar);
        divGasto.append(botonBorrar);
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

  function actualizarPresupuestoWeb(){
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
    this.handleEvent = function (some){
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
  function BorrarHandle(){
    
    this.handleEvent = function (some)
    {
        let borrar = this.gasto.id;
        presupuesto.borrarGasto(borrar);

        repintar();
   }
  }

  function BorrarEtiquetasHandle(){
    
    this.handleEvent = function (some) {

        this.gasto.borrarEtiquetas(this.etiquetas);
  
        repintar();
      } 
  }

  function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");

    let evento = document.getElementById('controlesprincipales');
    evento.append(formulario);

    document.getElementById('anyadirgasto-formulario').setAttribute('disabled',"");

    

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
    nuevoGastoWebFormulario
  }

