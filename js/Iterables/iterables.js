'use strict';

// tenemos un objeto que no es un array, pero parece adecuado para for..of.
// Como un objeto range que representa un intervalo de números:

  let range = {
    from: 1,
    to: 5
  };
  
  // 1. Una llamada a for..of inicializa una llamada a esto:
  range[Symbol.iterator] = function() {
  
    // ... devuelve el objeto iterador:
    // 2. En adelante, for..of trabaja solo con el objeto iterador debajo, pidiéndole los siguientes valores
    return {
      current: this.from,
      last: this.to,
  
      // 3. next() es llamado en cada iteración por el bucle for..of
      next() {
        // 4. debe devolver el valor como un objeto {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  };
  
  // ¡Ahora funciona!
  for (let num of range) {
    console.log(num); // 
  }

  //Simplificando
  //el objeto iterador está separado del objeto sobre el que itera.
  //Técnicamente, podríamos fusionarlos y usar el range mismo como iterador para simplificar el código.

  let rango = {
    from: 1,
    to: 5,
  
    [Symbol.iterator]() {
      this.current = this.from;
      return this;
    },
  
    next() {
      if (this.current <= this.to) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
  
  for (let num of rango) {
    console.log(num); 
  }

  