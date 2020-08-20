* In es6 the new syntax has added to js for creating classes. This is just syntactical sugar over the 
constructor function.The constructor function creates the object and contains instance properties and 
methods and body contains prototypical properties and methods.But as we knew before it's good to define 
properties in prototype to save memory 
```js
class Circle {
    constructor(radius) {
        this.radius = radius; // instance properties and methods
        this.move = function(){
            console.log("moving");
        }
    }

    draw(){
        console.log("drawing"); // prototypical properties and methods
    }
}

const circle = new Circle(1);
circle.radius;
circle.draw();
```
### Hoisting 
* Js moves function declaration to the top so we can call the function before it gets defined in the code
but function expressions doesn't get hoisted. 
* But neither class declaration or class expressions get hoisted. So we have to define the call before we use it in out code.

### Static methods
```js
class Circle {
    constructor(radius) {
        this.radius = radius; // instance properties and methods
    }

    draw(){
        console.log("drawing"); // prototypical properties and methods
    }

    static parse(str){
        const radius = JSON.parse(str).radius; 
        return new Circle(radius);
    }
}

const circle = Circle.parse('{"radius": 1}'); // takes a json string
console.log(circle.radius); // 1
```
* Static methods are not available with the objects crated by class instead it's available for the whole class.
It's use for creating utility functions which are not specific to a particular object. When we call 
functions from math objects the same happens `Math.cos()` etc.

### Private members using symbol
```js
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
```
* if we log circle in console we would see a property with name Symbol() and with value 1 and 
Object.getOwnPropertyNames(circle) won't give you any property instead use Object.getOwnPropertySymbol()
It will give you array of symbols and we can access it with it's index like an array

### Private member using weakmaps
```js
const _radius = new WeakMap();
const _move = new WeakMap();

class Circle{
    constructor(radius){
        _radius.set(this, radius);
        _move.set(this, () => {  // arrow functions inherit this form the containing function
            console.log("move", this);  // functions declared by function keyword by default reefers 
        });                             // to global object
    }

    draw(){
        console.log(_radius.get(this));
        _move.get(this)(); // () invoking a function
        console.log("draw");
    }
}

const c = new Circle(1);
```

### Inheritance
```js
class Person {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return `My name is ${this.name}`;
    }
}

class Student extends Person {
    constructor(name, age) {
        super(name);
        this.age = age;
    }

    getAge() {
        return `My age is ${this.age}`;
    }
}

const student = new Student('John', '15')
console.log(student.getName()); // My name is John
console.log(student.getAge()); // My age is 15
```

### Getters and Setters
* We can define getter and setters in ES6 class.
```js
class Person {
    constructor(firstName, lastName) {
        this._firstName = firstName;
        this._lastName = lastName;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set firstName(firstName) {
        this._firstName = firstName;
    }

    set lastName(lastName) {
        this._lastName = lastName;
    }
}

class Student extends Person {
    constructor(firstName, lastName, age) {
        super(firstName, lastName);
        this.age = age;
    }

    getAge() {
        return `My age is ${this.age}`;
    }
}

const student = new Student('John','Smith', 15)
student.firstName = 'William';
console.log(student.fullName); // William Smith
```
* We can use getters and setters in the above mentioned way. Even though getters and setters and methods, we use them as if they are properties.
* In the line `student.firstName = 'William';` js engine calls the `get firstName()` and pass `William` as argument under the hood.
