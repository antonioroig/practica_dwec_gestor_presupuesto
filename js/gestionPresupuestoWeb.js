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
        divValor.innerHTML += gasto.valor + " ";
        divGasto.append(divValor);

        let divEtiquetas = document.createElement('div');
        divEtiquetas.className = 'gasto-etiquetas';
        
        for (let etiquetas of gasto.etiquetas)
        {
          let divEtiqEtiq = document.createElement('span');
          divEtiqEtiq.className = 'gasto-etiquetas-etiqueta'
          divEtiqEtiq.innerHTML = etiquetas;
          
          divEtiquetas.append(divEtiqEtiq);
        }
        divGasto.append(divEtiquetas);
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

    document.getElementById('listado-gastos-completo');
    
    for (let gasto of presupuesto.listarGastos())
    {
      mostrarGastoWeb('listado-gastos-completo',gasto);
    }
  }
  
  
  export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
  }

