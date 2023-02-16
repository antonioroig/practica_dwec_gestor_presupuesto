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

//Vamos a construir una función que obtenga esos datos y los devuelva con un return

const getDatos = () => {  
    return datos;
}

//Nada nuevo bajo el sol, programación síncrona, se obtienen los datos inmediatamente de la constante 'datos'
//Si hacemos un console log veremos esos datos

console.log(getDatos());