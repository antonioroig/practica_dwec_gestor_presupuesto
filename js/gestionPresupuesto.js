// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// David Llinares
// TODO: Variable global
let presupuesto = 0;
let gastos = new Array();
let idGastos = 0;
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
                        if(pitem === item)
                        {
                            esta = 1
                        }
                    })
                    if(esta === 0){
                        this.etiquetas.push(pitem)
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
            this.borrarEtiquetas = function(... petiquetas){
                let item
                let pitem
                for (let i = 0; i < petiquetas.length; i++) {
                    pitem = petiquetas[i]
                    for(let j = this.etiquetas.length; j >= 0; j--) {
                        item = this.etiquetas[j]
                        if(pitem == item){
                            this.etiquetas.splice(j, 1)

                        }
                    }
                  }
                };
            this.obtenerPeriodoAgrupacion = function(periodo){
                var pfecha = new Date(this.fecha);
                var res;
                var dia = pfecha.getDate();
                if(dia < 10){
                    dia = `0${dia}`
                }
                var mes = pfecha.getMonth()+1;
                if(mes < 10){
                    mes = `0${mes}`
                }
                var anyo = pfecha.getFullYear();
                if(periodo == "dia"){
                    res = (`${anyo}` + "-" + `${mes}` + "-" + `${dia}`)
                }
                if(periodo == "mes"){
                    res = (`${anyo}` + "-" + `${mes}`)
                }
                if(periodo == "anyo"){
                    res = (`${anyo}`)
                }
                return res;
            }

            }
        

function listarGastos(){
    return gastos;
}
function anyadirGasto(pgasto){
    pgasto.id=idGastos;
    idGastos++;
    gastos.push(pgasto)
}
function borrarGasto(pid){
    for(let i = 0; i < gastos.length; i++){
        if(gastos[i].id == pid){
            gastos.splice(i, 1);
        }
    }
}
function calcularTotalGastos(){
    let total = 0;
    for(let i = 0; i < gastos.length; i++){
        total = total + gastos[i].valor;
    }
    return(total);
}
function calcularBalance(){
    let balance;
    balance = presupuesto - calcularTotalGastos();
    return(balance);
}
function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){

        let arrayFiltro = gastos.filter(function(gasto){
            let add = true;

            if (fechaDesde)
            {
                if(gasto.fecha < Date.parse(fechaDesde)){
                    add = false;
                }
            }
            if (fechaHasta)
            {
                if(gasto.fecha > Date.parse(fechaHasta)){
                    add = false;
                }
            }
            if (valorMinimo)
            {
                if(gasto.valor < valorMinimo){
                    add = false;
                }
            }
            if (valorMaximo)
            {
                if(gasto.valor > valorMaximo){
                    add = false;
                }
            }
            if (descripcionContiene)
            {
                let gdstring = gasto.descripcion.toLocaleString();
                let dstring = descripcionContiene.toLocaleString();
                if(gdstring.toLowerCase() == dstring.toLowerCase()){
                    add = false;
                }
            }
            return add;

        });
        console.log(arrayFiltro);

        return arrayFiltro;
    
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
