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
    this.obtenerPeriodoAgrupacion=function(periodo){
        let date=new Date(this.fecha);
        let anyo=date.getFullYear();
        let mes=date.getMonth()+1;
        let dia=date.getDate();

        if(periodo==="anyo"){
            return `${year}`;
        }
        if(periodo==="mes"){
            if(mes>=10){
                return `${anyo}-${mes}`;
            }
            else{
                return `${anyo}-0${mes}`;
            }
        }
        if(periodo==="dia"){
            if(dia<10 && mes<10){
                return `${anyo}-0${mes}-0${dia}`;
            }
            else if(dia<10){
                return `${anyo}-${mes}-0${dia}`;
            }
            else if(mes<10){
                return `${anyo}-0${mes}-${dia}`;
            }
            else{
                return `${anyo}-${mes}-${dia}`;
            }
        }
    }
}
function listarGastos(){
    return gastos;
}
function anyadirGastos(gastoAnyadir){
    gastoAnyadir.id=idGasto;
    idGasto++;
    gastos.push(gastoAnyadir);
}
function borrarGasto(idBorrar){
    for(let i=0;i<gastos.length;i++){
        if(idBorrar===gastos[i].id){
            gastos.splice(i,1);
        }
    }
}
function calcularTotalGastos(){
    let total=0;
    for(let i=0;i<gastos.length;i++){
        total += gastos[i].valor;
    }
    return total;
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos(fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene,etiquetasTiene){
    let arrayDevolver=gastos.filter(function(gasto){
        let anyadir=true;
        let esta=false;
        if (fechaDesde!=undefined){
            if(isNaN(Date.parse(fechaDesde))||Date.parse(fechaDesde)>gasto.fecha){
                anyadir=false;
            }
        }
        if(fechaHasta!=undefined){
            if(isNaN(Date.parse(fechaHasta))||Date.parse(fechaHasta)<gasto.fecha){
                anyadir=false;
            }
        }
        if(valorMinimo!=undefined){
            if(isNaN(valorMinimo)||valorMinimo>gasto.valor){
                anyadir=false;
            }
        }
        if(valorMaximo!=undefined){
            if(isNaN(valorMinimo)||valorMinimo<gasto.valor){
                anyadir=false;
            }
        }
        if(descripcionContiene!=undefined){
            gasto.descripcion.toUpperCase();
            descripcionContiene.toUpperCase();
            if(gasto.descripcion.indexOf(descripcionContiene)=== -1){
                anyadir=false;
            }
        }
        if(etiquetasTiene!=undefined){
            for(let i=0;i<gasto.etiquetas.length;i++){
                for(let j=0;etiquetasTiene.length;j++){
                    if(gasto.etiquetas[i]===etiquetasTiene[j]){
                        esta=true;
                    }
                }
            }
            if(esta===false){
                anyadir=false;
            }
        }
        return anyadir;
    });
    return arrayDevolver;
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
    agruparGastos
}