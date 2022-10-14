// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
function actualizarPresupuesto(valorIntroducido) {
    // TODO
    let aux = "";
    if(valorIntroducido >= 0)
    {
        presupuesto = valorIntroducido;
        return presupuesto;

    }else 
    {
        console.log("Error, se ha introducido un valor negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
        let mostrarP ="Tu presupuesto actual es de " + presupuesto + " €";
        return mostrarP;
    }

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    // TODO
    this.etiquetas = [...etiquetas] 
    /*if (typeof fecha === 'string')
    {
        this.fecha = Date.parse(fecha);
        
    }else
    {
        this.fecha = fecha;
    }*/
    this.fecha = (typeof fecha === 'string') ?  Date.parse(fecha) : fecha;
    this.descripcion = descripcion;
    if (valor <0 || typeof valor!=='number') {
        this.valor = 0;
    }else 
    {
        this.valor = valor;
    }
    this.mostrarGasto = function()
    {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },
    this.actualizarDescripcion = function (descrip)
    {
        this.descripcion=descrip;
    },
    this.actualizarValor = function(valoActualizar) 
    {
        if (valoActualizar >= 0) 
        {
            this.valor = valoActualizar;
        }
    },
    this.mostrarGastoCompleto = function() 
    {
        let auxF;
        let strigEtiquetas;
        if (typeof this.fecha === "string")
        {
            auxF = Date.parse(this.fecha);
        }else 
        {
            auxF = this.fecha;
        }
        /*let auxFecha = new Date(auxF);*/
        strigEtiquetas = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
        Fecha: ${(auxF.toLocaleString())}
        Etiquetas:`;
        for(let etiqueta of this.etiquetas) 
        {
            strigEtiquetas += `- ${etiqueta}\n`
        }
        return strigEtiquetas;
    },
    this.actualizarFecha = function(stringFecha)
    {
		let aux=Date.parse(stringFecha);
		if (!isNaN(aux))
        {
			this.fecha=aux;
        }
	},
    this.anyadirEtiquetas = function(...etiquetas)
    {

    }

} 

function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    gastos.push(gasto);
    idGasto++;
}
function borrarGasto(id){
    let aux = gastos.findIndex(gasto => gasto.id == id); //guardo la posicion en la que esta el objeto con dicho id//
    if(aux !== -1) //si devuelve -1 es que el objeto no existe entonces no se haria nada//
    {
        gastos.splice(aux, 1);//si el aux no es -1 entonces se borra el gasto desado de gastos//
    }
}
function calcularTotalGastos(){
    let total = 0;  
}
function calcularBalance(){
    
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
    CrearGasto
}
