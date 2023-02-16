import fetch from "node-fetch";
/*
Ahora veamos el concepto de asincronía,
Cuando hacemos una petición de datos a una API remota esos datos pueden tardar algo 
ser recibidos. O incluso no ser recibidos por algún error.
Mediante la programación síncrona de toda la vida, no se esperaría la respuesta.
Para ello en js tenemos un objeto especial llamado promesa, que pueden hacer peticiones de datos
que sabemos que pueden tardar en ser resueltas
PROMESA
Las promesas pueden ser declaradas explícitamente con el operador new
*/

const miPromesa = new Promise((resolve,reject)=>{
  /*función donde especifico lo que ocurre con el resultado de la promesa
  la promesa puede completar la petición(resolve) o no (reject)*/
});

/*
Para entender mejor el concepto de asincronía, fetch en js puede enviar peticiones de red al servidor y 
cargar nueva información siempre que se necesite.Se utiliza el término global “AJAX” 
(abreviado Asynchronous JavaScript And XML, en español: “JavaScript y XML Asincrónico”) 
para referirse a las peticiones de red originadas desde JavaScript. 

Sin embargo, no estamos necesariamente condicionados a utilizar XML dado que el término es antiguo 
y es por esto que el acrónimo XML se encuentra aquí
*/

/*
Veamos un ejemplo con fetch

https://jsonplaceholder.typicode.com/ 

Es una web con una API CRUD fake muy fácil de usar para testing donde puedes interactuar con datos
sus recursos disponibles son:

/posts	100 posts
/comments	500 comments
/albums	100 albums
/photos	5000 photos
/todos	200 todos
/users	10 users
*/

/*
Vamos a obtener listado de los 100 posts. Para ello tenemos una API de js que
permite interactuar con las APIS remotas devolviendo un objeto especial de js como resultado llamado
*/

//Con la siguiente función voy a obtener el post con el id dado y sacaremos el id del usuario 
// asociado. Después se hará una petición a los usuarios con el id de usuario para sacar el nombre
const getNombre = (idPost) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`) //fetch devuelve una promesa
      .then(res => res.json()) //para manejar qué hacer con ella se usa .then tantas veces como se quiera
      .then(post => {               //y dentro defines una función con lo que se va hacer
        console.log(post.userId);
        fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
           .then(res => res.json())
           .then(user => console.log(user.name));
    })
  }

  console.log('USAMOS .then .catch')
  getNombre(1);
 /* 
 En este ejemplo se obtiene el post con id determinado mediante fetch (que ya es asíncrono y devuelve una promesa)
  si la petición fue bien se ejecutan los .then y si no los .catch(error) para manejar errores
  1 El primer .then convierte los datos de la respuesta a json (porque lo que devuelve va encapsulado en http)
  2 El siguiente .then coge esos datos pasados a json y muestra el id del usuario que hizo el post
  3 Después se vuelve a hacer una petición a la API para obtener el post asociado al id del usuario
  4 El primer .then convierte a json la respuesta
  5 El segundo extrae de esos datos json el nombre del usuario.
  Fijaros que fetch no lleva ; al final. Sí el manejo de la promesa devuelta con .then o .catch
  */

  //Solución con Async/Await
  console.log('Usamos async/await');
  const getNombreAsync = async (idPost) =>{
  
    try{
      const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`)    
      console.log(idPost);
      const post = await resPost.json();
      const resUser = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      const user = await resUser.json();
      console.log(user.name);
    }
    catch(error){
      console.log(error);
      }
    
  }

  getNombreAsync(80)