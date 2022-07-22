import { Observable, Observer, onErrorResumeNext } from "rxjs";

// El tipo Observer es una interfaz
const observer: Observer<any> = {
  next: (value) => console.log("Next: ", value),
  error: (error) => console.warn("Error: ", error),
  complete: () => console.info("Completado"),
};

const intervalo$ = new Observable<number>((subscriber) => {
  // Crear un contador 1,2,3,...
  let count = 1;
  const interval = setInterval(() => {
    subscriber.next(count);
    count++;
  }, 1000);

  setTimeout(() => {
    subscriber.complete();
  }, 2500);

  return () => {
    clearInterval(interval);
    console.log("Intervalo destruído.");
  };
});

const subs2 = intervalo$.subscribe(observer);
const subs1 = intervalo$.subscribe(observer);
const subs3 = intervalo$.subscribe(observer);

subs1.add(subs2);
subs2.add(subs3);

setTimeout(() => {
  // Como se encadenaron no hace falta llamar el unsubscribe para cada observable.
  subs1.unsubscribe();
  //subs2.unsubscribe();
  //subs3.unsubscribe();

  console.log("Timeout completado.");
}, 6000);
