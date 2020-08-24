### There are 4 pillars of OOP
1. Encapsulation -> We can group properties and methods in a single unit. The properties are accessible
   with this keyword inside methods so no need of passing arguments to function. It caused less bug in
   the code and readability. Reduce complexity and increase reusability
2. Abstraction -> We can hide hide methods and properties which we don't want to expose to the user of
   the object. And if we change behavior of these properties and methods, it won't impact the public 
   methods and properties. Reduce complexity and isolate impact of changes
3. Inheritance -> We can define common properties and methods in an object(class) and let other objects 
   inherit from the parent object(class). It helps reducing duplicating our code.
4. Polymorphism -> We can define property or method with same name for different object and make them
   behave differently for different objects (avoiding complex switch case statements)

### Object literals to defining an object
```js
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw: function(){
        console.log("Drawing circle");
    },
    getRadius() { // short hand to define function
        return this.radius;
    }
};

circle.draw(); 
console.log(circle.radius);
```
**output**
```
Drawing circle
1
```

### Factory function method
* In the this method we can create as many objects as we want form the createCircle method and we can 
easily change code in one place in the factory function.
```js
function createCircle(radius){
    return {
        radius,  // it's the same as writing radius: radius (if name of key and value are same)
        draw: function(){
            console.log("Drawing circle");
        }
    };
}

let circle = createCircle(1);
circle.draw();
console.log(circle.radius);
```
**output**
```
Drawing circle
1
```

### Constructor function method
```js
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("Drawing circle");
    };
}

let circle = new Circle(1);
circle.draw();
console.log(circle.radius);
```
**output**
```
Drawing circle
1
```
* In the above `this` keyword references the object that executing the code. When an object is created with `new` keyword,
the `new` operator first creates an empty object then it sets this keyword points to the empty object and lastly it 
returns the object from the constructor function so we don't have to explicitly return an object as we 
did in factory function. By default this keyword points to global object in browser or node environment.

### Constructor property
* Every object has constructor property which gives the function from which the object is created.
If we log out `circle.constructor` it will give us `f Circle(radius){...}`. When we create string with 
string literals like `""`, `''` or `backtick` it calls `new String()` and same applies to `new Number()`, `new Boolean()`.
We can access the constructor function using `objName.constructor` notation.
* If we create an object with object literal syntax, javascript engine calls an inbuilt constructor function named `Object()` to
create the object internally.

### Function are also objects in javascript
* Functions behave like any other object and we can access inbuilt properties of function object with `.` notation.
`.name` property gives name of the function, `.length` gives number of argument the function takes.
* As we know every object has a constructor property so `.constructor` on any function gives `Function()`. `Function()` constructor function
is called by js engine while creating function. There are other method named `call()`, `apply()` etc.
**Example**
```js
const Circle = new Function("radius", `
    this.radius = radius;
    this.draw = function(){
        console.log("Drawing circle");
    };
`);

const circle = new Circle(1);
console.log(circle.radius);
circle.draw();
```
**output**
```
Drawing circle
1
```
* In the above code we have used `Function()` constructor function to create a function named `Circle()`.

### Value types reference types
* `number`, `string`, `boolean`, `symbol`(es6), `undefined`, `null` are value types where as `objects`, `functions` and 
`arrays` are reference types.
* When we assign a value type variable to another variable or pass as function parameter, a brand new copy of the value 
is created for other variable and all the other part of the code would have there own copy in the memory independently.
* when we store a reference type the address of the reference type is stored in the variable so when we make a copy,
we copy the address and ultimately all variables points to the same memory address and any change in the value in the address 
reflects in all variable pointing to the object.
```js
let number = 10;
function increase(num) {
    num++
}
increase(number); // num will get a copy of value stored in number i.e 10 
console.log(number); // prints 10
```
* `number` variable is copied by value because it's a primitive type so num parameter in the function get new copy of 10 and 
it's local to the function so global variable number remain unchanged.
```js
let object = {value: 10};
function increase(obj) {
    obj.value++
}
increase(object); // obj will get copy of address of object
console.log(obj.value); // 11
```

### Adding and deleting properties to objects
* We can add property to an object even after the object is created from the constructor function.
The objects are dynamic so it's possible in js. Real world example would be add a token to the user
object sent by the user.
```js
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("drawing circle");
    };
}

let circle = new Circle(1);
circle.location = {x: 1}; // can done with: circle["location"] = {x: 1}
console.log(circle.location.x); // prints 1
console.log(circle["location"]); // prints {x: 1}
```
* `[]` notation is useful when we want to calculate properties dynamically like in `for in` loop and if
the the property name is not a valid identifer like has special characters or space in it. Also we can pass variable
to `[]` to calculate the property and it's value.
```js
let property = "center-location";
circle[property]; // gives the value of the property named center-location if present
```
* we can delete properties from an object which we don't want to send to the user in real world
```js
delete circle.location; // same as delete circle["location"];
```

### Enumerating over an object
```js
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('Drawing circle);
    };
}
const circle = new Circle(1);

for(let key in circle){
    if(typeof circle[key] !== 'function'){
        console.log(key, circle[key]); // to log only properties not methods
    }
}

const keys = Object.keys(circle); // keys holds the array of keys of circle
console.log(keys); // ["radius", "draw"]
if('radius' in circle){
    console.log('circle has radius'); // to check if an object has an property
}
```

### Abstraction 
* We have to hide the some inner implementation in the object from the outer user. All the properties and
methods created by this keyword are accessible through the object.property notation 
```js
function Circle(radius){
    this.radius = radius;
    let defaultLocation = {x: 0, y: 0}; // private without this keyword

    let calculateOptimalLocation = function(){ // private without this keyword
        console.log(defaultLocation.x)
    }
    this.draw = function(){
        defaultLocation;
        calculateOptimalLocation();
        console.log("Drawing circle");
    };
}
let c = new Circle(1)
c.draw();
```
**output**
```
0
Drawing circle
```
* The above implementation used creating local variables inside constructor function so those variables
get removed from the memory when the function stops execution. These are not inside the object these are
only local variables declared inside the constructor function and these variables stay alive as long as
they are referred inside of the methods.

### Getters and setters
* If we want to display the private members to the user there should be a way to do it and we should only
able to read it not modify it
```js
function Circle(radius){
    this.radius = radius;
    let defaultLocation = {x: 0, y: 0}; // private without this keyword

    this.draw = function(){
        defaultLocation;
        console.log("drawing circle");
    };

    Object.defineProperty(this, "defaultLocation", { // defaultLocation is computed property
        get: function(){
            return defaultLocation;
        },
        set: function(value){ // to set value form outside
            if(!value.x || !value.y){
                throw new Error("Invalid location");
            }
            defaultLocation = value;
        }
    });
}
```

### Stopwatch example with OOP implementation
* start, stop and reset methods to start,stop and reset the stopwatch. duration property to get duration
```js
function Stopwatch(){
    let startTime, endTime, running, duration = 0;

    this.start = function(){
        if(running){
            throw new Error("Stopwatch is already running");
        }
        running = true;
        startTime = new Date();
    };

    this.stop = function(){
        if(!running){
            throw new Error("Stopwatch is already stopped");
        }
        running = false;
        endTime = new Date();

        const seconds = (endTime.getTime() - startTime.getTime())/1000;
        duration += seconds;
    };

    this.reset = function(){
        startTime = null;
        endTime = null;
        duration = 0;
        running = false;
    };

    Object.defineProperty(this, "duration", {
        get: function(){
            return duration;
        }
    });
}

let sw = new Stopwatch();
```