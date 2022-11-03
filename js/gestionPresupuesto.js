// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idgasto = 0;

function actualizarPresupuesto(NumIntroducido) {
    // TODO
    if (NumIntroducido >= 0 && typeof NumIntroducido === "number")
    {
        presupuesto = NumIntroducido;
        return presupuesto;
    }
    else
    {
        console.log("Error el numero es negativo");
        return -1;
    }
}

//Revisar
function mostrarPresupuesto() {
    // TODO
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}
// revisar
function CrearGasto(descripcion,valor,fecha = Date.now(), ...etiquetas) {
    this.descripcion = descripcion;
    this.etiquetas = [...etiquetas];
    
    if ( valor >= 0 && typeof valor === "number")
    {
        this.valor = valor;
    }
    else 
    {
        this.valor = 0;
    }
    
    if (typeof fecha === 'string' && !isNaN(Date.parse(fecha)))
    {
        this.fecha = Date.parse(fecha)
    }
    else 
    {
        this.fecha = Date.now();
    }
    
    
    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(ActualizarDescripcion){
        this.descripcion = ActualizarDescripcion;
    }
    this.actualizarValor = function(ActualizarValor){
        if (ActualizarValor >= 0 && typeof ActualizarValor === "number")
        {
            this.valor = ActualizarValor;
        }
    }

    this.mostrarGastoCompleto = function(){
        let mostrarGastos;
        let modfecha = new Date(this.fecha);
        mostrarGastos = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        mostrarGastos += `Fecha: ${modfecha.toLocaleString()}\n`;
        mostrarGastos += `Etiquetas:\n`;
        for(let i = 0; i < this.etiquetas.length;i++)
        {
            mostrarGastos += `- ${this.etiquetas[i]}\n`
        }
       return mostrarGastos;
    }
    this.actualizarFecha = function(newfecha){
        if (typeof newfecha === 'string' && !isNaN(Date.parse(newfecha)))
        {
            this.fecha = Date.parse(newfecha)
        }
    }
    this.anyadirEtiquetas = function(...newetiquetas){
        let concarray = [...this.etiquetas,...newetiquetas]
        
        let mdarray = new Set(concarray);
        
        this.etiquetas = Array.from(mdarray);
        
    }
    this.borrarEtiquetas = function(...deletiquetas){
        //let etiq = [...deletiquetas];
        let i = 0;
        let j = 0;
        
        while (i < this.etiquetas.length)
        {
            while(j < deletiquetas.length)
            {
                if (this.etiquetas[i] === deletiquetas[j])
                {
                    this.etiquetas.splice(i,1);
                    i--;
                }
                j++;
            }
            j=0;
            i++;
        }
    //     for(let i = 0; i < etiq.length;i++)
    //    {
    //        for(let j = 0; j < this.etiquetas.length; j++)
    //        {
    //            if (etiq[i] === this.etiquetas[j])
    //            {
    //                this.etiquetas.splice(j,1)
    //            }
    //        }
    //    }
    // }
    }
    this.obtenerPeriodoAgrupacion = function(formato) {
      let date = new Date(this.fecha);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
        if (formato === "dia")
        {
            if(month > 9)
            {
                if(day > 9)
                {
                    return(`${year}-${month}-${day}`);
                }
                else 
                {
                    return(`${year}-${month}-0${day}`);
                }
            }
            else
            {   
                if(day > 9)
                {
                    return(`${year}-0${month}-${day}`);
                }
                else 
                {
                    return(`${year}-0${month}-0${day}`);
                }
            }
        }
        if (formato === "mes")
        {
            if(month > 9)
            {
                return(`${year}-${month}`);
            }
            else 
            {
                return(`${year}-0${month}`)
            }
        }
        if(formato === "anyo")
        {
            return(`${year}`)
        }
    }
}

function listarGastos(){
    return (gastos);
}
function anyadirGasto(gasto){
    gasto.id = idgasto // añadir una nueva clave al objeto gasto que se la pasa como parametro
    idgasto ++;
    gastos.push(gasto);
}
function borrarGasto(id){
        for ( let i = 0; i < gastos.length;i++)
        {
           if (gastos[i].id === id)
           {
                gastos.splice(i,1)
           }
        }
}
function calcularTotalGastos(){
    let totalGastos = 0;
    for ( let i = 0; i < gastos.length; i++)
    {
        totalGastos += gastos[i].valor
    }
    return totalGastos;
}
function calcularBalance(){
    let balance = 0;
    let gasto = calcularTotalGastos();
    balance = presupuesto - gasto;
    return balance;

}

function filtrarGastos({fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene,etiquetasTiene})
{
    let arryFiltrado = gastos.filter(function(gasto){
        let add = true;
        let label = false;
        
        if (gasto.fecha < Date.parse(fechaDesde))
        {
             add = false;
        }
        if (gasto.fecha > Date.parse(fechaHasta))
        {
             add = false;
        }
        if (gasto.valor < valorMinimo)
        {
            add = false;
        }
        if (gasto.valor > valorMaximo)
        {
            add = false;
        }
        if (descripcionContiene)
        {
            let descripcion = gasto.descripcion.toUpperCase();
            let contienedes = descripcionContiene.toUpperCase();
                if (!descripcion.includes(contienedes))
                {
                    add = false;
                }
        }
        if(etiquetasTiene)
        {
            for (let i = 0; i < etiquetasTiene.length; i++)
            {
                for (let j = 0; j < gasto.etiquetas.length; j++)
                {
                    if (etiquetasTiene[i].toUpperCase() === gasto.etiquetas[j].toUpperCase())
                    {
                        label = true;
                    }
                    
                }
            }

            if (label === false)
            {
                add = false;
            }
        }
        return add;
    }
    );

    return arryFiltrado;
}
function agruparGastos(periodo = "mes",etiquetas, fechaDesde,fechaHasta){

    let filtrado = filtrarGastos({fechaDesde,fechaHasta,etiquetas})

    let objetofinal = filtrado.reduce(function(acu,gasto){
        if (gasto.obtenerPeriodoAgrupacion(periodo))
        {
            acu
        } 
        else
        {

        } 
        
    },{});
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
    agruparGastos,
}

