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
Before setting we could do let c = Circle.prototype.constructor(1) but it's not possible. So we explicitly
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

// Method Overriding
function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype); // crates an object form a prototype
    Child.prototype.constructor = Child;
}

function Shape(){}

Shape.prototype.duplicate = function(){
    console.log("duplicate");
};

function Circle(){}

extend(Circle, Shape);
// defined after it gets inherited
Circle.prototype.duplicate = function(){
    Shape.prototype.duplicate.call(this); // we can call the duplicate method form shape
    console.log("duplicate circle");
};
/*
We can redefine inherited methods in the child object with the same name with different implementation
The allows differ object behave differently. In the same fashion we can implement the inherited method
form parent object in the child object with different implementations. So redefining the parent method
in child object is called method overriding and if the same parent method is implemented differently
in different child objects, it's called polymorphism

In general it's not preferred to use inheritance. Composition(Mixin) is favoured over inheritance. Inheritance
makes code complex and fragile also it's not recommended to use more than one level of inheritance
*/

// Mixins
function mixin(target, ...sources){
    Object.assign(target, ...sources); // adding properties and methods source objects to target object
}

const canEat = {
    eat: function(){
        this.hunger--;
        console.log("Eating");
    }
};

const canWalk = {
    walk: function(){
        console.log("Walking");
    }
};

const canSwim = {
    swim: function(){
        console.log("Swimming");
    }
};

function Person(){

}
mixin(Person.prototype, canEat, canWalk);

function Fish(){}
mixin(Fish, canEat, canSwim);

const person = new Person();
const goldFish = new Fish();
