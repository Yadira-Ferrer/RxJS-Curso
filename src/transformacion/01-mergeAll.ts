import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, mergeAll, pluck } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

import { GithubUser } from '../interfaces/github-user.interface';
import { GithubUsersResp } from '../interfaces/github-users.interface';

// Referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');

body.append(textInput, orderList);

// Helpers
const mostrarUsuarios = (usuarios: GithubUser[]) => {
  console.log(usuarios);
  orderList.innerHTML = '';
  for (const usuario of usuarios) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const anchor = document.createElement('a');

    img.src = usuario.avatar_url;
    anchor.href = usuario.html_url;
    anchor.text = 'ver página';
    anchor.target = '_blank';

    li.append(img);
    li.append(usuario.login + ' ');
    li.append(anchor);

    orderList.append(li);
  }
};

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

input$
  .pipe(
    debounceTime<KeyboardEvent>(500),
    map<KeyboardEvent, string>((event) => event.target['value']),
    map<string, Observable<GithubUsersResp>>((texto) =>
      ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)
    ),
    mergeAll<Observable<GithubUsersResp>>(),
    map<GithubUsersResp, GithubUser[]>((event) => event['items'])
  )
  .subscribe(mostrarUsuarios);

/* Tipado de operadores
   Es importante al menos colocar el tipo de dato
   en el primer operador y en el últimmo.
   De esta forma sabemos que entra y que debería salir. 
*/
