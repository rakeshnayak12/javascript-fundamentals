### Async & Await
* Async keyword is used to make a function asynchronous.When we place `async` keyword in front of a function, it becomes asynchronous and executes asynchronously via even loop.
* Asynchronous functions always returns a promise.If the value returned is not a promise then javascript puts a wrapper and makes it a promise.   

```js
function resolveNum() {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(10), 2000);
   });
}

function getNum() {
   let num = resolveNum();
   console.log(num);
   console.log('after');
}

getNum();
```
**output:**
```
Promise { <pending> }
after
```
* In the above function `getNum()` doesn't wait for the promise to be resolved.`num` is in pending state for two second so it prints `Promise { <pending> }` then immediately goes to the next line and prints `after`.
* We use `await` keyword to pause the execution of the function until the promise returns a value.To use `await` we have to make the function `async`.
```js
function resolveNum() {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(10), 2000);
   });
}

async function getNum() {
   let num = await resolveNum();
   console.log(num);
   console.log('after');
}

getNum();
```
**output:**
```
10
after
```
* Let's say we want to fetch user id of an user then user address of the same user using user id.So we have to make two http requests.First we have to wait for user id and then we have to wait for user address.Note that user address is dependent on user id.
```js

function getUserId() {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve('john'), 2000);
   });
}

function getUserAddress(userId) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if(userId === 'john') {
            resolve('London');
         }
      }, 2000);
   });
}

async function getUserDetails() {
   let userId = await getUserId();
   let userAddress = await getUserAddress(userId);
   console.log(`The user with id ${userId} is located in ${userAddress}`);
}

getUserDetails();
```
**output:**`The user with id john is located in London`  
* In the above example we can see that `getUserDetails()` pauses two times i.e at `getUserId()` to get user id and at `getUserAddress()` to get the address of the user.After we get all the info, then we log the details to the console.
* Important to note that we have used `async` keyword in front of `getUserDetails()` and `await` keyword to pause the further execution of `getUserDetails()` until we get id(resolve promise and assigned to userId) and address(resolve promise and assigned to userAddress) and at the end `console.log()` executed.
* When `getUserDetails()` waits for a promise to be resolved it doesn't mean that the whole program stops.Javascript still runs other part of the program.By using `async` and `await` we can produce more readable code.The above code looks like synchronous code hence more easy to understand.
* If we remove the `async` keyword from the `getUserDetails()`, the `console.log()` gets executed first and the output would be something like this: `The user with id [object Promise] is located in [object Promise]`
#### Error Handling
* We can use `try catch` block to handle error in `async` function.
```js

function getUserId() {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve('merry'), 2000);
   });
}

function getUserAddress(userId) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if(userId === 'john') {
            resolve('London');
         } else{
            reject('user address not found')
         }
      }, 2000);
   });
}

async function getUserDetails() {
   try {
      let userId = await getUserId();
      let userAddress = await getUserAddress(userId);
      console.log(`The user with id ${userId} is located in ${userAddress}`);
   } catch(error) {
      console.log('Error: ', error);
   }
   
}

getUserDetails();
```
**output:**`Error:  user address not found`  
* In the above example the function rejects for any user id other than `john`.When we passed `merry` the promise got rejected and caught by the catch block and we got a nice error message.
#### Parallel Execution
* In the above examples, code is executed in sequential manner.But we can also execute code in parallel manner.
```js
function getNum1() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         console.log('num1 resolved')
         resolve(1)
      }, 1000);
   });
}

function getNum2() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         console.log('num2 resolved')
         resolve(2)
      }, 1000);
   });
}

async function getNums() {
   promise1 = getNum1();
   promise2 = getNum2();
   let num1 = await promise1;
   let num2 = await promise2;
   // let [num1, num2] = [await promise1, await promise2]
   console.log(num1, num2)
}

getNums();
```
**output:**
```
num1 resolved
num2 resolved
1 2
```
* Two messages would print to the console at the same time.They won't wait for each other instead they would execute independently and in parallel.