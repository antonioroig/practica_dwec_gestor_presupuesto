


// TODO: Variable global
let presupuesto = 0 ;
 
function actualizarPresupuesto(dinero)
{
   if (typeof dinero ==="number" && dinero > 0 ){
 
        return presupuesto = dinero;
 
    }else
    {
       console.log("-1");
       return -1;
    }
    // TODO
}
 
function mostrarPresupuesto()
{
    return `Tu presupuesto actual es de ${presupuesto} €`;
    // TODO
}


function CrearGasto(descripcion,valor) {

    this.descripcion = descripcion;

    if (typeof valor ==="number" > 0)
    {
        this.valor =valor;
    }else{
        this.valor=0;
    }
  
   this.mostrarGasto = function() 
   {
    return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor}`)
   }
   this.actualizarDescripcion =function(nuevaDescripcion)
   {(
        this.descripcion = nuevaDescripcion 
   );
   }
   this.actualizarValor =function(nuevoValor)
   {(
     this.valor=nuevoValor
   );
   }
    // TODO
}








// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
   
}
 
 
