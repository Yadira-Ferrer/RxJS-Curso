import { from } from "rxjs";
import { distinctUntilKeyChanged } from "rxjs/operators";

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

from(personajes).pipe(distinctUntilKeyChanged("nombre")).subscribe(console.log);
