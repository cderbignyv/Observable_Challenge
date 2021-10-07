import { combineLatest, from, interval, Observable, of } from 'rxjs';
import { map, filter, distinct, take, tap, switchMap, mergeMap, withLatestFrom } from 'rxjs/operators';

const streamOfNumbers = of(1,2,3,4,5,6, 6, 1, 5);
const singleOutput = of([1,2,3]);


// Challenge 1 use streamOfNumbers and square each value [Easy]

streamOfNumbers.pipe(map((x) => x * x)).subscribe((x) => console.log(x));

// Challenge 2 use streamOfNumbers and square only the even numbers [Easy]

    streamOfNumbers.pipe(
        filter((x) =>{
            return x % 2 == 0;
        }),
    map((x) => x * x)).subscribe((x) => console.log(x));

// Challenge 3 use singleOutput  and console log the value [Easy]

    singleOutput.subscribe((x) => console.log(x));

// Challenge 4 take the lastest from streamOfNumbers and singleOutput and multiply
// the latest value from single output by the value returned from stream of numbers [Medium]

    streamOfNumbers.pipe(
        tap((val: number) => { console.log(val) }),
        withLatestFrom(singleOutput),
        map(([stream, single]) => {
            return single.map((test)=> test * stream)
    })).subscribe((val) => console.log(val));

// Challenge 5 take the latest from both observables anytime one of the obervables emits [Medium]
// console log the emission. Be able to explain the output.

    combineLatest([streamOfNumbers, singleOutput]).subscribe(([val]) => console.log(val));

// Chanllenge 6 An error is going to occur with the below code. Prevent the error from stopping the stream [Medium]
    // of('a', 1, "b").pipe(map((x: any) => x.toUppercase())).subscribe((val) =>console.log(val));

    const letters$ = of('a', 1, "b");
    const upperCase$ = letters$.pipe(map((x: any) => {
        try {
            return x.toUpperCase();
        } catch(error) {
            return undefined;
        }
    }));
    upperCase$.subscribe(
        (val => console.log('Success: ', val)),
        (val => console.log('Error: ', val)),
        (() => console.log('Complete'))
    );

// Challenge 7 SwitchMap challenge be able to explain the output [Medium]
// const character = new Observable((observer) => {
//     observer.next('A');
//     setTimeout(() => observer.next('B'), 200);
//     setTimeout(() => observer.complete(), 300);
// });

// const number = interval(50).pipe(take(5));

// character.pipe(
//     tap((x) => console.log(`value from source: ${x}`)),
//     switchMap(() => number)
// ).subscribe((val) => console.log(`emitted value: ${val}`), null, () => console.log('complete'));

This is explaining that an observer is going to emit 5 numbers(in this case starting from 0)
and it will take 50(fractions of a sec) to emit before moving to the next number. But when the
time reaches 200(fractions of a sec) it stops emiting for the first observer and goes to the next
observer and starts emiting values again starting from zero but continues until its complete.

// Challenge 8 MergeMap challenge be able to explain the output and the difference from switch map [Medium]
// const character = new Observable((observer) => {
//     observer.next('A');
//     setTimeout(() => observer.next('B'), 200);
//     setTimeout(() => observer.complete(), 300);
// });

// const number = interval(50).pipe(take(5));

// character.pipe(
//     tap((x) => console.log(`value from source: ${x}`)),
//     mergeMap(() => number)
// ).subscribe((val) => console.log(`emitted value: ${val}`), null, () => console.log('complete'));

This is explaining that an observer is going to emit 5 numbers(in this case starting from 0)
and it will take 50(fractions of a sec) to emit before moving to the next number. But when the
time reaches 200(fractions of a sec) it stops emiting for the first observer and goes to the next
observer and picks up were the first observer left off while starting the next observer, emiting
values until its complete.

// Challenge 9 use streamOfNumbers and only emit values when they are different from the previous value. [Easy]

streamOfNumbers.pipe(distinct()).subscribe(x => console.log(x));

// Challenge 10 use streamOfNumbers but stop taking values after the number 4 has been emitted [Easy]

const untilFour = streamOfNumbers.pipe(take(4));
untilFour.subscribe(x => console.log(x));
