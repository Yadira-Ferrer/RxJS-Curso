import { concat, interval, take, of } from 'rxjs';

// Referencias
const interval$ = interval(1000);

concat(
  interval$.pipe(take(3)),
  interval$.pipe(take(2)),
  [1, 2, 3, 4],
  of(1)
).subscribe(console.log);
