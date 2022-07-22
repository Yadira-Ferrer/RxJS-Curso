import { range, fromEvent } from "rxjs";
import { map, tap } from "rxjs/operators";

const texto = document.createElement("div");

texto.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis vel ex vitae condimentum. Suspendisse eros ex, fringilla facilisis orci et, semper pellentesque nulla. Maecenas eget laoreet lectus. Mauris condimentum leo leo, vel fringilla mauris suscipit eget. Pellentesque sodales ornare volutpat. Nunc faucibus arcu ac metus finibus, et tincidunt nisi tincidunt. Quisque luctus fermentum nibh, sit amet sollicitudin neque bibendum sagittis. In varius, tortor et congue fringilla, enim risus ornare turpis, sit amet volutpat dui urna a augue. Aenean blandit felis odio. Donec nec tellus orci.
<br/><br/>
Aliquam vestibulum dui id accumsan auctor. Donec tristique ante a libero scelerisque, a euismod est dapibus. Sed dictum nec metus eget porttitor. Sed eget ligula eu dui fringilla malesuada. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam vehicula eleifend dignissim. Donec euismod, quam non condimentum suscipit, lectus arcu pretium nisl, ac facilisis est magna vel lacus. Suspendisse non mauris turpis. Pellentesque non dui tincidunt, rutrum dui at, commodo ex. Nullam ex dui, ultrices non ullamcorper nec, dictum ut lacus. Vivamus accumsan, mauris eget ullamcorper molestie, leo mi pretium ante, eu luctus ligula elit ac felis. Praesent nec efficitur quam, rhoncus varius quam. Suspendisse finibus libero at ex fringilla, eu tempus ipsum tincidunt. Donec auctor dui ante, eget auctor turpis semper a.
<br/><br/>
Quisque quis ante in nisi pulvinar placerat ac at justo. Nulla facilisi. Donec ac accumsan diam. Integer dictum diam ut consequat mattis. Cras ultricies ac odio a hendrerit. Vestibulum feugiat ligula at tortor vestibulum, ullamcorper venenatis turpis tincidunt. Proin iaculis, ante ut rhoncus rhoncus, erat enim aliquam ipsum, eget mattis mauris nisl a nulla. Morbi a eros quam. Ut diam purus, posuere quis lectus at, vulputate iaculis tellus. Aliquam sagittis nisl vel risus ullamcorper lobortis. Aenean eu nisi risus. In risus velit, suscipit eu eros et, luctus bibendum felis.
<br/><br/>
Sed eleifend urna lacus, vel viverra diam venenatis non. Integer eget tortor imperdiet, tincidunt lorem ac, tempus erat. Vestibulum vulputate dui eget varius posuere. Duis pharetra id lacus vitae porttitor. Nullam libero ligula, aliquet id venenatis in, ultricies id neque. Donec et tristique lacus. Duis scelerisque ipsum felis, sed auctor nulla lobortis eu.
<br/><br/>
Proin sit amet massa neque. Duis nec tincidunt lacus, blandit faucibus turpis. Morbi euismod pharetra leo vitae pulvinar. Praesent aliquam erat nec elit mattis, nec tincidunt nulla volutpat. In blandit nunc sit amet massa condimentum finibus. Phasellus justo lectus, ultrices id tellus ac, dapibus imperdiet ipsum. Praesent id ex eget felis pulvinar fermentum vel quis velit. Sed consequat lacus id libero ullamcorper, sit amet congue odio volutpat. Integer vitae faucibus turpis. Aliquam erat volutpat. Curabitur a vulputate augue, a tempor metus.
`;

const body = document.querySelector("body");
body.append(texto);

const progressBar = document.createElement("div");
progressBar.setAttribute("class", "progress-bar");
body.append(progressBar);

// Función que realiza el calculo
const calcularPorcentajeScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } =
    event.target.documentElement;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
};

// Suscribirse al scroll del document
const scroll$ = fromEvent(document, "scroll");

const progress$ = scroll$.pipe(map(calcularPorcentajeScroll), tap(console.log));

progress$.subscribe((porcentaje) => {
  progressBar.style.width = `${porcentaje}%`;
});
