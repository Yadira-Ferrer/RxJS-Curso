import { range, fromEvent } from "rxjs";
import { map, mapTo, pluck } from "rxjs/operators";

/* range(1, 5)
  .pipe(map<number, string>((value) => (value * 10).toString()))
  .subscribe(console.log);
 */

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup");

const keyUpCode$ = keyup$.pipe(map((event) => event.code));

const keyupPluck$ = keyup$.pipe(pluck("target", "baseURI"));

const keyupMapTo$ = keyup$.pipe(mapTo("Tecla presionada"));

keyup$.subscribe(console.log);
keyUpCode$.subscribe((code) => console.log("map ", code));
keyupPluck$.subscribe((code) => console.log("pluck ", code));
keyupMapTo$.subscribe((code) => console.log("mapTo ", code));
