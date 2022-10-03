import './style.css';
console.clear();

// begin lesson code
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// elem refs

const countdown = document.getElementById('#message');

// streams

const counter$ = interval()