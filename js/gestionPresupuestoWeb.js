  import * as gasto from './gestionPresupuesto.js';

  function mostrarDatoEnId (idElemento, valor)
  {
    if (idElemento)
    {
        let ID = document.getElementById(idElemento);
        ID.innerHTML += " " + valor;
    }
  }
  function mostrarGastoWeb (idElemento, gasto)
  {
     if(idElemento)
     {
        let ElementoID = document.getElementById(idElemento);
        let divGasto = document.createElement('div');
        divGasto.className = 'gasto';
        
        let divDes = document.createElement('div');
        divDes.className = 'gasto-descripcion';
        divDes.innerHTML += gasto.descripcion;
        divGasto.append(divDes);

        let divfecha = document.createElement('div');
        divfecha.className = 'gasto-fecha';
        divfecha.innerHTML += gasto.divfecha;
        divGasto.append(divfecha);

        let divValor = document.createElement('div');
        divValor.className = 'gasto-valor';
        divValor.innerHTML += gasto.valor;
        divGasto.append(divValor);

        let divEtiquetas = document.createElement('div');
        divEtiquetas.className = 'gasto-etiquetas';
        for (let i = 0; i < gasto.etiquetas.length; i++)
        {
          divEtiqEtiq = document.createElement('div');
          divEtiqEtiq.className = 'gasto-etiquetas-etiqueta'
          divEtiqEtiq.innerHTML += gasto.etiquetas[i];
          divGasto.append(divEtiqEtiq);
        }
        divGasto.append(divEtiquetas);
        ElementoID.append(divGasto);

     }
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
        spandatovalor.innerHTML += `${clave.valueOf()}`;
        divDatos.append(spandatovalor);

        divAgrupacion.append(divDatos);
      }

      idGrupo.append(divAgrupacion);
  }

  export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
  }

