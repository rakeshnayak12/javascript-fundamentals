/*
In es6 the new syntax has added to js for creating classes. This is just syntactical sugar over the 
constructor fuction.The constructor function creates the object and contains instance properties and 
methods and body contains protypical properties and methods.But as we knew beofore it's good to define 
properties in prototype to save memory 
*/

class Circle {
    constructor(radus) {
        this.radius = radus; // instance properties and methods
        this.move = function(){
            console.log("moving");
        }
    }

    draw(){
        console.log("drawing"); // protypical propertes and methods
    }
}

const circle = new Circle(1);
circle.radius;
circle.draw();

// Hoisting 
/*
Js moves fuction declaration to the top so we can call the function before it gets defined in the code
but function expressions doesn't get hoisted. But neither class declaration or class expressions get 
hoisted. 
*/

// Static methods
class Circle {
    constructor(radus) {
        this.radius = radus; // instance properties and methods
    }

    draw(){
        console.log("drawing"); // protypical propertes and methods
    }

    static parse(str){
        const radius = JSON.parse(str).radius; 
        return new Circle(radius);
    }
}

const circle = Circle.parse('{"radius: 1}'); // takes a json string
console.log(circle.radius); // 1
/*
Static methods are not availabe with the objects crated by class instead it's avalable for the whole class
It's use for creating utility functions which are not specific to a perticular object. When we call 
functions from math objects the same happens Math.cos()...etc.
*/

// Private members using symbol
const _radius = Symbol("radius");
const _draw = Symbol("f draw");
class Circle{
    constructor(radius){
        this[_radius] = radius;
    }

    [_draw](){
        console.log("draw");
    }
}

const circle = new Circle(1);
/* if we log circle in console we would see a propery with name Symbol() and with value 1 and 
Object.getOwnPropertyNames(circle) won't give you any prperty instead use Object.getOwnPropertySymbol()
It will give you array of symbols and we can access it with it's index like an array
*/

// Private member using weakmaps

const _radius = new WeakMap();
const _move = new WeakMap();

class Circle{
    constructor(radius){
        _radius.set(this, radius);
        _move.set(this, () => {  // arrow functions inherit this form the containing function
            console.log("move", this);  // functions declared by function keyword by default reffers 
        });                             // to global object
    }

    draw(){
        console.log(_radius.get(this));
        _move.get(this)(); // () invoking a function
        console.log("draw");
    }
}

const c = new Circle(1);