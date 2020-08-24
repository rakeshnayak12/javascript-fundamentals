### Synchronous Program
Synchronous code runs sequentially.Each line of code has to wait for the previous line of code to be executed.Pure javascript is synchronous.
```js
function makeWait() {
    console.log("waiting");
}

console.log("start");
makeWait();
console.log("end"); // this line has to wait until makeWait() finises executing
```
**output:**
```
start
waiting
end
```
The above code is synchronous as it gets executed synchronously.
### Asynchronous Program
Asynchronous code doesn't execute in sequential manner.Let's see an example
```js
function timeOut() {
    setTimeout(() => { // setTimeout() is a asynchronous function
        console.log("timeout");
    }, 2000);
    console.log("inside timeout function()");
}

console.log("start");
timeOut();
console.log("end");
```
**output:**
```
start
inside timeout function()
end
timeout
```
In the above example `setTimeout()` is an asynchronous function so it gets executed at the end when all synchronous code has finished executing. To understand the above program we have to understand how javascript engine works.
* Javascript engine are always embedded in some kind environment i.e browser or nodejs etc.These environments have their own APIs to perform different tasks.Like click event in browser, file system functionality in node etc.
* When we run javascript code, js engine places an global execution context(`main()` or `global()`) on the call stack.The functions get stacked upon one another and popped off once finished execution.
* When we run the code, `console.log('start')` placed on top of `main()`, `start` gets printed, then `console.log()` gets popped off from the stack.
* Then `timeOut()` is placed on the `main()` and it eventually calls `setTimeout()`.Now `setTimeout()` gets placed on top of `timeOut()`.In call stack the last function in should be executed first i.e `setTimeout()` has to executed first.(LION - Last In First Out)
* `setTimeout()` is an API provided by both node and browser which takes two argument i.e callback function which prints `timeout` and time interval (2000ms).
* `setTimeout()` uses browser API to stop the execution of the callback function for 2 secs.When javascript runtime encounters an asynchronous function in call stack it immediately returns via an implicit return statement and the asynchronous process continues in browse api or node api.The callback is registered in an event table and subsequently added to the message queue when the process is finished.
* So the control is handover to the browser to start the timer and `setTimeout()` returns immediately and popped off from the call stack.After that the next statement `console.log("inside timeout function()")` gets called and `console.log()` function gets placed on the call stack and prints `inside timeout function()` and popped off from the call stack and eventually `timeOut()` gets pooped off.
* Then `end` gets printed in the same manner.
* After browser api has processed timeout functionality(i.e waiting for 2 sec), it pushes the callback function to the message queue.
* Event loop is an infinite loop which check continuously the call stack and message queue. It checks if the call stack is empty then if there is anything in the message queue. So after `console.log('end')` call stack is empty and there is a callback function(`console.log('timeout')`) in the message queue. So event loop immediately pushes it to the call stack and it gets executed by printing `timeout` and the popped off from the call stack.`main()` popped off after the whole program is finished.
```
  Heap     Call Stack        
|      |    |      |        |      |    |-1.Browser API                                              
|      |    |      |        |      |<---|-2.Web API                    
|      |    |      |        |      |    |-3.Node API       
|      |    |      |        |      |                                      
|      |    |      |        |      |                                 
|      |    |      |        |      |                                      
|______|    |______|        |______|<--- Event Table
             
               /\                
               ||  Event Loop
               \/
            _____________________________
           |Callbacks, Event Handlers etc|  Message Queue
           |_____________________________|

```
* Nodejs uses uses `libuv` library to manage event loop along with worker threads to manage asynchronous operation.
