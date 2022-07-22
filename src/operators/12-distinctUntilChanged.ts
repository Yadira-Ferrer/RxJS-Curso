import { from, of } from "rxjs";
import { distinct, distinctUntilChanged } from "rxjs/operators";

const numeros$ = of(1, "1", 1, 1, 3, 3, 2, 2, 4, 4, 5, 3, 1, "1");

numeros$.pipe(distinctUntilChanged()).subscribe(console.log);

interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Homero" },
  { nombre: "Homero" },
  { nombre: "Lisa" },
  { nombre: "Homero" },
  { nombre: "Lisa" },
  { nombre: "Bart" },
  { nombre: "Bart" },
];

from(personajes)
  .pipe(
    distinctUntilChanged(
      (anterior, actual) => anterior.nombre === actual.nombre
    )
  )
  .subscribe(console.log);
