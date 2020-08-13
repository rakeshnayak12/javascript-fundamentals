### Inheritance
* Inheritance is the way of programming where the base class(prototype in js) contains the common behavior
and the child class(object in js) inherits all the behaviors from the base class.
* In javascript all the objects inherits methods form their prototype. `__proto__` property comes with all the objects we create 
and it's implemented by js engine and references to the base object from which the object is created. 
* We can access method of this prototype. In simple terms all the objects in javascript inherits methods 
and properties from a default base object attached as `__proto__` but this object doesn't have any 
prototype of it's own. 
* Important thing is only single instance of this base object is created and all objects inherits form it.
Different instances of this base object doesn't gets created for different user defined objects.
```js
let x = {}, y = {};
Object.getPrototypeOf(x) === Object.getPrototypeOf(y); // true
```
* The various methods we can access from base object are `.toString()`, `.getPrototypeOf()` etc.

### Multilevel inheritance
```js
let arr = [];

function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("drawing circle");
    };
}
let circle = new Circle(1);
```
* When we create `arr`, js engine would attach a prototype object under name `__proto__:Array(0)`(contains common array methods) or array base and it is prototype for all arrays created and this array base also inherits form another object which we call call base object so we can say that
`array -> Array -> Base Object` so we can use all methods of Array(push(), pop() etc) and also methods of Base object 
* If an object created by an constructor function in this case `circle`, 
1. we would get the object itself with property `radius` and method `draw` (unique to all the objects created or we can say each with their own copy)
2. We would get a single prototype (circle base) which would be attached to all the circles that's get created by `new Circle()`. This base prototype consists of constructor property which is our constructor function.
3. This base circle prototype discussed in 2nd point again has a prototype which is object prototype (Base Object).

### Property Descriptor
* As we know that we inherit some properties and methods from the base object(`__proto__`) and we can't 
enumerate it with for loop or Object.keys() method. The reason is property descriptor. It's an object which
decides the behavior of a property.
```js
let person = {name: "John"};
console.log(Object.keys(person)); // only shows name in the array doesn't show other methods of base object like toString()
let objectBase = Object.getPrototypeOf(person); // returns the base object
let descriptor = Object.getOwnPropertyDescriptor(objectBase, "toString");
console.log(descriptor);
```
**output**
```
{writable: true, enumerable: false, configurable: true, value: ƒ}
configurable: true (we can delete)
enumerable: false (we can't enumerate)
value: ƒ toString() (function implementation)
writable: true (we can change the default implementation or the modify the behavior)
__proto__: Object
```
* We can also implement out won property descriptor
```js
let person = {name: "John"};
Object.defineProperty(person, "name", {
    writable: false,
    enumerable: false,   // by default all these attributes are true
    configurable: false
});
person.name = 'William'; // won't change the name
Object.keys(person); // returns an empty array
delete person.name; // won't delete the name property
```

### Constructor prototypes
* When we create an object or an instance from an constructor function, it has `__proto__` property associated to it which references to the base object from which the object or instance is created. But as we know all objects are created by a constructor under the hood. So all constructors has a property named prototype which references to the same object which is defined by
`__proto__`
```js
let obj = {}; // we know that it is created by calling new Object() constructor under the hood
obj.__proto__;
Object.prototype; // the last two lines references to the same object

let arrary = []; // created by new Array()
arrary.__proto__;
Array.prototype; 

function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("drawing circle");
    };
}
let circle = new Circle(1);
circle.__proto__;
Circle.prototype;
```

### Prototype and instance members
```js
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("drawing circle");
    };
}

let c1 = new Circle(1);
let c2 = new Circle(2);
console.log(c1);
```
**output**
```
Circle {radius: 1, draw: ƒ}
draw: ƒ ()
radius: 1
__proto__: Object
```
* In the above code all the objects created by Circle() constructor will have their own radius and draw()
method. So we are essentially copying the method in different objects. We know every object has __proto__ 
property which references to the object form which it's created. So it's better to move the methods to 
this object associated with __proto__. So we will have a single instance of this object associated with
__proto__ for all objects created. Which will save memory. As we know Circle.prototype reference to __proto__
```js
function Circle(radius){
    this.radius = radius; // instance members
}
Circle.prototype.draw = function(){ // Prototype members
    console.log("drawing circle");
};

let c1 = new Circle(1);
let c2 = new Circle(2);
console.log(c1);
```
**output**
```
Circle {radius: 1}      // Object c1 itself has only one property and draw method has moved to __proto__
radius: 1               // which is the parent of all the objects created by circle constructor. If the 
__proto__:              // the property can't be found in object itself, then js engine will look in to
draw: ƒ ()              // __proto__ object 
constructor: ƒ Circle(radius)
__proto__: Object
```
* We can also add our default implementation of `toString()` method.
```js
Circle.prototype.toString = function(){
    return "Circe with radius" + this.radius;
}
```
* We can reference instance members and prototype members within each other with `this` keyword.
```js
function Circle(radius){
    this.radius = radius; // instance members
    this.move = function(){
        console.log("move");
        // this.draw(); -> draw can be called inside instance method
    };
}

Circle.prototype.draw = function(){ // Prototype members
    this.move();
    console.log("drawing circle");
};
```
* Iterating through instance and prototype members
```js
function Circle(radius){
    this.radius = radius; // instance members
    this.move = function(){
        console.log("move");
    };
}

Circle.prototype.draw = function(){ // Prototype members
    console.log("drawing circle");
};

let c = new Circle(1);

console.log(Object.keys(c)); // ["radius", "move"] (gives only keys of instance properties and methods)
for(let key in c){
    console.log(key); // gives instance and prototype keys
}
c.hasOwnProperty('radius'); // true
c.hasOwnProperty("draw"); // false
```

### Avoid modifying builtin objects and methods 
* It can cause unexpected behavior if other developers did the same with different implementation and it's
possible that developers of js language can implement same method in future version. For example some of the builtin methods
are `push()`, `pop()` for Array object.

