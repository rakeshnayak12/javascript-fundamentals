/*
There are 4 pillars of OOP 
1. Encapsulation -> We can grop properties and methods in a single unit. The properties are accessible
   with this keyword inside methods so no need of passing argumests to fuction. It caused less bug in
   the code and readablity. Reduce complexity and increase reusability
2. Abstraction -> We can hide hide methods and properties whih we don't want to expose to the user of
   the object. And if we change behaviour of these properties and methods, it won't impact the public 
   methods and properties. Reduce complexity and isolate impact of changes
3. Inheritance -> We can define common properties and methods in an object(class) and let othe objects 
   inherit from the parent object(class). It helps reducing duplicating our code.
4. Polymorphisim -> We can define property or method with same name for different object and make them
   behave differently for different objects (avoiding complex swith case statements)
*/

// Object literals to defining an object
const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw: function(){
        console.log("Drawing circle");
    }
};

circle.draw(); // Drawing circle
console.log(circle.radius); // 1
/*
The above way of defining an object is not recommended if object has behaviour or method and if we want
to crate another object we have to make copy of the same code and if we have bug in one of the methods
we have to fix it everywhere.  
*/

// Factory fuction method
function createCircle(radius){
    return {
        radius,  // it's the same as writing radius: radius (if name of key and value are same)
        draw: function(){
            console.log("drawing circle");
        }
    };
}

let circle = createCircle(1);
circle.draw(); // drawing circle
console.log(circle.radius); // 1
/*
In the above method we can create as many objects as we want form the createCircle method and we can 
easily change code in one place in the factory function
*/

// Constructor function method
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("drawing circle");
    };
}

let circle = new Circle(1);
circle.draw(); // drawing circle
console.log(circle.radius); // 1
/*
this keyword references the object that exitcuting the code. When an object is created with new keyword
new operator first creates an empty object then it sets this keyword points to the empty object and lastly it 
returns the object from the constructor function so we don't have to explicitly return an object as we 
did in factory function. By default this keyword points to global object in browser or node environment
*/

//Constructor property
/*
Every object has constructor property which gives the fuction from which the object is created.
if we log out circle.constructor it will give us:- f Circle(radius){...}. When we create string with 
string literals like "", '' or `` it calls new String() and same applies to new Number(), new Boolean()
We can access the constructor function using obj.constructor notation
*/

// Function are also objects in javascript
/*
Functions behave like any other object and we can access inbuilt properties of function object with .
notation. .name property gives name of the function .constructor gives Function() constructor function
which is called by js engine while creating function. There are other method named .call(), .apply() etc
*/

const Circle = new Function("radius", `
    this.radius = radius;
    this.draw = function(){
        console.log("drawing circle");
    };
`);

const circle = new Circle(1);
console.log(circle.radius); // 1
circle.draw(); // drawing circle

// Value types refference types
/*
number, string, boolean, symbol(es6), undefined, null are value types where as objects, functions and 
arrays are reference types. In value type when we make a copy of it a brand new copy of the value 
iscreated for other variable and all value type have there own copy in the memory independently but 
when we store a reference type the address of the object stored in the variable so when we make a copy 
we copy the address and ultimately all variables points to the same object and any change in the 
object reflects in all variable pointing to the object
*/
let number = 10;
function increase(number){
    number++
}
increase(number); // calling global variable number to increase it's value
console.log(number); // 10
// Because the number is copied by value and number parameter in the function get new copy of 10 and 
//it's local to the function so global variable number remain unchanged 
let obj = {value: 10};
function increase(obj){
    obj.value++
}
increase(obj);
console.log(obj.value); // 11

// Adding and deleting properties to objects
/*
We can add property to an object even after the object is created from the constructor functon. Because
the objects are dynamic it's become possible in js. Real world example would be add a token to the user
object sent by the user.

*/
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("drawing circle");
    };
}

let circle = new Circle(1);
circle.location = {x: 1}; // can done with: circle["location"] = {x: 1}
console.log(circle.location.x); // 1
console.log(circle["location"]); // {x: 1}
/*
[] this notation is useful when we want to calculate properties dynamically like in "for in" loop and if
the the property name is not a valid identifer like has special characters or space in it
*/
let property = "center-location";
circle[property]; // gives the value of the center location

// we can delete properties from an object which we don't want to send to the user in realworld
delete circle.location; // can be done with: delete circle["location"]; 

// Enumerating over an object
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log("drawing circle");
    };
}
const circle = new Circle(1);

for(let key in circle){
    if(typeof circle[key] !== "function"){
        console.log(key, circle[key]); // to log only properties not methods
    }
}

const keys = Object.keys(circle); // keys holds the array of keys of circle
console.log(keys); // ["radius", "draw"]
if("radius" in circle){
    console.log("circle has radius"); // to check if an object has an property
}

// Abstraction 
/*
We have to hide the some inner implementation in the object from the outer user. All the properties and
methods created by this keyword are accesible through the objec.property notation 
*/
function Circle(radius){
    this.radius = radius;
    let defaultLocation = {x: 0, y: 0}; // private without this keyword

    let calculateOptimalLocation = function(){ // private without this keyword
        // ...
    }
    this.draw = function(){
        defaultLocation;
        calculateOptimalLocation();
        console.log("drawing circle");
    };
}
/*
The above implementation used crating local variables inside constructor function so those variables
get removed from the memory when the function stops exicution. These are not inside the object these are
only local variables declared inside the constructor function and these variables stay alive as long as
they are reffered inside of the methods
*/

// Getters and setters
/*
If we want to display the private members to the user there should be a way to do it and we should only
able to read it not modify it
*/
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

// Stopwatch example with OOP implementation
/*
start, stop and reset methods to start,stop and rest the stopwatch. duration property to get duration
*/
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