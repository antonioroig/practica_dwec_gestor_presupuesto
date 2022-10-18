'use strict';

//Objetos especiales MAPS. Permiten claves de cualquier tipo
//Tienen una propiedad size que indica el número de claves/valores.
//deben inicializarse con new Map(), obtener valores con .get y asignarle pares clave/valor con .set

let mapa = new Map();
mapa.set('1','cadenaUno');
console.log(mapa);
mapa.set(1,'numeroUno');
console.log(mapa);
mapa.set(false, 'booleano');
console.log(mapa);
console.log(mapa.get(1));
console.log(mapa.get('1'));
console.log(mapa.size);

//También podemos usar objetos como claves en un MAP
let jose = {
    nombre: 'Pepe',
    edad: 20
};
 //Vamos a almacenar para cada usuario el número de visitas

 let contadorVisitasMap = new Map();
 contadorVisitasMap.set(jose, 85);
 console.log(contadorVisitasMap);

let maria = {
    nombre:'Maria',
    edad: 19
};
console.log(maria.nombre);
let contadorVisitasObjeto = {};
contadorVisitasObjeto[jose] = 13;
contadorVisitasObjeto[maria] = 33;

//Veamos que se muestra en un objeto al que se le ha intentado crear claves que son objetos.
console.log(contadorVisitasObjeto);
console.log(contadorVisitasObjeto["[object Object]"]);

//Object.keys(obj) devuelve array de propiedades
console.log(Object.keys(contadorVisitasObjeto));

//Object.values(obj) devuelve un array de valores del objeto
console.log(Object.values(contadorVisitasObjeto));

//Object.entries(obj) devuelve un array de pares clave-objeto
console.log(Object.entries(contadorVisitasObjeto))

//Veamos como se muestran varias entradas para un objeto con mas de 2 claves/valores
let nuevoCliente = {
    nombre: "Javier",
    apellidos: "García",
    edad: 30,
    profesion: 'programador'
}

console.log(Object.entries(nuevoCliente));

//Objetos normales, sus claves son de tipo string siempre (se convierte a string)
let objetoUno = {
    1: 'primer',
    '1':'machaca la clave anterior',
    2: 'segundo',
    false: 'booleano'
};

console.log(objetoUno);

//Vamos a usar los métodos keys, values y entries con un mapa
let mapa2 = new Map();

mapa2.set('1', 'cadena')
    .set(1, 'numerica')
    .set(true, 'booleano');

//El método keys de un mapa devuelve un iterador, por tanto se puede iterar
console.log(mapa2.keys());

//se puede iterar un mapa sin problemas con un for..of. Es un iterable, pero no un array-like
//obtenemos los pares 
for (let clave of mapa2){
    console.log(clave);
}

//Iteramos sobre las claves del mapa con for..of
for (let clave of mapa2.keys()){
    console.log(clave);
};

//Iteramos sobre los valores del mapa con for..of
for (let valor of mapa2.values()){
    console.log(valor);
};

//La iteración va en el mismo orden en que se insertaron los valores. Map conserva este orden, a diferencia de un Objeto normal.
//Además map tiene un método forEach incorporado similar al del array. No es array like, no tiene índices.
mapa2.forEach((valor,clave,mapa) => {console.log(`${clave}: ${valor}`)});

//Al crear un map podemos pasarle un array (u otro iterable) con pares clave/valor para la inicilaización
let miMapa = new Map([
 ['1', 'primero'],
 [1, 'primero sin machacar'],
 [true, 'booleano']
]);

console.log(miMapa.get('1'));

//inicialicemos un mapa con variables cadena que son iterables:
let valor1 = 'hola';
let valor2 = 'como estás';
let valor3 = 'bien';
let clave1 = 1;
let clave2 = 'dos';
let clave3 = true;

let mapaSaludo = new Map([
    [clave1, valor1],
    [clave2, valor2],
    [clave3, valor3]
]);

    console.log(mapaSaludo)

//Creamos un map desde un objeto 
let objetoEj = {
    nombre: 'Juan',
    edad: 30
};
//Usamos el método Object.entries(objeto) para que se pase a new Map un array iterable con todas los
//pares clave/valor de un objeto
let mapaDesdeObjeto = new Map(Object.entries(objetoEj));
console.log(mapaDesdeObjeto, `Tamaño: ${mapaDesdeObjeto.size}`);

//Object.fromEntries, objeto desde Map
let precios = Object.fromEntries([
    ['plátanos', 1],
    ['naranjas', 2],
    ['carne', 4]
]);

let arrayFromMap = [];

for (let clave of mapa2){
    arrayFromMap.push(clave);
}

