// Inheritance
/*
Inheritance is the way of prgramming where the baseclass(prototype in js) contains the common behaviour
and the childclass(object in js) inherits all the behaviours from the baseclass. In javascript all the
objects inherits methods form their prototype. __proto__ property comes with all the objects we create 
and it's implemeted by js engine and references to the base object from which the object is created. 
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
This array would have prototype from Array() or arrary base and it's prototype for all arrays creaed and
this array base also inherits form another object which we call call base object so we can say that
array -> Array -> Base so we can use all methods of Array(push(), pop() etc) and also methods of Base object 
If an object created by an constructor function obj -> Object Constructor -> Base Object 
*/