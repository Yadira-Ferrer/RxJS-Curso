import { Observable, Observer } from "rxjs";

// El tipo Observer es una interfaz
const observer: Observer<any> = {
  next: (value) => console.log("Siguiente [next]: ", value),
  error: (error) => console.warn("Error [obs]: ", error),
  complete: () => console.info("Completado [obs]"),
};

const obs$ = new Observable<string>((subs) => {
  subs.next("Hola");
  subs.next("Yadira");

  // Forzar un error
  /* const a = undefined;
  a.nombre = "Yadira"; */

  subs.complete();
});

obs$.subscribe(observer);