let arrayFromMap2 = Array.from(mapa2);
console.log(arrayFromMap2);
console.log(arrayFromMap);

let precios2 = Object.fromEntries(  
arrayFromMap
    );

console.log(precios2); 
//al convertir a obejto, las claves son cadenas y sólo queda un ítem 1

//Un Set es una colección especial, son un conjunto de valores sin claves donde cada valor puede aparecer sólo una vez.
//creación de un set -> new Set(iterable)
let nuevoSet = new Set('unico');
console.log(nuevoSet)

nuevoSet.add('h');
console.log(nuevoSet)

nuevoSet.delete('o');
console.log(nuevoSet)

console.log(nuevoSet.has('u'));
console.log(nuevoSet.size)

nuevoSet.clear()
console.log(nuevoSet)
//La característica principal es que llamadas repetidas de set.add(valor) con el mismo valor no hacen nada. 
//Esa es la razón por la cual cada valor aparece en Set solo una vez.

let miNuevoObjeto = {
    marca: 'seat',
    modelo: 'ibiza',
    nPuertas: 5
}

console.log(miNuevoObjeto["marca"], ` ${miNuevoObjeto.modelo}`)

//Asignación desestructurante
//nos permite “desempaquetar” arrays u objetos en varias variables, porque a veces es más conveniente.
//El array u objeto original queda intacto
let arr = ["John", "Smith"];
let [firstName, surname] = arr;
console.log(firstName, surname);

// segundo elemento no es necesario
let [nom, , titulo] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

console.log( titulo ); 

//Desestructuramos en dos variables:
//split devuelve un array de cadenas divididas del original por un separador.
console.log("John Smith".split(' '));
let [nombre, apellidos] = "John Smith".split(' ');
console.log(nombre);
console.log(apellidos);

//Se puede usar con cualquier iterable
let [a, b, c] = "abc"; 
let [one, two, three] = new Set([1, 2, 3]);
let miSet = new Set([1, 2, 3]);
console.log(miSet);
console.log(a, b, c, one, two, three)

//Desestructuración de Objetos:
let options = {
    title: "Menu",
    width: 100,
    height: 200
  };
let {title:miTitulo} =  options;
console.log(miTitulo)
  //No importa el orden de desestructuración, sí los nombres
  let {height, width, title} = options;
  console.log(title, width, height);

  //Para desestructurar en nombres de variables diferentes a los de las claves:
  let {width: w, height: h, title:t} = options;
  console.log(t,w,h);

  //Valores predeterminados para propiedades que puedan faltar
  let optio = {
    titl: "Menu"
  };
  
  let {wid = 100, hei = 200, titl} = options;
  
  console.log(title);  
  console.log(width);  
  console.log(height); 

  //El patrón resto o REST
  let opciones = {
    titulo1: "Menu",
    altura: 200,
    anchura: 100
  };
  
  // titulo = propiedad llamada title
  // resto = objeto con el resto de las propiedades
  let {titulo1, ...resto} = opciones;
  
  // ahora title="Menu", rest={height: 200, width: 100}
  console.log(resto.altura);  
  console.log(resto.anchura); 
  console.log(resto);

  //Argumentos de función inteligentes
  //una función puede tener muchos argumentos, la mayoría de los cuales son opcionales
  //pero es muy difícil recordar el orden de los argumentos al llamarla.
  function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
    console.log(title);
  }

//pero aún así… Otro problema es cómo llamar a una función si queremos que use sus 
//valores predeterminados en la mayoría de los argumentos.
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"]);
//nada recomendable.
//¡La desestructuración llega al rescate!
//Podemos pasar los argumentos como un objeto, y la función inmediatamente los 
//desestructura en variables:
// pasamos un objeto a la función
let opciones2 = {
    title: "My menu",
    items: ["Item1", "Item2"]
  };
  
  // ...y los expande inmediatamente a variables
  function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    // title, items – desde options
    // width, height – usan los predeterminados
     
    let cadena = [...items]; // Item1, Item2. Copiamos con operador spread.
    console.log(cadena);
    return ( `${title} ${width} ${height} ${cadena}` );
  }
  
  console.log(showMenu(opciones2));

//PARÁMETROS REST
function sumAll(...args) { // args es el nombre del array donde se almacenan los args.
    let sum = 0;
  
    for (let arg of args) sum += arg;
  
    return sum;
  }

  //Operador spread o sintaxis spread

  console.log( Math.max(3, 5, 1) ); 

  let array2 = [3, 5, 1];

console.log( Math.max(...array2) ); 
//spread convierte el array en una lista de argumentos


