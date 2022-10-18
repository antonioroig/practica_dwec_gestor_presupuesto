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
}
function listarGastos()
{
    return gastos;
}
function anyadirGasto()
{
    
}
function borrarGasto()
{
    
}
function calcularTotalGastos()
{
    
}
function calcularBalance()
{
    
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
    calcularBalance
}
//hola
