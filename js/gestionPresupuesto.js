
// TODO: Variable global

let presupuesto = 0;

let gastos = [];

let idGasto = 0;

function actualizarPresupuesto(num) {
    // TODO

    if(num >= 0 && typeof num === "number")
    {

        presupuesto = num;
        return presupuesto;

    }
    else
    {

        console.log("Error, el numero introducido es negativo");
        return -1;
   }
}

//Revisar
function mostrarPresupuesto() {
    // TODO
    return(`Tu presupuesto actual es de ${presupuesto} €`);

}
// revisar
function CrearGasto(descripcion,valor, fecha = Date.now(), ...etiquetas) {

    this.descripcion = descripcion;

    this.etiquetas = [...etiquetas];

    if(valor >= 0 && typeof valor === "number")
    {

        this.valor = valor;

    }
    else
    {
        this.valor = 0;

    }
    
    if(typeof fecha === 'string' && !isNaN(Date.parse(fecha)))
    {

        this.fecha = Date.parse(fecha);

    }
    
    else
    {

        this.fecha = Date.now();

    }
    
    this.mostrarGasto = function()
    {

        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)

    };

    this.actualizarDescripcion = function(desc)
    {
        this.descripcion = desc;
    };

    this.actualizarValor = function(valorActualizado){

        if(valorActualizado >= 0 && typeof valorActualizado === "number")
        {

            this.valor = valorActualizado;

        }

    }

    this.mostrarGastoCompleto = function(){

        let Gastos;

        let fechaMod = new Date(this.fecha);

        Gastos = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;

        Gastos += `Fecha: ${fechaMod.toLocaleString()}\n`;

        Gastos += `Etiquetas:\n`;

        for(let i = 0; i < this.etiquetas.length; i++)
        {

            Gastos += `- ${this.etiquetas[i]}\n`

        }

        return Gastos;

    }

    this.actualizarFecha = function(nuevaFecha){

        if(typeof nuevaFecha === 'string' && !isNaN(Date.parse(nuevaFecha)))
        {

            this.fecha = Date.parse(nuevaFecha);

        }

    }

    this.anyadirEtiquetas = function(...nuevaEtiqueta){

        let arrayC = [...this.etiquetas,...nuevaEtiqueta];

        let arrayM = new Set(arrayC);

        this.etiquetas = Array.from(arrayM);

    }

    this.borrarEtiquetas = function(...eliminarEtiquetas){

        let i = 0;
        let j = 0;

        while(i < this.etiquetas.length)
        {

            while(j < eliminarEtiquetas.length)
            {

                if(this.etiquetas[i] === eliminarEtiquetas[j])
                {

                    this.etiquetas.splice(i,1);
                    i--;
                }
                j++;

            }
            j=0;
            i++;

        }

    }

}

function listarGastos()
{

    return(gastos);

}

function anyadirGasto(gasto)
{

    gasto.id = idGasto; //añade la nueva clave al objeto llamado gasto que lo pasa como parámetro     
    idGasto++;
    gastos.push(gasto);

}

function borrarGasto(id)
{
        for(let i = 0; i < gastos.length; i++)
        {
            if(gastos[i].id === id)
            {
                gastos.splice(i,1)
            }
        }
}

function calcularTotalGastos()
{

    let totalGastos = 0;

    for(let i = 0; i < gastos.length; i++)
    {

        totalGastos += gastos[i].valor

    }

    return totalGastos;

}

function calcularBalance()
{

    let totalBalance = 0;

    let gasto = calcularTotalGastos();

    totalBalance = presupuesto - gasto;

    return totalBalance;

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
}