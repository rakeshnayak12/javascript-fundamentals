// Inheritance
/*
Inheritance is the way of programming where the base class(prototype in js) contains the common behaviour
and the child class(object in js) inherits all the behaviors from the base class. In javascript all the
objects inherits methods form their prototype. __proto__ property comes with all the objects we create 
and it's implemented by js engine and references to the base object from which the object is created. 
We can access method of this prototype. In simple terms all the objects in javascript inherits methods 
and properties from a default base object attached as __proto__ but this object doesn't have any 
prototype of it's own. Important thing is only single instance of this base object is created and all 
objects inherits form it. Different instances of this base object doesn't gets created The various 
methods we can access from base object are .toString(), .getPrototypeOf() etc.
*/

let x = {}, y = {};
Object.getPrototypeOf(x) === Object.getPrototypeOf(y); // true

// Multilevel inheritance
let array = [];
let circle = new Circle();
/*
This array would have prototype from Array() or array base and it's prototype for all arrays created and
this array base also inherits form another object which we call call base object so we can say that
array -> Array -> Base so we can use all methods of Array(push(), pop() etc) and also methods of Base object 
If an object created by an constructor function obj -> Object Constructor -> Base Object 
*/

// Property Descriptor
/*
As we know that we inherit some properties and methods from the base object(__proto__) and we can't 
enumerate it with for loop or Object.keys() method. The reason is property descriptor. It's an object which
decides the behaviour of a property.
*/
let person = {name: "John"};
console.log(Object.keys(person)); // ["name"] doesn't show other methods of base object like  toString()
let objectBase = Object.getPrototypeOf(person); // returns the base object
let descriptor = Object.getOwnPropertyDescriptor(objectBase, "toString");
console.log(descriptor);
/*
The above returns this
{writable: true, enumerable: false, configurable: true, value: ƒ}
configurable: true -> we can delete
enumerable: false -> we can enumerate
value: ƒ toString() -> function implementation
writable: true -> we can change the default implementation or the modify the behaviour
__proto__: Object
*/
// Our own property descriptor
Object.defineProperty(person, "name", {
    writable: false,
    enumerable: false,   // by default all these attributes are true
    configurable: false
});

// Constructor prototypes
/*
When we create an object it has __proto__ property associated to it which references to the base object from which
the object is created. But as we know all objects are created by a constructor under the hood. So all
constructors has a property named prototype which references to the same object which is defined by
__proto__
*/
let obj = {}; // we know that it is created by calling new Object() constructor under the hood
obj.__proto__;
Object.prototype; // the last two lines references to the same object

let arrary = [];
arrary.__proto__;
Array.prototype; 

let circle = new Circle(1);
circle.__proto__;
Circle.prototype;

// Prototype and instance members
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("drawing circle");
    };
}

let c1 = new Circle(1);
let c2 = new Circle(2);
console.log(c1);
/*
Circle {radius: 1, draw: ƒ}
draw: ƒ ()
radius: 1
__proto__: Object
*/

/*
In the above code all the objects created by Circle() constructor will have their own radius and draw()
method. So we are essential copying the method in different objects. We know every object has __proto__ 
property which references to the object form which it's created. So it's better to move the methods to 
this object associated with __proto__. So we will have a single instance of this object associated with
__proto__ for all objects created. Which will save memory. As we know Circle.prototype reference to __proto__
*/
function Circle(radius){
    this.radius = radius; // instance members
}
Circle.prototype.draw = function(){ // Prototype members
    console.log("drawing circle");
};

let c1 = new Circle(1);
let c2 = new Circle(2);
console.log(c1);
/*
Circle {radius: 1}      // Object c1 itself has only one property and draw method has moved to __proto__
radius: 1               // which is the parent of all the objects created by circle constructor. If the 
__proto__:              // the property can't be found in object itself, then js engine will look in to
draw: ƒ ()              // __proto__ object 
constructor: ƒ Circle(radius)
__proto__: Object
*/
Circle.prototype.toString = function(){
    return "Circe with radius" + this.radius;
}
// We can reference instance members and prototype members within each other with this keyword
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

// Iterating through instance and prototype members
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

Object.keys(c); // gives only keys of instance properties and methods
for(let key in c){
    console.log(key); // gives instance and prototype keys
}
c.hasOwnProperty("radius"); // true
c.hasOwnProperty("draw"); // false

// Avoid modifying builtin objects and methods 
/*
It can cause unexpected behaviour if other developers did the same with different implementation and it's
possible that developers of js language can implement same method in future version. Builtin methods
are push(), pop() for Array object 
*/
