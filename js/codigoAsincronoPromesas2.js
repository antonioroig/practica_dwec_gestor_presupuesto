/*
Vamos a hacer un ejemplo de código asíncrono usando setTimeout(función,tiempo)
setTimeout ejecuta la función pasado el tiempo en milisegundos especificado.
*/

//Tenemos un array de objetos como 'datos'

const datos = [{
  id: 1,
  title: 'Iron Man',
  year: 2008
},{
  id: 2,
  title: 'Spiderman: Homecoming',
  year: 2017
},{
  id: 3,
  title: 'Avengers: Endgame',
  year: 2019
}];

/*
Definimos la función que obtiene los datos 
que devolverá una promesa porque los datos se obtendrán tras un setTimeout de 3500 ms
o 3 segundos y medio.
Se define con resolve que ocurre si no hay errores y con reject lo contrario
Nótese el objeto especial de js Error.
Si no pusiéramos el setTimeout para que se espere un poco a devolver los datos
No Sería Código Asíncrono
*/
const getDatos = () => {  
  return new Promise((resolve,reject) => {  //promesas, objeto especial
    if (datos.length === 0){
      reject(new Error('No existen datos'));
    } 
    else {
    setTimeout(() => {             //setTimeout recibe una función y el tiempo en ms                                     
     resolve(datos); }, 3500);      //ejecutan un trozo de código y lo devuelven
  }                              //cuando está listo. Si hay error, devuelve error.
}); ///FIN de f(x) de la promesa
};  ///FIN DE LA FUNCIÓN   

/*Trataremos la promesa de modo tradicional*/
getDatos()
      .then((dat) => {
                      console.log("datos con .then")
                      console.log(dat)
                      })
      .catch((err) => console.log(`${err.name}: ${err.message}`));

//Se invoca al getDatos que devuelve una promesa y se trata con .then y .catch
//Sacamos por consola lo que devuelve getDatos (el array de objetos)

/*

SOLUCIÓN CON ASYNC/AWAIT
más legible/intuitivo
*/

async function fetchingData(){
  try { 
    const datosFetched = await getDatos();
    console.log("Datos async/await")
    console.log(datosFetched);
  }catch(err){
    console.log(`Error async/await:`); 
    console.log(`${err.name}: ${err.message}`);
  }
}

fetchingData();

//se usa bloque try/catch para controlar la resolución afirmativa de la promesa o no.
//Normalmente async/await es más limpio/legible, pero en ocasiones puede ser
// más práctico/sencillo concatenar .then .catch dependiendo de la situación