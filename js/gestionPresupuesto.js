// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(valor)
{
    if (valor >= 0 && typeof valor === "number")
    {
        presupuesto = valor;
        return valor;
    }
    else
    {
        console.log(`El valor ${valor} no es correcto`);
        return -1;
    }
}

//Revisar
function mostrarPresupuesto()
{
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
// revisar
function CrearGasto(descripcion,valor,fecha=Date.now(), ...etiquetas)
{

    this.descripcion = String(descripcion);
    this.etiquetas = [...etiquetas];

    if((typeof fecha === "string") && (!isNaN(Date.parse(fecha))))
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now();
    }

    if(valor >= 0 && (typeof valor === "number"))
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
        console.log(`El valor ${valor} no es válido.`);
    }

    this.mostrarGasto = function()
    {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(cambioDesc)
    {
        this.descripcion = cambioDesc;
    }

    this.actualizarValor = function(cambioVal)
    {
        if(cambioVal >= 0 && typeof cambioVal === "number")
        {
            this.valor = cambioVal;
        }
        else
        {
            console.log(`El valor ${cambioVal} no es válido, no se ha alterado el valor actual.`);
        }
    }

    this.actualizarFecha = function(nueva_fecha)
    {
        if((typeof nueva_fecha === "string") && (!isNaN(Date.parse(nueva_fecha))))
        {
            this.fecha = Date.parse(nueva_fecha);
        }
    }

    this.mostrarGastoCompleto = function()
    {
        let date = new Date(this.fecha);
        let ret = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${date.toLocaleString()}\nEtiquetas:\n`;

        for (let i = 0; i < etiquetas.length; i++) 
        {
            ret += `- ` + etiquetas[i] + `\n`;
        }    

        return ret;
    }

    this.anyadirEtiquetas = function(...arr)
    {
        let etiq = [...new Set([...this.etiquetas, ...arr])];

        this.etiquetas = etiq;
    }

    this.borrarEtiquetas = function(...arr)
    {
        let j = 0;
        let i = 0;

        while (i < this.etiquetas.length) 
        {
            while (j < arr.length)
            {
                if(arr[j] === this.etiquetas[i])
                {
                    this.etiquetas.splice(i, 1);
                    j++;
                    i = 0;
                }
            }  
        i++;
        }    
    }
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id)
{
    for (let i = 0; i < gastos.length; i++) 
    {
        if(id === gastos[i].id)
        {
            gastos.splice(i, 1);
        }
    }    
}

function calcularTotalGastos()
{
    let suma = 0;

    for (let i = 0; i < gastos.length; i++) 
    {
        suma += gastos[i].valor;
    }    

    return suma;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
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
    calcularBalance
}

