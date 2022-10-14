// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// David Llinares
// TODO: Variable global
let presupuesto = 0;
let gatos = [];
gatos.idGastos = 0;
function actualizarPresupuesto(parametro) {
    if(parametro >= 0)
    {
        presupuesto = parametro;
        return parametro;
    }else{
        console.log( "Error" );
        return -1;
    }
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(pdescripcion, pvalor, pfecha = Date.now(), ... petiquetas) {
    // TODO
    if(typeof pvalor !== 'number' || pvalor <= 0)
    {
            pvalor = 0;
    }
    if([...petiquetas] === undefined){
        this.etiquetas = [];
    } else{
        this.etiquetas = [...petiquetas];
    }
    if(isNaN(Date.parse(pfecha))){
        this.fecha = Date.now();//poner fecha actual
    } else{
        this.fecha = Date.parse(pfecha);
    }
    
        
            this.valor = pvalor,
            this.descripcion = pdescripcion,
            
            

            this.mostrarGasto = function() {
                return(`Gasto correspondiente a ${pdescripcion} con valor ${pvalor} €`)
            };
            this.actualizarDescripcion = function(descripcion){
                this.descripcion = descripcion;
            }
            this.actualizarValor = function(valor){
                if(valor > 0)
                {
                    this.valor = valor;
                }
                
            }
            this.anyadirEtiquetas = function(... petiquetas){
                let esta = 0
                petiquetas.forEach((pitem) =>{
                    esta = 0,
                    this.etiquetas.forEach((item) =>{
                        if(item === pitem)
                        {
                            esta = 1
                        }
                    })
                    if(esta === 0){
                        this.etiquetas.push(petiquetas)
                    }
                });
                
            }
            this.mostrarGastoCompleto = function(){
                let etiqtxt = '';
                
                this.etiquetas.forEach((item) =>{
                    
                        etiqtxt = etiqtxt + "- " + item + "\n";
                    
                });
                return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.` + "\n" + `Fecha: ${new Date(this.fecha).toLocaleString()}` + "\n" + "Etiquetas:\n" + `${etiqtxt}`)
            
            }
            this.actualizarFecha = function(pfecha){
                if(!isNaN(Date.parse(pfecha))){
                    this.fecha = Date.parse(pfecha);
                }
            }
    
        
}
function listarGastos(){
    return gatos;
}
function anyadirGasto(){

}
function borrarGasto(){

}
function calcularTotalGastos(){

}
function calcularBalance(){

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
