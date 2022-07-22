import { ajax, AjaxError } from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1';

/* ajax
  .put(
    url,
    {
      id: 1,
      nombre: 'Yadira',
    },
    {
      'mi-token': 'ABC123',
    }
  )
  .subscribe(console.log); */

ajax({
  url,
  method: 'DELETE',
  headers: {
    'mi-token': 'ABC123',
  },
  body: {
    id: 1,
    nombre: 'Yadira',
  },
}).subscribe(console.log);
