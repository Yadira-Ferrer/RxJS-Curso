import { fromEvent, interval, of } from 'rxjs';
import { map, mergeMap, take, takeUntil } from 'rxjs/operators';

const letras$ = of('a', 'b', 'c');

letras$.pipe(
  mergeMap((letra) =>
    interval(1000).pipe(
      map((i) => letra + i),
      take(3)
    )
  )
);
/* .subscribe({
    next: (value) => console.log('Next:', value),
    complete: () => console.log('Complete'),
  }) */

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const interval$ = interval();

mousedown$
  .pipe(mergeMap(() => interval$.pipe(takeUntil(mouseup$))))
  .subscribe(console.log);
