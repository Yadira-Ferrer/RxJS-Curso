import { fromEvent } from "rxjs";
import { first, map, takeWhile } from "rxjs/operators";

const click$ = fromEvent<PointerEvent>(document, "click");

click$
  .pipe(
    map(({ x, y }) => ({ x, y })),
    takeWhile(({ y }) => y <= 150, true)
    //takeWhile(({ y }) => y <= 150)
  )
  .subscribe({
    next: (value) => console.log("Next:", value),
    complete: () => console.log("Complete"),
  });
