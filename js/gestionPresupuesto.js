let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(a) {

    if(a >= 0 && typeof a === "number"){
        presupuesto = a;
        return a;
    }
    else
    {
        
        console.log(`el número ${a} no es valido `);
        return -1;
    }
    return presupuesto;
}

//Revisar

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
// revisar
function CrearGasto(descripcion,valor,fecha=Date.now(),...etiquetas) {
    this.descripcion = descripcion;
    this.etiquetas=String(descripcion);

    if(valor >= 0 && ! isNaN(valor)){

        this.valor = valor;

    }else{
        this.valor = 0;
    }
    if((typeof fecha==="string")&&(!isNaN(Date.parse(fecha)))){
        this.fecha=Date.parse(fecha);
    }
    else{
        this.fecha=Date.now();
    }
    

    this.mostrarGasto = function (){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(cadena){
        this.descripcion = cadena;
    }

    this.actualizarValor = function(valorActualizado){
        if(valorActualizado >= 0){
            this.valor = valorActualizado
        }
        else{
            console.log(`El valor introducido es negativo, no ha podido ser cambiado`)
        }
    }
    this.mostrarGastoCompleto = function(){
        let fechaMostar=new Date(this.fecha);
        let cadenaDevolver = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n
        Fecha: ${date.toLocaleString()}.\n
        Etiquetas: \n`;
        for(let i=0;i<etiquetas.length;i++){
            cadenaDevolver += `- `+etiquetas[i] + `\n`;
        }
    }
    this.actualizarFecha=function(nuevaFecha){
        if((typeof nuevaFecha === "string") && (!isNaN(Date.parse(nuevaFecha)))){
            this.fecha=Date.parse(nuevaFecha);
        }
    }
    this.anyadirEtiquetas = function(...arrEtiquetas){
        let arrayEtiquetas=[...new Set([...this.etiquetas,...arrEtiquetas])];
        this.etiquetas=arrayEtiquetas;
    }
    this.borrarEtiquetas = function(...arrEtiquetas){
        if(arrEtiquetas.length>0){
            let a=0;
            let b=0;
            while(a<arrEtiquetas.length){
                if(arrEtiquetas[a]===this.etiquetas[b]){
                        this.etiquetas.splice(b,1);
                        b=0;
                }
                b++;
                if(b>this.etiquetas.length){
                    b=0;
                    a++;
                }
            }
        }
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}