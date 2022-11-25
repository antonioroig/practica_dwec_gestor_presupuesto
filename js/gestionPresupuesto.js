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
function filtrarGastos({fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene, etiquetasTiene})
{
    let gastosencontrados = gastos.filter(function(gasto)
    {
        let fechaCorrecta = true;
        let valorCorrecto = true;
        let descripcionCorrecto = true;
        let etiquetasCorrecto = true;
        //Fecha//
        if(Date.parse(fechaDesde) == isNaN || Date.parse(fechaDesde) > gasto.fecha)
        {
            return fechaCorrecta = false;
        }
        if(Date.parse(fechaHasta) == isNaN || Date.parse(fechaHasta) < gasto.fecha)
        {
            return fechaCorrecta = false;
        }
        //Valor//
        if(valorMinimo > gasto.valor)
        {
            return valorCorrecto = false;
        }
        if(valorMaximo < gasto.valor)
        {
            return valorCorrecto = false;
        }
        //Descripción//
        if(descripcionContiene !== undefined && (gasto.descripcion.toUpperCase()).indexOf(descripcionContiene.toUpperCase()) == -1)
        {
           descripcionCorrecto = false;
        }
        //Etiquetas//
        if(etiquetasTiene !== undefined)
        {
            let esta = false;
            for(let i = 0; i < etiquetasTiene.length; i++)
            {
                
                for(let j = 0; j < gasto.etiquetas.length;j++)
                {

                    if(etiquetasTiene[i] === gasto.etiquetas[j])
                    {
                        esta = true;
                    }

                }  
            }
            if(esta === false)
            {
                etiquetasCorrecto = false;
            }
        }
        if(fechaCorrecta && valorCorrecto && descripcionCorrecto && etiquetasCorrecto)
        {
            return true;
        }
        else
        {
            return false;
        }
    });
    return gastosencontrados;
}
function agruparGastos(periodo="mes",etiquetas,fechaDesde,fechaHasta)
{
    let ArrayFiltrado = filtrarGastos({etiquetasTiene: etiquetas, fechaDesde: fechaDesde,fechaHasta: fechaHasta});
    let ObjetoFinal = ArrayFiltrado.reduce((acc,item) => 
    {
        let Fecha = item.obtenerPeriodoAgrupacion(periodo);
        if(acc[Fecha] == undefined)
        {
            acc[Fecha] = item.valor;
        }
        else
        {
            acc[Fecha] += item.valor;
        }
        return acc;
    },{});
    return ObjetoFinal;
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
