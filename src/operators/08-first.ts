import { fromEvent } from "rxjs";
import { first, map } from "rxjs/operators";

const click$ = fromEvent<PointerEvent>(document, "click");

click$
  .pipe(
    map(({ clientX, clientY }) => ({
      clientY,
      clientX,
    })),
    /* map( event => ({
        clientY: event.clientY,
        clientX: event.clientX
    })), */
    first((event) => event.clientY >= 150)
  )
  .subscribe({
    next: (value) => console.log("Next:", value),
    complete: () => console.log("Complete"),
  });
