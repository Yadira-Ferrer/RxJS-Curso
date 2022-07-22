import { delay, forkJoin, interval, of, take, catchError } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER = 'Yadira-Ferrer';

forkJoin({
  usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
  repos: ajax
    .getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repos123`) // quitar 123 para que no de error
    .pipe(catchError((err) => of([]))),
  gitst: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`),
})
  .pipe(catchError((err) => of(err.message)))
  .subscribe(console.log);
