import { interval } from "rxjs";
import { reduce, take, tap } from "rxjs/operators";

const numbers = [1, 2, 3, 4, 5];

const totalReducer = (acumulador: number, actual: number) => {
  return acumulador + actual;
};

// El operador reduce de JavaScript
const total = numbers.reduce(totalReducer, 0);

console.log("Total Array", total);

interval(500)
  .pipe(take(6), tap(console.log), reduce(totalReducer))
  .subscribe({
    next: (val) => console.log("Next:", val),
    complete: () => console.log("Complete"),
  });
