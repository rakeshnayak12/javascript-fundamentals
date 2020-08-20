### Callback Function
* Callback function is any function which passed as an argument to another function.Later the callback function which passed as argument is invoked inside the function.
* In javascript functions are first class citizens i.e they are objects.They can be used as any other objects like passed as arguments, stored in a variable, and can be returned from a function.
```js
let array = [1, 2, 3, 4];
let squareArr = [];

function square(item) {
    squareArr.push(item*item);
}
array.forEach(square);
console.log(squareArr);
```
**output:**`[ 1, 4, 9, 16 ]`
* In the above example `forEach()` is an inbuilt function fot array to loop over all the element.`forEach()` takes an function as an argument and invokes it for each item in the array.In this case we are passing `square()` as an argument but we are not invoking it.It's done by `forEach()` function.
* It's possible to directly define the callback function inside the function parenthesis like,
```js
let array = [1, 2, 3, 4];
let squareArr = [];

array.forEach(function square(item) {
    squareArr.push(item*item);
})
console.log(squareArr);
```
* It will give the same result.See documentation for more info about `forEach()`
* Unlike `setTimeout()`, `forEach()` is not asynchronous.So every function that takes a callback is not asynchronous.
#### Handling Errors In Asynchronous Code.
In general `try catch()` is used to catch error in javascript but it is not effective in case of asynchronous code.Let's see an example 
```js
function makeSquare(number, callback) {
    setTimeout(() => {
        if(typeof number === 'string'){
            throw new Error('type number expected');
        }
        const square = number * number;
        callback(square);
    }, 1000);
}

try {
    makeSquare('num', (square) => {
        console.log(square);
    });
} catch(error) {
    console.log('Caught error: ', error)
}
```
**output:**`Uncaught Error: type number expected`
* As we know asynchronous functions returns immediately after it handovers the process to browser apis or node apis.After process is finished the result is passed as argument to the callback, the callback is pushed to the message queue.
* Asynchronous code is non blocking.In the above case `setTimeout()` puts arrow function in event table then after one second, the arrow function along with the callback function is gets pushed to the message queue and waiting for the whole synchronous code to be finished executing.
* The whole try catch block has finished executing and there is no catch block left when the arrow function gets executed so we got uncaught error message.
```js
function makeSquare(number, callback) {
    setTimeout(() => {
        if(typeof number === 'string'){
            callback(new Error('type number expected'), null);
            return;
        }
        const square = number * number;
        callback(null, square);
    }, 1000);
}

makeSquare('num', (error, square) => {
    if(error) {
        console.log('Caught error: ', error);
        return;
    }
    console.log(square);
});
```
**output:**`Caught error:  Error: type number expected`
* In the above example we passed the error to the callback with both error and result.Inside the callback function we are handling the error instead of using try catch block.These functions are called error first callback function as we are passing error as the first argument. 
* Callback functions are pretty common in javascript libraries.The click event, requesting resources over a network etc all take callback and callbacks wait until some event to happen gets called after that with data generated from the event as arguments.
 #### Callback Hell
Let's say we want user name of a user and then we want details of the same user.So we have to make request to database and wait until we get the username back.After we get the username we can access the user details for the username.  
```js
let userId = 1
let userName ;

function getUsername(userId, callback){
    // waiting for response
    setTimeout(() => {
        if(userId === 1) {
            userName = 'john'
        }
        callback(userName); // callback is executed after got the result
    }, 1000)
}

function getUserDetails(userName, callback) {
    setTimeout(() => {
        callback(userName)
    }, 1000);
}

getUsername(userId, ()=> {
    console.log('User name is', userName);
});

getUserDetails(userName, (userName) => {
    console.log(`User details for ${userName} is received`);
});
```
**output:**
```
User name is  john
User details for undefined is received
```
* In the above example we try to get username first and then user details after that but as we can see in the output we got undefined as output.Because as both functions are asynchronous `getUserDetails()` doesn't wait until `getUsername()` finished processing so `userName` becomes undefined for `getUsername()` as `getUsername()` is still processing to get the username.
* To fix the above example we have to place `getUserDetails()` inside the callback of `getUsername()`.
```js
let userId = 1
let userName ;

function getUsername(userId, callback){
    setTimeout(() => {
        if(userId === 1) {
            userName = 'john'
        }
        callback(userName);
    }, 1000)
}

function getUserDetails(userName, callback) {
    setTimeout(() => {
        callback(userName)
    }, 1000);
}

getUsername(userId, ()=> {
    console.log('User name is', userName);
    getUserDetails(userName, (userName) => {
        console.log(`User details for ${userName} is received`);
    });
});
```
**output:**
```
User name is john
User details for john is received
```
We can see how callbacks are nested inside one another.If we have many callbacks nested inside one another it gets more complicated to read and maintain.This is called as `callback hell`.`promise` and `async await` is used to work around from this problem.