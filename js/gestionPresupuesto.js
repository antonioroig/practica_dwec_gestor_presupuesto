// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let gastos = new Array();
let presupuesto = 0;
let idGasto = 0;


function actualizarPresupuesto(parametroAct) {
    // TODO

    if (parametroAct >= 0 && typeof parametroAct === "number")
    {
        presupuesto = parametroAct;
        return presupuesto;
    }
    else
    {
        console.log('Error: El valor introducido es negativo o no es válido');
        return -1;
    }
}

//revisar
function mostrarPresupuesto() {
    // TODO
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

// revisar
function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    this.valor = valor;
    let id;

    if (etiquetas === undefined){
        this.etiquetas = new Array();
    }
    else{
        this.etiquetas = [...etiquetas];
    }

    if (typeof fecha !== 'string' || (isNaN(Date.parse(fecha)))){
        this.fecha = Date.now(); 
    }
    else {
        this.fecha = Date.parse(fecha);
    }

    if (valor >= 0 && !isNaN(valor))
    {
        this.valor = valor;
    }

    else{
        this.valor = 0;
    }

    this.setId = function(id){
        this.id = id;
    }

    this.mostrarGasto = function(){
        return 'Gasto correspondiente a '+ this.descripcion + ' con valor ' + this.valor + ' €';
    }

    this.actualizarDescripcion = function(descripcionAct){
        this.descripcion = descripcionAct;
    }

    this.actualizarValor = function(valorAct){

        if (valorAct >= 0)
        {
            this.valor = valorAct;
        }

        else
        {
            console.log('Error: El valor introducido es negativo o no es un valor apto');
        }
    } 

    this.anyadirEtiquetas = function(...parEtiquetas){

        for (let i = 0; i < parEtiquetas.length; i++){

            let exArray = false; 

            for (let j = 0; j < this.etiquetas.length; j++ ){

                if (parEtiquetas[i] === this.etiquetas[j] ){

                    exArray = true;
                    break;
                }

            }
            if (!exArray){

                this.etiquetas.push(parEtiquetas[i]);
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

    this.actualizarFecha = function(parAct){

        // if (typeof parAct === 'string' && isNaN(Date.parse(fecha))){

        //     this.fecha = Date.parse(parAct); 
        // }

        if (Date.parse(parAct))
        {
            this.fecha = Date.parse(parAct);
        }
    }

    this.borrarEtiquetas = function(...parEtiquetas){

        for (let i = 0; i < parEtiquetas.length; i++)
        {

            for (let j = 0; j < this.etiquetas.length; j++)
            {
                if (parEtiquetas[i] === this.etiquetas[j])
                {
                    this.etiquetas.splice(j,1);
                    break;
                }
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(parPeriodo)
    {
        let mFecha = new Date (this.fecha);
        let periodo = mFecha.getFullYear().toLocaleString();

        if (parPeriodo === "anyo")
        {
           return periodo;
        }
        else if (parPeriodo === "mes")
        {
            periodo += "-";
            
            if (mFecha.getMonth() < 10)
            {
                periodo += "0";
            }
            return periodo += (mFecha.getMonth() + 1);
        }
        else if (parPeriodo === "dia")
        {
            periodo += "-";

            if (mFecha.getMonth() < 10)
            {
                let month = "0" + (mFecha.getMonth() + 1);

                if (mFecha.getDay() < 10)
                {
                    let day = "0" + (mFecha.getDate());

                    return periodo += month + "-" + day;
                }
                return periodo += month + "-" + mFecha.getDate();
            }
            else {
                return periodo += (mFecha.getMonth() + 1) + "-" + mFecha.getDate();
            }
        }
    }
}

function filtrarGastos({fechaDesde,
    fechaHasta,
    valorMinimo,
    valorMaximo,
    descripcionContiene,
    etiquetasTiene})
{
    let ret = gastos.filter(function(gasto)
    {
        let anyade = true;
        /*Si tengo uno de los dos requisitos en valor o en fecha, se tiene que cumplir y el otro se 
        puede omitir. Si te dan los 2, se tienen que cumplir los 2*/

        if (fechaDesde)
        {
            if (Date.parse(gasto.fecha) < Date.parse(fechaDesde))
            {
                anyade = false;
            }
        }

        if (fechaHasta)
        {
            if (Date.parse(gasto.fecha) > Date.parse(fechaHasta))
            {
                anyade = false;
            }
        }
        
        if (valorMinimo)
        {
            if (gasto.valor < valorMinimo)
            {
                anyade = false;
            }
        }
        
        if (valorMaximo)
        {
            if (gasto.valor > valorMaximo)
            {
                anyade = false;
            }
        }

        if (gasto.descripcion.includes(descripcionContiene) || anyade == false)
        {
            anyade = false;
        }

        if (etiquetasTiene === gasto.etiquetas || anyade == false)
        {
            anyade = false;
        }

        return anyade;
    });

    return ret;
}


function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta)
{   
    /* aw, ite, = index, array */
    let result = gastos.reduce(function(aw, item)
    {

    }, {});

}

function listarGastos(){

    return gastos;
}

function anyadirGasto(gasto){

    gasto.id = idGasto;

    idGasto++;
    
    gastos.push(gasto);

}

function borrarGasto(parId)
{
    for ( let i = 0; i < gastos.length; i++)
    {
        if (gastos[i].id === parId)
        {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos()
{
    let total = 0;
    
    for (let i = 0; i < gastos.length; i++)
    {
        total += gastos[i].valor;
    }

    return total;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
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
