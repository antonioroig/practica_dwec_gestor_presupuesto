let presupuesto=0;
let gastos = new Array();
let idGasto = 0;


function actualizarPresupuesto(PresAct) {
    if (typeof PresAct === "number" && PresAct>=0){
        presupuesto = PresAct;        
        return presupuesto;
    }
    else{
        console.log('Error, valor inválido');
        return -1;
    }
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de '+ presupuesto + ' €'
}

function CrearGasto(Descripcion, valor, Fecha = Date.now(), ...etiquetas) {
    this.descripcion = Descripcion;
    
    if (etiquetas===undefined){
        this.etiquetas = new Array();
    }
    else{
        this.etiquetas=[...etiquetas];
    }

    if (typeof Fecha !== 'string' || (isNaN(Date.parse(Fecha)))){
        this.fecha = Date.now();
    }
    else {
        this.fecha = Date.parse(Fecha);
    }
    
    if(valor >=0 && !isNaN(valor)){

        this.valor = valor;
    }
    else{
        this.valor = 0;
    }

    this.actualizarFecha = function(fech){
        if(Date.parse(fech))
        {
            this.fecha=Date.parse(fech)
        }
    }

    this.anyadirEtiquetas = function(...Etiquetas)
    {
        for (let i = 0; i < Etiquetas.length; i++ )
        {
            let coincide = false;

            for (let j = 0; j < this.etiquetas.length; j++ )
            {
                if(Etiquetas[i] === this.etiquetas[j])
                {
                    coincide = true;
                    //break;
                }
            }
            if (coincide === false)
            {
                this.etiquetas.push(Etiquetas[i]);
            }
        }
    }
    
    this.borrarEtiquetas = function(...Etiquetas)
    {
        for (let i = 0; i < Etiquetas.length; i++ )
        {

            for (let j = 0; j < this.etiquetas.length; j++ )
            {
                if(Etiquetas[i] === this.etiquetas[j])
                {
                    this.etiquetas.splice(j,1);
                    break;
                }
            }
        }
    }

    this.mostrarGastoCompleto = function(){
        let mFecha = new Date (this.fecha); 
 
         let ret = 'Gasto correspondiente a '+ this.descripcion + ' con valor ' + this.valor + ' €.' + '\nFecha: ' + mFecha.toLocaleString() + '\nEtiquetas:\n';
 
         for (let i = 0; i < this.etiquetas.length; i++){
 
             ret += '- ' + this.etiquetas[i] + '\n';
         }
 
         return ret;
     }

    this.mostrarGasto = function (){
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor +' €';
    }

    this.actualizarDescripcion = function(cadena){
        this.descripcion = cadena;
    }

    this.actualizarValor = function(valorActualizado){
        if(valorActualizado >= 0){
            this.valor = valorActualizado;
        }
        else{
            console.log('Error: El valor introducido es negativo o valor invalido');
        }
    }
    this.obtenerPeriodoAgrupacion = function(periodo){
        let año = getFullYear();
        getMonth();
        getDate();
    }
}
function listarGastos() {
    return gastos;
}
function anyadirGasto (gasto) {
    gasto.id=idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(ID) {
    
    for(let i=0;i<gastos.length;i++)
    {
        if(gastos[i].id===ID)
        {
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos() {
    let sum = 0;
    let i=0;
    while (i<gastos.length)
    {
        sum+=gastos[i].valor;
        i++;
    }
    return sum;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos({fechaDesde,fechaHasta,valorMin,valorMax,descripcionContiene,etiquetasTiene}){

}

function agruparGastos(){

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
