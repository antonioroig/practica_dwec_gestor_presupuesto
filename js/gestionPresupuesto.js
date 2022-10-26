// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(valor >= 0)
    {
        presupuesto = valor;
        return presupuesto;
    }
    else    
    {
        return `Error` , -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion,valor,fecha = Date.now(), ...etiquetas ) {
    // TODO
    if(valor < 0 || isNaN(valor))
    {
        this.valor = 0;
    }
    else
    {
        this.valor = valor;
    }

    this.fecha = fecha;

    this.actualizarFecha = function(newfecha)
    {
        if(typeof newfecha === "string" && !isNaN(Date.parse(newfecha)))
        {
            this.fecha = Date.parse(newfecha);
        }
    }

    if(typeof fecha === "string" && !isNaN(Date.parse(fecha)))
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now();
    }

    this.mostrarGasto = function()
    {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }

    this.etiquetas = etiquetas;

    this.anyadirEtiquetas = function( ...newetiquetas)
    {
        newetiquetas.forEach(newetiqueta => {
            if(!this.etiquetas.includes(newetiqueta))
            {
                this.etiquetas.push(newetiqueta);
            }
        });              
    }

    this.borrarEtiquetas = function(...deletiquetas)
    {
        deletiquetas.forEach(deletiqueta => {
            let buscar = this.etiquetas.indexOf(deletiqueta);
            if(buscar != -1)
            {
                this.etiquetas.splice(buscar,1);
            }         
        });
    }

    this.mostrarGastoCompleto = function()
    {
        let fechalocate = new Date (this.fecha);
        let text= "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €." + "\n" + "Fecha: " + fechalocate.toLocaleString() + "\n" + "Etiquetas:\n" ;
        etiquetas.forEach(etiqueta => {
            text = text + "- " + etiqueta + "\n";
        });
        return text;
    }

    this.descripcion = descripcion;

    this.actualizarDescripcion = function(newdescripcion)
    {
        this.descripcion = newdescripcion;
    }

    this.actualizarValor = function(newvalor)
    {
        if(newvalor >= 0)
        {
            this.valor = newvalor;
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo)
    {
        let fechaAgrupacion = new Date (this.fecha)
        let dia;
        let mes;
        let anyo = fechaAgrupacion.getFullYear();

        if(fechaAgrupacion.getDate() > 9)
        {
            dia = fechaAgrupacion.getDate();
        }
        else
        {
            dia = "0" + fechaAgrupacion.getDate();
        }
        if(fechaAgrupacion.getMonth() > 9)
        {
            mes = fechaAgrupacion.getMonth() + 1;
        }
        else
        {
            mes = "0" + (fechaAgrupacion.getMonth() + 1);
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

function listarGastos(){
    return gastos;
}

function anyadirGasto(newgasto){
    newgasto.id = idGasto;
    gastos.push(newgasto);
    idGasto ++;
}

function borrarGasto(idEliminar){
    gastos.forEach(gasto => {
        if(gasto.id === idEliminar)
        {
            let buscar = gastos.indexOf(gasto);
            gastos.splice(buscar,1);
        }      
    });
}

function calcularTotalGastos(){
    var total = 0;
    gastos.forEach(gasto => {
        total = total + gasto.valor;
    });
    return total;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, ...etiquetasTiene}){
    fechaDesde = Date.parse(fechaDesde);
    fechaHasta = Date.parse(fechaHasta);
    let buscarGastos = gastos.filter(function(gastobuscado){
        let anyade = true;
        let fechaOK = fechaComprobacion(gastobuscado,fechaDesde,fechaHasta);
        let valorOK = valorComprobacion(gastobuscado,valorMinimo,valorMaximo);
        let desOK = desComprobacion(gastobuscado,descripcionContiene) ;
        return anyade;
    });
    return buscarGastos;
}

function desComprobacion(gastobuscado,descripcionContiene)
{
    let desGasto = gastobuscado.descripcion;
    if(indexOf.desGasto(descripcionContiene) === -1)
    {
        return false;
    }
    else
    {
        return true;
    }   
}

function valorComprobacion(gastobuscado,valorMinimo,valorMaximo)
        {
            let valorGasto = gastobuscado.valor;
            if(valorMinimo === undefined)
            {
                if(valorMaximo === undefined)
                {
                    return true;
                }
                else
                {
                    if(valorGasto <= valorMaximo)
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
                if(valorMaximo === undefined)
                {
                    if(valorGasto >= valorMinimo)
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
                    if(valorMinimo <= valorGasto <= valorMaximo)
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

function fechaComprobacion(gastobuscado,fechaDesde,fechaHasta)
        {
            let fechaGasto = gastobuscado.fecha;
            if(fechaDesde === undefined)
            {
                if(fechaHasta === undefined)
                {
                    return true;
                }
                else
                {
                    if(fechaGasto <= fechaHasta)
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
                if(fechaHasta === undefined)
                {
                    if(fechaGasto >= fechaDesde)
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
                    if(fechaDesde <= fechaGasto <= fechaHasta)
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

function agruparGastos(){

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    CrearGasto
}

// Action funciona??
