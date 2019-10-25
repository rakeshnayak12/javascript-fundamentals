// Creating won prototypical inheritance
/*
As we know circle object inherits form circle base object and which also inherits form object base which
is base of all object
circle:
  radius: 1
  move: f (...)
  __proto__:
    draw: f ()
    constructor: f Circle()
    __proto__:
      constructor: f Object()
      .
*/
function Shape(){

}

Shape.prototype.duplicate = function(){
    console.log("duplicate");
};

function Circle(radius){
    this.radius = radius;
}

// Circle.prototype = Object.create(Object.prototype); -> it is the default implementation
Circle.prototype = Object.create(Shape.prototype); // crates an object form a prototype
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function(){
    console.log("draw");
};
/*
The problem with the above implementation is circle base would loose constructor property under __proto__
Befor setting we could do let c = Circle.prototype.constructor(1) but it's not possible. So we explicitly
defined like thisCircle.prototype.constructor = Circle; 
*/

// Calling the super constructor
function Shape(color){
    this.color = color;
}

Shape.prototype.duplicate = function(){
    console.log("duplicate");
};

function Circle(radius, color){
    Shape.call(this, color); // color is inherited form shape constructor
    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype); // crates an object form a prototype
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function(){
    console.log("draw");
};

// Intermediate function inheritance
function Shape(color){
    this.color = color;
}

Shape.prototype.duplicate = function(){
    console.log("duplicate");
};

function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype); // crates an object form a prototype
    Child.prototype.constructor = Child;
}

function Circle(radius, color){
    Shape.call(this, color);
    this.radius = radius;
}

extend(Circle, Shape);

Circle.prototype.draw = function(){
    console.log("draw");
};
/*
We just wrapped the prototype setting with a function so we can call the function and easily set prototype 
*/

