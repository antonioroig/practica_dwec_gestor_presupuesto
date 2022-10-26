// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) 
{
    // TODO
    if(valor >= 0)
    {
        presupuesto = valor;
        return presupuesto;
    }
    else
    {
        return "Error" , -1;
    }
}
//Revisar
function mostrarPresupuesto() 
{
    // TODO
    return "Tu presupuesto actual es de " + presupuesto + " €";
}
// revisar
function CrearGasto(descripcion,valor,fecha = Date.now(), ...etiquetas)
{
    if(valor < 0 || isNaN(valor))
    {
        this.valor = 0;
    }    
    else
    {
        this.valor = valor;
    }
    if(typeof fecha === "string" && !isNaN(Date.parse(fecha)))
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now()
    }
    this.etiquetas = etiquetas
    this.descripcion = descripcion;
    this.mostrarGasto = function () 
    {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }
    this.mostrarGastoCompleto = function () 
    {
        let fechatostring = new Date(this.fecha);
        let text = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\nFecha: " + fechatostring.toLocaleString() + "\n" + "Etiquetas:\n";
        etiquetas.forEach(etiqueta =>{text += "- " + etiqueta + "\n"});
        return text;
    }
    this.actualizarValor = function (nuevovalor) 
    {
        if(nuevovalor >= 0)
        {
            this.valor = nuevovalor;
        }
    }
    this.actualizarDescripcion = function (nuevadescripcion) 
    {
        this.descripcion = nuevadescripcion;
    }
    this.actualizarFecha = function (nuevafecha) 
    {
        if(typeof nuevafecha === "string" && !isNaN(Date.parse(nuevafecha)))
        {
            this.fecha = Date.parse(nuevafecha);
        }
    }
    this.anyadirEtiquetas = function( ...nuevasetiquetas)
    {
        nuevasetiquetas.forEach(nueva => 
            {
                if(!this.etiquetas.includes(nueva))
                {
                    this.etiquetas.push(nueva);
                }
            });
    }
    this.borrarEtiquetas = function ( ...eliminaretiquetas)
    {
        eliminaretiquetas.forEach(eliminar => 
            {
                let posicion = this.etiquetas.indexOf(eliminar);
                if(posicion != -1)
                {
                    this.etiquetas.splice(posicion,1);
                }
            });
    }
    this.obtenerPeriodoAgrupacion = function (periodo)
    {
        let fechaPeriodo = new Date(this.fecha);
        let anyo =fechaPeriodo.getFullYear();
        let mes = 0;
        if(fechaPeriodo.getMonth() >= 9)
        {
            mes = fechaPeriodo.getMonth() + 1;
        }
        else
        {
            let temp = fechaPeriodo.getMonth() + 1
           mes = "0" + temp.toString();
        }
        let dia = 0;
        if(fechaPeriodo.getDate() >= 9)
        {
            dia = 
            fechaPeriodo.getDate();
        }
        else
        {
           dia = "0" + fechaPeriodo.getDate();
        }
        if(periodo === "dia")
        {
            return anyo + "-" + mes + "-" + dia;
        }
        if(periodo === "mes")
        {
            return anyo + "-" + mes;
        }
        if(periodo === "anyo")
        {
            return anyo;
        }
    }
}
function listarGastos()
{
    return gastos;
}
function anyadirGasto(nuevogasto)
{
    nuevogasto.id = idGasto;
    gastos.push(nuevogasto)
    idGasto++;
}
function borrarGasto(ideliminar)
{
    gastos.forEach(gasto => {
        if(gasto.id === ideliminar)
        {
            let posicion = gastos.indexOf(gasto);
            gastos.splice(posicion,1);
        }
    });
}
function calcularTotalGastos()
{
    let total = 0;
    gastos.forEach(gasto => {
        total += gasto.valor;
    });
    return total;
}
function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}
function agruparGastos()
{

}
function filtrarGastos({fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene, etiquetasTiene})
{
    fechaDesde = Date.parse(fechaDesde);
    fechaHasta = Date.parse(fechaHasta);
    let gastosencontrados = gastos.filter(function(posiblegasto)
    {
        let fechaCorrecta = fechaDesdeHasta(posiblegasto.fecha,fechaDesde,fechaHasta);
        let valorCorrecto = valorMinimoMaximo(posiblegasto.valor,valorMinimo,valorMaximo);
        let descripcionCorrecto = descripcionContieneTexto(posiblegasto.descripcion,descripcionContiene);
        let etiquetasCorrecto = etiquetasTieneEtiqueta(posiblegasto.etiquetas,etiquetasTiene);
        if(fechaCorrecta && valorCorrecto && descripcionCorrecto && etiquetasCorrecto)
        {
            return true;
        }
    });
    return gastosencontrados;
}
function etiquetasTieneEtiqueta(Array,ArrayAComparar)
{
    for(let i = 0;i < ArrayAComparar.length();i++)
    {
        for(let j = 0;j < Array.length();j++)
        {
            if(ArrayAComparar[i].toUpperCase() === Array[j].toUpperCase())
            {
                i++;
                Array.splice(j,1);
                j = 0;
            }
        }
    }
}
function descripcionContieneTexto(Cadena,TextoContiene)
{

}
function valorMinimoMaximo(ValorAComprobar,ValorMinimo,ValorMaximo)
{
    if(ValorMinimo === undefined)
    {
        if(ValorMaximo === undefined)
        {
            return true;
        }
        else
        {
            if(ValorAComprobar <= ValorMaximo)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    else
    {
        if(ValorMaximo === undefined)
        {
            if(ValorAComprobar >= ValorMinimo)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }
        else
        {
            if(ValorMinimo <= ValorAComprobar <= ValorMaximo)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
function fechaDesdeHasta(FechaAComprobar,FechaDesde,FechaHasta)
{
    if(FechaDesde === undefined)
    {
        if(FechaHasta === undefined)
        {
            return true;
        }
        else
        {
            if(FechaAComprobar <= FechaHasta)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    else
    {
        if(FechaHasta === undefined)
        {
            if(FechaAComprobar >= FechaDesde)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }
        else
        {
            if(FechaDesde <= FechaAComprobar <= FechaHasta)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   
{
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto, 
    borrarGasto, 
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
}
//hola
