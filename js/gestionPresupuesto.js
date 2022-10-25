
let presupuesto = 0;
let gastos = new Array();
let idGastos = 0;
function actualizarPresupuesto(num_int) 
{
    
    if(num_int >= 0 && typeof num_int === 'number'){
        presupuesto = num_int;
        return presupuesto;
    }
    else
    {
        console.log('el número' +num_int + ' no es válido ');
        return -1;
    }    
 
}


function mostrarPresupuesto() 
{
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion,valor_actual,fecha = Date.now(), ...etiquetas) 
{
    this.descripcion = descripcion;
    this.etiquetas = [...etiquetas];

    if(typeof fecha === 'string' && !isNaN(Date.parse(fecha)))
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now();
    }
    if(valor_actual > 0 && typeof valor_actual ==='number')
    {

        this.valor = valor_actual;

    }
    else
    {
        this.valor = 0;
    };
    this.mostrarGasto = function()
    {
        return 'Gasto correspondiente a '+this.descripcion+ ' con valor ' +this.valor +' €';
    }
    this.mostrarGastoCompleto = function ()
    {
        let dato = new Date(this.fecha); 
        let etq = 'Gasto correspondiente a '+this.descripcion+ ' con valor ' +this.valor +' €.\n' +
        'Fecha: '+ dato.toLocaleString() + '\n'+
        'Etiquetas:\n';

        for(let i = 0; i< etiquetas.length; i++)
        {
             etq = etq + '- ' + etiquetas[i] +'\n';
        }

        return etq;
    };
    
    this.actualizarDescripcion = function(cadena_act)
    {
        this.descripcion = cadena_act;
    };

    this.actualizarValor = function(val_actualizado)
    {
        if(val_actualizado >= 0)
        {
            this.valor = val_actualizado;
        }
        else
        {
            console.log(`El valor introducido es negativo, no se ha podido actualizar`);
        };
    };
    this.actualizarFecha = function(new_fecha)
    {
        if(typeof fecha === 'string' && !isNaN(Date.parse(new_fecha)))
        {
            this.fecha = Date.parse(new_fecha);
        }
    }

    this.anyadirEtiquetas = function(...new_etq)
    {
            
            let result = [...new Set([...this.etiquetas,...new_etq])];
            this.etiquetas = result;
    }
    this.borrarEtiquetas = function(...elim)
    {
        elim.forEach(del => 
        {
          let pos = this.etiquetas.indexOf(del);
          if(pos != -1)
          {
            this.etiquetas.splice(pos,1);
          }  
        });
    }
    this.obtenerPeriodoAgrupacion = function(periodo)
    {
        let fecha = new Date(this.fecha);
        let mes = fecha.getMonth()+1; 
        
       
        if(periodo === 'dia')
        {
            if(mes > 10 && fecha.getDate() > 10 )
            {
                return fecha.getFullYear()+"-"+mes+"-"+fecha.getDate();
            }
            else
            {
                return fecha.getFullYear()+"-0"+mes+"-0"+fecha.getDate();
            }
             
        }
        if(periodo === 'mes')
        {
            if(mes > 10)
            {
                return fecha.getFullYear()+'-'+mes;
            }
            else
            {
                return fecha.getFullYear()+'-0'+mes;
            }
        }
        if(periodo === 'anyo')
        {
            return fecha.getFullYear();
        }
    }
}

function listarGastos()
{ 
    return gastos;
}

function anyadirGasto(g1)
{
    g1.id = idGastos;
    idGastos++;
    gastos.push(g1);
}
function borrarGasto(gastos_id)
{
    for(let i = 0; i < gastos.length; i++)
    {
        if(gastos_id === gastos[i].id)
        {
            gastos.splice(i,1);
        }
    }
}
function calcularTotalGastos()
{
    let total = 0;
    for(let i =0; i<gastos.length; i++)
    {
        total=total+gastos[i].valor;
    }
    return total;
}
function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos()
{

}
function agruparGastos()
{

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}

