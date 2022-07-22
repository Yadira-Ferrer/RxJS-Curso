import { Observable, Observer, Subject } from "rxjs";

// El tipo Observer es una interfaz
const observer: Observer<any> = {
  next: (value) => console.log("Next: ", value),
  error: (error) => console.warn("Error: ", error),
  complete: () => console.info("Completado"),
};

const intervalo$ = new Observable<number>((subs) => {
  const intervalID = setInterval(() => subs.next(Math.random()), 1000);

  return () => {
    clearInterval(intervalID);
    console.log("Intervalo destruido.");
  };
});

const subject$ = new Subject();

const subscription = intervalo$.subscribe(subject$);

/* const subs1 = intervalo$.subscribe((rnd) => console.log("subs 1: ", rnd));
const subs2 = intervalo$.subscribe((rnd) => console.log("subs 2: ", rnd)); */

const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() => {
  subject$.next(10);
  subject$.complete();
  subscription.unsubscribe();
}, 3500);
