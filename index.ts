import './style.css';
console.clear();

// begin lesson code
import { fromEvent, interval, of, empty } from 'rxjs';
import {
  map,
  scan,
  mapTo,
  filter,
  tap,
  first,
  takeWhile,
  debounceTime,
  takeUntil,
  mergeAll,
  mergeMap,
  pluck,
  distinctUntilChanged,
  delay,
  switchMap,
  concatMap,
  catchError,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// elem refs
const BASE_URL = 'https://api.openbrewerydb.org/breweries';

const countdown = document.getElementById('countdown');
const mess = document.getElementById('message');
const ti = document.getElementById('text-input');

// streams

const counter$ = interval(1000);
const codeElem = document.getElementById('code');
const animalElem = document.getElementById('res-animal');
// const keyup$ = fromEvent(document, 'click').pipe(
//   map((event) => ({ x: event.clientX, y: event.clientY }))
// );
const input$ = fromEvent(ti, 'keyup');
// const clickAbort$ = fromEvent(document.getElementById('takeuntil'), 'click');
// const saveAnswer = (answer) => {
//   return of(`Save: ${answer}`).pipe(delay(1500));
// };
// const radioBtns = document.querySelectorAll('.radio-button');
// const radio$ = fromEvent(radioBtns, 'click');
// radio$
//   .pipe(concatMap((event) => saveAnswer(event.target.value)))
//   .subscribe(console.log);
// const keycode$ = counter$.pipe(takeUntil(clickAbort$)).subscribe(console.log);

// counter$
//   .pipe(
//     mapTo(-1),
//     scan((accumulator, current) => {
//       return accumulator + current;
//     }, 10),
//     filter((x) => x >= 0)
//   )
//   .subscribe((data) => {
//     countdown.innerHTML = data + '';
//     if (data == 0) {
//       mess.innerHTML = 'Liff off';
//     }
//   });
input$
  .pipe(
    debounceTime(1000),
    pluck('target', 'value'),
    distinctUntilChanged(),
    switchMap((data) => {
      return ajax
        .getJSON(`${BASE_URL}?by_name=${data}`)
        .pipe(catchError((err) => empty()));
    })
  )
  .subscribe((data) => {
    animalElem.innerHTML = data.map((d) => d.name).join('<br>');
  });
// keyup$
//   .pipe(
//     mergeMap((data) => {
//       console.log(data);
//       return ajax.post(
//         'https://www.mocky.io/v2/5185415ba171ea3a00704eed',
//         data
//       );
//     })
//   )
//   .subscribe(console.log);
