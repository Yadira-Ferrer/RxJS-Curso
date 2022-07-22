import { of } from 'rxjs';
import { endWith, startWith } from 'rxjs/operators';

const numeros$ = of(1, 2, 3).pipe(
  startWith('Iniciando', ':D'),
  endWith('Finalizando', 'D:')
);

numeros$.subscribe(console.log);
