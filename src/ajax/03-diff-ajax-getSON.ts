import { catchError, of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';

const url = 'https://httpbinXXX.org/delay/1';

const errorHandler = (err: AjaxError) => {
  console.warn('Error en:', err.message);
  return of({
    ok: false,
    users: [],
  });
};

/* const obs$ = ajax.getJSON(url, {
  'Content-Type': 'application/json',
  'mi-Token': 'ABC123',
}); */

const obs$ = ajax.getJSON(url);
const obs2$ = ajax(url);

/* obs$
  .pipe(catchError(errorHandler))
  .subscribe((data) => console.log('getJSON:', data));
obs2$
  .pipe(catchError(errorHandler))
  .subscribe((data) => console.log('Ajax:', data)); */

obs$.pipe(catchError(errorHandler)).subscribe({
  next: (value) => console.log('Next', value),
  error: (err) => console.warn('Error en subs:', err),
  complete: () => console.log('Complete'),
});

//obs2$.subscribe((data) => console.log('Ajax:', data));
