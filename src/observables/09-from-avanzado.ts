import { of, from } from "rxjs";

/* 
  of = toma argumentos y genera una secuenda de valores
  from = toma un array, promesa, iterable, observable
*/

const observer = {
  next: (val) => console.log("Next: ", val),
  complete: () => console.log("Complete . . ."),
};

// emite cada uno de los valores
const miGenerador = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
};

const miIterable = miGenerador();

/* for (let id of miIterable) {
  console.log(id);
} */

from(miIterable).subscribe(observer);

//const source$ = from([1, 2, 3, 4, 5]);
//const source$ = of(...[1, 2, 3, 4, 5]);
//const source$ = from("Yadira");

const source$ = from(fetch("https://api.github.com/users/yadira-ferrer"));

/* 
// Petición mediante Fetch
source$.subscribe(async (resp) => {
  console.log(resp);

  const dataResp = await resp.json();
  console.log(dataResp);
}); */

//source$.subscribe(observer);
