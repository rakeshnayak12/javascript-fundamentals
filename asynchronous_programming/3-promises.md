### Promises
* Promise is a special javascript object that represents an eventual result of an asynchronous action.
Let's say we are making a request over network for some data and it may take few seconds.Now to process the data received we might pass a callback(will be invoked after data received) like we have seen before and we can end up with callback hell.  
* Another option is we can return a promise form the asynchronous function.A promise has two properties `PromiseStatus` and `PromiseValue`.`PromiseValue` contains the actual value and `PromiseStatus` contains status of the promise.`PromiseStatus` is of three types i.e `pending`(while processing, value is `undefined`),`fulfilled`(action completed successfully),`rejected`(action is failed).
```js
const promise1 = new Promise((resolve, reject) => {

});

const promise2 = new Promise((resolve, reject) => {
    resolve('resolved');
});

const promise3 = new Promise((resolve, reject) => {
    reject('rejected');
});

console.log(promise1);
console.log(promise2);
console.log(promise3);
```
**output:**
```
Promise {<pending>}
Promise {<resolved>: "resolved"}
Promise {<rejected>: "rejected"}
```
* As we can see we have created 3 promises with `new` keyword.Promise takes a function with 2 parameter `resolve` and `reject` which are callback functions.`resolve` and `reject` gets called if promise is fulfilled or rejected due to some error respectively.
* In the above example promise takes an arrow function and takes two callback functions(`resolve`,`reject`) as parameter.
* We can access the value form a fulfilled promise or handle a rejected promise through `then()` and `catch()` respectively.Both these function takes callback functions which gets pushed to the message queue and evaluated after the promise either resolved or rejected, which makes promises are asynchronous.Let's see an example.
```js
const promise = new Promise((resolve, reject) => {
    resolve('resolved');
});

promise.then(val => console.log(val));
console.log('outside of promise'); // will be executed first
```
**output:**
```
outside of promise
resolved
```
```js
function calculateSquare(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(typeof number !== 'number') {
                reject('Type of number expected')
            }
            const result = number * number;
            resolve(result);
        }, 1000);
    });
}

calculateSquare(3)
.then(result => console.log(result))
.catch(err => console.log(err));
calculateSquare('a')
.then(result => console.log(result))
.catch(err => console.log(err));
```
**output:**
```
9
Type of number expected
```
#### Promise Chaining
We can chain promises with `.` operator.Both `then()` and `catch()` returns promise.
```js
function calculateSquare(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            if(typeof number !== 'number') {
                reject('Type of number expected')
            }
            const result = number * number;
            resolve(result);
        }, 1000);
    });
}

calculateSquare(3)
    .then(result => {
        console.log(result);
        return calculateSquare(2); // returning another promise
    }).then(value => {
        console.log(value);
        throw new Error('error')
    }).then(value => {
        console.log(value)
        }, reason => {
        console.log('error', reason);
    });
```
**output:**
```
9
4
error Error: error
```
* We can see, we have returned a promise from the first `then()` block and `then()` also takes two functions of signature `onfulfilled` and `onrejected` as seen in the third block. 
#### Avoiding Callback Hell
If we want to print squares of three numbers one after another with one second pause, below is the way we can do
```js
function calculateSquare(number, callback) {
    setTimeout(() => {
        if(typeof number !== 'number') {
            callback(new Error('Type of number expected'));
        }
        let result = number * number;
        callback(null, result);
    }, 1000);
}

calculateSquare(2, (error, number) => {
    console.log(number);
    calculateSquare(3, (error, number) => {
        console.log(number);
        calculateSquare(4, (error, number) => {
            console.log(number);
        });
    });
});

// calculateSquare(4, (error, number) => { (It won't work)
//     console.log(number);
// });
// calculateSquare(4, (error, number) => {
//     console.log(number);
// });
// calculateSquare(4, (error, number) => {
//     console.log(number);
// });
```
* Now we can avoid the callback hell with promises
```js
function calculateSquare(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof number !== 'number') {
                reject(new Error('Type of number expected'));
            }
            let result = number * number;
            resolve(result);
        }, 1000);
    });
}

calculateSquare(2)
    .then(square => {
        console.log(square);
        return calculateSquare(3);
    })
    .then(square => {
        console.log(square);
        return calculateSquare(4);
    }).then(square => {
        console.log(square);
    });
```
**output:**
```
4
9
16
```
```js
// Another way to chain promises
function calculateSquare(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof number !== 'number') {
                reject(new Error('Type of number expected'));
            }
            let result = number * number;
            resolve(result);
        }, 1000);
    });
}

calculateSquare(2)
    .then(square => {
        console.log(square);
        calculateSquare(3)
            .then(square1 => console.log(square1))
    })
    .catch(error => {
        console.log('error: ', error);
    });
```
* We can convert non promise value to promise by using `Promise.resolve()`(returns resolved promise) or `Promise.reject()`(returns rejected promise).If we pass promise to these two methods, it would return the same promise. 
```js
function printHello (promise) {
    promise
        .then(val => console.log(val))
        .catch(error => console.log('error: ', error))
}

const promise = new Promise((resolve, reject) => { // always resolve to hello
    resolve('hello');
});

const resolvedPromise = Promise.resolve('hello');
const rejectedPromise = Promise.reject(new Error('some error happened'));

printHello(promise);
printHello(resolvedPromise);
printHello(rejectedPromise);
```
**output:**
```
hello
hello
error:  Error: some error happened
```
* We can also execute promises in parallel.Let's say we are making multiple http request and waiting for all of them to complete.Now all those requests may take different amount of time to complete.So we have to wait for all of them to complete.
* `Promise.all()` takes an array of promises and waits for all the promises to complete.It returns array of resolved values.We can pass normal values to the array and it still will work.
```js
function first() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('first');
        }, 1000);
    });
}

function second() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('second');
        }, 2000);
    });
}

function third() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('third');
        }, 3000);
    });
}

Promise.all([first(), second(), third()])
    .then(values => console.log(values));
```
**output:**`[ 'first', 'second', 'third' ]`  
* `Promise.all()` has fail-fast behavior i.e if any of the promised rejects then the whole promise would reject even if others have resolved.
```js
function first() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('first');
        }, 1000);
    });
}

function second() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('rejected promise');
        }, 2000);
    });
}

function third() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('third');
        }, 3000);
    });
}

Promise.all([first(), second(), third()])
    .then(values => console.log(values))
    .catch(error => console.log('error: ', error));
```
**output:**`error:  rejected promise`  
* We can handle rejected promised in following manner.
```js
function first() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('first');
        }, 1000);
    });
}

function second() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('rejected promise');
        }, 2000);
    });
}

function third() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('third');
        }, 3000);
    });
}

Promise.all([
    first().catch(error => {return error})
    , second().catch(error => {return error})
    , third().catch(error => {return error})
    ])
    .then(values => console.log(values))
    .catch(error => console.log('error: ', error));
```
**output:**`[ 'first', 'rejected promise', 'third' ]`  
* `Promise.race()` also takes an array of promises and returns as soon as any of the promises resolved or rejected.It doesn't wait for all the promises to be executed.
```js
function first() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('first');
        }, 1000);
    });
}

function second() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('rejected promise');
        }, 2000);
    });
}

function third() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('third');
        }, 3000);
    });
}

Promise.race([first(), second(), third()])
    .then(values => console.log(values))
    .catch(reason => console.log('Rejected: ', reason));
```
**output:**`first`  
* In the above example `first()` gets resolved first so the promise returns with the resolved value.If we replace the time in `setTimeout()` with 4000 in `first()` function then the `second()` would rejected first and we will get the output as `Rejected:  rejected promise`.
