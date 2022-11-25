// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;
function actualizarPresupuesto(valor) {
    if(valor >= 0  && typeof valor === `number`)
    {
        presupuesto = valor;
        return valor;
    }
    else
    {
        console.log(`error, El numero es mayor
         que 0`);
        return -1;
    }
}
function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

//parametro rest
function CrearGasto(descripcion,valor,fecha,...etiqueta) {

    if([...etiqueta] === `undefined`)
    {
        this.etiquetas = []; 
    }
    else
    {
        this.etiquetas = [...etiqueta];
    }

    if(isNaN(Date.parse(fecha)))
    { 
        this.fecha = Date.now();
    }else
    {
        this.fecha = Date.parse(`${fecha}`); 
    }

    if(valor < 0 || typeof(valor) !== `number` )
    {
        valor = 0; 
    }
    
    
    
    //
    
    
    this.descripcion= `${descripcion}`,
    this.valor = valor,
        
    this.mostrarGasto = function()
    {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    },

    this.mostrarGastoCompleto = function()
    {
        var textoEtiquetas = ``;
        for(let eti of this.etiquetas)
        {
            textoEtiquetas += `- ${eti}\n`;
        }
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n${textoEtiquetas}`);
    },

    this.actualizarFecha = function(fechaNueva )
    {
        if(!isNaN(Date.parse(fechaNueva)))
        { 
            this.fecha = Date.parse(fechaNueva);
        }
    },

    this.anyadirEtiquetas = function(...etiquetasAAnyadir)
    {
        if(etiquetasAAnyadir !== `undefined`)
        {
            for(let i= 0;i < etiquetasAAnyadir.length; i++)
            {
                if(!this.etiquetas.includes(etiquetasAAnyadir[i]))
                {
                    this.etiquetas.push(etiquetasAAnyadir[i]);
                }
            }
        } 
    },

    this.borrarEtiquetas = function(...nombre)
    {
        for(let j = 0;j < nombre.length;j++)
        {
            for(let i= 0;i < this.etiquetas.length; i++)
            {
                if(nombre[j] === this.etiquetas[i])
                {
                    this.etiquetas.splice(i,1);
                }
            }
        }
        
    },
    
    this.actualizarDescripcion  = function(descripcion)
    {
        this.descripcion = descripcion;
    },

    this.actualizarValor = function(valor)
    {
        if(valor >= 0 && typeof(valor) === `number`)
        {
            this.valor = valor;
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo)
    {
        let res;

        let f = new Date(this.fecha);

        let dia = f.getDate();

        let mes = (parseInt(f.getMonth()) + 1);
        
        let anyo = f.getFullYear();
        let b = `-`;
        let a = `-`;
        if(parseInt(dia) < 10)
        {
            b += `0`
        }

        if(parseInt(mes) < 10)
        {
            a += `0`
        }

        if(periodo == `dia`)
        {
            res =  anyo + a +  mes + b + dia;
        }
        if(periodo == `mes`)
        {
            
            res = anyo + a +  mes;
        }
        if(periodo == `anyo`)
        {
            res = anyo;
        }
        b = `-`;
        a = `-`;
        return res;
    }
    
    //this.actualizarFecha(fecha){
      //  if(typeof fecha === `string` )
    //}
}
    
    function anyadirGasto(gasto)
    {
        gasto.id =idGasto;
        idGasto++;
        gastos.push(gasto);
    }


    function borrarGasto(id)
    {

        for(let i = 0; i < gastos.length; i++)
        {
            if(gastos[i].id === id)
            {
                gastos.splice(i,1);
            }
        }
    }
    

    function listarGastos(){
        return gastos;
    }

    function calcularTotalGastos()
    {
        let suma = 0;
        for(let i = 0;i < gastos.length;i++)
        suma += gastos[i].valor;
        return suma;
    }


    function calcularBalance()
    {
        return presupuesto - calcularTotalGastos();
    }

    function filtrarGastos(objeto) {
        if (objeto != undefined || objeto != null) 
        {
            let arrayNuevo = gastos.filter(gasto => {
                if (objeto.hasOwnProperty("fechaDesde")) 
                {
                    if (gasto.fecha < Date.parse(objeto.fechaDesde) && typeof objeto.fechaDesde !== "undefined")
                    {
                        return;
                    } 
                }
                if (objeto.hasOwnProperty("fechaHasta") && typeof objeto.fechaHasta !== "undefined") 
                {
                    if (gasto.fecha > Date.parse(objeto.fechaHasta)) 
                    {
                        return;
                    }
                }
                if (objeto.hasOwnProperty("valorMinimo") && typeof objeto.valorMinimo !== "undefined") 
                {
                    if (gasto.valor < objeto.valorMinimo) 
                    {
                        return;
                    }
                }
                if (objeto.hasOwnProperty("valorMaximo") && typeof objeto.valorMaximo !== "undefined") 
                {
                    if (gasto.valor > objeto.valorMaximo)
                    {
                        return;
                    }
                }
                if (objeto.hasOwnProperty("descripcionContiene") && typeof objeto.descripcionContiene !== "undefined") 
                {
                    if (!gasto.descripcion.includes(objeto.descripcionContiene))
                    {
                        return;
                    }
                        
                }
                if (objeto.hasOwnProperty("etiquetasTiene") && Array.isArray(objeto.etiquetasTiene) && objeto.etiquetasTiene.length !== 0) 
                {
                    let ok= false;

                    for (let descripcion of objeto.etiquetasTiene)
                    {
                        if (gasto.etiquetas.includes(descripcion)) 
                        {
                            ok = true; 
                        }
                        
                    } 
                          
                    if (!ok) 
                    {
                        return;
                    }
                        
                }
                return gasto;
            });
                return arrayNuevo;
        } 
        else 
            return gastos;
    };  

    function agruparGastos(periodo = "mes",etiquetas,fechad,fechaH)
    {
        
        let arrayDeGastos = filtrarGastos({fechaDesde: fechad, fechaHasta:fechaH,etiquetasTiene:etiquetas});

        let arrayAgrupados = arrayDeGastos.reduce(function(acc,item)
        {
            let per = item.obtenerPeriodoAgrupacion(periodo);

            if(acc.hasOwnProperty(per))
            {
                if(!isNaN(acc[per]))
                {
                    acc[per] += item.valor;
                }
            }
            else
            {
                acc[per] = item.valor;
            }
            return acc;

        },{});


        return arrayAgrupados;
    }

        //prueba 
    

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




