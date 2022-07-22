import { from, of } from "rxjs";
import { distinct } from "rxjs/operators";

const numeros$ = of(1, 1, 1, 3, 3, 2, 2, 4, 4, 5, 3, 1);

numeros$.pipe(distinct()).subscribe(console.log);

interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  { nombre: "Homero" },
  { nombre: "Marge" },
  { nombre: "Lisa" },
  { nombre: "Bart" },
  { nombre: "Apu" },
  { nombre: "Homero" },
  { nombre: "Lisa" },
  { nombre: "Bart" },
  { nombre: "Bart" },
];

from(personajes)
  .pipe(distinct((p) => p.nombre))
  .subscribe(console.log);
