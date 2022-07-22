import { fromEvent, interval } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

const interval$ = interval(500).pipe(take(3));
const click$ = fromEvent<PointerEvent>(document, 'click');

click$.pipe(exhaustMap(() => interval$)).subscribe(console.log);

/* 
    Va a ignorar las emisiones hasta que acabe la actual.
*/
