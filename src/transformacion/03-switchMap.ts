import { fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  map,
  mergeAll,
  mergeMap,
  pluck,
  switchMap,
} from 'rxjs/operators';

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

input$.pipe(
  debounceTime<KeyboardEvent>(500),
  map<KeyboardEvent, string>((event) => event.target['value']),
  mergeMap<string, Observable<GithubUsersResp>>((texto) =>
    ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)
  ),
  map<GithubUsersResp, GithubUser[]>((event) => event['items'])
);
/* .subscribe(mostrarUsuarios) */

const url = 'https://httpbin.org/delay/1?arg=';

input$
  .pipe(
    pluck('target', 'value'),
    switchMap((text) => ajax.getJSON(url + text))
  )
  .subscribe(console.log);
