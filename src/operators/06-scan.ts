import { from } from "rxjs";
import { map, reduce, scan } from "rxjs/operators";

const numeros = [1, 2, 3, 4, 5];

/* const totalAcumulador = (acumulador, actual) => {
  return acumulador + actual;
}; */

const totalAcumulador = (acumulador, actual) => acumulador + actual;

// Reduce - una unica emisión
from(numeros).pipe(reduce(totalAcumulador, 0)).subscribe(console.log);

// Scan - emisión de los acumulados
from(numeros).pipe(scan(totalAcumulador, 0)).subscribe(console.log);

// Redux - manejar el estado global de la app con un único objeto
// El código escrito debajo es básicamente una implementación del patrón redux
interface Usuario {
  id?: string;
  auth?: boolean;
  token?: string;
  edad?: number;
}

const usuario: Usuario[] = [
  {
    id: "fher",
    auth: false,
    token: null,
  },
  {
    id: "fher",
    auth: true,
    token: "ABC",
  },
  {
    id: "fher",
    auth: false,
    token: "ABC123",
  },
];

const state$ = from(usuario).pipe(
  scan<Usuario, Usuario>(
    (acc, curr) => {
      return { ...acc, ...curr };
    },
    { edad: 33 }
  )
);

const id$ = state$.pipe(map((state) => state.id));

id$.subscribe(console.log);
