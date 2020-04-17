### Inbuilt String Methods
* Strings can be crated by string constructor(`String`).Example: `let str = String('string')`
* The methods mentioned mentioned bellow don't change the actual string but returns a new string.
* The `length` property of string returns the length of a string
```js
let lenStr = 'this is a string'.length; // returns 16 (including spaces)
```
* Get characters from a specific position.Indexing starts form zero.
```js
return 'string'.charAt(1); // returns t
return 'string'[1] // returns t
``` 
* Add two strings
```js
return 'john' + 'smith';
return str += 'str to be added';
return str.concat(str1, str2, str3); // not recommended
```
* Find if a string ends with another string
```js
let str = 'hello world'
return str.endsWith('rld'); // returns true (default length is str.length)
return str.endsWith('llo', 5) // true because it takes substring of length 5('hello')
return str.endsWith('rd'); // returns false
```
* Find if a substring is present inside a string
```js
let str = 'hello world'
return str.includes('llo') // returns true searching starts from index 0 if not specified
return str.includes('llo', 3) // returns false searching starts form index 3 ('lo world') 
```
* Find index of a substring from a string (returns -1 if not found)
```js
let str = 'hello world'
return str.indexOf('rld'); // returns 8(index of r of 'rld') searching starts from index 0 
return str.indexOf('o', 5); // returns 7 searching starts from index 5

```
* Find last index of a substring in a string.
```js
let str = 'hello world'
return str.lastIndexOf('orl'); // returns 7 (search from backwards)
return str.lastIndexOf('o', 6); // returns 4 (search from index 6 to 0)
```
* Repeat a string for specific number
```js
let str = 'abc'
return str.repeat(3); // returns abcabcabc (repeats 3 times)
```
* Replace parts of a string with a given string.
```js
let str = 'hello world'
return str.replace('world', 'John'); // returns hello john
// if you want to replace all the matches use regex
```
* `str.slice(startIndex, endIndex)` extracts a section of a string including startIndex but excluding endIndex and returns a new string.
```js
let str = 'hello world'
return str.slice(2, 8); // returns llo 
return str.slice(-5, -1); // same as str.slice(6, 10) if index are negative then str.length + index
```
* `str.split(separator)` splits all string in to substring and returns the array of those substrings
```js
let str = 'hello world'
return str.split(' '); // [ 'hello', 'world' ]
return str.split(''); // [ 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd' ]
```
* `str.substring(startIndex, endIndex)` returns starting form startIndex up to but excluding endIndex.If endIndex omitted string returned will include character up to the end of the string.  
```js
let str = 'hello world'
return str.substring(-3); // returns rld (same as str.substring(8))
return str.substring(1, 4); // returns ell
```
* Convert to uppercase and lowercase
```js
let str = 'Hello World'
return str.toUpperCase(); // HELLO WORLD
return str.toLowerCase(); // hello world
```
* `value.toString()` convert any value to string representation.
```js
let a = 10.15;
console.log(a.toString(10).split('')); // [ '1', '0', '.', '1', '5' ]
```
* Trimming white spaces from start and end of the string.
```js
let str = '   hello world   '
return str.trim(); // hello world
console.log(str.trimEnd()); // '   hello world'
console.log(str.trimStart()); // 'hello world   '
```
* `strObj.valueOf()` converts string object to primitive string value.
```js
let strObj = new String('hello');
console.log(strObj, typeof strObj) // String: 'hello'] 'object'
console.log(strObj.valueOf()); // hello (primitive value of string object)
```