import './style.css';
console.clear();

// begin lesson code
import { fromEvent, interval } from 'rxjs';
import { map, scan, mapTo, filter, tap } from 'rxjs/operators';

// elem refs

const countdown = document.getElementById('countdown');
const mess = document.getElementById('message');

// streams

const counter$ = interval(1000);
const codeElem = document.getElementById('code');
const keyup$ = fromEvent(document, 'keyup');
// const keycode$ = keyup$.pipe(
//   map((event) => event.code),
//   tap((code) => {
//     codeElem.innerHTML = code;
//   })
// );

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    filter((x) => x >= 0)
  )
  .subscribe((data) => {
    countdown.innerHTML = data + '';
    if (data == 0) {
      mess.innerHTML = 'Liff off';
    }
  });
