import { delay, forkJoin, interval, of, take } from 'rxjs';

const numeros$ = of(1, 2, 3, 4); // 4
const intervalo$ = interval(1000).pipe(take(3)); // 2
const letras$ = of('a', 'b', 'c').pipe(delay(3500)); // c

//forkJoin([numeros$, intervalo$, letras$]).subscribe(console.log);

/* forkJoin([numeros$, intervalo$, letras$]).subscribe((resp) => {
  console.log('numeros:', resp[0]);
  console.log('intervalo:', resp[1]);
  console.log('letras:', resp[2]);
}); */

/* forkJoin({ numeros$, intervalo$, letras$ }).subscribe((resp) => {
  console.log(resp.letras$);
}); */

forkJoin({ num: numeros$, int: intervalo$, let: letras$ }).subscribe((resp) => {
  console.log(resp);
});
