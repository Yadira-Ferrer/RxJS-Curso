import { fromEvent, interval } from "rxjs";
import { skip, takeUntil, tap } from "rxjs/operators";

const boton = document.createElement("button");
boton.innerHTML = "Detener Timer";

document.querySelector("body").append(boton);

const counter$ = interval(1000);
const clickBtn$ = fromEvent(boton, "click").pipe(
  tap(() => console.log("Tap antes del Skip")),
  skip(1),
  tap(() => console.log("Tap después del Skip"))
);

counter$.pipe(takeUntil(clickBtn$)).subscribe({
  next: (value) => console.log("Next:", value),
  complete: () => console.log("Complete"),
});
