import { combineLatest, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const streamOfNumbers = of(1,2,3,4,5,6, 6, 1, 5);
const singleOutput = of([1,2,3]);


// Challenge 1 use streamOfNumbers and square each value [Easy]

// streamOfNumbers.pipe(map((x) => x * x)).subscribe((x) => console.log(x));

// Challenge 2 use streamOfNumbers and square only the even numbers [Easy]

// streamOfNumbers.pipe(
//     filter((x) =>{
//         return x % 2 == 0;
//     }),
//     map((x) => x * x)).subscribe((x) => console.log(x));

// Challenge 3 use singleOutput  and console log the value [Easy]

// singleOutput.subscribe((x) => console.log(x));

// Challenge 4 take the lastest from streamOfNumbers and singleOutput and multiply
// the latest value from single output by the value returned from stream of numbers [Medium]

streamOfNumbers.pipe(
    filter((val) => {
        return val % 2 == 0;
    }),
    map((x) => x * x)).subscribe((x) => console.log(x));
        //val = 4, 16, 36, 36

    singleOutput.subscribe((x) => console.log(x));

const values = combineLatest(
    [streamOfNumbers, singleOutput
    ]).pipe(
        map(([x, y]) => x * y),
);

values.subscribe(x, y => console.log('values is ' + x + y));
// Challenge 5 take the latest from both observables anytime one of the obervables emits [Medium]
// console log the emission. Be able to explain the output.




// Chanllenge 6 An error is going to occur with the below code. Prevent the error from stopping the stream [Medium]

    // of('a', 1, "b").pipe(map((x: any) => x.toUppercase())).subscribe((val) =>console.log(val));



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






// Challenge 8 MergeMap challenge be able to explain the output and the difference from merge map [Medium]
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



// Challenge 9 use streamOfNumbers and only emit values when they are different from the previous value. [Easy]



// Challenge 10 use streamOfNumbers but stop taking values after the number 4 has been emitted [Easy]

