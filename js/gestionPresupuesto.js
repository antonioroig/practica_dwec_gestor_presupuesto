// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto = 0;

var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(valor) {
    if(valor >= 0)
    {
        return presupuesto = valor;
    }
    else
    {
        console.log("Error.\nHa introducido un valor negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}


function CrearGasto(descripcion, valor, fecha=Date.now(), ...etiquetas) {
    this.descripcion = descripcion;
    this.etiquetas = [...etiquetas];
    if(typeof fecha === 'string')
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = fecha;
    }

    if(valor > -1)
    {
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },
    this.actualizarDescripcion = function(nueva_descripcion){
        this.descripcion = nueva_descripcion;
    },
    this.actualizarValor = function(nuevo_valor){
        if(nuevo_valor > -1)
        {
            this.valor = nuevo_valor;
        }
    },
    this.actualizarFecha = function(stringFecha){
        let nuevaFecha = Date.parse(stringFecha);
        if(!isNaN(nuevaFecha))
        {
            this.fecha = nuevaFecha;
        }
    },
    this.anyadirEtiquetas = function(...etiquetas){
        let existe = 0;
        for(let i = 0; i < etiquetas.length; i++)
        {
            for(let j = 0; j < this.etiquetas.length; j++)
            {
                if(etiquetas[i] === this.etiquetas[j])
                {
                    existe = 1;
                    break;
                }
            }
            if(existe === 0)
            {
                this.etiquetas.push(etiquetas[i]);
            }
            existe = 0;
        }
    },
    this.borrarEtiquetas = function(...etiquetas)
    {
        for(let i = 0; i < etiquetas.length; i++)
        {
            for(let j = 0; j < this.etiquetas.length; j++)
            {
                if(etiquetas[i] === this.etiquetas[j])
                {
                    this.etiquetas.splice(j, 1);
                }
            }
        }
    },
    this.mostrarGastoCompleto = function(){
        let fFecha = new Date(this.fecha)
        let string = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fFecha.toLocaleString())}\nEtiquetas:\n`;
        for(let i = 0; i < this.etiquetas.length; i++)
        {
            string += `- ${this.etiquetas[i]}\n`;
        }
        return string;
    },
    this.obtenerPeriodoAgrupacion = function(periodo){
        let salida = '';
        let fFecha = new Date(this.fecha);
        // let mes = fecha.getMonth() + 1; Hay que sumarle uno porque el método calcula los meses de 0 a 11.
        if(periodo === 'anyo')
        {
            salida = `${fFecha.getFullYear()}`;
        }
        if(periodo === 'mes')
        {
            if((fFecha.getMonth()+1) >= 1 && (fFecha.getMonth()+1) <= 9)
            {
                salida = `${fFecha.getFullYear()}-0${fFecha.getMonth()+1}` ;
            }
            else
            {
                salida = `${fFecha.getFullYear()}-${fFecha.getMonth()+1}` ;
            }
        }
        if(periodo === 'dia')
        {
            if((fFecha.getMonth()+1) >= 1 && (fFecha.getMonth()+1) <= 9)
            {
                salida = `${fFecha.getFullYear()}-0${fFecha.getMonth()+1}` ;
            }
            else{
                salida = `${fFecha.getFullYear()}-${fFecha.getMonth()+1}` ;
            }
            if(fFecha.getDate() >= 1 && fFecha.getDate() <= 9)
            {
                salida += `-0${fFecha.getDate()}` ;
            }
            else
            {
                salida += `-${fFecha.getDate()}` ;
            }
            
        }
        return salida;
    }
}
function listarGastos() {
    return gastos;
}
function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(idGasto) {
    for(let i = 0; i < gastos.length; i++)
    {
        if(gastos[i].id === idGasto)
        {
            gastos.splice(i, 1);
        }
    }
}
function calcularTotalGastos() {
    let suma = 0;
    for(let i = 0; i < gastos.length; i++)
    {
        suma += gastos[i].valor;
    }
    return suma;
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();    
}
function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}) {
    let nuevoArray = gastos.filter(function(gasto)
    {
        let existe = 1;
        if(fechaDesde)
        {
            if(gasto.fecha < Date.parse(fechaDesde))
            {
                existe = 0;
            }
        }
        if(fechaHasta)
        {
            if(gasto.fecha > Date.parse(fechaHasta))
            {
                existe = 0;
            }
        }
        if(valorMinimo)
        {
            if(gasto.valor < valorMinimo)
            {
                existe = 0;
            }
        }
        if(valorMaximo)
        {
            if(gasto.valor > valorMaximo)
            {
                existe = 0;
            }
        }
        if(descripcionContiene)
        {
            if(!gasto.descripcion.includes(descripcionContiene))
            {
                existe = 0;
            }
        }
        if(etiquetasTiene)
        {
            let contieneEtiqueta = 0;
            for(let i = 0; i < gasto.etiquetas.length; i++)
            {
                for(let j = 0; j < etiquetasTiene.length; j++)
                {
                    if(gasto.etiquetas[i] === etiquetasTiene[j])
                    {
                        contieneEtiqueta = 1;
                    }
                }
            }
            if(contieneEtiqueta == 0)
            {
                existe = 0;
            }
        }
        return existe;
    });
    return nuevoArray;  
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filtrarObjeto = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta}
    let gastosFiltrados = filtrarGastos(filtrarObjeto);
    let reducir = gastosFiltrados.reduce((acumulador, item) => {
        let periodoAgrupacion = item.obtenerPeriodoAgrupacion(periodo);
        if(acumulador[periodoAgrupacion] == null)
        {
            acumulador[periodoAgrupacion] = item.valor;
        }
        else
        {
            acumulador[periodoAgrupacion] += item.valor;
        }
        return acumulador;
    }, {});
    return reducir;
}

function transformarListadoEtiquetas(arrayEtiquetas) 
{
    let transformado = arrayEtiquetas.match(/[a-z0-9]+/gi);
    return transformado;
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
