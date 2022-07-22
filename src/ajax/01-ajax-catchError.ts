import { catchError, map, of, pluck } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';

const url = 'https://api.github.com/users?per_page=5';

const errorHandler = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
};

const catchErr = (err: AjaxError) => {
  console.warn('Error en:', err.message);
  return of({});
};

const fetchPromise = fetch(url);

/* fetchPromise
  .then((resp) => resp.json())
  .then((data) => console.log('Data:', data))
  .catch((err) => console.warn('Error al obtener usuarios.', err)); */

/* fetchPromise
  .then(errorHandler)
  .then((resp) => resp.json())
  .then((data) => console.log('Data:', data))
  .catch((err) => console.warn('Error al obtener usuarios.', err)); */

ajax(url)
  .pipe(pluck('response'), catchError(catchErr))
  .subscribe((users) => console.log('Usuarios:', users));
