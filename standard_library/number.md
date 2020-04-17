### Numbers 
Numbers are primitive types.
* Represent min and max safe integers
```js
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
```
* If we number in higher magnitude we can use `Number.MAX_VALUE`;
```js
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MAX_VALUE > Number.MAX_SAFE_INTEGER); // true
console.log(-Number.MAX_VALUE < Number.MIN_SAFE_INTEGER); // false
``` 
* Javascript also has concept of infinity.
```js
console.log(Number.NEGATIVE_INFINITY < -Number.MAX_VALUE); // true
console.log(Number.POSITIVE_INFINITY > Number.MAX_VALUE); // true
```
* To check if a value is finite or infinite
```js
console.log(Number.isFinite(1/0)); // false
console.log(Number.isFinite(10/5)); // true 
console.log(isFinite(2/2)); // true
```
* `NaN` belongs to type number but represents the value we have is not a number.When we try to convert string to number we get `NaN`. `NaN === NaN` will return `false`.
```js
console.log(isNaN(2/2)); // false (checks if passed value is NaN)
console.log(isNaN(0/0)); // true (Number.isNan() also works)
```
* `parseInt()` takes a string and convert it to number of passed radix and then make it an integer 
```js
console.log(parseInt('10', 8)); // 8 (parse '10' as octal and then convert to integer)
console.log(parseInt('11', 2)); // 3 (parse as binary then convert to integer)
console.log(parseInt('35', 2)); // NaN (35 can't be parse to binary)
// we are most interested in decimal conversion
console.log(parseInt('237')) // 237 (same as parseInt('237', 10))
```
* `parseFloat()` parses an argument and returns floating point number, if parsing is not possible the returns -1.
```js
console.log(parseFloat('237.34')); // 237.34
```
* `toString()` parses the first argument and then try to converts to the number with the base of passed radix and returns a string representation of it.
```js
let decimal = 15;
console.log(decimal.toString(10)); // 15 (same as decimal.toString())
console.log(decimal.toString(2)); // 1111
console.log(decimal.toString(8)); // 17
console.log(decimal.toString(16)); // f
```
