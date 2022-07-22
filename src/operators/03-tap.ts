import { range } from "rxjs";
import { map, tap } from "rxjs/operators";

const numeros$ = range(1, 5);

numeros$
  .pipe(
    tap((x) => console.log("Antes", x)),
    map((value) => value * 10),
    tap({
      next: (value) => console.log("Despues", value),
      complete: () => console.log("Se termino todo."),
    })
  )
  .subscribe((value) => console.log("Subs", value));
