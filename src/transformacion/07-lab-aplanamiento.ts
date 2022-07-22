import { fromEvent, of } from 'rxjs';
import {
  map,
  mergeMap,
  tap,
  pluck,
  catchError,
  switchMap,
  exhaustMap,
} from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

// Helper
const peticionHttpLogin = (user) =>
  ajax.post('https://reqres.in/api/login?delay=1', user).pipe(
    pluck('response', 'token'),
    catchError((err) => of('---'))
  );
/* 
    Siempre que realicemos una petición a un servicio
    es recomendable que se manejen los errores.
*/

// Creando un formulario
const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass = document.createElement('input');
const submitBtn = document.createElement('button');

// Configuraciones
inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'Password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar';

form.append(inputEmail, inputPass, submitBtn);
document.querySelector('body').append(form);

// Streams
const submitForm$ = fromEvent<PointerEvent>(form, 'submit').pipe(
  tap((ev) => ev.preventDefault()),
  map((ev) => ({ email: ev.target[0].value, password: ev.target[1].value })),
  exhaustMap(peticionHttpLogin)
);

submitForm$.subscribe((token) => {
  console.log(token);
});

/* 
    mergeMap - puede tener cualquier cantidad de subscripciones activas simultaneamente.
    swtichMap - cancela cualquier subscripción que este pendiente y solo resulve la última.
    exhaustMap - ignora cualquier subscripción hasta que la actual acabe.
*/
