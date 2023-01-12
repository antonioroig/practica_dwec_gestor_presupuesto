// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (nuevoPresupuesto >= 0)
    {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    }else
    {
        console.log('el valor es inferior a 0');
        return -1;
    }
}

function mostrarPresupuesto() {
    return ('Tu presupuesto actual es de ' + presupuesto + ' €');
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion=descripcion;

    this.valor=0;

    if(isNaN(Date.parse(fecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(fecha);
    }
    
    this.etiquetas=etiquetas;

    if(valor >= 0){
        this.valor=valor;
    };

    this.mostrarGasto = function(){
        return (`Gasto correspondiente a ` + this.descripcion + ` con valor ` + this.valor + ` €`);
    }

    this.mostrarGastoCompleto = function(){
        var texto =`Gasto correspondiente a ` + this.descripcion + ` con valor ` + this.valor + ` €.\n`
        texto += (`Fecha: `+ new Date(this.fecha).toLocaleString() + `\nEtiquetas:\n`)
        
        this.etiquetas.forEach(etiqueta => 
            texto += `- ` + etiqueta + `\n`
        );
        return texto;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        if (nuevoValor > 0)
        {
            this.valor = nuevoValor;
        }
    }

    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function(...arrEtiq){
        //this.etiquetas = [...this.etiquetas,...arrEtiq];
        this.etiquetas = this.etiquetas.concat(this.etiquetas,arrEtiq)
        this.etiquetas = Array.from(new Set(this.etiquetas));
    }   

    this.borrarEtiquetas = function(...arrEtiq){
        arrEtiq.forEach(etiqueta =>
            {
                if(this.etiquetas.includes(etiqueta,0)){
                    this.etiquetas.splice(this.etiquetas.indexOf(etiqueta,0),1)
                }
            })
    }

    this.obtenerPeriodoAgrupacion = function(periodo){

        let fecha = new Date(this.fecha)
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anyo = fecha.getFullYear();
        let result = "";
        if(periodo == 'anyo'){
            result += anyo.toString();
        }
        if(periodo == 'mes'){
            if(mes >= 10){
                result += anyo + "-" + mes
            }else{
                result += anyo + "-0" + mes
            }
        }
        if(periodo == 'dia'){
            if(mes >= 10 && dia >= 10){
                result += anyo + "-" + mes + "-" + dia
            }else if(mes < 10 && dia >= 10){
                result += anyo + "-0" + mes + "-" + dia
            }else if(mes >= 10 && dia < 10){
                result += anyo + "-" + mes + "-0" + dia
            }else if(mes < 10 && dia < 10){
                result += anyo + "-0" + mes + "-0" + dia
            }
        }
        return result;
    }
}


function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){

    for(let i =0; i<gastos.length; i++){
        if(gastos[i].id == id){
            gastos.splice(i,1);
        }
    }

}
function calcularTotalGastos(){
    let total = 0;

    gastos.forEach(gasto =>{
        total += gasto.valor;
    })

    return total;
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos({fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene,etiquetasTiene}){
    let results = gastos.filter(function(gasto){
        let itemFiltrado = true;
        if(fechaDesde){
            if(Date.parse(fechaDesde) > gasto.fecha){
                itemFiltrado = false;
            }
        }      
        if(fechaHasta){
            if(Date.parse(fechaHasta) < gasto.fecha){
                itemFiltrado = false;
            }
        }        
        if(valorMinimo){
            if(valorMinimo > gasto.valor){
                itemFiltrado = false;
            }
        }        
        if(valorMaximo){
            if(valorMaximo < gasto.valor){
                itemFiltrado = false;
            }
        }        
        if(descripcionContiene){
            if(!gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())){
                itemFiltrado = false;
            }
        }     
        if(etiquetasTiene){
            let etiquetaCopiada = false;
            etiquetasTiene.forEach(etiqueta => {
                gasto.etiquetas.forEach(etiquetaGasto => {
                    if(etiqueta.toLowerCase()==etiquetaGasto.toLowerCase()){
                        etiquetaCopiada=true;
                    }
                });
            })  
            if(!etiquetaCopiada){
                itemFiltrado = false;
            }  
            /*for(let i = 0; i < gasto.etiquetas.length; i++){
                for(let j = 0; j < etiquetasTiene.length; j++){
                    if(gasto.etiquetas[i].toLowerCase()==etiquetasTiene[j].toLowerCase()){
                        etiquetaCopiada=true;
                    }
                }
            }*/
        }   
        return itemFiltrado;
    });
    if(results.length == 0){
        results = gastos;
    }
    return results;
}
function agruparGastos(periodo = 'mes', etiquetas, fechaDesde, fechaHasta){
    let objeto = {
        fechaDesde:fechaDesde,
        fechaHasta:fechaHasta,
        etiquetasTiene:etiquetas,
    }
    let filtro = filtrarGastos(objeto);
    return filtro.reduce(function(acumulador, itemActual){
        if(typeof acumulador[itemActual.obtenerPeriodoAgrupacion(periodo)]!="number"){
            acumulador[itemActual.obtenerPeriodoAgrupacion(periodo)] = 0;
        }
        acumulador[itemActual.obtenerPeriodoAgrupacion(periodo)] += itemActual.valor;

        return acumulador;
    },{})
}

function transformarListadoEtiquetas(etiquetas){
    //los [] son un rango de caracteres
    //el * es que aparece el rango 0 o mas veces y el + 1 o mas veces
    //alert(ret)
    return etiquetas.split(/[,.:;~\s]+/);
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
}
    
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export{
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
    transformarListadoEtiquetas,
    cargarGastos
}
