// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global


let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(num) {
    // TODO

    if(typeof num === 'number' && num >= 0)
    {
        presupuesto = num;
        return presupuesto;
    }
    else
    {
       
        let menor = -1;
        console.log("Has inatroducido un número menor a cero");
        return menor;
    }

    

}

function mostrarPresupuesto() {
    // TODO

    
    return(`Tu presupuesto actual es de ${presupuesto} €`);
  

}

function CrearGasto(descripcion, valor, fecha = Date.now() , ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    
    if(valor >= 0 && typeof valor === "number")
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    this.mostrarGasto = function(){
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function(desc)
    {
        this.descripcion = desc;
    }

   this.actualizarValor = function(val)
    {
       if(typeof val == "number" && val >= 0)
       {
        this.valor = val;
       }
    }

    this.etiquetas = [...etiquetas];

    if(typeof fecha === 'string' && !isNaN(Date.parse(fecha)))
    {
       this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now();
    }

    this.mostrarGastoCompleto = function()
    {
        let tex
         tex = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
         
         let fec = new Date(this.fecha);
         tex = tex + `Fecha: ${fec.toLocaleString()}\n`;
         tex = tex + `Etiquetas:\n`;
        for(let i = 0; i < this.etiquetas.length; i++)
        {
            tex = tex + `- ${this.etiquetas[i]}\n`;
        }

        return tex;



    }


    


    this.actualizarFecha = function(fec)
    {

        if(!isNaN(Date.parse(fec)) && typeof fec === "string")
        {
            this.fecha = Date.parse(fec);
        }

    }

    this.borrarEtiquetas = function(...etiquet)
    {
        let e = [...etiquet]
        for(let i = 0; i < e.length; i++)
        {
            for(let j = 0; j < this.etiquetas.length; j++)
            {
                if(e[i] === this.etiquetas[j])
                {
                    this.etiquetas.splice(j, 1);

                }
            }
        }
    }


    this.anyadirEtiquetas = function(...etiquet)
    {

        let e = [...etiquet];
       
        for(let i = 0; i < e.length; i++)
        {
            let exist = false;
            for(let j = 0; j < this.etiquetas.length; j++)
            {
                if(e[i] === this.etiquetas[j])
                {
                    exist = true;
                }
               
            }

            if(exist === false)
             {
            this.etiquetas.push(e[i]);
            }
            
        }
        
        
    }
  
}

function listarGastos(){
    return (gastos)
}

function anyadirGasto(gasto1){

    gasto1.id = idGasto;
    idGasto++;
    gastos.push(gasto1);

    
}

function borrarGasto(id){

   
for(let i = 0; i < gastos.length; i++)
{

    if(gastos[i].id === id)
    {
        gastos.splice(i, 1);
    }
   
}

}

function calcularTotalGastos(){

   let tot = 0;

   for(let i = 0; i < gastos.length; i++)
   {

        tot = tot + gastos[i].valor;

   }

   return tot;

}

function calcularBalance(){

    let tot = 0;
    let gas = calcularTotalGastos()

    tot = presupuesto - gas;

    return tot;

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
