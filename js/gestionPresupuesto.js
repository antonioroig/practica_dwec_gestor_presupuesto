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
        let anyo = fechaAgrupacion.getFullYear();
        let dia = 0;
        let mes = 0;
        if(fechaAgrupacion.getDate() >= 9)
        {
            dia = fechaAgrupacion.getDate();
        }
        else
        {
            dia = "0" + fechaAgrupacion.getDate();
        }
        if(fechaAgrupacion.getMonth() >= 9)
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

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene,etiquetasTiene}){
    let buscarGastos = gastos.filter(function(gastobuscado){
        let anyade = true;
        let fechaDesdeOK = true;
        let fechaHastaOK = true;
        let valorMinimoOK = true;
        let valorMaximoOK = true;
        let desOK = true;
        let etiOK = true;

        /*Comprobar Descripción*/
        let desGasto = gastobuscado.descripcion;
        if(descripcionContiene !== undefined && (desGasto.toUpperCase()).indexOf(descripcionContiene.toUpperCase()) == -1)
        {
            desOK = false;
        }     

        /*Comprobar Valor*/
        let valorGasto = gastobuscado.valor;
        if(valorMinimo > valorGasto )
        {
            valorMinimoOK = false;
        }

        if(valorMaximo < valorGasto )
        {
            valorMaximoOK = false;
        }

        /*Comprobar Fecha*/
        let fechaGasto = gastobuscado.fecha;
        if(Date.parse(fechaDesde) > fechaGasto || Date.parse(fechaDesde) == isNaN)
        {
            fechaDesdeOK = false;
        }

        if(Date.parse(fechaHasta) < fechaGasto || Date.parse(fechaHasta) == isNaN)
        {
            fechaHastaOK = false;
        }

        /*Comprobar Etiquetas*/
        let gastoEtiquetas = gastobuscado.etiquetas;
        if(etiquetasTiene !== undefined)
        {
            let contiene = false;
            for(let i = 0; i < etiquetasTiene.length;i++){    
                for(let j =0; j < gastoEtiquetas.length; j++)
                {
                    if(gastoEtiquetas[j] === etiquetasTiene[i])
                    {
                        contiene = true;
                    }
                }  
            }
            if(contiene === false)
            {
                etiOK = false;             
            }
        }      

        if(fechaDesdeOK === true && fechaHastaOK === true && valorMinimoOK === true && valorMaximoOK === true && desOK === true && etiOK === true)
        {
            anyade = true;
        }
        else
        {
            anyade = false;
        }

        return anyade;
    });
    return buscarGastos;
}


function agruparGastos(periodo="mes",etiquetas,fechaDesde,fechaHasta){
    let arrayFilter = filtrarGastos({etiquetasTiene: etiquetas,fechaDesde: fechaDesde, fechaHasta: fechaHasta});
    let objetoFinal = arrayFilter.reduce((acc, gastofiltrado) =>
    {
        let fechaR = gastofiltrado.obtenerPeriodoAgrupacion(periodo);
        if(acc[fechaR] != undefined)
        {
            acc[fechaR] += gastofiltrado.valor;
        }
        else
        {
            acc[fechaR] = gastofiltrado.valor;
        }
        return acc;
    },{});
    return objetoFinal;
}

function transformarListadoEtiquetas(etiquetasTiene){
    let etiquetas = etiquetasTiene.split();
    return etiquetas;
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
    transformarListadoEtiquetas,
    CrearGasto
}

// Action funciona??
